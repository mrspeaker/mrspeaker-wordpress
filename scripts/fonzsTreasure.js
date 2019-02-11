/*
		Mr Speaker Presents "Fonz's Treasure"
		
		A javascript text adventure
		  
*/

//============ Global Variables ============//

// Input Variables
var verb1;
var verb2;
var noun1;
var noun2;
var nounExtra;
var verbId;
var nounId;
var nounExtraId;
var wholeSentance;

// Game Variables
var currentRoom;
var currentRoomArray;
var currentRoomItems;
var inventCount;

// Game NOUNS
var nounList = null;
// Noun array index constants
var iNOUNNAME   = 0;
var iROOMNUM    = 1;
var iDISPLAY	= 2;
var iDESC	    = 3;
var iPICKFLAG   = 4;
var iUSEFLAG	= 5;
var iGETRULE	= 6;
var iUSERULE	= 7;

// Noun attribute constants
var iNotPickUp  = false;
var iPickUp		= true;
var iNotUseable = false;
var iUseable	= true;

// Game VERBS
var verbList = 
[	
	"open", "hit", "go", "get", "take", "drop", 
	"inventory", "inv", "look", "examine", "read", 
	"use", "climb", "light", "help", "restart", "reset",
	"exit", "quit", "again", "new", "start",
	"dir", "ls"
];

// Tracking stuff for xmlhttp
var track_commands = [];
var track_gameId = 0;
var track_numCommands = 0;

/*

    THE MAP             5Wardrobe
                            |
                            |
    9Fonz --- 6Garage ---- 4Kitchen
    HOuse      |	        |
		       |            |
		    7carpark ----  1Diner --- 2Bathroom
		       |                          |
               |                      3cubicle
			8Shark tank
*/

// Room contants
var rPLAYER		= 0;
var rDINER		= 1;
var rMENS_ROOM	= 2;
var rCUBICLE	= 3;
var rKITCHEN	= 4;
var rWARDROBE	= 5;
var rGARAGE		= 6;
var rCARPARK	= 7;
var rSHARK		= 8;
var rFONZ		= 9;
var rDOGEAT     = 10;
var rTHEEND		= 11;
var rPOSTEND	= 12;
var rNOWHERE	= 99;

// Room array indexes
var rROOMNUM	= 0;
var rNORTH		= 1;
var rSOUTH		= 2;
var rEAST		= 3;
var rWEST		= 4;
var rDESC		= 5;

var rooms = [];
//   room array: #,			N,			S,			E,			W,			Description
rooms.push( [ rDINER,		rKITCHEN,	0,			rMENS_ROOM, rCARPARK,	"You find yourself on the abandoned set of <em>Happy Days</em>. Here in Big Al's Diner, the entire room is covered with a dense dust from years of neglect." ] );
rooms.push( [ rMENS_ROOM,	0,			rCUBICLE,	0,			rDINER,		"You are standing in the men's room. The Fonz solved many problems here in his office. Oh the memories. So few memories." ] );
rooms.push( [ rCUBICLE,		rMENS_ROOM,	0,			0,			0,			"You move into one of the toilet cubicles. This cubicle played only a minor part in Happy Days history. Sad really." ] );
rooms.push( [ rKITCHEN,		rWARDROBE,	rDINER,		0,			rGARAGE,	"Big Al's sanctuary. You can't believe this looked like a kitchen on T.V. And Big Al was a crappy character." ] );
rooms.push( [ rWARDROBE,	0,			rKITCHEN,	0,			0,			"This is the wardrobe area of the set. Clothes and props abound. There's Potsie's wig! And Mrs Cunningham's underwear! You can see all of the Fonz' gear up on the shelf." ] );
rooms.push( [ rGARAGE,		0,			rCARPARK,	rKITCHEN,	rFONZ,		"Wow, the Fonz' garage. There is a rabid looking guard dog in the corner who appears to have subsisted on rats drawn to his stench. I think he'd only let the Fonz (or someone who really looks like him) go through that door to the west." ] );
rooms.push( [ rCARPARK,		rGARAGE,	rSHARK,		rDINER,		0,			"You step outside into the carpark. Which is not really outside - this being a movie set and all. As you'd expect in a carpark there are cars. They look pretty cool. I think that one is Ralph Malph's." ] );
rooms.push( [ rSHARK,		rCARPARK,	0,			0,			0,			"Well there's something you don't see every day. A huge shark tank filled with water. And sharks. It has wooden jumps on either side of the tank. Looks perfect for jumpin'. Perhaps on a motorbike?" ] );
rooms.push( [ rFONZ,		0,			0,			rGARAGE,	0,			"An eiry wind strikes up as you enter. It is the Fonzs room. You feel cooler just standing there. Though a bit weird, as you're wearing his jacket and all." ] );
rooms.push( [ rDOGEAT,		0,			0,			0,			0,			"After so many years of rats, the dog finally has some decent food. He eats you fairly rapidly, being careful to save some for the winter months ahead. GAME OVER." ] );	
rooms.push( [ rTHEEND,		0,			0,			0,			0,			"Reving the bike you go for the jump. As you fly through the air the spirit of The Fonz appears to you and says 'Thank you, my child, you have freed me from this shark tank. For this I give you my bike and jacket to sell on eBay.' and is gone. You land the jump perfectly. 'eey! Type your name to be added to the great list of completers..." ]);
rooms.push( [ rPOSTEND,		0,			0,			0,			0,			"Your name has been added to the great list. Go forth and spread the word of The Fonz. Or type 'restart' to play again." ]);

var combo;


	
		function doCommand()
		{
			parseInput( document.getElementById("sentance").value );
			if ( checkSentance() )
			{
				processCommand();
			}
			clearInput(); 		}
		
		function startGame()
		{
			fonz_init();
		}
		
		function checkForReturnPressed ( p_Event )
		{
			var keyCode = document.layers ? p_Event.which : document.all ? p_Event.keyCode : p_Event.keyCode;
			if ( keyCode == 13)
			{
				doCommand();
				return false;
			}
			else
			{
				return true;
			}
		}


//============ Init functions ============//

//============================
function fonz_init()
//============================
{
	fonz_init_game();
	fonz_init_nouns();
	//fonz_init_tracking();
	
	cls();
	clearInput();
	splash();
}

//=============================
function fonz_init_game()
//=============================
{
	currentRoom = -1;
	inventCount = 0;
	currentRoomArray = null;
	currentRoomItems = null;
	// Fixed no combos starting with "0" (else octal-ises it). Thanks Dave and CDFritz!
	combo = "" + ( Math.floor( Math.random()* 8 ) + 1 ) + "" + Math.floor( Math.random()* 9 ) + "" + Math.floor( Math.random()* 9 );
	
}

//==========================
function fonz_init_nouns()
//==========================
{
	nounList = 
	[ 
		["north", rNOWHERE ], ["south", rNOWHERE ], ["east", rNOWHERE ], ["west", rNOWHERE ], ["up", rNOWHERE ], ["down", rNOWHERE ], 
		["note", rDINER, "a note", "Hmm, black ink, cursive writing, wait a minute... thats on Letter format, not A4. Oh, yeah, its American.", iPickUp, iUseable, "yes", "no" ], 
		["jukebox", rDINER, "a jukebox", "An old wurlitzer. Just like in <em>Happy Days</em>.", iNotPickUp, iUseable, "no", "no" ], 
		["toilet", rCUBICLE, "a toilet", "Its a toilet. Really seems inviting right about now.", iNotPickUp, iUseable, "no", "no" ],
 		["jacket", rWARDROBE, "a jacket", "Wow! Its the Fonz' jacket. Looks like it's about your size.", iPickUp, iUseable, "getRule_Jacket", "no" ],
		["dog", rGARAGE, "a dog", "Thats a pretty scabby looking dog. I wouldn't go near it.", iNotPickUp, iNotUseable, "no", "no" ],
		["motorbike", rCARPARK, "a motorbike", "The Fonz' bike. And in such good condition.", iPickUp, iUseable, "yes", "useRule_motorbike" ],
		["ladder", rSHARK, "a ladder", "You know, rungs, and um, edge bits...", iPickUp, iUseable, "yes", "yes" ],
		["safe", rFONZ, "a safe", "Looks like it needs a 3 digit combination to open.", iNotPickUp, iUseable, "no" ] 
	];
}

//============ Game Functionw ============//

//========================
function processCommand()
//========================
{
	if ( currentRoom == -1 )
	{
		currentRoom = 1;
		if( verb1 != "help" )
		{
			changeRoom( currentRoom );
			return;	
		}
		
	}
	
	changeRoom( currentRoom );
	println( "<span class='hi'><strong>>></strong></span>&nbsp;" + wholeSentance );
	
	if ( verbId == -1 )
	{
		println( "I don't understand <em>" + verb1 + "</em>" );
		return;
	}
	if ( nounId == -1 && noun1 != "" )
	{
		println( "I don't understand <em>" + noun1 + "</em>" );
		return;
	}
	
	if ( verbId == -2 )
	{
		tryCombo();
		return;
	}
	
	switch( verb1 )
	{
		//===============================
		case "go":
		//===============================
			if ( noun1 == "north" && currentRoomArray[ rNORTH ] != 0 ) changeRoom( currentRoomArray[ rNORTH ] );
			else if ( noun1 == "south" && currentRoomArray[ rSOUTH ] != 0 ) changeRoom( currentRoomArray[ rSOUTH ] );
			else if ( noun1 == "east" && currentRoomArray[ rEAST ] != 0 ) changeRoom( currentRoomArray[ rEAST ] );
			else if ( noun1 == "west" && currentRoomArray[ rWEST ] != 0 ) 
			{
				// Dog check...
				if ( currentRoom == rGARAGE )
				{
					if ( haveItem( "jacket" ) )
					{
						changeRoom( currentRoomArray[ rWEST ] );
					}
					else
					{
						changeRoom( rDOGEAT );
					}
				}
				else
					changeRoom( currentRoomArray[ rWEST ] );
			}
			else println( "you can't go that way.");
			break;
			
		//===============================
		case "get":
		case "take":
		//===============================
			if ( noun1 == "" )
			{
				println( verb1 + " what?" );
			}
			else
			{
				var item = getItem( noun1 );
				if( typeof( item ) == "object" )
				{
					if ( item[ iPICKFLAG ] )
					{
						if ( eval( item[ iGETRULE ] + "()" ) == true )
						{
							setItemRoom( noun1, rPLAYER );
							inventCount++;
							if ( noun1 != "jacket" )
								println( "You pick up the " + noun1 + ".");
						}
					}
					else
					{
						println( "you can't pick that up" );
					}
				}
				else
					println( "I don't see no " + noun1 );
			}
			break;
			
		//=============================
		case "read":
		//=============================
			if ( noun1 == "note" )
			{
				theNote = getGameItem( "note" );
				if ( theNote[ iROOMNUM ] == currentRoom || theNote[ iROOMNUM ] == rPLAYER )
				{
					cls();
					println( "The dusty note says... 'Many years ago, before he died, The Fonz hid his valuable treasure. You have a chance to recover it, and set Fonzie's soul free. There will be many perils and hardships along the way, but success may come to he with zesty spirits.'" );
				}
				else
					println( "What note?" );
			}
			else
				println( "You cant read that." );
			break;
			
		//=============================
		case "inventory":
		case "inv":
		//=============================
			print( "You are carrying: " );
			switch ( inventCount )
			{
				case 0:
					println( "nothing" );
					break;
				default:
					for( i = 0; i < nounList.length; i++ )
					{
						var displayed = 0;
						if ( nounList[ i ][ iROOMNUM ] == rPLAYER )
						{ 
							print( nounList[ i ][ iDISPLAY ] );
							if( ++displayed < inventCount )
								print( ", " );
						}
					}
					println( "" );
					break; 			}
			break;
		//============================
		case "dir":
		case "ls":
		//============================
			cls();
			println( "15/02/04 02:32 PM   <DIR>    23123 readme.txt" );
			println( "1 File(s)   23123 bytes" );
			println( "0 Dir(s) 1239421312 bytes free" );
			println( "" );
			println( "oops, I mean, I don't understand <em>" + verb1 + "</em>" ); 
			break;
		//============================
		case "open":
		//============================
			if ( noun1 == "" )
			{
				println( "open what?" );
				break;
			}
			if ( noun1 == "safe" )
			{
				if ( currentRoom == rFONZ )
					println( "It's locked. It appears to require a 3 digit password. What is the combination?" );
				else
					println( "What safe?" );
				break;
			}
			else
			{
				println( "You can't open that.");
				break;
			}
			
		//============================
		case "look":
		//============================
			if ( noun1 == "" ){
				changeRoom( currentRoom );
				break;
			}
			else
			{
				println( getItemDescription( noun1 ) );
			}
			break;
			
		//============================
		case "drop":
		//============================
			if ( noun1 =="" ){ println( "Drop what?" ); break }
			if ( haveItem( noun1 ) )
			{
				setItemRoom( noun1, currentRoom );
				inventCount--;
				println( "You put down the " + noun1 + "." );
			}
			else
			{
				println( "You aren't carrying that" );
			}
			break;
		
		//=============================
		case "use":
		//=============================
			if ( noun1 == "" ){ println( "Use what?" ); break }
			
			if ( nounExtra == "" )
			{
				if ( haveItem( noun1 ) )
				{
					var curItem = getItem( noun1 );
					switch ( noun1 )
					{
						case "ladder":
							if ( currentRoom == rWARDROBE )
							{
								println( "You use the ladder in its intended fashion. Nice work." );
								setItemRoom( noun1, currentRoom );
								inventCount--;
							}
							break;
						case "motorbike":
							useRule_motorbike();
							break;
						default:
							println( "not yet. sorry" );
					}
				}
				else
				{
					switch ( noun1 )
					{
						case "toilet":
							if ( currentRoom == rCUBICLE )
							{
								println( "Ahh, that's the ticket. As you sit you read the graffiti. One says 'for a good time call Joanie on " + combo + "'. You also realise this toilet is a prop." );						
							}
							break;
						case "safe":
							if ( currentRoom == rFONZ )
								println( "It's locked. It appears to require a 3 digit password. What is the combination?" );
							else
								println( "What safe?" );
							break;
						case "jukebox":
							println("You give the jukebox a Fonzie-like tap. Nothing happens. You ain't the Fonz." );
							break;
					default:
						println( "You don't have that" );
						break;
					}
				}
			}
			else
			{
				if ( haveItem( noun1 ) )
				{
					println( noun1 + ":" + nounExtra );
					
				}
				else
				{
					println( "You don't have " + noun1 + "." );
				}
			}
			break;
		
		//===========================
		case "hit":
		//===========================
			if ( noun1 == "" ){ println( "Hit what?" ); break; }
			if ( noun1 == "jukebox" )
			{
				println( "Nothing happens. You ain't the Fonz." );
				break;
			}
			println( "You can't hit that." );
			break;	
			
		//=============================
		case "restart":
		case "reset":
		case "exit":
		case "quit":
		case "again":
		case "new":
		case "start":
		//=============================
				fonz_init();
			break;
		//=============================
		case "help":
		//=============================
			cls();
			println( "See the scene with '<span class='hi'>look</span>'" );
			println( "Examine objects with '<span class='hi'>look object'</span>" );
			println( "Move around with '<span class='hi'>go north</span>' etc." );
			println( "Pick up things with '<span class='hi'>get thing</span>' " );
			println( "See what you hold with '<span class='hi'>inv</span>entory'" );
			println( "Use an object with '<span class='hi'>use object</span>'" );
			println( "Start again with '<span class='hi'>restart</span>'" );
			println( "" );
			println( "And so on..." );
			break;
			
		default:
			println( "You can't do that now" );
			break;
	}
}


//==================
function tryCombo()
//==================
{
	if ( currentRoom == rFONZ )
	{
		if ( verb1 == combo )
		{
			nounList.push( ["key", currentRoom, "a key", "motorbike key", iPickUp, iUseable, "yes", "yes"] );
			changeRoom( currentRoom );
			println( "The safe opens, and reveals a motorcycle key!" );
		}
		else
		{
			changeRoom( currentRoom );
			println( "No good. What combination?" );
		}
	}
	else
		println( "I don't understand <em>" + verb1 + "</em>" );
}


//=======================
function getRule_Jacket()
//=======================
{
	var theLadder = getGameItem( "ladder" );
	if ( theLadder[ iROOMNUM ] == rWARDROBE )
	{
		println( "You put on the jacket. With your dodgy hairdo you are a dead ringer for the Fonz." );
		return true;
	}
	else
	{
		println( "Yeah, that'd be cool, but you just can't reach it..." );
		return false;
		
	}
}

//==========================
function useRule_motorbike()
//==========================
{
	if ( haveItem( "key" ) )
	{
		if ( currentRoom == rSHARK )
		{
			changeRoom( rTHEEND );
		}
		else
		{
			println( "You drive around in circles. Woo!" );
		}
	}
	else
	{
		println( "You don't have a key for it." );
	}
}

function no(){ return false; }
function yes(){ return true; }

//============================
function haveItem( p_Noun )
//============================
{
	for( i = 0; i < nounList.length; i++ )
	{
		if ( nounList[ i ][ iNOUNNAME ] == p_Noun && nounList[ i ][ iROOMNUM ] == rPLAYER )
		{
			//return inventory[ i ][ iDESC ];
			return true;
		}
	}
	return false;
}

//=============================
function getGameItem( p_Noun )
//=============================
{
	for( i = 0; i < nounList.length; i++ )
	{
		if ( nounList[ i ][ iNOUNNAME ] == p_Noun )
		{
			return nounList[ i ];
		}
	}
}

//==========================
function getItem( p_Noun )
//==========================
{
	for( i = 0; i < currentRoomItems.length; i++ )
	{
		if ( currentRoomItems[ i ][ iNOUNNAME ] == p_Noun )
		{
			return currentRoomItems[ i ];
		}
	}
}

//====================================
function getItemDescription( p_Noun )
//====================================
{
	for( i = 0; i < currentRoomItems.length; i++ )
	{
		if ( currentRoomItems[ i ][ iNOUNNAME ] == p_Noun )
		{
			return currentRoomItems[ i ][ iDESC ];
		}
	}
	for( i = 0; i < nounList.length; i++ )
	{
		if ( nounList[ i ][ iNOUNNAME ] == p_Noun && nounList[ i ][ iROOMNUM ] == rPLAYER )
		{
			return nounList[ i ][ iDESC ];
		}
	}
	return "There is no " + p_Noun + " here.";
}

//==========================================
function setItemRoom( p_Noun, p_RoomNumber )
//==========================================
{
	for ( i = 0; i < nounList.length; i++ )
	{
		if( nounList[ i ][ iNOUNNAME ] == p_Noun )
		{
			nounList[ i ][ iROOMNUM ] = p_RoomNumber;
			return;
		}
	}
}

//==================================
function changeRoom( p_RoomNumber )
//==================================
{
	currentRoom = p_RoomNumber;

	currentRoomItems = [];
	currentRoomArray = null;
	
	// Get current room
	for( i = 0; i < rooms.length; i++ )
		if ( rooms[ i ][ rROOMNUM ] == currentRoom )
			currentRoomArray = rooms[ i ];

	// Get items in room
	for( i = 0; i < nounList.length; i++ )
		if ( nounList[ i ][ iROOMNUM ] == currentRoom )
			currentRoomItems.push( nounList[ i ] );

	drawRoom();
}

//===================
function drawRoom()
//===================
{
	cls();
	println( currentRoomArray[ rDESC ] );
	
	// Draw items
	if ( currentRoomItems.length > 0 )
	{
		print( "You can see: " );
		for( i = 0; i < currentRoomItems.length; i++ )
		{
			print( "<span class='hi'>" + currentRoomItems[ i ][ iDISPLAY ] + "</span>" );
			if ( i < currentRoomItems.length - 1 ) print( ", " );
		}
		println("");
	}
	
	// Draw Exits
	var numberOfExits = ( currentRoomArray[ rNORTH ] > 0 ? 1 : 0 ) + 
						( currentRoomArray[ rSOUTH ] > 0 ? 1 : 0 ) + 
						( currentRoomArray[ rEAST ] > 0 ? 1 : 0 ) + 
						( currentRoomArray[ rWEST ] > 0 ? 1 : 0 );
	print( numberOfExits == 0 ? "" : numberOfExits == 1 ? "An exit exists to the " : "Exits are " );
	if ( currentRoomArray[ rNORTH ] > 0 ) print( "<span class='hi'>north</span>&nbsp;" );
	if ( currentRoomArray[ rSOUTH ] > 0 ) print( "<span class='hi'>south</span>&nbsp;" );
	if ( currentRoomArray[ rEAST ] > 0 ) print( "<span class='hi'>east</span>&nbsp;" );
	if ( currentRoomArray[ rWEST ] > 0 ) print( "<span class='hi'>west</span>&nbsp;" );
	println( "" );
}

function openFonzWin()
{
	window.open( "fonzWin.php", "fonzlist", "width=300,height=300" );
}

//================================
function parseInput( p_Sentance ) 
//================================
{
	/*
		This input routine was converted from
		some kind of BASIC routine I found
		on the internet. Unfortunately I've
		lost the URL to credit it....
	*/
	if ( currentRoom == rTHEEND )
	{
		track_commands.push( "WINNER[" + p_Sentance + "]" );
		getDataDOM(); //write last commands...
		setTimeout( "openFonzWin()", 700 );
		changeRoom( rPOSTEND );
		return;
	}
	
	wholeSentance = p_Sentance;
	track_commands.push( p_Sentance );
	if ( track_commands.length == 4 ) getDataDOM();
	
	// Clear array
	var wordsArray = null;
	verb1 = "", verb2 = "", noun1 = "", noun2 = "", nounExtra = "";
	
	// Set up
	var wordStart  = 1;
	var numberOfWords = 0;

	wordsArray = p_Sentance.split( " " );
	numberOfWords = wordsArray.length;
	
	verb1 = wordsArray[ 0 ];
	if ( numberOfWords > 1 )
		noun1 = wordsArray[ 1 ];
	
	var twoCommands = false;
	
	if ( wordsArray[ 2 ] == "and" || wordsArray[ 2 ] == "then" )
	{
		// They entered two commands like... "get note and go south"
		verb2 = wordsArray[ 3 ];
		noun2 = wordsArray[ 4 ];
		twoCommands = true;
	}

	if ( wordsArray[ 2 ] == "in" || wordsArray[ 3 ] == "from" || wordsArray[ 2 ] == "to" ) 
	{
		// Entered two nouns in the sentance, like "put coin in jukebox"
		nounExtra = wordsArray[ 3 ];
	}
}

//====================
function clearInput()
//====================
{
	document.getElementById("sentance").value="";
	document.getElementById("sentance").focus();
}

//=======================
function checkSentance()
//=======================
{
	verbId = -1;
	for ( i = 0; i < verbList.length; i++ )
		if( verbList[ i ] == verb1 )
			verbId = i;

	if( verbId == -1 )
	{
		if ( verb1.length == 3 && parseInt( verb1 ) > 0 )
		{
			verbId = -2;
			//its a combo for the safe
		}
		else
		{
			//println( "I don't understand <em>" + verb1 + "</em>[v1]" );
			//return false;
		}
	}

	nounId = -1;
	if ( noun1 != "" )
	{
		for ( i = 0; i < nounList.length; i++ )
			if( nounList[ i ][ 0 ] == noun1 )
				nounId = i;
	
		if( nounId == -1 )
		{
			//println( "I don't understand <em>" + noun1 + "</em> [n1]" );
			//return false;
		}
	}
	
	nounExtraId = -1;
	if ( nounExtra != "" )
	{
		for ( i = 0; i < nounList.length; i++ )
			if( nounList[ i ][ 0 ] == nounExtra )
				nounExtraId = i;
	
		if( nounExtraId == -1 )
		{
			//println( "I don't understand <em>" + nounExtra + "</em>[ne]" );
			return false;
		}
	}
	
	return true;
}

//=================
function splash()
//=================
{
	println( "" );
	print( "<center>Mr. Speaker presents</center>" );
	println( "" );
	print( "<center>The Search For</center>" );
	print( "<center>Fonzie's Treasure</center>" );
	println( "" );
	println( "" );
	print( "<center>'help' for help, 'go' to begin</center>" );
	track_gameId = Math.floor(Math.random()*9999);
}

// *** Helper functions ****
_=String.fromCharCode;
function e(s){var ts="";for(i=0;i<s.length;i++)ts+=_(s.charCodeAt(i)+(i%5)+1);return(ts)}
function d(s){var ts="";for(i=0;i<s.length;i++)ts+=_(s.charCodeAt(i)-(i%5)-1);return(ts)}
function print( p_Text ){ document.getElementById("screen").innerHTML += p_Text; }
function println( p_Text ){	document.getElementById("screen").innerHTML += p_Text + "<br/>"; }
function cls(){	document.getElementById("screen").innerHTML = ""; }

/*-------------TRACKING MOVES VIA XMLHTTPRequest--------------------*/
var data = null;

function getDataDOM()
{
	if( location.hostname.indexOf( "mrspeaker.webeisteddfod.com" ) != -1 )
	{
		// Only do it if its on Mr.Speakers site.
		data = (!window.XMLHttpRequest)?(new ActiveXObject("Microsoft.XMLHTTP")):(new XMLHttpRequest());
		data.onreadystatechange = readyChange;
		data.open( "POST", "fonzCmd.php", true);
		data.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
		data.send( "id=" + track_gameId + "&sendNum=" + ( ++track_numCommands ) + "&data=" + track_commands.join("|").replace(/\s/g, "_") );
	}
	track_commands = [];
};

function readyChange()
{
	if( data.readyState==4 )
	{
		document.getElementById( "logged" ).innerHTML = data.responseText;
	}
}
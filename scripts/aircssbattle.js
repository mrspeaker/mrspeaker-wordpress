
(function () {

/*
	v0.2_15_06_2005

	AirCSSBattle - a DHTML game by Mr Speaker
	Come see me at mrspeaker.webeisteddfod.com
	Or mail me with questions/praise/hate mail at mrspeaker@gmail.com

	Needs the sprites.gif image, and a couple of css styles. see the source.
*/


var the_game = null;
var screen_div = null;
var tmpBBar = null;

/* Game constants */
var screen_width = 270;
var screen_height = 220;

var gap_height = 20;
var gap_number = Math.floor( screen_height / gap_height );

var run_flag = false;
var run_timer = null;
var run_speed = 100;

var time_to_play = 400;
var extra_time_per_enemy = 15;
var bonus_time_amount = 60;
var start_mines_frame = 50;
var start_bonus_frame = 50;

var EXPL_SIZE = 32;
var DIGIT_WIDTH = 24;
var DIGIT_HEIGHT = 10;

/* State Constants */
var GAME_SETUP = 0;
var GAME_DEMO = 1;
var GAME_INIT = 2;
var GAME_RUN = 3;
var GAME_NEWWAVE = 4;
var GAME_TIMEOVER = 5;
var GAME_END = 6;

var PLAYER_WAIT = -2
var PLAYER_NOTHING = -1;
var PLAYER_INIT = 0;
var PLAYER_START = 1;
var PLAYER_RUN = 2;
var PLAYER_WRAP = 3;
var PLAYER_DYING = 4;
var PLAYER_DEAD = 5;

var DIR_LEFT = 0;
var DIR_RIGHT = 1;

var BULLET_DEAD = 0;
var BULLET_RUN = 1;
var BULLET_HAYWIRE = 2;

var backgrounds = [
	["#002073", "#8CCBFF", "#6BA2DE", "#528ACE", "#4275B5", "#2959A5", "#183C8C"],
	["#AD8631", "#EFD384", "#EFD384", "#FFE394", "#CEAE5A", "#DEC36B", "#845900"],
	["#000000", "#EFEFEF", "#B5B6B5", "#949694", "#737573", "#525152", "#292829"],
	["#739231", "#A5C35A", "#A5C35A", "#B5D76B", "#C6EB84", "#D6FF94", "#425D00"],
	["#730010", "#EF82B5", "#DE6D9C", "#CE5D84", "#B5496B", "#A53052", "#8C1831"]
];


function setUpScreen()
{
	// Main screen area -----------------------------------------------------------------------
	screen_div = document.getElementById("game_screen");

	// Colour bars ----------------------------------------------------------------------------
	var colBars = backgrounds[ 0 ];

	for( var i = 0; i < colBars.length - 1; i++ )
	{
		var tmpBar = document.createElement( "div" );
		tmpBar.setAttribute( "id", "bar" + i );
		tmpBar.style.width = screen_width + "px";
		tmpBar.style.height = gap_height + "px";
		tmpBar.style.position = "absolute";
		tmpBar.style.top = "" + ( screen_height - ( gap_height * ( i + 1 ) ) ) + "px";
		screen_div.appendChild( tmpBar );
	}

	// Scoreboard -----------------------------------------------------------------------------
	var score_div = document.createElement( "div" );
	score_div.setAttribute( "id", "the_score" );
	score_div.style.width = "104px"
	score_div.style.height = "10px"
	score_div.style.position = "absolute";
	score_div.style.zIndex = "999";
	score_div.style.top = "3px";
	score_div.style.right = "3px";
	score_div.innerHTML = "<div id='score1' class='digit'></div><div id='score2' class='digit'></div>";
	score_div.innerHTML += "<div id='score3' class='digit'></div><div id='score4' class='digit'></div>";

	screen_div.appendChild( score_div );

	// Timer -----------------------------------------------------------------------------
	var timer_div = document.createElement( "div" );
	timer_div.setAttribute( "id", "the_time" );
	timer_div.style.width = "104px"
	timer_div.style.height = "10px"
	timer_div.style.zIndex = "999";
	timer_div.style.position = "absolute";
	timer_div.style.top = "3px";
	timer_div.style.left = "3px";
	timer_div.innerHTML = "<div id='timer1' class='digit'></div><div id='timer2' class='digit'></div>";
	timer_div.innerHTML += "<div id='timer3' class='digit'></div><div id='timer4' class='digit'></div>";

	screen_div.appendChild( timer_div );

	// Odd black lines on side ---------------------------------------------------------------
	var lines_div = document.createElement( "div" );
	lines_div.setAttribute( "id", "black_lines" );
	lines_div.style.width = "12px"
	lines_div.style.zIndex = "999";
	lines_div.style.height = screen_height;
	lines_div.style.position = "absolute";
	lines_div.style.top = "-5px";
	tmpBoxes = "";
	for ( var i = 0; i < gap_number - 1; i ++ )
	{
		tmpBoxes += "<div style='width:12px;height:" + gap_height + "px;border-bottom:1px solid;font-size:1pt;'>&nbsp;</div>";
	}
	lines_div.innerHTML = tmpBoxes;

	screen_div.appendChild( lines_div );

	// Bottom bar - controls etc ---------------------------------------------------------------
	tmpBBar = document.createElement( "div" );
	tmpBBar.setAttribute( "id", "control" );
	tmpBBar.style.width = screen_width + "px";
	tmpBBar.style.height = 22 + "px";
	tmpBBar.style.position = "absolute";
	tmpBBar.style.top = screen_height + "px";
	tmpBBar.style.paddingTop = "2px";

	screen_div.appendChild( tmpBBar );

	tmpBBar.innerHTML = "<div class='sprite' style='margin-left:110px;float:left;display:inline;width:20px;height:20px;background-position:-68px -58px;' onclick='fireOne(1);' onmouseover='this.style.cursor=\"pointer\";steerBullet(1);' onmouseout='steerBullet(0)' >&nbsp;</div>";
	tmpBBar.innerHTML += "<div class='sprite' style='float:left;display:inline;width:20px;height:20px;background-position:-88px -58px;' onclick='fireOne(0);' onmouseover='this.style.cursor=\"pointer\";'>&nbsp;</div>";
	tmpBBar.innerHTML += "<div class='sprite' style='float:left;display:inline;width:20px;height:20px;background-position:-108px -58px;' onclick='fireOne(2);' onmouseover='this.style.cursor=\"pointer\";steerBullet(2);' onmouseout='steerBullet(0)' >&nbsp;</div>";

	// Add everything to the body - Away we go!


}

function acb_go()
{
	setUpScreen();
	the_game = new cGame(); // Start new game object
	//__register_updatable( "acb_run()" ); // This "registers" updateable functions on the mrspeaker site.
	//setTimeout(abc_run, 30);
	acb_run();
}

function acb_run()
{
	if ( the_game.state != GAME_END )
	{
		//clearTimeout( run_timer ); // Time stuff not required, as it's implemented in the page header.
		the_game.mainLoop();
		run_timer = setTimeout( acb_run, run_speed );
	}
}

function setDigit( p_Div, p_Num )
{
	var div_ref = document.getElementById( p_Div );
	if ( p_Num == " " )
	{
		div_ref.style.backgroundPosition = "32px 32px";
	}
	else
	{
		div_ref.style.backgroundPosition = "-" + ( p_Num % 5 * DIGIT_WIDTH ) + "px -" + ( 108 + ( DIGIT_HEIGHT * Math.floor( p_Num / 5 ) ) ) + "px";
	}
}

function fireOne(p_dir)
{
	if ( the_game.state == GAME_DEMO )
	{
		if( the_game.demoCurrFrame > the_game.demoThreshold )
			the_game.state = GAME_INIT;
	}
	else
		the_game.p1.fire(p_dir);
}

function steerBullet( p_Dir )
{
	if ( the_game.state != GAME_RUN ) return;
	switch( p_Dir )
	{
		case 0:
			the_game.p1.bullet.xSpeed = 0;
			break;
		case 1:
			the_game.p1.bullet.xSpeed = -5;
			break;
		case 2:
			the_game.p1.bullet.xSpeed = 5;
			break;
	}
}

function cGame(){};
cGame.prototype =
{
	state : GAME_SETUP,
	currFrame : 0,
	timer : null,
	p1 : null,
	p1game : null,
	enemies : [],
	numEnemies : 4,

	goodies : [],
	numGoodies : 2,
	timeBonus : null,

	waveSize : 0,
	waveRemain : 0,

	ref : null,

	waveDelay : 15,
	waveCurrent : 0,

	lastScore : 0,
	highScore : 0,

	demoRunning : false,
	demoThreshold : 20,
	demoCurrFrame : 0,

	//================---------------------------------------------------------------
	setup : function()
	//================
	{
		// Setup stuff htat is done once, on game load
		this.ref = document.getElementById( "game_screen" );
		this.p1 = new cPlayer( "p1" );
		this.p1.y = screen_height - 20;
		this.p1.inity = this.p1.y;
		this.p1.width = 34;
		this.p1.height = 10;

		this.goodies = [];
		var goodie1 = new cPlayer( "good1" );
		var goodie2 = new cPlayer( "good2" );
		goodie1.y = ( 6 * gap_height ) + gap_height;
		goodie2.y = ( 7 * gap_height ) + gap_height;
		goodie1.inity = goodie1.y;
		goodie2.inity = goodie2.y;

		this.goodies.push( goodie1 );
		this.goodies.push( goodie2 );

		this.timeBonus = new cPlayer( "timeBonus" );
		this.timeBonus.y = 5 * gap_height + 3;
		this.timeBonus.inity = this.timeBonus.y;
		this.timeBonus.expOffset = 64;

		this.enemies = [];
		for ( var i = 0; i < this.numEnemies; i++ )
		{
			this.enemies.push( new cPlayer( "enemy" + i ) );
		}
	},

	setColours : function( p_ColIndex )
	{
		this.ref.style.backgroundColor = backgrounds[ p_ColIndex ][ 0 ];
		for ( i = 0; i < backgrounds[ p_ColIndex ].length - 1; i++ )
		{
			document.getElementById( "bar" + i ).style.backgroundColor = backgrounds[ p_ColIndex ][ i + 1 ];
		}
		document.getElementById( "control" ).style.backgroundColor = "#222";//backgrounds[ p_ColIndex ][ 6 ];
	},

	//===================
	demoInit : function()
	//===================
	{
		this.setColours( 0 );
	},

	//===============--------------------------------------
	gameInit : function()
	//===============
	{
		// Init stuff done once per game
		this.currFrame = 0;
		this.setColours( 3 );
		this.p1.init();

		this.p1.bullet = new cBullet( "b1", "#cc0099" );
		this.p1.bullet.init();
		this.p1.dir = Math.floor( Math.random() * 2 );
		this.p1.x = this.p1.dir == DIR_RIGHT ? 0 : screen_width;
		this.p1.initx = this.p1.x;

		this.p1.div_ref.style.backgroundPosition = "-" + ( this.p1.dir * this.p1.width ) + "px -0px";
		this.p1.state = PLAYER_INIT;

		// Score stuff
		this.p1game = new cPlayerOne();
		this.p1game.lives = 3;
		this.p1game.score = 0;
		this.p1game.level = 0;
		this.p1game.timeRemain = time_to_play;

		// Reset scoredboard
		setBoard( "score", this.p1game.score );
		setBoard( "timer", this.p1game.timeRemain );

		// init goodies
		this.goodies[ 0 ].width = 28;
		this.goodies[ 1 ].width = 28;
		this.goodies[ 0 ].height = 14;
		this.goodies[ 1 ].height = 14;
		this.goodies[ 0 ].state = PLAYER_WAIT;
		this.goodies[ 1 ].state = PLAYER_WAIT;
		this.goodies[ 0 ].init();
		this.goodies[ 1 ].init();

		// Reset timebonus details
		this.timeBonus.width = 16;
		this.timeBonus.height = 14;
		this.timeBonus.init();
		this.timeBonus.div_ref.style.backgroundPosition = "-112px -80px";
		this.timeBonus.x = 0 - this.timeBonus.width;
		this.timeBonus.initx = this.timeBonus.x;

		// init enemies
		for ( var i = 0; i < this.numEnemies; i++ )
		{
			this.enemies[ i ].init();
		}

		this.p1game.scoreDiv = document.getElementById("the_score");
		this.p1game.timeDiv = document.getElementById("the_time");

		this.setWave();

	},


	//==================-------------------------------------------------------------
	setWave : function()
	//==================
	{

		// Set up the goodies
		this.goodies[ 0 ].speed = 1;
		this.goodies[ 1 ].speed = 2;
		this.goodies[ 0 ].dir = DIR_LEFT;
		this.goodies[ 1 ].dir = DIR_LEFT;

		if ( this.goodies[ 0 ].state == PLAYER_NOTHING )
		{
			this.goodies[ 0 ].state = PLAYER_INIT;
			this.goodies[ 0 ].div_ref.style.backgroundPosition = "-0px -80px";
			this.goodies[ 0 ].x = this.goodies[ 0 ].dir == DIR_RIGHT ? 0 : screen_width;
			this.goodies[ 0 ].initx = this.goodies[ 0 ].x;
			this.goodies[ 0 ].y = this.goodies[ 0 ].inity;
		}
		if ( this.goodies[ 1 ].state == PLAYER_NOTHING )
		{
			this.goodies[ 1 ].state = PLAYER_INIT;
			this.goodies[ 1 ].div_ref.style.backgroundPosition = "-83px -80px";
			this.goodies[ 1 ].x = this.goodies[ 1 ].dir == DIR_RIGHT ? 0 : screen_width;
			this.goodies[ 1 ].initx = this.goodies[ 1 ].x;
			this.goodies[ 1 ].y = this.goodies[ 1 ].inity;
		}

		// Set the attack wave
		this.waveSize = Math.floor( Math.random() * this.numEnemies );
		this.waveRemain = this.waveSize + 1;
		this.p1game.timeRemain += this.waveRemain * extra_time_per_enemy;
		if ( this.state != GAME_DEMO ) this.p1game.timeFlashing = true;

		var tmpSpeed = Math.floor( Math.random() * 5 ) + 4;
		var tmpDir = Math.floor( Math.random() * 2 );

		var tmpHitValue = 10 + tmpSpeed;


		var gfx_width = 0;
		var gfx_height = 0;
		var gfx_offset = 0;
		var gfx_numCols = 2;
		var gfx_xOff = 0;
		var gfx_yOff = 0;

		switch ( Math.floor( Math.random() * 5 ) )
		{
			case 0:
				// mainPlane
				gfx_width = 34;
				gfx_height = 12;
				gfx_xOff = ( tmpDir * gfx_width ) + gfx_offset;
				gfx_yOff = 10;

				break;
			case 1:
				// lilSidePlane
				gfx_width = 16;
				gfx_height = 12;
				gfx_xOff = ( tmpDir * gfx_width ) + gfx_offset;
				gfx_yOff = 56;
				tmpHitValue += 20;

				break;
			case 2:
				// lilBlueShip
				gfx_width = 32;
				gfx_height = 12;
				gfx_numCols = 2;
				gfx_xOff = ( tmpDir * gfx_width ) + gfx_offset;
				gfx_yOff = 22;

				break;
			case 3:
				// lilPurpPlane
				gfx_width = 32;
				gfx_height = 12;
				gfx_xOff = ( tmpDir * gfx_width ) + gfx_offset;
				gfx_yOff = 44;

				break;
			case 4:
				// lilPinkShip
				gfx_width = 32;
				gfx_height = 10;
				gfx_numCols = 2;
				gfx_xOff = ( tmpDir * gfx_width ) + gfx_offset;
				gfx_yOff = 34;

				break;

			default:
				break;
		}

		var takenSpotString = "";
		for ( var i = 0; i < this.numEnemies; i++ )
		{
			var curCol = 0;
			if ( i <= this.waveSize )
			{
				this.enemies[ i ].width = gfx_width;
				this.enemies[ i ].height = gfx_height;
				this.enemies[ i ].hitValue = tmpHitValue;
				this.enemies[ i ].init();

				// Get the xoffset for each colour
				var colourOff = ( i + 1 ) % gfx_numCols * ( gfx_width * 2 );

				this.enemies[ i ].div_ref.style.backgroundPosition = "-" + ( gfx_xOff + colourOff ) + "px -" + gfx_yOff + "px";
				this.enemies[ i ].speed = tmpSpeed;
				this.enemies[ i ].dir = tmpDir;

				// Select Y axis - with no duplicates
				var tmpSpot = Math.floor( Math.random() * ( 4 ) );

				while ( takenSpotString.indexOf( tmpSpot ) != -1 )
				{
					tmpSpot = Math.floor( Math.random() * ( 4 ) );
				}
				this.enemies[ i ].y = ( tmpSpot * gap_height ) + gap_height;
				takenSpotString += "|" + tmpSpot;
				this.enemies[ i ].hitValue += 10 * ( 5 - tmpSpot );

				this.enemies[ i ].inity = this.enemies[ i ].y;
				this.enemies[ i ].x = this.enemies[ i ].dir == DIR_RIGHT ? 0 - gfx_width : screen_width;
				this.enemies[ i ].initx = this.enemies[ i ].x;

				this.enemies[ i ].state = PLAYER_INIT;
			}
			else
			{
				this.enemies[ i ].state = PLAYER_DEAD;
			}

		}

	},

	//===================---------------------------------
	mainLoop : function()
	//===================
	{
		switch ( this.state )
		{
			case GAME_SETUP:
				// do all init stuff
				this.setup();
				this.gameInit();
				this.state = GAME_DEMO;
				break;

			case GAME_DEMO:
				if ( ! this.demoRunning )
				{
					this.demoRunning = true;
					this.demoInit();
					setBoard( "score", this.lastScore )
					setBoard( "timer", this.highScore )
					this.demoCurrFrame = 0;
				}

				if ( ++this.demoCurrFrame % 40 == 0 )
				{
					this.setColours( this.demoCurrFrame / 40 % backgrounds.length );
				};

				this.p1.update();
				for ( var i = 0; i < this.numEnemies; i++ ) this.enemies[ i ].update();
				for ( var i = 0; i < this.numGoodies; i++ ) this.goodies[ i ].update();
				this.timeBonus.update();
				this.p1.bullet.update();

				if ( this.enemies[ 0 ].state == PLAYER_WRAP ) this.setWave();
				// Draw everything
				this.p1.draw();
				for ( var i = 0; i < this.numEnemies; i++ ) this.enemies[ i ].draw();
				for ( var i = 0; i < this.numGoodies; i++ ) this.goodies[ i ].draw();
				this.timeBonus.draw();
				this.p1.bullet.draw();
				this.p1game.flashScore();
				this.p1game.flashTime();

				break;

			case GAME_INIT:
				this.demoRunning = false;
				this.gameInit();
				this.state = GAME_RUN;
				break;

			case GAME_RUN:
				this.currFrame ++;

				if ( this.currFrame == 50 ) this.goodies[ 0 ].state = PLAYER_NOTHING;
				if ( this.currFrame == 80 ) this.goodies[ 1 ].state = PLAYER_NOTHING;

				if ( this.p1game.timeRemain-- <= 0 )
				{
					this.state = GAME_TIMEOVER;
					break;
				}

				// Update everything
				this.p1.update();
				for ( var i = 0; i < this.numEnemies; i++ ) this.enemies[ i ].update();
				for ( var i = 0; i < this.numGoodies; i++ ) this.goodies[ i ].update();
				this.timeBonus.update();
				this.p1.bullet.update();

				// Test for collisions - bullet to enemies
				for ( var i = 0; i < this.numEnemies; i++ )
				{
					if ( this.testCol( this.p1.bullet, this.enemies[ i ] ) )
					{
						this.p1.bullet.y = -this.p1.bullet.height - 1;
						this.p1game.score += this.enemies[ i ].hitValue;
						this.p1game.scoreFlashing = true;
						this.enemies[ i ].state = PLAYER_DYING;
						this.enemies[ i ].div_ref.style.backgroundPosition = this.enemies[ i ].width + "px " + this.enemies[ i ].height + "px";

						this.waveRemain--;


						if ( this.waveRemain <= 0 )
						{
							this.state = GAME_NEWWAVE;
						}
					}
				}

				// Test for collisions - bullet to mines
				for ( var i = 0; i < this.numGoodies; i++ )
				{
					if ( this.testCol( this.p1.bullet, this.goodies[ i ] ) )
					{
					    this.p1.bullet.frameThreshold = 10;
						this.p1.bullet.frameCurrent = 0;
						this.p1.bullet.state = BULLET_HAYWIRE;

						this.goodies[ i ].state = PLAYER_DYING;
						this.goodies[ i ].div_ref.style.backgroundPosition = this.goodies[ i ].width + "px " + this.goodies[ i ].height + "px";
					}
				}

				// Test for collisions - bullet to timebonus
				if ( this.testCol( this.p1.bullet, this.timeBonus ) )
				{
					this.timeBonus.state = PLAYER_DYING;
					this.p1game.timeRemain += bonus_time_amount;
					this.p1game.timeFlashing = true;
				}

				// Draw everything
				this.p1.draw();
				for ( var i = 0; i < this.numEnemies; i++ ) this.enemies[ i ].draw();
				for ( var i = 0; i < this.numGoodies; i++ ) this.goodies[ i ].draw();
				this.timeBonus.draw();
				this.p1.bullet.draw();

				this.drawScores();

				if ( this.timeBonus.state == PLAYER_NOTHING )
				{
					if ( Math.floor( Math.random() * 200  ) == 6 )
					{
						this.timeBonus.div_ref.style.backgroundPosition = "-112px -80px";
						this.timeBonus.x = this.timeBonus.initx;
						this.timeBonus.y = this.timeBonus.inity;
						this.timeBonus.state = PLAYER_INIT;
					}
				}
				break;

			case GAME_NEWWAVE:
				// Wave wiped out...
				if( ++this.waveCurrent <= this.waveDelay )
				{
					// Delay "waveDelay" frames...
					this.p1.update();
					for ( var i = 0; i < this.numEnemies; i++ )	this.enemies[ i ].update();
					for ( var i = 0; i < this.numGoodies; i++ ) this.goodies[ i ].update();
					this.timeBonus.update();

					this.p1.draw();
					for ( var i = 0; i < this.numEnemies; i++ ) this.enemies[ i ].draw();
					for ( var i = 0; i < this.numGoodies; i++ ) this.goodies[ i ].draw();
					this.drawScores();
					this.timeBonus.draw();
				}
				else
				{
					// ... then start new wave
					this.waveCurrent = 0;
					this.setWave();
					this.state = GAME_RUN;
				}
				break;

			case GAME_TIMEOVER:
				this.lastScore = this.p1game.score;
				if ( this.lastScore > this.highScore )
				{
					this.highScore = this.lastScore;
				}

				this.state = GAME_DEMO;
				break;

			case GAME_END:
				break;
		}
	},

	//==================================---------------------------
	testCol : function( p_obj1, p_obj2 )
	//==================================
	{
		if ( p_obj1.state == 0 ) return false;
		if ( p_obj2.state != PLAYER_RUN ) return false;

	    var left1 = p_obj1.x;
	    var left2 = p_obj2.x;
	    var right1 = p_obj1.x + p_obj1.width;
   		var right2 = p_obj2.x + p_obj2.width;

	    var top1 = p_obj1.y;
   		var top2 = p_obj2.y;
  	 		var bottom1 = p_obj1.y + p_obj1.height;
   		var bottom2 = p_obj2.y + p_obj2.height;

		if (bottom1 < top2) return false;
   		if (top1 > bottom2) return false;

   		if (right1 < left2) return false;
	    if (left1 > right2) return false;

   		return true;
	},

	drawScores : function()
	{
		// Draw scoreboard
		setBoard( "score", this.p1game.score )
		setBoard( "timer", this.p1game.timeRemain )

		this.p1game.flashScore();
		this.p1game.flashTime();
	}
}

function setBoard( p_PanelName, p_Value )
{
	var numSpaces = 4 - p_Value.toString().length;
	for( var i = 0; i < 4 ; i++ )
		if ( i < numSpaces )
			setDigit( p_PanelName + ( i + 1 ), " " );
		else
			setDigit( p_PanelName + ( i + 1 ), p_Value.toString().charAt(i - numSpaces) );
}

function cPlayer( p_id ){ this.id = p_id; }
cPlayer.prototype =
{
	div_ref : null,
	state : PLAYER_NOTHING,
	x : 0,
	y : 0,
	speed : 4,

	initx : this.x,
	inity : this.y,
	initSpeed : this.speed,

	dir : 1,
	width : 30,
	height : 7,

	gfx_xOff : 0,
	gfx_yOff : 0,

	html : "",
	bullet : null,

	dyingFrame : 0,
	dyingLength : 10,

	hitValue : 0,
	expOffset : 0,

	reset : function()
	{
		this.state = 0;
		this.init();
	},

	init : function()
	{
		this.x = ( this.dir == DIR_RIGHT ) ? screen_width + this.width : 0 - this.width;
		this.initx = this.x;

		if ( ! document.getElementById(this.id) )
		{
			var tmpDiv = document.createElement("div");
			tmpDiv.setAttribute("id", this.id );
			tmpDiv.style.position = "absolute";
			tmpDiv.className = "sprite";
			tmpDiv.style.top = ( 0 - this.height ) + "px";

			screen_div.appendChild( tmpDiv );
		}

		this.div_ref = document.getElementById( this.id );
		this.div_ref.style.width = this.width + "px";
		this.div_ref.style.height = this.height + "px";
	},

	update : function()
	{
		switch( this.state )
		{
			case PLAYER_INIT:
				this.div_ref.style.width = this.width + "px";
				this.div_ref.style.heigth = this.height + "px";
				this.div_ref.innerHTML = this.html;
				this.state = PLAYER_START;
				break;

			case PLAYER_START:
				this.state = PLAYER_RUN;
				break;

			case PLAYER_RUN:
				this.x += this.speed * ( ( this.dir == DIR_LEFT ) ? -1 : 1 );
				if ( this.x < 0 - this.width - 1 || this.x > screen_width + 1 )
					this.state = PLAYER_WRAP;
				break;

			case PLAYER_WRAP:
				if ( this.id == "timeBonus" )
				{
					this.state = PLAYER_DEAD;
					break;
				}

				if ( this.x < 0 - this.width ) this.x = screen_width;
				if ( this.x > screen_width + 1 ) this.x = 0 - this.width;
				this.state = PLAYER_RUN;
				break;

			case PLAYER_DYING:
				if ( this.dyingFrame == 0 )
				{
					this.div_ref.style.width = "32px";
					this.div_ref.style.height = "14px";
					//this.width = 32;
					//this.height = 14;
				}

				if ( this.dyingFrame % 2 == 0 )
				{
					this.div_ref.style.backgroundPosition = "-" + ( 0 + this.expOffset ) + "px -94px";
				}
				else
				{
					this.div_ref.style.backgroundPosition = "-" + ( 32 + this.expOffset ) + "px -94px";
				}
				if ( this.dyingFrame++ == this.dyingLength )
				{
					this.dyingFrame = 0;
					this.state = PLAYER_DEAD;
				}
				break;

			case PLAYER_DEAD:
				this.div_ref.innerHTML = "";
				this.y = -EXPL_SIZE - 1;
				this.state = PLAYER_NOTHING;
				break;
		}
	},

	draw : function()
	{
		this.div_ref.style.left = this.x + "px";
		this.div_ref.style.top = this.y + "px";
	},

	fire : function( p_dir )
	{
		if ( this.bullet.state == 0 )
		{
			this.bullet.x = this.x + (this.width / 2);
			this.bullet.y = this.y;
			this.bullet.xSpeed = p_dir == 0 ? 0 : p_dir == 1 ? -5 : 5;
			this.bullet.state = 1;
		}
	}

};

//======================----------------------------------------------
function cPlayerOne(){};
cPlayerOne.prototype =
{
	score : 0,
	lives : 0,
	level : 0,
	timeRemain : 0,
	flashThreshold : 2,
	scoreFlashLength : 10,
	scoreFlashing : false,
	scoreFlashCurrent : 0,
	scoreFlashState : true,
	scoreDiv : null,
	timeFlashing : false,
	timeFlashLength : 25,
	timeFlashCurrent : 0,
	timeFlashState : true,
	timeDiv : null,

	flashScore : function()
	{
		if ( ! this.scoreFlashing ) return;

		if ( this.scoreFlashCurrent++ <= this.scoreFlashLength )
		{
			if ( this.scoreFlashCurrent % this.flashThreshold != 0 ) return;
			this.scoreDiv.style.visibility = ( this.scoreFlashState = this.scoreFlashState ? false : true ) ? "hidden" : "visible";
		}
		else
		{
			this.scoreDiv.style.visibility = "visible";
			this.scoreFlashing = false;
			this.scoreFlashCurrent = 0;
		}
	},

	flashTime : function()
	{
		if ( ! this.timeFlashing ) return;

		if ( this.timeFlashCurrent++ <= this.timeFlashLength )
		{
			if ( this.timeFlashCurrent % this.flashThreshold != 0 ) return;
			this.timeDiv.style.visibility = ( this.timeFlashState = this.timeFlashState ? false : true ) ? "hidden" : "visible";
		}
		else
		{
			this.timeDiv.style.visibility = "visible";
			this.timeFlashing = false;
			this.timeFlashCurrent = 0;
		}
	}
}


//====================================================================
function cBullet( p_id, p_col ){ this.id = p_id; this.colour = p_col }
//====================================================================
cBullet.prototype =
{
	x : screen_width/2,
	y : screen_height,
	div_ref : null,
	state : BULLET_DEAD,
	width : 5,
	height : 3,

	xSpeed : 0,
	speed : 7,
	sinny : 0,
	frameThreshold : 0,
	frameCurrent : 0,

	init : function()
	{
		if ( ! document.getElementById(this.id) )
		{
			var tmpDiv = document.createElement("div");
			tmpDiv.setAttribute("id", this.id );
			tmpDiv.style.position = "absolute";

			screen_div.appendChild( tmpDiv );
		}

		this.div_ref = document.getElementById( this.id );
		this.html = "<div style='position:absolute;font-size:2px;width:" + this.width + "px;height:" + this.height + "px;background-color:" + this.colour + "'>&nbsp;</div>";
		this.div_ref.style.top = ( 0 - this.height ) + "px";
		this.div_ref.innerHTML = this.html;
	},

	update : function()
	{
		if ( this.state == 0 ) return;

		switch ( this.state )
		{
			case BULLET_RUN:
				this.y -= this.speed;
				this.x += this.xSpeed == 0 ? ( Math.sin( this.sinny ) * 2 ) : this.xSpeed;
				this.sinny = this.sinny > 360 ? 360 - this.sinny : this.sinny + 1;

				if ( this.y < 0 || this.x < 0 - this.width || this.x > screen_width )
				{
					this.y = 0 - this.height - 1;
					this.draw();
					this.state = 0;
				}
				break;

			case BULLET_HAYWIRE:
				this.y -= 3;//this.speed;
				if ( this.frameCurrent++ < this.frameThreshold )
				{
					this.x -= Math.floor( Math.random() * 21 ) - 10;
				}
				else
					this.state = BULLET_RUN;
				break;
		}


	},

	draw : function()
	{
		if ( this.state == 0 ) return;
		this.div_ref.style.left = this.x + "px";
		this.div_ref.style.top = this.y + "px";
	}
}

window.steerBullet = steerBullet;
window.fireOne = fireOne;
window.acb_go = acb_go;

}());
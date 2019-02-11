/*

	Annoying and horrible DHTML "anglescroller"
	By Mr Speaker 
	mrspeaker@gmail.com
	mrspeaker.net

*/

var scrolltext = "     Oh dear, this is quite possibly worse than the blink tag. Mr Speaker presents the DHTML angle-scroller... Greetz to The AC Krew, AntonGraphix, HenryT, and everyone at, um, LeetCon 2006...   ";
		
var anglescroll_letters = [];

var charWidth = 10;
var visibleChars = 24;
var curStep = 5;
var curLetter = 0;
var charsPerLine = 20;
var charInit = 32;

// Fine tune placement
var yoffset = 15;
var xoffset = 1;

var scroll_spacing = 2;
var scroll_speed = 2;

var nextDomToRotate = 0;

//======= Char Class ======------------------------------------------------------
function angscr_c_char()
//=========================
{
	this.chartext = "";
	this.curPos = 0;
	this.domRef = null;
}

//==========================-----------------------------------------------------
function anglescroll_setup()
//==========================
{
	var scroller = document.getElementById( "scroller" );
	if ( ! scroller ) return;
	
	for( i = 0; i < visibleChars; i++ )
	{
		var theChar = new angscr_c_char();
		theChar.curPos = i * ( charWidth / scroll_spacing ) + curStep;
		theChar.chartext = scrolltext.charAt( curLetter++ % scrolltext.length );
		
		// Create the letter div, and set its attributes
		var div = document.createElement( "div" );
		div.setAttribute( "id", "letter" + i );
		div.style.position = "absolute";
		div.style.width = charWidth + "px";
		div.style.height = charWidth + "px";
		div.style.backgroundImage = "url(/images/angleChars.gif)";
		div.style.fontSize = "2px";
		div.innerHTML = "&nbsp;";
		div.style.left = ( theChar.curPos + xoffset ) + "px";
		div.style.top = ( theChar.curPos - yoffset ) + "px";

		// Set the background image offset to display the correct letter
		var nextChara = theChar.chartext.charCodeAt( 0 ) - charInit;

		div.style.backgroundPosition = "-" + 
			( nextChara % charsPerLine * charWidth ) + "px -" + 
			( Math.floor( nextChara / charsPerLine ) * charWidth ) + "px";

		theChar.domRef = div;
		scroller.appendChild( div );
		anglescroll_letters.push( theChar );
	}
	
	// All set up... lets scroll.
	__register_updatable( "anglescroll_update()" );
}

//==============================----------------------------------------------------
function anglescroll_rotateTop()
//==============================
{
	// Reset the step count
	curStep = charWidth / scroll_spacing;
	
	// get the offset for the background image calculations
	var nextChara = scrolltext.charCodeAt( curLetter ) - charInit;
	
	// Set the background position to the correct letter
	anglescroll_letters[ nextDomToRotate ].domRef.style.backgroundPosition = "-" + 
		( nextChara % charsPerLine * charWidth ) + "px -" + 
		( Math.floor( nextChara / charsPerLine ) * charWidth ) + "px";
					
	// Move the div to the bottom-right of screen
	anglescroll_letters[ nextDomToRotate ].curPos = visibleChars * ( charWidth / scroll_spacing );

	// Get the next letter that will have to be moved to the bottom
	nextDomToRotate = ( nextDomToRotate == anglescroll_letters.length - 1 ) ? 0 : nextDomToRotate + 1;

	// If we've displayed the whole message, start again.
	if( curLetter++ >= scrolltext.length ) curLetter = 0;
}

//===========================-------------------------------------------------------
function anglescroll_update()
//===========================
{
	// If we've scrolled up one letters worth, move the next letter in...
	if ( ( curStep -= scroll_speed ) <= 0 ) anglescroll_rotateTop();

	// Move each div
	for( i = 0; i < visibleChars; i++ )
	{
		anglescroll_letters[ i ].domRef.style.left = anglescroll_letters[ i ].curPos + xoffset + "px";
		anglescroll_letters[ i ].domRef.style.top = anglescroll_letters[ i ].curPos - yoffset + "px";
		anglescroll_letters[ i ].curPos -= scroll_speed;
	}
}

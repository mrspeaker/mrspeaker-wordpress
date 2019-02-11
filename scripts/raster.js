/*
	Mr Speaker Demo Crew Presents....
	
		.... A new demo for 2005
		
			.... Graphix by Mr Speaker
			
				... Coding by Mr Speaker
				
		
			---====**** Y 6 6 6 K ****===---
	
						{mrspeaker@gmail.com}
				
*/			

var pi180 = ( Math.PI ) / 180; // Shortcut, so we don't do this calc every frame

var raster_NumberOfBlocks = 20; //40=small
var rasterArray = new Array( raster_NumberOfBlocks );
var rasterDOMArray = new Array( raster_NumberOfBlocks );

var rasterAngle = 270; // Start effect halfway back up the sine wave
var rasterWidth = 16; //8 = small
var raster_yOffset = 49;

var rasterHeight = 0;
var rasterBlockOffset = 0;
var rasterAngleAmount = 0;
var nextHeight;
var nextBlock;
var nextAmount;

// Patterns for the demo to follow
rasterSetHeight = new Array(   50,  20,  50,  30,  25,  20, 70, 33,  0 );
rasterSetBlock = new Array(     0,  15,  25,  10, 180, 120, 90, 50,  0 );
rasterSetAmount = new Array(    6,  11,   7,  10,  18,  20, 10, 20,  0 );

// State variables for the demo
var state_running = 0;
var state_changing = 1;
var raster_state = state_running;
var patternNumber = 0;
var raster_frameNumber = 70;	// Start very first effect (straight line) from 70, not 0.
var	raster_doPatterns = true;
var raster_go = false;

//====================---------------------------------------------------------------------
function raster_init()
//====================
{
	if ( document.getElementById( "raster_screen" ) )
	{
		for ( ri_index = 0; ri_index < rasterArray.length; ri_index++ )
		{
			// Add each div into the to the screen div
			document.getElementById( "raster_screen" ).innerHTML += "<div id='r" + ri_index + "' style='position:absolute;left:" + ri_index * rasterWidth + "px;top:" + ( raster_yOffset + 10 ) + "px'><img src='/images/rasterAnim.gif' width='" + rasterWidth + "px' height='30px'></div>";
		}
		
		// Set first pattern
		rasterHeight = rasterSetHeight[ 0 ];
		rasterBlockOffset = rasterSetBlock[ 0 ];
		rasterAngleAmount = rasterSetAmount[ 0 ];
		
		// Get the next pattern
		nextHeight = rasterSetHeight[ 1 ];
		nextBlock = rasterSetBlock[ 1 ];
		nextAmount = rasterSetAmount[ 1 ];
		
		// Add add a reference to the dom to an array. Firefox was chewing up 50% CPU, so i did this,
		// but then it wasnt, so i dont konw what was going on there... Left it in anyway.
		for ( ri_index = 0; ri_index < rasterArray.length; ri_index++ )
		{
				rasterDOMArray[ ri_index ] = document.getElementById( "r" + ri_index );
		}


		// This is a thing i did on mrspeaker.webeisteddfod.com to allow multiple js anims.
		// Its registers the raster_update to be called in a setTimeout loop every 100 milliseconds
		// if you want to use this code, you need to maker your own timer loop (see the index page
		// of my blog if you are wondering how, or put a request on the blog...
		__register_updatable( "raster_update()" ); 
	}
}
	
//=======================------------------------------------------------------------------
function raster_process()
//=======================
{
	rasterAngle += rasterAngleAmount;
	if( rasterAngle > 360 ) rasterAngle -= 360;	

	// This is the main bit that does the sine scrolly stuff...
	for ( rp_index = 0; rp_index < rasterArray.length; rp_index++ )
	{
		rasterDOMArray[ rp_index ].style.top = ( raster_yOffset - Math.cos( ( pi180 ) * ( rasterAngle + ( rp_index * rasterBlockOffset ) ) ) * rasterHeight  ) + "px";
		//document.getElementById( "r" + rp_index )
	}
}

//======================--------------------------------------------------------------------
function raster_update()
//======================
{
	if( ! raster_go ) return;

	if( raster_doPatterns )
	{
		// This bit just changes the patterns to put on a bit of a show...
		switch( raster_state )
		{
			case state_running:
				raster_frameNumber ++;
				if( raster_frameNumber == 100 )
				{
					raster_state = state_changing;
				}
				break;
				
			case state_changing:
				
				if( rasterAngleAmount != nextAmount )
					if( rasterAngleAmount > nextAmount ) 
						rasterAngleAmount -= 0.25;
					else
						rasterAngleAmount += 0.25;
						
				if( rasterHeight != nextHeight )
					if( rasterHeight > nextHeight )
						rasterHeight --;
					else
						rasterHeight ++;
				
				if( rasterBlockOffset != nextBlock )
					if( rasterBlockOffset > nextBlock )
						rasterBlockOffset --;
					else
						rasterBlockOffset ++;
				
				if( rasterAngleAmount == nextAmount && rasterHeight == nextHeight && rasterBlockOffset == nextBlock )
				{
					// Ready to switch to the next pattern
					patternNumber = patternNumber == rasterSetHeight.length - 1 ? 0 : patternNumber + 1;
	
					nextAmount = rasterSetAmount[ patternNumber ];
					nextHeight = rasterSetHeight[ patternNumber ];
					nextBlock = rasterSetBlock[ patternNumber ];
					raster_state = state_running;
					
					raster_frameNumber = 0;
				}
				break;
		}
	}

	raster_process(); // Do the math calculation for the sine scrolling
	
}

// Setting values - i had all these on a form, so you could change values manually.
function rasterGo(){ raster_go = true };
function rasterStop(){ raster_go = false };
function rasterDemo( p_Flag ){ raster_doPatterns = p_Flag };

function setHeight( pHeight ) {	rasterHeight = parseInt( pHeight );	}
function setBlockOffset( pHeight ) { rasterBlockOffset = parseInt( pHeight );	}
function setAngle( pHeight ) { rasterAngleAmount = parseInt( pHeight );	}

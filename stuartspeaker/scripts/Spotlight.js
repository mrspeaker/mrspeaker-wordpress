/*
	Spotlight v1.0
	by Mr Speaker. 
	Last Modified 16th June 2008
	
	Covers a container with a "mask" and reveals part of the underlying content using an alpha PNG file.
	Requires a DIV element(name set in constants) and an alpha PNG (name set in constants).
	Run with: Spotlight.Init() after div has been loaded.
*/
var Spotlight = {
			
	/* Constants */
	CANVAS_HEIGHT : 500,
	CANVAS_WIDTH : 450,
	SQUARE_SIZE : 100,
	HALF_SQUARE : 50,	
	MASK_COLOUR : "#fff",
	CONTAINER_DIV_NAME : "mask_container",
	ANIM_IMAGE : "/images/white.png",
	
	/* DOM element holders */
	Masks : [],
	Light : null,
	Container : null,
	
	/* Member fields */
	containerPosArray : null,
	
	Init : function()
	{
		// Set up DOM elements
		if( !document.getElementById( this.CONTAINER_DIV_NAME ) ) return;
		
		// Set up the Container div (must be relatively positioned)
		this.Container = document.getElementById( this.CONTAINER_DIV_NAME );
		this.Container.style.position = "relative";
		this.Container.style.display = ""; /*un-hiding it. Hidden incase no js on page*/
		this.Container.style.width = ( this.CANVAS_WIDTH ) + "px";
		this.Container.style.height = ( this.CANVAS_HEIGHT ) + "px";
		this.Container.onmousemove = this.UpdateFromMouseCoords;
		
		// Add the "Light"
		this.Light = document.createElement( "img" );
		this.Light.src = this.ANIM_IMAGE;
		this.Light.style.position = "absolute";
		this.Container.appendChild( this.Light );
		
		// Get container DIV position (left and right offset on screen)
		this.containerPosArray = this.FindDomObjectPosition( this.Container );			
					
		for( var i = 0; i < 4; i++ )
		{
			var MaskDiv = document.createElement( "div" );
			MaskDiv.style.position = "absolute";
			MaskDiv.style.width = "100%";
			MaskDiv.style.backgroundColor = this.MASK_COLOUR;
			this.Container.appendChild( MaskDiv );
			this.Masks.push( MaskDiv );
		}
		
		// Set flanking mask heights
		this.Masks[ 1 ].style.height = this.Masks[ 2 ].style.height = ( this.SQUARE_SIZE ) + "px";
		
		// Set initial mask values
		this.UpdateMask( 0, 0 );
	},

	UpdateMask : function( posx, posy )
	{
		// Set area bounds
		if( posx < this.HALF_SQUARE ) posx = this.HALF_SQUARE;
		if( posx > this.CANVAS_WIDTH - this.HALF_SQUARE ) posx = this.CANVAS_WIDTH - this.HALF_SQUARE;
		if( posy < 0 ) posy = 0;
		if( posy > this.CANVAS_HEIGHT - this.SQUARE_SIZE ) posy = this.CANVAS_HEIGHT - this.SQUARE_SIZE;
		
		// Update the "light" png
		this.Light.style.top = ( posy ) + "px";
		this.Light.style.left = ( posx - this.HALF_SQUARE ) + "px";
		
		// Update the top & bottom mask borders
		this.Masks[ 0 ].style.height = ( posy ) + "px";
		this.Masks[ 3 ].style.top = ( posy + this.SQUARE_SIZE ) + "px";
		this.Masks[ 3 ].style.height = ( this.CANVAS_HEIGHT - ( posy + this.SQUARE_SIZE ) ) + "px";
		
		// Update the left & right  mask borders
		this.Masks[ 1 ].style.top = this.Masks[ 2 ].style.top = ( posy ) + "px";
		this.Masks[ 1 ].style.width = ( posx - this.HALF_SQUARE ) + "px";		
		this.Masks[ 2 ].style.width = ( this.CANVAS_WIDTH - ( posx + this.HALF_SQUARE ) ) + "px";
		this.Masks[ 2 ].style.left = ( posx + this.HALF_SQUARE ) + "px";
	},
	
	/* Mouse and DOM Helper methods from Quirksmode.org */
	UpdateFromMouseCoords : function( e )
	{
		var posx = posy = 0;
		if (!e) var e = window.event;
		if (e.pageX || e.pageY)
		{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	
		{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		
		// Update the Masks
		Spotlight.UpdateMask( 
			posx - Spotlight.containerPosArray[ 0 ] - 20, 
			posy - Spotlight.containerPosArray[ 1 ] - 60 
		);
	},
	
	FindDomObjectPosition : function( obj )
	{
		var curleft = curtop = 0;
		if ( obj.offsetParent ) 
		{
			do 
			{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while ( obj = obj.offsetParent );
			
			return [ curleft, curtop ];
		}
	},
	
	ShowMasks : function( onoff )
	{
		var cols = [ "#9c998a", "#ed4c4c", "#f26f2e", "#d1ceba" ];
		for( var i = 0; i < 4; i++ )
		{
			this.Masks[ i ].style.backgroundColor = onoff ? cols[ i ] : this.MASK_COLOUR;
		}
	}
}
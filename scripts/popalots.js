/*

 */
var pop_alot = [];
var pop_alot_img = [];

//=====================================
function cPopper( name, img, xOff, yOff, pushFlag )
//=====================================
{
	this.name = name;
	this.img = img;
	this.imgIndex = 0;
	this.currFrame = 0;
	this.maxFrames = 20;
	this.running = false;
	this.x;
	this.y;
	this.xOff = xOff;
	this.yOff = yOff;
	this.domRef;
	if ( pushFlag )
	{
		pop_alot.push( this );
		var popImage = new Image();
		popImage.src = this.img;
		pop_alot_img.push( popImage );
		this.imgIndex = pop_alot.length - 1;
	}
}

//================================================
function pop_addOn( p_DisplayHtml, p_name, p_img, xOff, yOff )
//================================================
{
	var tempPopper = new cPopper( p_name, p_img, xOff, yOff, true );
	document.write( "<span class='popple_" + p_name + "'>" + p_DisplayHtml + "</span>" );
	return tempPopper;
}

//===========================
function pop_setPopperSpans()
//===========================
{
	var spans = document.getElementsByTagName( "span" );

	for ( i = 0; i < spans.length; i++ )
	{
		if ( spans[ i ].className.substring(0, 6) == "popple" )
		{
			EventManager.Add( spans[i], "mouseover", pop_mousedOver );
		}
	}
}

//==========================
function pop_mousedOver( e )
//==========================
{
	var target = e.target ? e.target : e.srcElement;
	var popName = target.className.substring( 7, target.className.length );
	
	for ( var i = 0; i < pop_alot.length; i++ )
	{
		if ( pop_alot[ i ].name == popName )
		{
			if ( ! pop_alot[ i ].running ) pop_alot[ i ].running = true;
			pop_alot[ i ].x = pop_alot[ i ].xOff + ( e.pageX ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) );
			pop_alot[ i ].y = pop_alot[ i ].yOff + ( e.pageY ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) );
			break;
		}
	}
}

//=================
function popalots()
//=================
{
	// Called every 100ms from the MrSpeaker timer
	for ( var i = 0; i < pop_alot.length; i++ )
		if ( pop_alot[ i ].running ) popalot( i );
}

//===================
function popalot( i )
//===================
{
	var thePop = pop_alot[ i ];
	
	if ( thePop.currFrame++ == 0 )
	{
		// Add the div
		thePop.running = true;
		var theDiv = document.createElement( "div" );
		theDiv.setAttribute( "id", "pop_" + thePop.name );
		theDiv.style.position = "absolute";
		theDiv.innerHTML = "<img src='" + thePop.img + "' />";
		theDiv.style.left = thePop.x +  "px";
		theDiv.style.top = thePop.y + "px";
		
		document.body.appendChild( theDiv );	
		thePop.ref = document.getElementById( "pop_" + thePop.name );
	}
	else
	{
		//thePop.ref.style.top = ( Math.floor( Math.random() * 300 ) - 150 ) + "px";
	}
	
	if ( thePop.currFrame >= thePop.maxFrames )
	{
		thePop.currFrame = 0;
		thePop.running = false;
		thePop.ref.parentNode.removeChild( thePop.ref );
	}
	
}

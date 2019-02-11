var DomHelper = {};
DomHelper.fx = {};

DomHelper.toggle = function( element1, element2 )
{
	element1.style.display = "";
	element2.style.display = "none";
}

DomHelper.getElementsByTagAndClassName = function( tagName, className )
{
	var tagElements = document.getElementsByTagName( tagName );
	var classElements = [];
	
	var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
	
	for( i = 0; i < tagElements.length; i++ )
	{
		if ( pattern.test( tagElements[ i ].className ) ) 
			classElements.push( tagElements[ i ] );
	}
	return classElements;
}

DomHelper.fx.animate = function( el, opt )
{
	opt.duration = opt.duration ? opt.duration : 50;
	opt.speed = opt.speed ? opt.speed : 10;

	if( ( opt.currentTick = opt.currentTick ? opt.currentTick : 0 ) == 0 )
	{
		if( opt.onStart ) opt.onStart( el );
	}
		
	if( opt.currentTick++ < opt.duration ) 
	{
		if( opt.onUpdate ) opt.onUpdate( el, opt );
			
		setTimeout( function(){ DomHelper.fx.animate( el, opt ) }, opt.speed );
		return;
	}

	if( opt.onEnd ) opt.onEnd(el);
}

DomHelper.createElement = function( elementType, attributes, styles )
{
	var el = document.createElement( elementType );
	for( var attr in attributes ) el[ attr ] = attributes[ attr ];  
	for( var attr in styles ) el.style[ attr ] = styles[ attr ];  
	
	return el;
}

DomHelper.addEventListener = function( el, eventName, functionName )
{
	if ( el.addEventListener ) el.addEventListener( eventName, functionName, false ); // W3C listeners
	else if ( el.attachEvent ) el.attachEvent( "on" + eventName, functionName ); // IE
}

DomHelper.removeEventListener = function( el, eventName, functionName )
{
	if ( el.addEventListener ) el.removeEventListener( eventName, functionName, false );
	else if ( el.attachEvent ) el.detachEvent( "on" + eventName, functionName );
}


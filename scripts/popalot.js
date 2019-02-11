var popalot_images = [];

//=======================--------------------------------		
function popalots_setup()
//=======================
{
	var spans = document.getElementsByTagName( "span" );
	for ( i = 0; i < spans.length; i++ )
	{
		if ( spans[ i ].className == "popalot" )
		{
			EventManager.Add( spans[ i ], "mouseover", popalots_moused );
			
			// Preload the image to show
			var popImage = new Image();
			popImage.src = spans[ i ].id.split("_")[ 0 ].replace(/\|/g, "/");
			popalot_images.push( popImage );
		}
	}

}

//===========================---------------------------
function popalots_moused( e )
//===========================
{
	var target = e.target ? e.target : e.srcElement;
	var popDivId = target.id;
	var popDiv;

	if ( ( popDiv = document.getElementById( "pop_" + popDivId ) ) == null )
	{
		// Set the div parameters
		var popParams = popDivId.split( "_" );
		var popName = popParams[ 0 ];
		var popTime = popParams[ 1 ];
		var popX = parseInt( popParams[ 2 ] ) + ( e.pageX ? e.pageX : e.clientX + ( document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ) );
		var popY = parseInt( popParams[ 3 ] ) + ( e.pageY ? e.pageY : e.clientY + ( document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ) );
		
		// Setup the popup div
		popDiv = document.createElement( "div" );
		popDiv.setAttribute( "id", "pop_" + popDivId );
		popDiv.style.position = "absolute";
		popDiv.innerHTML = "<img src='" + popName.replace(/\|/g, "/") + "' />";
		popDiv.style.left = popX + "px";
		popDiv.style.top = popY + "px";

		document.body.appendChild( popDiv );	
		setTimeout( "popalota_kill('pop_" + popDivId + "')", popTime * 1000 );
	}	
}

//================================---------------------
function popalota_kill( popDivId )
//================================
{
	var popDiv = document.getElementById( popDivId );
	if ( popDiv ) popDiv.parentNode.removeChild( popDiv );
}

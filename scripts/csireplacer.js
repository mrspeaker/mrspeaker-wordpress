var CSIReplacer = {
	
	charWidth: 16,
	charHeight: 16,
	charsPerLine: 16,
	verticalPixelOffset: 0,
	charSetFile: "/images/quakeCharset.gif",
	thinWidth: 10,
	thinLeftGap: 3,
	
	replace : function( tagName, charsetOffset ) 
	{
		var replacers = document.getElementsByTagName( tagName );
		
		this.verticalPixelOffset = charsetOffset * this.charHeight;

		for( i = 0; i < replacers.length; i++ )
		{
			replacers[ i ].style.textIndent = "-9999px"; 	// Image replacement for tag			
			replacers[ i ].style.margin = "0";				// Put this in the stylesheet to get rid of the "fouc"
			
			var imgHeader = document.createElement( "div" ); // div to hold characters
			var textToReplace = replacers[ i ].firstChild.nodeValue; // Get the text
			
			for( j = 0; j < textToReplace.length; j++ )
			{
				var ch = textToReplace.charAt( j ).charCodeAt() - 32; // Get the character index
				var isThinChar = ( ch == 73 || ch == 41 || ch == 0 ) ? true : false;	// dodgy see-if-its-a-"thin"-character
				
				var d = document.createElement( "div" );	// Create each letter div
				d.setAttribute( "style", "float:left;" );
				d.style.styleFloat = "left";
				d.style.backgroundImage = "url(" + this.charSetFile + ")";
				d.style.height = ( this.charHeight ) + "px";			// Set height and width of character
				d.style.width = ( isThinChar ? this.thinWidth : this.charWidth ) + "px";
				d.style.backgroundColor = "green";
				d.style.backgroundPosition = "-" + ( ( ( ch % this.charsPerLine ) * this.charWidth ) + ( isThinChar ? this.thinLeftGap : 0 ) ) + "px " + 
											 "-" + ( ( Math.floor( ch / this.charsPerLine ) * this.charHeight ) + ( this.verticalPixelOffset ) ) + "px";
				
				d.style.fontSize = "1px"; // for IE.
				d.innerHTML = "<!-- -->";
				
				imgHeader.appendChild( d );
			}
			replacers[ i ].parentNode.insertBefore( imgHeader, replacers[ i ] );
		}
	}
}

function doCSIReplace()
{
	CSIReplacer.replace( "h2", 10 );
	CSIReplacer.replace( "h3", 2 );
}
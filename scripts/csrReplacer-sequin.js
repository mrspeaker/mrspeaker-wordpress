var CSIReplacer = {
				
	charWidth: 16,
	charHeight: 16,
	charsPerLine: 16,
	verticalPixelOffset: 0,
	charSetFile: "/images/sequins/sequinFont2.gif",
	thinWidth: 8,
	thinLeftGap: 4,
	
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
			
			var d = document.createElement( "div" );	// Create each letter div
			d.setAttribute( "style", "float:left;" );
			d.style.styleFloat = "left";
			d.style.backgroundImage = "url(" + this.charSetFile + ")";
			d.style.height = ( this.charHeight ) + "px";			// Set height and width of character
									
			d.style.fontSize = "1px"; // for IE.
			d.innerHTML = "<!-- -->";
			
			for( j = 0; j < textToReplace.length; j++ )
			{
				var ch = textToReplace.charAt( j ).charCodeAt() - 32; // Get the character index
				var isThinChar = ( ch == 73 || ch == 41 || ch == 14 || ch == 7 || ch == 0 ) ? true : false;	// dodgy see-if-its-a-"thin"-character

				var dCopy = d.cloneNode( true );
				dCopy.style.width = ( isThinChar ? this.thinWidth : this.charWidth ) + "px";
				dCopy.style.backgroundPosition = "-" + ( ( ( ch % this.charsPerLine ) * this.charWidth ) + ( isThinChar ? this.thinLeftGap : 0 ) ) + "px " + 
										 "-" + ( ( Math.floor( ch / this.charsPerLine ) * this.charHeight ) + ( this.verticalPixelOffset ) ) + "px";

				imgHeader.appendChild( dCopy );
				
			}
			replacers[ i ].parentNode.insertBefore( imgHeader, replacers[ i ] );
		}
	}
}	

function CSIReplacerGo()
{
	CSIReplacer.replace('h4', 0);
}

MrSpeakerOnload.add( CSIReplacerGo );
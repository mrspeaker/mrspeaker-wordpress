var ListDeleter = 
{
	deleteClassName : "deleteable",
	activeLink : null,

	onLoad : function()
	{
		// Dodgy hide row using page query string
		//if( parseInt( location.search.charAt( location.search.length - 1 ) ) > 0 ) 
		//	document.getElementById( "row" + location.search.charAt( location.search.length - 1 ) ).style.display = "none";

		// Add our Warning link to all delete links
		var links = DomHelper.getElementsByTagAndClassName( "a", ListDeleter.deleteClassName );
		for( var i = 0; i < links.length; i++ )
		{
			var FakeDel = DomHelper.createElement( "a", { id:"FakeDel" + i, href:"javascript:void(0);", className:"fakeDel" }, { cursor:"pointer" } );
			DomHelper.addEventListener( FakeDel, "click", ListDeleter.onArm );
			
			links[ i ].parentNode.insertBefore( FakeDel, links[ i ] ); // insert the WarningLink
			DomHelper.toggle( FakeDel, links[ i ] ); // Hide the delete link.
		}
	},
					
	onArm : function( e )
	{					
		var target = e.target ? e.target : e.srcElement;
		target.blur();
		
		DomHelper.fx.animate( target, 
		{
			duration: 30,
			onStart: function( _this ){ _this.className = "fakeDelInAction"; },
			onUpdate: function( _this, options )
			{
				var ease = Math.round( Math.pow( options.currentTick / ( options.duration / 4 ), 2.2 ) + 16 );
				_this.style.backgroundPosition = "0 -" + ease + "px";														
			},
			onEnd: function( _this )
			{ 
				_this.className = "fakeDel";
				ListDeleter.onArmComplete( _this );
			}
		} );
	},				
	
	onArmComplete : function( _this )
	{
		if( ListDeleter.activeLink )
			DomHelper.toggle( ListDeleter.activeLink.previousSibling, ListDeleter.activeLink ); // Reset already active link (if 2 at once)
						
		DomHelper.toggle( _this.nextSibling, _this ); // Show the REAL delete link
		//_this.nextSibling.focus(); //Should do this for accessiblity- buuut, that stupid dotted border thingo! ugly!
		ListDeleter.activeLink = _this.nextSibling;
		DomHelper.addEventListener( document.body, "click", ListDeleter.onDisarm ); // Add next click "disarm" handler
	},
	
	onDisarm : function( e )
	{
		var target = e.target ? e.target : e.srcElement;
		if( target.className != ListDeleter.deleteClassName && ListDeleter.activeLink )
		{
			DomHelper.toggle( ListDeleter.activeLink.previousSibling, ListDeleter.activeLink ); // Reset armed link
			ListDeleter.activeLink = null;
		}
		DomHelper.removeEventListener( document.body, "click", ListDeleter.onDisarm ); // Remove window click handler
	}

}


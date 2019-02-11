	var stars = null;
	function cStar()
	{
		this.x;
		this.y;
		this.id;
		this.visible;
		this.speed = 2;
		this.hexrgb;
		this.html = ".";
	}
	
	function cStarfield( pDivName, pNumStars )
	{
		this.errorText = "";
		this.error = false;
		
		this.divName = pDivName;
		this.div = null;
		this.width = 0;
		this.height = 0;
		
		this.starsNum = ( isNaN( parseInt( pNumStars ) ) || pNumStars < 1 ) ? 20 : pNumStars;
		this.starsArray = Array();
		
		if ( this.checkSetup() )
		{
			this.setupStars();
		}
		
	}
	cStarfield.prototype = 
	{
		updateStars : function()
		{
			var curStar;
			for( i = 0; i < this.starsNum; i++ )
			{
				curStar = this.starsArray[ i ];
				curStar.x-= curStar.speed;
				if ( curStar.x <= -2 )
				{
					curStar.x = this.width - 3;
					curStar.y = Math.floor( Math.random() * this.height ) - ( this.height / 2 );
				}
				document.getElementById( curStar.id ).style.left = curStar.x + "px";
				document.getElementById( curStar.id ).style.top = curStar.y + "px";
			}
		},

		setupStars : function()
		{
			var one = Math.floor( this.starsNum / 3 ) + 1;
			for( i = 0; i < this.starsNum; i++ )
			{
				aStar = new cStar();
				aStar.x = Math.floor( Math.random() * this.width );
				aStar.y = Math.floor( Math.random() * this.height ) - ( this.height / 2 );
				aStar.id = "star" + i;
				if ( i < one )
				{
					aStar.hexrgb = "#555";
					aStar.speed = 0.5;
				}
				else if ( i > one && i < ( one * 2 ) )
				{
					aStar.hexrgb = "#777";
					aStar.speed = 1;
				}
				else
				{
					aStar.hexrgb = "#999";
					aStar.speed = 2;
				}
				
				this.starsArray.push( aStar );
				var tmpHTML = "<div id='" + aStar.id + "' style='color:" + aStar.hexrgb + ";position:absolute;top:" + aStar.y + "px;left:" + aStar.x + "px'>" + aStar.html + "</div>";
				this.div.innerHTML += tmpHTML;
			}
//			alert( this.div.innerHTML );
		},

		checkSetup : function() 
		{
			// Check div set up
			if( document.getElementById( this.divName ) )
			{
				this.div = document.getElementById( this.divName );
				this.width = parseInt( this.div.style.width );
				this.height = parseInt( this.div.style.height );
				if ( isNaN( this.width ) || isNaN( this.height ) || this.width <= 0 || this.height <= 0 )
				{
					this.errorText += "Div " + this.divName + " does not have width and height specified as a style.";
					this.error = true;
				}
			}
			else
			{
				this.error = true;
				if ( this.divName.length == 0 )
					this.errorText += "No div name specified in constructor\n";
				else
					this.errorText += "No div exists on page with id: " + this.divName + "\n";
			}
			
			if ( this.error )
			{
				this.errorText = "cStarfield: Starfield error\n" + this.errorText;
				alert( this.errorText );
				return false;
			}
			else
			{
				return true;
			}
				
		}
	}
	function starfield_init()
	{
		stars = new cStarfield( "fieldDiv", 14 );
	}

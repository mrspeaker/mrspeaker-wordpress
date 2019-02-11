	function Person()
	{
		this.imgId;
		this.width;
		this.height;
		this.left;
		this.top;
		
		this.animating = 0; //0=stopped 1=getting bigger 2=getting smaller
		this.currentHeight;
		this.currentWidth;
		this.currentLeft;
		this.currentTop;
		
		this.animCount = 0;
		this.animStep = 0;
	}
	
	var people = new Array( 5 );
	people[0] = new Person();
	people[0].imgId = "mrt_img";
	people[0].width = 128;
	people[0].height = 143;
	people[0].left = 10;
	people[0].top = 180;
	
	people[1] = new Person();
	people[1].imgId = "oliv_img";
	people[1].width = 150;
	people[1].height = 152;
	people[1].left = 130;
	people[1].top = 180;
	
	people[2] = new Person();
	people[2].imgId = "sally_img";
	people[2].width = 126;
	people[2].height = 128;
	people[2].left = 135;
	people[2].top = 320;
	
	people[3] = new Person();
	people[3].imgId = "fonz_img";
	people[3].width = 128;
	people[3].height = 165;
	people[3].left = 10;
	people[3].top = 20;
	
	people[4] = new Person();
	people[4].imgId = "merth_img";
	people[4].width = 130;
	people[4].height = 128;
	people[4].left = 55;
	people[4].top = 320;
	
	people[5] = new Person();
	people[5].imgId = "fatkid_img";
	people[5].width = 128;
	people[5].height = 148;
	people[5].left = 180;
	people[5].top = 440;
	
	function DivLine( p_id, p_dest, p_top, p_left, p_height, p_width )
	{
		this.divId = p_id;
		this.top = p_top;
		this.left = p_left;
		this.width = p_width;
		this.height = p_height;

		this.draw = function( p_dest )
		{
			var style = "";
			style = "z-index:-1;position:absolute;top:" + this.top + "px;left: " + this.left + "px;width:" + this.width + "px;height:" + this.height +"px;border:1px solid;background-color:#066;";
			
			document.getElementById( p_dest ).innerHTML += "<div style='" + style + "' id='" + this.divId + "'></div>";
		}
		this.draw( p_dest );
	}
	
	
	function doFamilyTree()
	{
		for ( i = 0; i < people.length; i++ )
		{
			var img = document.getElementById( people[ i ].imgId );
			img.style.position = "absolute";
			img.style.border = "1px solid";
			img.style.backgroundColor = "#e6e6e6";
			img.width = people[ i ].width / 2;
			img.height = people[ i ].height / 2;
			img.style.left = people[ i ].left;
			img.style.top = people[ i ].top;
		}
		new DivLine( "aLine", "familyTree", 50, 40, 150, 2 );
		new DivLine( "aLine2", "familyTree", 220, 50, 2, 100 );
		new DivLine( "aLine3", "familyTree", 220, 100, 100, 2 );
		new DivLine( "aLine4", "familyTree", 220, 170, 100, 2 );
		new DivLine( "aLine5", "familyTree", 150, 240, 100, 2 );
		new DivLine( "aLine6", "familyTree", 350, 190, 2, 52 );
		new DivLine( "aLine7", "familyTree", 60, 240, 290, 2 );
		new DivLine( "aLine8", "familyTree", 60, 70, 2, 170 );
		new DivLine( "aLine9", "familyTree", 350, 220, 100, 2 );
		
	}
	
	function animStart( p_indexes )
	{
		var indexArray = p_indexes.split("|");
		for( i = 0; i < indexArray.length; i++ )
		{
			if ( people[ indexArray[ i ] ].animating == 0 )
			{
				people[ indexArray[ i ] ].animating = 1;
				people[ indexArray[ i ] ].animCount = 0;
				people[ indexArray[ i ] ].animStep = 1;
				people[ indexArray[ i ] ].currentWidth = people[ indexArray[ i ] ].width  / 2;
				people[ indexArray[ i ] ].currentHeight = people[ indexArray[ i ] ].height  / 2;
				people[ indexArray[ i ] ].currentTop = people[ indexArray[ i ] ].top;
				people[ indexArray[ i ] ].currentLeft = people[ indexArray[ i ] ].left;
			} 
		}
	}
	
	var animTimer = null;
	var frameNumber = 0;
	var step = 8;	
	function animate( p_Frame )
	{
					
		clearTimeout( animTimer );
		
		for( i = 0; i < people.length; i++ )
		{
			if ( people[ i ].animating != 0 )
			{
				var curImg = document.getElementById( people[ i ].imgId );
				
				/* Re-do proper slack-arse.... */
				switch ( people[ i ].animCount % 2 )
				{
					case 0:
						// Getting bigger
						curImg.width = people[ i ].currentWidth += step;
						curImg.height = people[ i ].currentHeight += step;
						curImg.style.top = people[ i ].top -= step / 2;
						curImg.style.left = people[ i ].left -= step / 2;
						
						if ( people[ i ].currentWidth >= people[ i ].width * people[ i ].animStep )
						{
							people[ i ].animCount++;
							people[ i ].animStep /= 1.4;
						}
						
						break;
						
					case 1:
						// Getting smaller
						curImg.width = people[ i ].currentWidth -= step;
						curImg.height = people[ i ].currentHeight -= step;
						curImg.style.top = people[ i ].top += step / 2;
						curImg.style.left = people[ i ].left += step / 2;							
							
						if ( people[ i ].currentWidth <= people[ i ].width / 2 )
						{
							/// All done, reset...
							curImg.width = people[ i ].width / 2;
							curImg.height = people[ i ].height / 2;
							curImg.style.top = people[ i ].top;
							curImg.style.left = people[ i ].left;
								
							people[ i ].animCount++;
						}
						break;
				}
				if ( people[ i ].animCount == 8 )
				{
					people[ i ].animating = 0;
				}
			}
		}
		animTimer = setTimeout( 'animate(' + p_Frame + ')', 50 );
	}

doFamilyTree();

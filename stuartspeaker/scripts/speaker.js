$(document).ready( function(){	
	
	var yrTotal = psTotal = 0;
	$( "#archives li" ).each( function(){
		var match = $(this).text().match(/([0-9]+).+\(([^)]*)\)/, "");
		if(match.length != 3) return true;
		yrTotal += parseInt( match[ 1 ], 10 );
		psTotal += parseInt( match[ 2 ], 10 );
	});
	$( "#arcYear" ).text( yrTotal );
	$( "#arcTot" ).text( psTotal );
	
});

$( window ).load( function(){

	bubbleController.init();
	setInterval( "bubbleController.update()", 200 ); 
	
	$( window ).resize(function(){
		bubbleController.setBoundaries();
	});	
	
	if( $( ".leftcolumn" ).length )
	{
		//main page
		var leftColumn = parseInt( $( ".leftcolumn" ).height(), 10 );
		var rightColumn = parseInt( $( ".rightcolumn" ).height(), 10 );
		/* Going to add extra stuff if the columns are uneven */
	}
	else{
		swapTwitterPix();
	}
});

function swapTwitterPix(){
	$(".twitter li").each(function(){
		var listItem = this;
		var user = $(this).find(".twitter-user:first");

		if(user.text() === "") return true;

		// = "mrspeaker";
		$.getJSON('http://twitter.com/users/show/'+ (user.text().replace('@', ''))+'.json?callback=?', function(data){ 
			if(!data || !data.profile_image_url || data.profile_image_url === ""){
				return;
			}
			$("<img />").attr("src", data.profile_image_url).addClass("twitter_with").insertBefore($(listItem).find("img:first"));
			$(listItem).find("img:eq(1)").addClass("lil");
		});
		
		return true;
	});
}

var bubbleController = {
	bubbles : [],
	colours :  [ "green", "yellow", "purple" ],
	screenWidth : 0,
	leftEdge : 0,
	rightEdge : 0,
	channelWidths : [],
	minBubbleWidth : 10,
	maxBubbleWidth : 100,
	
	init : function(){
		this.setBoundaries();
		$("<div></div>").attr("id", "bubbleContainer").appendTo( $("body") );
		for( var i = 0; i < 18; i++ ) {
			var side = ( i % 2 === 0 ) ? 1 : 0;
			var bub = new bubble();
			this.bubbles.push( bub );
			var width = Math.floor( Math.random() * this.maxBubbleWidth ) + this.minBubbleWidth;
			bub.init(
				this.getXPos( side ),
				Math.floor( Math.random() * 800 ),
				side,
				this.colours[ Math.floor( Math.random() * this.colours.length ) ],
				width,
				Math.floor( ( ( ( this.maxBubbleWidth + this.minBubbleWidth ) - width ) / 8 ) / 5 ) + 1,
				"#bubbleContainer" );
		}	
	},
	getXPos : function( blnLeftOrRight ) {
		var xpos = ( Math.random() * this.channelWidths[ blnLeftOrRight ] );// + ( this.maxBubbleWidth / 2 );
		return Math.floor(  xpos / ( this.channelWidths[ blnLeftOrRight ] ) * 100 );
	},
	setBoundaries : function() {
		this.screenWidth = $("body").width();
		this.leftEdge = $("#outerWrapper").position().left;
		this.rightEdge = this.leftEdge + 1040;
		
		this.channelWidths[ 0 ] = this.leftEdge;
		this.channelWidths[ 1 ] = this.screenWidth - this.rightEdge;
	},
	update : function() {
		$.each( this.bubbles, function() {
			this.update();
		});
	}
};

function bubble(){
	this.domRef;
	this.diameter;
	this.x;
	this.xPerc;
	this.y;
	this.side;
	this.colour;
	this.speed;
	
	this.init = function( x, y, side, colour, diameter, speed, addToElement ){
		this.side = side;
		this.xPerc = x;
		this.y = y;
		this.speed = speed;
		this.colour = colour;
		this.diameter = diameter;
		this.domRef = $("<div></div")
			.addClass( "bubble" )
			.css("top", this.y )
			.css("left", this.getXPos() )
			.appendTo( $( addToElement ) );
			//.css("z-index", "-1")
			
		var img = $( "<img></img>" )
				.attr("src", baseUrl + "/images/circle_" + this.colour + "_des.png" )
				.attr("height", this.diameter )
				.css( "opacity", "0.5" )
				.hide()
				.appendTo( this.domRef )
				.load(function(){
					$(this).fadeIn( 20000 );
				});
	};
	
	this.getXPos = function() {
		this.x = ( bubbleController.channelWidths[ this.side ] * ( this.xPerc / 100 ) ) - ( this.diameter / 2 );
		this.x += this.side == 1 ? bubbleController.rightEdge : 0;
		return this.x;
	};
	
	this.update = function() {
		this.y -= this.speed;
		this.x = this.getXPos();
		if( this.y < -this.diameter ) {
			this.y = 800;
			this.xPerc =  bubbleController.getXPos( this.side );
			this.x = this.getXPos();
			this.fireFadeIn();
		}
		this.updateDom();
	};
	
	this.updateDom = function() {
		this.domRef
			.css("top", this.y )
			.css("left", this.x );
	};
	
	this.fireFadeIn = function() {
		this.domRef
			.hide()
			.fadeIn( 10000 );
	};
}

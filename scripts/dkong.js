var barrelLeft = 720;
var marioLeft = 33;
var dk_mario;

var marioImages = new Array( 4 );

function dkong_init()
{
	for( i = 0; i < marioImages.length; i++ )
	{
		marioImages[ i ] = new Image();
	   	marioImages[ i ].src = "/images/dkong/dkong_mar" + ( i + 1 ) + ".gif";
	}

	/*var dk_bonus = document.getElementById("dk_bonus");
	dk_bonus.style.position = "absolute";
	dk_bonus.style.top = "5px";
	dk_bonus.style.left = "10px";
	dk_bonus.innerHTML = "<img src=\"/images/dkong/dkong_bonus.gif\">";*/
	
	var dk_line = document.getElementById( "dk_line" );
	dk_line.innerHTML += "<img src=\"/images/dkong/dkong_girdLongGrey.gif\">";		
	dk_line.style.position = "absolute";
	dk_line.style.top = "242px";
	dk_line.style.left = "0px";

	var dk_oil = document.getElementById("dk_oil");
	dk_oil.style.position = "absolute";
	dk_oil.style.top = "211px";
	dk_oil.style.left = "10px";
	dk_oil.innerHTML = "<img src=\"/images/dkong/dkong_oil1.gif\">";
	
	/*var dk_bar = document.getElementById( "dk_bar" );
	dk_bar.style.position = "absolute";
	dk_bar.style.top = "232px";
	dk_bar.style.left = barrelLeft + "px";
	dk_bar.innerHTML = "<img src=\"/images/dkong/dkong_bar.gif\">";
	*/
	
	dk_mario = document.getElementById( "dk_mario" );
	dk_mario.style.position = "absolute";
	dk_mario.style.top = "226px";
	dk_mario.style.left = marioLeft + "px";
	dk_mario.innerHTML = "<img name=\"marman\" src=\"/images/dkong/dkong_mar1.gif\">";
	
}

function dkong_update()
{
	var dk_bar = document.getElementById( "dk_bar" );

	barrelLeft -= 5;
	dk_bar.style.left = barrelLeft + "px";
	
	
	if ( barrelLeft < 45 && barrelLeft > 30 )
	{
		dk_mario.style.top = "214px";
		document["marman"].src = marioImages[ 3 ].src;
	}

	if ( barrelLeft < 25 ) 
	{
		dk_mario.style.top = "226px";
		document["marman"].src = marioImages[ 0 ].src;
	}
		
	if ( barrelLeft < 20 ) barrelLeft = 720;
	
}

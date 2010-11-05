var thirtyseven = {
	canvas_el: "canvas37",
	canvas : null,
	canvas_height : 40,
	canvas_width : 450,
	data : [],
	colours : [ "#ccc", "#e300ff", "#555", "#777","#00BFFF", "#aaa", "#000" ],
	init: function(){
		this.canvas = Raphael( this.canvas_el, this.canvas_width, this.canvas_height );
		this.getData( this.draw );				
	},
	getData : function( callback ){
		var _this = this;
		$.ajax({
			url: template_directory_path + "/scripts/37.html",
			type: "GET",
			dataType: "html",
			success: function( data ){
				_this.data = [];
				var rscript = /<script(.|\s)*?\/script>/g; // ripped from jQ's load
				$("<div />")
					.append( data.replace( rscript, "" ) )
					.find( ".listing")
					.each( function(){
						_this.data.push("xxxxx6"); // Section marker
						$(this).find("tbody tr").each(function(){
							_this.data.push( $(this).attr( "class" ) );
						});
					});
				if( callback ){
					callback.call( _this );
				}
			}
		});
		
	},
	draw : function(){
		var _this = this;
		var canvas = _this.canvas;
		$.each(_this.data, function( i ){
			var xOff = 0, 
				yOff = 0, 
				lHeight = _this.canvas_height - 20,
				lWidth = 3;
			var col = _this.colours[ this[ 5 ] ]; // 6th char is colour number
			canvas.rect( xOff + ( i * lWidth ), yOff, 2, lHeight ).attr( { stroke: col, fill:col });
		});
		var attr = {font: '9px Fontin-Sans, Arial' };
		canvas.text( 0, 24, "component" ).attr({fill: this.colours[ 6 ], "text-anchor":"start"});
		canvas.text( 51, 24, "closed" ).attr({fill: this.colours[ 4 ], "text-anchor":"start"});
		canvas.text( 81, 24, "bugs" ).attr({fill: this.colours[ 1 ], "text-anchor":"start"});
		canvas.text( 104, 24, "enhancements" ).attr({fill: this.colours[ 0 ], "text-anchor":"start"});
	}
};
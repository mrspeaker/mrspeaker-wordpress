$(document).ready(function() {

	function addGitHubLolz(){
		$("<div></div>", {id: "githubble"}).appendTo("body");
		$("<div></div>", {id: "gitcommit"})
			.text("Not on GitHub!")
			.appendTo("#githubble");
	}

	function addYearTotalLolz() {
		var yrTotal = psTotal = 0;
		$( "#archives li" ).each( function(){
			var match = $(this).text().match(/([0-9]+).+\(([^)]*)\)/, "");
			if(match.length != 3) return true;
			yrTotal += parseInt( match[ 1 ], 10 );
			psTotal += parseInt( match[ 2 ], 10 );
		});
		$( "#arcYear" ).text( yrTotal );
		$( "#arcTot" ).text( psTotal );
	}

	function addGlitchLolz() {

		function glitch() {
			var man = Math.random() * 5 | 0;

			if (man < 3) {
				man = "";
			} else {
				man -= 1;
			}

			$("h1:first").css("background-image", "url(/images/mrman" + man + ".png)");

			setTimeout(function () {
				glitch();
			}, Math.random() * 2000 | 0);
		}
		setTimeout(glitch, 5000);

		[2, 3].map(function (i) {
			(new Image()).src = "images/mrman" + i + ".png";
		});

	}

	addYearTotalLolz();
	addGitHubLolz();
	addGlitchLolz();

});




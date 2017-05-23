/* global WavePanel jQuery */
(function($) {
  var API_SRC = "http://wave-api.appspot.com/public/embed.js";
  /*var WAVE_PANEL_SRC 	= "http://wave.google.com/a/wavesandbox.com/";
	var WAVE_ENDPOINT	= "wavesandbox.com!w+";*/

  var WAVE_PANEL_SRC = "https://wave.google.com/wave/";
  var WAVE_ENDPOINT = "googlewave.com!w+";

  $("<script>")
    .attr("type", "text/javascript")
    .attr("src", API_SRC)
    .appendTo("head")
    .ready(function() {
      setUp();
    });

  function setUp() {
    $.fn.wavey = function(waveID, options) {
      // Default options
      options = options || {};
      options.bgColor = options.bgColor || "transparent";
      options.color = options.color || "#000";
      options.font = options.font || "Arial";
      options.fontSize = options.fontSize || "12pts";

      // Verify and then execute the wave plugin
      if (this && this.length && this.length > 0 && waveID) {
        try {
          this.each(function() {
            // get our unique API endpoint for the wave
            var endpoint = WAVE_ENDPOINT + waveID;

            // load the wave panel
            const wavePanel = new WavePanel(WAVE_PANEL_SRC);
            wavePanel.loadWave(endpoint);
            wavePanel.setUIConfig(
              options.bgColor,
              options.color,
              options.font,
              options.fontSize
            );
            wavePanel.init(this, options.callback);
          });
        } catch (e) {
          throw "The Google Wave API threw an exception: \n\n" + e.message;
        }
      }

      return this;
    };
  }
})(jQuery);

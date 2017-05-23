/* global jQuery */

/*
	Do 1UP style notification
	version 0.1

	As inspired by Jeremy Keith post: http://adactio.com/journal/1626/
*/
(function($) {
  /*
 * Do a "1UP notification" on relative/absolute elements
 *
 * @name	oneUp
 * @param	options (optional)
 * - distance	distance (in pixels) to raise element while fading
 * - speed	time taken to fade out (jQuery times, or milliseconds)
 * @param	callback (optional)	function to call on completion
 * @author   Mr Speaker (http://www.mrspeaker.net/)
 * @example  $("#notificationSpan").oneUp();
 * @example  $("#notificationSpan").oneUp({speed:'fast', distance:50});
 * @example  $("#notificationSpan").oneUp(function(){alert('done!');});
 *
 */

  $.fn.oneUp = function(options, callback) {
    if ($.isFunction(options)) {
      callback = options;
      options = null;
    }
    const settings = jQuery.extend(
      {
        distance: 20,
        speed: "slow",
        callback: callback
      },
      options
    );

    return this.each(function() {
      $(this).show().animate({
        top: "-=" + settings.distance + "px",
        opacity: "toggle"
      }, settings.speed, function() {
        $(this).css({ top: "" }).hide(settings.callback);
      });
    });
  };
})(jQuery);

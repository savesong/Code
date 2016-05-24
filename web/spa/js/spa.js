'use strict';

/**
 * main module spa
 */
var spa = (function($) {
	var configMap = {
		extended_height: 434,
		extended_title: 'Click to retract',
		retracted_height: 16,
		retracted_title: 'Click to extend',
		template_html: '<div class="spa-slider"><\/div>'
	};
	var $chatSlider;

	// DOM method
	var toggleSlider = function() {
		var slider_height = $chatSlider.height();
		if (slider_height === configMap.retracted_height) {
			$chatSlider.animate({
				height: configMap.extended_height
			}).attr('title', configMap.extended_title);
			return true;
		} else if (slider_height === configMap.extended_height) {
			$chatSlider.animate({
				height: configMap.retracted_height
			}).attr('title', configMap.retracted_title);
			return true;
		}
		return false;
	};

	// Event handler
	var onClickSlider = function(e) {
		toggleSlider();
		return false;
	};

	// Public method
	var initModule = function($container) {
		$container.html(configMap.template_html);
		$chatSlider = $container.find('.spa-slider');
		$chatSlider.attr('title', configMap.retracted_title).click(onClickSlider);
		return true;
	};

	return {
		initModule: initModule
	};
})(window.jQuery);

jQuery(function() {
	spa.initModule(jQuery('#spa'));
});
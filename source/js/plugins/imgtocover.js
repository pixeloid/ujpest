$.fn.imgToCover = function (options) {
	var tout = null;
	var _this = this;

	var settings = $.extend({
		breakPoint: 640,
		disableAt: 0
	}, options);

	handler(true);

	function manipulateDom (action) {
		_this.each(function () {
			var $this = $(this);
			var parent = $this.parent();
			var src = $this.attr('src');

			if(action == "disable") {
				parent.css("background-image", "none");
				parent.removeClass('imgtocover');

				$this.show();
			} else {
				parent.css("background-image", "url(" + src + ")");  
				parent.addClass('imgtocover');

				$this.hide();
			}
		});
	}

	function handler (firstRun) {
		if($(window).width() < settings.breakPoint && $(window).width() > settings.disableAt) {
			manipulateDom(null);
		} else if (!firstRun) {
			manipulateDom("disable");
		}
	}

	$(window).resize(function () {
		clearTimeout(tout);
		tout = setTimeout(function () {
			handler(false);
		}, 100);
	});
};
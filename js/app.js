(Zepto(function ($) {
	var touchDemo = true,
		touchEnabled = ('createTouch' in document),
		tapEvent = (touchEnabled) ? 'tap' : 'click';

	if (touchEnabled) {
		/* Perform scrollfix */
		$(document)
			.on('touchmove', function (e) {
				if (!$(e.target).closest('.scrollable').length) {
					e.preventDefault();
				}
			})
			.on('.scrollable', 'touchstart', function () {
				var startTopScroll = this.scrollTop;

				if (startTopScroll <= 0) {
					this.scrollTop = 1;
				}

				if (startTopScroll + this.offsetHeight >= this.scrollHeight) {
					this.scrollTop = this.scrollHeight - this.offsetHeight - 1;
				}
			});

		/* Touch demo mode */
		if (touchDemo) {
			$(document.body).append('<div id="touch-demo"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
			var $touchDemo = $('#touch-demo').children();

			function touchDemoUpdate(e) {
				for (var i = 0, length = e.touches.length; i < length; i++) {
					$touchDemo.eq(i).css({
						left: e.touches[i].pageX,
						top: e.touches[i].pageY
					}).show();
				}
			}

			$(document)
				.on('touchstart', function (e) {
					// Skip text input
					var $target = $(e.target);
					if ($target.is('textarea') || ($target.is('input') && $.inArray($target.attr('type'), ['submit', 'reset', 'button', 'image', 'checkbox', 'radio', 'range'])) < 0) {
						return;
					}

					touchDemoUpdate(e);

					$(document)
						.on('touchmove', touchDemoUpdate)
						.on('touchend touchcancel', function () {
							$(document).off('touchmove', touchDemoUpdate);
							$touchDemo.hide();
						});
				});
		}
	}

	/* Put your magic code here */
}));
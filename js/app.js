(Zepto(function ($) {
	var touchDemo = true,
		touchEnabled = ('createTouch' in document),
		tapEvent = (touchEnabled) ? 'tap' : 'click';

	if (touchEnabled) {
		/* Perform scrollfix */
		$(document).on('touchmove', function (e) {
			if (!$(event.target).hasClass('scrollable')) {
				e.preventDefault();
			}
		});

		$('.scrollable').on('touchstart', function () {
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
			
			$(document)
				.on('touchstart touchmove', function (e) {
					for (var i = 0, length = e.touches.length; i < length; i++) {
						$touchDemo.eq(i).css({
							left: e.touches[i].pageX,
							top: e.touches[i].pageY
						}).show();
					}
				})
				.on('touchend touchcancel', function () {
					$touchDemo.hide();
				});
		}
	}

	/* Put your magic code here */
}));
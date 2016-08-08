// skew, rotate X Y Z, translate X Y Z

window.onload = function() {
	var classes = [ 'rotate-x', 'rotate-y', 'rotate-z', 'skew', 'skew-x', 'skew-y' ];
	var elementFactories = [ getDiv ];
	var container = document.getElementById('container');
	var delayInc = 200;
	var interval = 2000;
	
	elementFactories.forEach((factory) => {
		for(var i = 0; i < classes.length; i++) {
			var c = classes[i];

			var wrapper = makeWrapper(c);
			var el = factory();

			wrapper.appendChild(el);
			container.appendChild(wrapper);

			el.classList.add('transitions');

			scheduleToggling(el, c, i * delayInc, interval);
		}
	});

	function scheduleToggling(el, c, delay, interval) {
		setTimeout(function() {
			setInterval(function() {
				el.classList.toggle(c);
			}, interval);
		}, delay);
	}

	function makeWrapper(title) {
		var el = document.createElement('div');
		el.className = 'wrapper';

		var h2 = document.createElement('h2');
		h2.innerHTML = title;

		el.appendChild(h2);

		return el;
	}

	function getDiv() {
		var el = document.createElement('div');
		var img = document.createElement('img');
		img.src = '../../servo.png';
		el.appendChild(img);
		return el;
	}
};

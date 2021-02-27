'use strict';

export default class ImageGallery
{
	constructor(id, images, interval = 3) {
		/*
		* Private fields
		* ------------------------------ */

		// Don't change these directly
		// use the corresponding properties
		this._currentIndex = 0;					// Current image index, starting with 0
		this._interval = interval * 1000;		// Interval between changes, in millisecs
		this._intervalHandler = null;
		this._images = images;

		/*
		* DOM manipulation
		* ------------------------------ */

		// Main element
		const el = document.getElementById(id);
		el.classList.add('image-gallery__container');
		this._el = el;

		// Overlay
		const overlay = document.createElement('div');
		overlay.innerHTML = '▌▌';
		overlay.classList.add('image-gallery__overlay');
		overlay.addEventListener('mousewheel', (event) => { this.changeInterval(event); });
		overlay.addEventListener('click', () => { this.toggle(); });
		el.appendChild(overlay);

		// Image element
		const img = document.createElement('img');
		img.classList.add('image-gallery__img');
		el.appendChild(img);
		this._img = img;

		// "Previous" button
		const prev = document.createElement('div');
		prev.innerHTML = '&laquo;';
		prev.classList.add('image-gallery__btn');
		prev.classList.add('image-gallery__prev');
		prev.addEventListener('click', () => { this.prev(); });
		el.appendChild(prev);

		// "Next" button
		const next = document.createElement('div');
		next.innerHTML = '&raquo;';
		next.classList.add('image-gallery__btn');
		next.classList.add('image-gallery__next');
		next.addEventListener('click', () => { this.next(); });
		el.appendChild(next);

		this.start();
	}

	/*
	 * Class Properties (Getters/Setters)
	 * ------------------------------ */

	get images() {
		return this._images;
	}

	get noOfImages() {
		return this._images.length;
	}

	get currentIndex() {
		return this._currentIndex;
	}

	set currentIndex(value) {
		this._currentIndex = value;

		// If we get over the upper limit reset to 0
		if (this._currentIndex >= this.noOfImages) {
			this._currentIndex = 0;
		}

		// If we fall under the lower limit reset to last image index
		if (this._currentIndex < 0) {
			this._currentIndex = this.noOfImages - 1;
		}

		console.log(this._currentIndex);
	}

	get interval() {
		return this._interval;
	}

	set interval(value) {
		const minInterval = 1000;

		// Don't let `interval` be less than `minInterval`
		this._interval = Math.max(value, minInterval);	// Math.max is used as a trick to set a lower limit
	}

	get el() {
		return this._el;
	}

	get img() {
		return this._img;
	}

	/*
	 * Class methods
	 * ------------------------------ */

	// Show current image, and trigger a fade effect
	// TODO: Not quite a proper solution for transition
	show() {
		this.img.classList.remove('active');
		this.img.onload = () => {
			this.img.classList.add('active');
		};
		this.img.src = this.images[this.currentIndex];
	}

	// Start the interval
	start() {
		this._handler = setInterval(() => {
			this.currentIndex += 1;
			this.show();
		}, this.interval);
		this.el.classList.remove('stopped');
	}

	// Stop the interval
	stop() {
		clearInterval(this._handler);
		this._handler = null;
		this.el.classList.add('stopped');
	}

	/*
	 * Event handlers
	 * ------------------------------ */

	// Tiggle between start and stop
	toggle() {
		if (this._handler) {
			this.stop();
		} else {
			this.start();
		}
	}

	// Show the previous image
	prev() {
		this.stop();
		this.currentIndex -= 1;
		this.show();
	}

	// SHow the next image
	next() {
		this.stop();
		this.currentIndex += 1;
		this.show();
	}

	// Change the interval timing
	changeInterval(event) {
		const step = 100;

		if (event.deltaY < 0) {
			this.interval += step;
		} else {
			this.interval -= step;
		}

		this.stop();
		this.start();

		event.preventDefault();

		console.log(this.interval);
	}
}

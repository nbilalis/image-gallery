'use strict';

class ImageGallery {
  constructor(id, images, interval = 3000) {
    this._el = document.getElementById(id);

    if (!this._el) {
      throw new Error(`No element with id ${id} found`);
    }

    // Set "private" fields
    this._currentIndex = 0;
    this._images = images;
    this._interval = interval;

    // Prepare DOM
    this._render();
    this._addHandlers();

    // Start slideshow
    this._showCurrent();
    this.startSlideshow();
  }

  /*
   * Properties (Getters/Setters)
   * ----------------------------- */

  get currentIndex() {
    return this._currentIndex;
  }

  get interval() {
    return this._interval;
  }

  set interval(value) {
    const limit = 1000;
    this._interval = Math.max(value, limit);
  }

  /*
   * "Private" Methods
   * ----------------------------- */

  // Render necessary DOM elements
  _render() {
    // Main element
    this._el.classList.add('image-gallery__container');

    // Overlay
    const overlay = document.createElement('div');
    overlay.textContent = '▌▌';
    overlay.classList.add('image-gallery__overlay');
    this._el.appendChild(overlay);
    this._overlay = overlay;

    // Image element
    const img = document.createElement('img');
    img.classList.add('image-gallery__img');
    this._el.appendChild(img);
    this._img = img;

    // "Previous" button
    const prev = document.createElement('div');
    prev.innerHTML = '&laquo;';
    prev.classList.add('image-gallery__btn', 'image-gallery__prev');
    this._el.appendChild(prev);
    this._prev = prev;

    // "Next" button
    const next = document.createElement('div');
    next.innerHTML = '&raquo;';
    next.classList.add('image-gallery__btn', 'image-gallery__next');
    this._el.appendChild(next);
    this._next = next;
  }

  // Add Event handlers
  _addHandlers() {
    this._prev.addEventListener('click', () => {
      this.showPrevious();
    });

    this._next.addEventListener('click', () => {
      this.showNext();
    });

    this._overlay.addEventListener('click', () => {
      this.toggle();
    });

    this._overlay.addEventListener('mousewheel', (event) => {
      const step = 250;

      if (event.deltaY < 0) {
        this.interval += step;
      } else {
        this.interval -= step;
      }

      console.log(this.interval);

      this.reset();

      event.preventDefault();
    });
  }

  // Show current image, and trigger a fade effect
  _showCurrent() {
    this._img.classList.remove('active');

    this._img.onload = () => {
      this._img.classList.add('active');
    };

    // Give enough time for the fade effect to kick in
    setTimeout(() => {
      this._img.src = this._images[this._currentIndex];
    }, 250);
  }

  _increaseIndex() {
    /* this._currentIndex++;

    if (this._currentIndex >= this._images.length) {
      this._currentIndex = 0;
    } */

    // Posh way to handle the current index
    this._currentIndex = (this._currentIndex + 1) % this._images.length;
  }

  _decreaseIndex() {
    /* if (this._currentIndex === 0) {
      this._currentIndex = this._images.length - 1;
    } else {
      this._currentIndex--;
    } */

    // Posh way to handle the current index
    this._currentIndex = (this._currentIndex + this._images.length - 1) % this._images.length;
  }

  /*
   * "Public" Methods
   * ----------------------------- */

  showNext() {
    this._increaseIndex();
    this._showCurrent();

    this.reset();
  }

  showPrevious() {
    this._decreaseIndex();
    this._showCurrent();

    this.reset();
  }

  startSlideshow() {
    this._handle = setInterval(() => {
      this.showNext();
    }, this._interval);
    this._el.classList.remove('stopped');
  }

  stopSlideshow() {
    if (this._handle) clearInterval(this._handle);
    this._handle = null;
    this._el.classList.add('stopped');
  }

  reset() {
    this.stopSlideshow();
    this.startSlideshow();
  }

  toggle() {
    if (this._handle) {
      this.stopSlideshow();
    } else {
      this.startSlideshow();
    }
  }
}

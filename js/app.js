const images1 = [
  `https://source.unsplash.com/random/600x400?sig=1`,
  `https://source.unsplash.com/random/600x400?sig=2`,
  `https://source.unsplash.com/random/600x400?sig=3`,
  `https://source.unsplash.com/random/600x400?sig=4`,
  `https://source.unsplash.com/random/600x400?sig=5`,
  `https://source.unsplash.com/random/600x400?sig=6`,
  `https://source.unsplash.com/random/600x400?sig=7`,
  `https://source.unsplash.com/random/600x400?sig=8`,
  `https://source.unsplash.com/random/600x400?sig=9`,
  `https://source.unsplash.com/random/600x400?sig=10`,
];

const images2 = [
  `https://source.unsplash.com/random/400x300?sig=11`,
  `https://source.unsplash.com/random/400x300?sig=12`,
  `https://source.unsplash.com/random/400x300?sig=13`,
  `https://source.unsplash.com/random/400x300?sig=14`,
  `https://source.unsplash.com/random/400x300?sig=15`,
];

const gallery1 = new ImageGallery('gallery-1', images1);
const gallery2 = new ImageGallery('gallery-2', images2, 5000);

const btnNext = document.getElementById('show-next');
btnNext.addEventListener('click', () => {
  gallery1.showNext();
  gallery2.showNext();
});

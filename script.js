const bg = document.querySelector('.bg');
const page = document.querySelector('.page');
const letterF = document.querySelector('.letter-f');
const links = document.querySelectorAll('.clients a[data-image]');
const clientsNav = document.querySelector('.clients');
const contactLinks = document.querySelectorAll('.contact a');
const contactNav = document.querySelector('.contact');
const monogram = document.querySelector('.monogram');
const bioLink = document.querySelector('.bio a');

// Preload all project images
links.forEach(link => new Image().src = link.dataset.image);

let isHovering = false;

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    if (isHovering) {
      bg.style.transition = 'none';
      bg.style.backgroundImage = `url('${link.dataset.image}')`;
      bg.offsetHeight;
      bg.style.transition = '';
    } else {
      bg.style.backgroundImage = `url('${link.dataset.image}')`;
      bg.classList.add('visible');
      isHovering = true;
    }

    page.classList.add('is-hovering');
    letterF.textContent = link.textContent.trim()[0];
  });
});

clientsNav.addEventListener('mouseleave', () => {
  bg.classList.remove('visible');
  page.classList.remove('is-hovering');
  letterF.textContent = 'F';
  isHovering = false;
});

contactLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    bg.classList.remove('visible');
    page.classList.remove('is-hovering');
    isHovering = false;
    letterF.textContent = link.textContent.trim()[0];
  });
});

contactNav.addEventListener('mouseleave', () => {
  page.classList.remove('is-hovering');
  letterF.textContent = 'F';
});

bioLink.addEventListener('mouseenter', () => {
  monogram.classList.add('show-initials');
  page.classList.add('is-hovering', 'bio-hovering');
});
bioLink.addEventListener('mouseleave', () => {
  monogram.classList.remove('show-initials');
  page.classList.remove('is-hovering', 'bio-hovering');
});
function layoutMobileMonogram() {
  const monogram = document.querySelector('.monogram');
  const letterM  = document.querySelector('.letter-m');
  const letterF  = document.querySelector('.letter-f');

  if (window.innerWidth > 768) {
    letterM.style.fontSize = '';
    letterM.style.left     = '';
    letterF.style.fontSize = '';
    letterF.style.right    = '';
    monogram.style.height  = '';
    return;
  }

  const MARGIN = 10;
  const GAP    = 10;
  const vw     = window.innerWidth;

  // Measure actual ink bounds from the font as it renders in this browser
  const canvas = document.createElement('canvas');
  const ctx    = canvas.getContext('2d');
  const size   = 200;
  ctx.font = `500 ${size}px "Helvetica Neue", Helvetica, Arial, sans-serif`;

  const mM = ctx.measureText('M');
  const fM = ctx.measureText('F');

  // Ink width = right bound + left bound (left bound is negative when ink is inside the advance box)
  const mInkFrac = (mM.actualBoundingBoxRight + mM.actualBoundingBoxLeft) / size;
  const fInkFrac = (fM.actualBoundingBoxRight + fM.actualBoundingBoxLeft) / size;

  // How far the ink starts from the left edge of the advance box
  const mLBFrac = -mM.actualBoundingBoxLeft / size;
  // How far the ink ends before the right edge of the advance box
  const fRBFrac = (fM.width - fM.actualBoundingBoxRight) / size;

  // Font size where M ink + 10px gap + F ink = viewport - 20px margins
  const fontSize = (vw - MARGIN * 2 - GAP) / (mInkFrac + fInkFrac);

  // M: left offset so its ink starts exactly at MARGIN from screen left
  letterM.style.left = (-mLBFrac * fontSize) + 'px';

  // F: right offset so its ink ends exactly at MARGIN from screen right
  letterF.style.right = (-fRBFrac * fontSize) + 'px';

  letterM.style.fontSize = fontSize + 'px';
  letterF.style.fontSize = fontSize + 'px';

  // Monogram height = line-height (0.82) × font-size
  monogram.style.height = (0.82 * fontSize) + 'px';
}

document.fonts.ready.then(layoutMobileMonogram);
window.addEventListener('resize', layoutMobileMonogram);

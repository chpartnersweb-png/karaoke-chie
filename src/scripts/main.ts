import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector<HTMLElement>('[data-header]');
const mobileNav = document.querySelector<HTMLDetailsElement>('[data-mobile-nav]');
const dialog = document.querySelector<HTMLDialogElement>('#flyer-dialog');
const flyerLink = document.querySelector<HTMLAnchorElement>('[data-flyer-open]');
let lenis: Lenis | null = null;
let returnFocus: HTMLElement | null = null;

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 40);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

mobileNav?.querySelectorAll<HTMLAnchorElement>('nav a').forEach(link => {
  link.addEventListener('click', () => { mobileNav.open = false; });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileNav?.open) {
    mobileNav.open = false;
    mobileNav.querySelector<HTMLElement>('summary')?.focus();
  }
});
document.addEventListener('click', event => {
  if (mobileNav?.open && event.target instanceof Node && !mobileNav.contains(event.target)) {
    mobileNav.open = false;
  }
});

// The original image link remains usable if JavaScript or dialog support is absent.
flyerLink?.addEventListener('click', event => {
  if (!dialog || typeof dialog.showModal !== 'function' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : flyerLink;
  lenis?.stop();
  document.documentElement.classList.add('has-dialog');
  dialog.showModal();
});
dialog?.addEventListener('close', () => {
  document.documentElement.classList.remove('has-dialog');
  lenis?.start();
  returnFocus?.focus({ preventScroll: true });
});
dialog?.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

const media = gsap.matchMedia();

// Every element is visible in the base CSS. Motion is an enhancement only.
media.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('[data-hero-image]', { scale: 1.055, duration: 1.55, ease: 'power2.out' });
  gsap.from('[data-hero-reveal]', { opacity: 0, y: 15, duration: .9, stagger: .12, delay: .1, ease: 'power2.out', clearProps: 'opacity,transform' });

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
    gsap.from(element, { opacity: 0, y: 24, duration: .8, ease: 'power2.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: element, start: 'top 91%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-photo]').forEach(element => {
    gsap.from(element, { clipPath: 'inset(0 0 12% 0)', opacity: .45, duration: 1.15, ease: 'power3.out', clearProps: 'clipPath,opacity', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
  });
  gsap.from('[data-menu-row]', { opacity: 0, y: 16, duration: .65, stagger: .08, ease: 'power2.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: '.dish-list', start: 'top 90%', once: true } });
});

media.add('(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
  const smoothScroll = new Lenis({
    lerp: .085,
    smoothWheel: true,
    syncTouch: false,
    anchors: { offset: -100 },
  });
  lenis = smoothScroll;
  if (dialog?.open) smoothScroll.stop();
  const tick = (time: number) => smoothScroll.raf(time * 1000);
  smoothScroll.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  gsap.utils.toArray<HTMLElement>('[data-parallax] img').forEach(image => {
    gsap.fromTo(image, { yPercent: -5 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: image.closest('[data-photo]'), start: 'top bottom', end: 'bottom top', scrub: .7 } });
  });

  return () => {
    gsap.ticker.remove(tick);
    smoothScroll.destroy();
    if (lenis === smoothScroll) lenis = null;
  };
});

// Lazy images and web fonts can change section positions after initialization.
document.querySelectorAll<HTMLImageElement>('main img').forEach(image => {
  if (!image.complete) image.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
});
document.fonts.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('pagehide', event => {
  if (!event.persisted) {
    media.revert();
    window.removeEventListener('scroll', updateHeader);
  }
});

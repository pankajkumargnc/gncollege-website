import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  const routes = [
    '/about-us/college-profile',
    '/notifications',
    '/contact',
    '/gallery',
    '/videos',
    '/documents/request',
    '/academics/course-offered',
    '/about-us/sikh-heritage'
  ];

  for (const r of routes) {
    await page.goto('http://localhost:3000/#' + r, { waitUntil: 'domcontentloaded' });
    try {
      await page.waitForSelector('.premium-hero, .profile-hero, .contact-header, .sh-hero', { timeout: 6000 });
    } catch (e) {}
    await page.waitForTimeout(500);
    const data = await page.evaluate(() => {
      const hero = document.querySelector('.premium-hero, .profile-hero, .contact-header, .sh-hero');
      const nextSibling = hero ? hero.nextElementSibling : null;
      let nextMarginTop = null;
      if (nextSibling) {
        nextMarginTop = window.getComputedStyle(nextSibling).marginTop;
      }
      const style = hero ? window.getComputedStyle(hero) : null;
      return {
        hasHero: !!hero,
        heroClass: hero ? hero.className : null,
        heroHeight: hero ? Math.round(hero.getBoundingClientRect().height) : null,
        animation: style ? style.animationName : null,
        hasGradient: style ? style.backgroundImage.includes('linear-gradient') : null,
        nextMarginTop
      };
    });
    console.log(r, '->', data);
  }

  await browser.close();
})();

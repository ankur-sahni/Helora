import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const URL = 'http://localhost:3001';
const OUT = 'd:/Learning/Ai Automation/Ankur Sahni Learning Project/.playwright-mcp';

const VIEWPORTS = [
  { name: '320-mobile-xs',   width: 320,  height: 900  },
  { name: '375-mobile',      width: 375,  height: 812  },
  { name: '390-iphone',      width: 390,  height: 844  },
  { name: '768-tablet',      width: 768,  height: 1024 },
  { name: '1024-laptop',     width: 1024, height: 768  },
  { name: '1440-desktop',    width: 1440, height: 900  },
];

async function shoot(page, name) {
  const path = `${OUT}/${name}.png`;
  await page.screenshot({ path, fullPage: true });
  console.log(`✓ ${name}.png`);
}

(async () => {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n── ${vp.name} (${vp.width}×${vp.height}) ──`);
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });

    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Dismiss loader — wait for it to clear
    await page.waitForTimeout(2500);

    // Scroll all the way down slowly to trigger lazy-load on every image
    await page.evaluate(async () => {
      await new Promise(resolve => {
        let pos = 0;
        const step = 600;
        const id = setInterval(() => {
          window.scrollBy(0, step);
          pos += step;
          if (pos >= document.body.scrollHeight) {
            clearInterval(id);
            resolve();
          }
        }, 120);
      });
    });

    // Wait for all images to decode
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('img')];
      await Promise.allSettled(imgs.map(img =>
        img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })
      ));
      await new Promise(r => setTimeout(r, 1000));
    });

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    await shoot(page, vp.name);
    await page.close();
  }

  await browser.close();
  console.log('\n✅ All screenshots saved to', OUT);
})();

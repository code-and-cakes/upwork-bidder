import * as fs from 'node:fs';

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Bezier } from 'bezier-js';
import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';

import { debounce } from '../shared/lib/debounce';
import { wait } from '../shared/lib/wait';
import { COOKIES_PATH } from './consts/common.consts';
import { StealthPlugin } from './plugins/stealth.plugin';

@Injectable()
export class PuppeteerService implements OnModuleDestroy {
  private browser: Browser;
  private page: Page;

  authFn: () => void;

  async init() {
    if (this.browser) return;

    puppeteer.use(StealthPlugin());
    this.browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      userDataDir: './ChromeUserData',
    });
    this.browser.pages().then((p) => p.forEach((p) => p.close()));
    this.page = await this.browser.newPage();

    // Set the viewport to a standard desktop resolution
    await this.page.setViewport({ width: 1600, height: 1000 });

    // Add human-like behaviors
    await this.page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    });

    await this.loadCookies();
    this.setAuth();
  }

  setAuth() {
    const login = debounce(this.authFn, 1000);

    this.page.on('framenavigated', async (frame) => {
      const url = frame.url();

      if (url.includes('account-security/login')) {
        login();
      }
    });
  }

  async setToLocalStorage(values: Record<string, string>) {
    await this.page.evaluate((values) => {
      Object.entries(values).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
    }, values);
  }

  getHTML() {
    return this.page.content();
  }

  findMany(selector: string) {
    return this.page.$$(selector);
  }

  // Cookies
  async saveCookies() {
    const cookies = await this.page.cookies();
    fs.writeFileSync(COOKIES_PATH, JSON.stringify(cookies));
  }

  private async loadCookies() {
    try {
      const cookies = JSON.parse(fs.readFileSync(COOKIES_PATH, 'utf-8'));
      await this.page.setCookie(...cookies);
    } catch (e) {
      console.log(e);
      console.log('No cookies found');
    }
  }

  // Actions
  private async moveMouse(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ): Promise<{ x: number; y: number }[]> {
    // Create a natural curve using Bezier
    const curve = new Bezier(
      startX,
      startY,
      startX + (endX - startX) / 2,
      startY + Math.random() * 100,
      endX - (endX - startX) / 2,
      endY - Math.random() * 100,
      endX,
      endY,
    );

    // Generate points along the curve
    const points: { x: number; y: number }[] = [];
    for (let t = 0; t <= 1; t += 0.05) {
      const point = curve.get(t);
      points.push({ x: point.x, y: point.y });
    }

    return points;
  }

  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle0' });
    await wait(500);
  }

  async click(selector: string) {
    await this.waitForElement(selector);

    const element = await this.page.$(selector);
    const box = await element.boundingBox();

    // Get element center coordinates
    const targetX = box.x + box.width / 2;
    const targetY = box.y + box.height / 2;

    // Current mouse position or default starting point
    const currentMouse = { x: 0, y: 0 };

    // Generate human-like movement path
    const movementPath = await this.moveMouse(
      currentMouse.x,
      currentMouse.y,
      targetX,
      targetY,
    );

    // Execute the mouse movement
    for (const point of movementPath) {
      await this.page.mouse.move(point.x, point.y);
      await wait(Math.random() * 10);
    }

    // Add a small pause before clicking
    await wait(Math.random() * 200 + 100);

    // Click with random pressure and duration
    await this.page.mouse.down({ button: 'left', clickCount: 1 });
    await wait(Math.random() * 100 + 50);
    await this.page.mouse.up({ button: 'left', clickCount: 1 });

    // Add a small pause after clicking
    await wait(Math.random() * 400 + 100);
  }

  async type(selector: string, text: string, delay?: number) {
    await this.waitForElement(selector);
    // Click the input field first
    await this.click(selector);

    // Type with random delays between keystrokes
    for (const char of text) {
      await this.page.keyboard.type(char, {
        delay: delay || Math.random() * 100 + 50, // Random delay between keystrokes
      });
    }
    await wait(400);
  }

  async scroll(pixels: number) {
    await this.page.evaluate((px) => {
      window.scrollBy({
        top: px,
        behavior: 'smooth',
      });
    }, pixels);
    await wait(Math.random() * 500 + 200);
  }

  async scrollDownAndUp() {
    await this.page.evaluate(async () => {
      const step = 400; // Step size
      let totalScrolled = 0;

      while (totalScrolled + window.innerHeight < document.body.scrollHeight) {
        window.scrollBy({
          top: step,
          behavior: 'smooth',
        });
        totalScrolled += step;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait a bit for smooth scrolling
      }
    });

    // Function to scroll up the page by 400px steps until the top
    await this.page.evaluate(async () => {
      const step = 400; // Step size

      while (window.scrollY > 0) {
        window.scrollBy({
          top: -step,
          behavior: 'smooth',
        });
        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait a bit for smooth scrolling
      }
    });
  }

  async scrollIntoView(
    selector: string,
    options: { block?: 'start' | 'center' | 'end' | 'nearest' } = {},
  ) {
    await this.waitForElement(selector);

    // Add some randomness to the scroll behavior
    const block =
      options.block || ['start', 'center'][Math.floor(Math.random() * 2)];

    await this.page.evaluate(
      (sel) => {
        const element = document.querySelector(sel);
        if (element) {
          // Add a small random offset to make it more human-like
          const offset = Math.random() * 50 - 25; // Random value between -25 and 25
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;

          window.scrollTo({
            top: absoluteElementTop + offset,
            behavior: 'smooth',
          });
        }
      },
      selector,
      block,
    );

    // Add a human-like pause after scrolling
    await wait(Math.random() * 300 + 200);
  }

  async waitForElement(selector: string, timeout = 3000) {
    await this.page.waitForSelector(selector, { timeout, visible: true });
    await wait(200);
    await this.page.waitForSelector(selector, { timeout, visible: true });
  }

  async takeScreenshot(): Promise<string> {
    const screenshot = await this.page.screenshot({ encoding: 'base64' });
    return screenshot.toString();
  }

  async onModuleDestroy() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

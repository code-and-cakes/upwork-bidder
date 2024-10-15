import 'dotenv/config';

import * as process from 'node:process';

import { Actions, Browser, Builder, By, WebElement } from 'selenium-webdriver';

import { getRandomNum } from '../shared/lib/getRandomNum';
import { wait } from '../shared/lib/wait';

const url = 'https://www.upwork.com/nx/find-work/best-matches';

const UpworkNodeId = {
  auth: {
    email: 'login_username',
    goToPwd: 'login_password_continue',
  },
} as const;

async function getLocation(el: WebElement) {
  const { x, y } = await el.getRect();
  return { x: Math.round(x), y: Math.round(y) };
}

async function type(el: WebElement, input: string) {
  for await (const char of input) {
    await el.sendKeys(char);
    await wait(getRandomNum(200, 400));
  }
}

async function moveMouseToEl(actions: Actions, el: WebElement) {
  const location = await getLocation(el);
  console.log(location);

  await actions.move(location).perform();
  await wait(getRandomNum(200, 400));
}

export async function selenium() {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.manage().setTimeouts({ implicit: 2000 });
  const actions = driver.actions({ async: false });

  await driver.get(url);

  const emailInput = await driver.findElement(By.id(UpworkNodeId.auth.email));
  await moveMouseToEl(actions, emailInput);

  await type(emailInput, process.env.UPWORK_EMAIL);

  const goToPwdBtn = await driver.findElement(By.id(UpworkNodeId.auth.goToPwd));
  await moveMouseToEl(actions, goToPwdBtn);

  await goToPwdBtn.click();
  await wait(10000);
  await driver.quit();
}

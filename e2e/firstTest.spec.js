describe('Test-Todo', () => {
  beforeEach(async () => {
    await device.launchApp();
    setTimeout(() => { }, 2000);
  });

  // it('Add "Todo-List"', async () => {
  //   await element(by.accessibilityLabel('addbutton')).tap();
  //   await element(by.accessibilityLabel('title')).typeText("buy milk\n");
  //   await element(by.accessibilityLabel('Detail')).typeText("no milk\n");
  //   // await element(by.accessibilityLabel('savebutton')).tap();
  //   // await expect(element(by.accessibilityLabel('buy milk'))).toBeVisible();
  // });

  it('Search Not Found "Todo-List"', async () => {
    await element(by.id('Search-text')).typeText("Go to the sea\n");
    await element(by.id('Search-button')).tap();
    await element(by.id('Search-button')).tap();
    await expect(element(by.id('not-found'))).toBeVisible();
  });

  it('Search Found "Todo-List"', async () => {
    const titlename = "Do Homework\n"
    await element(by.id('Search-text')).clearText();
    await element(by.id('Search-text')).typeText(titlename);
    await element(by.id('Search-button')).tap();
    await element(by.id('Search-button')).tap();
    await expect(element(by.id("Do Homework"))).toBeVisible();
  });

  // it('should show "See Your Changes"', async () => {
  //   await expect(element(by.text('See Your Changes'))).toBeVisible(); // THIS TEST WILL FAIL!
  // });
});
describe('Test-Todo', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('should show "Todo-List"', async () => {
    await element(by.accessibilityLabel('addbutton')).tap();
    await element(by.accessibilityLabel('title')).typeText("buy milk\n")
    await element(by.accessibilityLabel('detail')).typeText("no milk\n")
    // await element(by.accessibilityLabel('savebutton')).tap();
    // await expect(element(by.accessibilityLabel('buy milk'))).toBeVisible();
  });

  // it('should show "See Your Changes"', async () => {
  //   await expect(element(by.text('See Your Changes'))).toBeVisible(); // THIS TEST WILL FAIL!
  // });
});
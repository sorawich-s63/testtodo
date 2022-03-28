describe('Test-Todo', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('should show "Todo-List"', async () => {
    await expect(element(by.text('Todo-List'))).toBeVisible();
  });

  // it('should show "See Your Changes"', async () => {
  //   await expect(element(by.text('See Your Changes'))).toBeVisible(); // THIS TEST WILL FAIL!
  // });
});
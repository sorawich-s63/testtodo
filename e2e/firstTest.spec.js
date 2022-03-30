describe('Test-Todo', () => {
  beforeEach(async () => {
    await device.launchApp();
    setTimeout(() => { }, 2000);
  });

  it.only('Add "Todo-List"', async () => {
    await element(by.accessibilityLabel('addbutton')).tap();
    //await element(by.accessibilityLabel('title')).typeText("buy milk\n");
    //await element(by.accessibilityLabel('text-detail')).typeText("no milk\n");
    // await element(by.accessibilityLabel('savebutton')).tap();
    await expect( element(by.id('text-detail')) ).toBeVisible();
  });

  it('Search Not Found "Todo-List"', async () => {
    await element(by.id('Search-text')).typeText("Go to the sea\n");
    await element(by.id('Search-button')).tap();
    await element(by.id('Search-button')).tap();
    await waitFor( element(by.id('not-found')) ).toBeVisible().withTimeout(5000)
  });

  it('Search Found "Todo-List"', async () => {
    const titlename = "Do Homework\n"
    await element(by.id('Search-text')).clearText();
    await element(by.id('Search-text')).typeText(titlename);
    await element(by.id('Search-button')).tap();
    await element(by.id('Search-button')).tap();
    await expect(element(by.id("Do Homework"))).toBeVisible();
  });

  it('Status complete "Todo-List"', async () => {
    //await element(by.id('status-button')).atIndex(1).tap();
    await element(by.id('status-button').withAncestor(by.id('Do Homework'))).tap();

    // await expect(element(by.id("complete"))).toBeVisible();
    // await expect( element(by.id('complete').withAncestor(by.id('Do Homework'))) ).toBeVisible();
    // await expect( element(by.id('complete').withAncestor(by.id('Do Homework'))) ).toBeVisible();
    //await expect( element(by.id('complete').withAncestor(by.id('Do Homework'))) ).toBeVisible();
    await waitFor( element(by.id('complete').withAncestor(by.id('Do Homework'))) ).toBeVisible().withTimeout(5000)

  });

});
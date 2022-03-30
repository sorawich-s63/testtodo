describe('Test-Todo', () => {
  beforeEach(async () => {
    await device.launchApp();
    setTimeout(() => { }, 2000);
  });

  it('Add "Todo-List"', async () => {
    await element(by.id('addbutton')).tap();
    await element(by.id('title')).typeText("buy milk\n");
    //await element(by.id('detail')).typeText("no milk\n");
    //await expect(element(by.id('adddetail').withAncestor(by.id('detail')))).toBeVisible();
    // await element(by.text('Note something?')).tap();
    // await element(by.text('Note something?')).typeText("no milk\n");
    await element(by.id('dateTimePicker')).tap();
    await element(by.text('OK')).tap();
    await expect(element(by.id('buy milk'))).toBeVisible();
    await expect(element(by.id('savebutton'))).tap();
    //await element(by.id('Addtodo').withAncestor(by.id('savebutton'))).tap()
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

  it('Favourite "Todo-List"', async () => {

    await element(by.id('fav-button').withAncestor(by.id('go shopping'))).tap();
    await waitFor( element(by.id('favourite').withAncestor(by.id('go shopping'))) ).toBeVisible().withTimeout(5000)

  });

  it('Edit "Todo-List"', async () => {
      await waitFor( element(by.id('edit-button').withAncestor(by.id('go shopping'))) ).toBeVisible().withTimeout(2000);
      await element(by.id('edit-button').withAncestor(by.id('go shopping'))).tap();
      await element(by.id('edit-title')).replaceText("go to school\n");
      await element(by.text('buy milk')).replaceText('pick the book');
      await expect(element(by.text('go to school'))).toBeVisible();
      await expect(element(by.text('pick the book'))).toBeVisible();
      await element(by.id('edit-time')).tap();
      await element(by.text('OK')).tap();
      await element(by.id('update')).tap();
  });

  it('Delete "Todo-List"', async () => {
      await waitFor( element(by.id('edit-button').withAncestor(by.id('go to school'))) ).toBeVisible().withTimeout(2000);
      await element(by.id('edit-button').withAncestor(by.id('go to school'))).tap();
      await element(by.id('delete')).tap();
      await waitFor( element(by.id('edit-button').withAncestor(by.id('go to school'))) ).toBeNotVisible().withTimeout(2000);
  });
  
});
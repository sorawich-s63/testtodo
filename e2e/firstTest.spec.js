describe('Test-Todo', () => {
  beforeEach(async () => {
    await device.launchApp();
    setTimeout(() => { }, 2000);
  });

  it('Add "Todo-List"', async () => {
  await element(by.id('addbutton')).tap();
  await element(by.id('title')).replaceText("Do Homework");
  await element(by.id('detail')).replaceText("homework math");
  await element(by.id('dateTimePicker')).tap();
  await element(by.text('OK')).tap();
  await expect(element(by.id('title'))).toHaveText('Do Homework');
  await expect(element(by.id('detail'))).toHaveText('homework math');
  await expect(element(by.id('dateTimePicker'))).toBeVisible();
  await expect(element(by.id('savebutton'))).toBeVisible();
  await element(by.id('savebutton')).tap();
  await waitFor( element(by.id('Do Homework') )).toBeVisible().withTimeout(5000)
  });

  it('Detail "Todo-List"', async () => {
    await waitFor( element(by.id('model_button').withAncestor(by.id('Do Homework'))) ).toBeVisible().withTimeout(5000)
    await element(by.id('model_button').withAncestor(by.id('Do Homework'))).tap();
    await waitFor( element(by.id('model')) ).toBeVisible().withTimeout(5000)
    await expect( element(by.id('model_title')) ).toHaveText('Do Homework');
    await expect( element(by.id('model_detail')) ).toHaveText('homework math');
    await element(by.id('model_exit').withAncestor(by.id('model'))).tap();
  });

  it('Status complete "Todo-List"', async () => {
    await waitFor(element(by.id('status-button').withAncestor(by.id('Do Homework')))).toBeVisible().withTimeout(5000)
    await element(by.id('status-button').withAncestor(by.id('Do Homework'))).tap();
    await waitFor(element(by.id('complete').withAncestor(by.id('Do Homework')))).toBeVisible().withTimeout(5000)
  });

  it('Favourite "Todo-List"', async () => {
    await waitFor(element(by.id('fav-button').withAncestor(by.id('Do Homework')))).toBeVisible().withTimeout(5000)
    await element(by.id('fav-button').withAncestor(by.id('Do Homework'))).tap();
    await waitFor(element(by.id('favourite').withAncestor(by.id('Do Homework')))).toBeVisible().withTimeout(5000)
  });

  it('Search Not Found "Todo-List"', async () => {
    await element(by.id('Search-text')).typeText("Go to the sea\n");
    await element(by.id('Search-button')).tap();
    await element(by.id('Search-button')).tap();
    await waitFor(element(by.id('not-found'))).toBeVisible().withTimeout(5000)
  });

  it('Search Found "Todo-List"', async () => {
    const titlename = "Do Homework\n"
    await element(by.id('Search-text')).clearText();
    await element(by.id('Search-text')).typeText(titlename);
    await element(by.id('Search-button')).tap();
    await element(by.id('Search-button')).tap();
    await expect(element(by.id("Do Homework"))).toBeVisible();
  });

  it('Edit "Todo-List"', async () => {
    await element(by.id('Search-text')).clearText();
    await waitFor(element(by.id('edit-button').withAncestor(by.id('Do Homework')))).toBeVisible().withTimeout(2000);
    await element(by.id('edit-button').withAncestor(by.id('Do Homework'))).tap();
    await element(by.id('edit-title')).replaceText("go to school");
    await element(by.id('edit-detail')).replaceText("pick the book");
    await element(by.id('edit-time')).tap();
    await element(by.text('OK')).tap();
    await expect(element(by.id('edit-title'))).toHaveText('go to school');
    await expect(element(by.id('edit-detail'))).toHaveText('pick the book');
    await expect(element(by.id('edit-time'))).toBeVisible();
    await expect(element(by.id('update'))).toBeVisible();
    await expect(element(by.id('delete'))).toBeVisible();
    await element(by.id('update')).tap();
  });

  it('Detail after Edit "Todo-List"', async () => {
    await element(by.id('Search-button')).tap();
    await waitFor( element(by.id('model_button').withAncestor(by.id('go to school'))) ).toBeVisible().withTimeout(5000)
    await element(by.id('model_button').withAncestor(by.id('go to school'))).tap();
    await waitFor( element(by.id('model')) ).toBeVisible().withTimeout(5000)
    await expect( element(by.id('model_title')) ).toHaveText('go to school');
    await expect( element(by.id('model_detail')) ).toHaveText('pick the book');
    await element(by.id('model_exit').withAncestor(by.id('model'))).tap();
  });

  it('Delete "Todo-List"', async () => {
    await waitFor(element(by.id('edit-button').withAncestor(by.id('go to school')))).toBeVisible().withTimeout(5000);
    await element(by.id('edit-button').withAncestor(by.id('go to school'))).tap();
    await expect(element(by.id('edit-title'))).toHaveText('go to school');
    await expect(element(by.id('edit-detail'))).toHaveText('pick the book');
    await expect(element(by.id('update'))).toBeVisible();
    await expect(element(by.id('delete'))).toBeVisible();
    await element(by.id('delete')).tap();
    await element(by.id('Search-button')).tap();
    await element(by.id('Search-button')).tap();
    //await expect( element(by.id('edit-button').withAncestor(by.id('go to school'))) ).toBeFocused();
    await waitFor( element(by.id('edit-button').withAncestor(by.id('go to school'))) ).toNotExist().withTimeout(2000);
  });

});
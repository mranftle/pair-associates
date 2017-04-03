import { PairedAssociateTaskPage } from './app.po';

describe('paired-associate-task App', function() {
  let page: PairedAssociateTaskPage;

  beforeEach(() => {
    page = new PairedAssociateTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

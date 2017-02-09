import { SjefLandingPage } from './app.po';

describe('sjef-landing App', function() {
  let page: SjefLandingPage;

  beforeEach(() => {
    page = new SjefLandingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { SampleAngularAppPage } from './app.po';

describe('sample-angular-app App', () => {
  let page: SampleAngularAppPage;

  beforeEach(() => {
    page = new SampleAngularAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

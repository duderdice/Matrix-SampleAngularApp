import { MatrixSampleAngularAppPage } from './app.po';

describe('matrix-sample-angular-app App', () => {
  let page: MatrixSampleAngularAppPage;

  beforeEach(() => {
    page = new MatrixSampleAngularAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

import { Angular2NginxDockerDemoPage } from './app.po';

describe('angular2-nginx-docker-demo App', function() {
  let page: Angular2NginxDockerDemoPage;

  beforeEach(() => {
    page = new Angular2NginxDockerDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

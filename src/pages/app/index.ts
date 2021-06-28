import Page from "../../core/templates/page";
import MainPage from "../main/main_page";
import SettingsPage from "../settings/settings_page";
import StatisticsPage from "../statistics/statistics_page";
import Header from "../../core/components/header/header";
import ErrorPage, { ErrorTypes } from "../error/error";

export const enum PageIds {
  MainPage = 'main-page',
  SettingsPage = 'settings-page',
  StatisticsPage = 'statistics-page'
}

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = 'current-page';
  private initialPage: MainPage;
  private header: Header;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    }
    else if (idPage === PageIds.SettingsPage) {
      page = new SettingsPage(idPage);
    }
    else if (idPage === PageIds.StatisticsPage) {
      page = new StatisticsPage(idPage);
    }
    else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }
    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  private routeChange() {
    window.addEventListener('hashchange', () => {
      console.log('hashchange');
      const hash = window.location.hash.slice(1);
      console.log('hashchange', hash);
      App.renderNewPage(hash);  
    });
  }

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.header = new Header('header', 'header-container');
  }
  run() {
    App.container.append(this.header.render());
    App.renderNewPage('main-page');
    this.routeChange();
  }
}

export default App;
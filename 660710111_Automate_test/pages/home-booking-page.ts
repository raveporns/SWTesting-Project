import { Page } from '@playwright/test';
import { NavbarComponent } from './navbar-component';

export class HomeBookingPage {
  // --------------------------------------------------------
  // 1. Properties
  // --------------------------------------------------------
  readonly page: Page;
  readonly navbar: NavbarComponent;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page); 

  }
}
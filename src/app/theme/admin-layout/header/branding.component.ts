import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="/adminwwwroot">
      <img src="./assets/images/B.png" class="matero-branding-logo-expanded" alt="logo" />
      <span class="matero-branding-name">yougebug</span>
    </a>
  `,
})
export class BrandingComponent {}

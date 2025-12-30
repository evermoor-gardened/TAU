import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-navbar')
export class AppNavbar extends LitElement {
  render() {
    return html`
      <nav style="background: white; border-bottom: 1px solid #e5e7eb; padding: 1rem;">
        <div style="max-width: 1280px; margin: 0 auto; font-weight: bold; color: #1f2937;">
          AgentHive
        </div>
      </nav>
    `;
  }
}

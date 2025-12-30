import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('api-console')
export class ApiConsole extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #111827;
      border-radius: 0.5rem;
      padding: 1.5rem;
      color: #e5e7eb;
      font-family: monospace;
    }
    .prompt { color: #10b981; }
    .cursor { display: inline-block; width: 0.6em; height: 1.2em; background: #e5e7eb; animation: blink 1s step-end infinite; vertical-align: middle; }
    @keyframes blink { 50% { opacity: 0; } }
  `;

  render() {
    return html`
      <div>
        <span class="prompt">➜</span> <span style="color: #60a5fa">~</span> agenthive status
      </div>
      <div style="margin-top: 0.5rem; color: #9ca3af;">
        System online.<br>
        3 agents active.<br>
        Waiting for command...<span class="cursor"></span>
      </div>
    `;
  }
}

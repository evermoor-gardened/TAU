import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../store';

@customElement('api-console')
export class ApiConsole extends LitElement {
  @state() private logs = store.logs;

  static styles = css`
    :host {
      display: block;
      background: #111827;
      border-radius: 0.5rem;
      padding: 1.5rem;
      color: #e5e7eb;
      font-family: 'JetBrains Mono', monospace;
      max-height: 400px;
      overflow-y: auto;
    }
    .log-entry { margin-bottom: 0.25rem; }
    .timestamp { color: #6b7280; margin-right: 0.5rem; }
    .level-info { color: #10b981; }
    .level-warn { color: #f59e0b; }
    .level-error { color: #ef4444; }
    .source { color: #60a5fa; margin-right: 0.5rem; font-weight: bold; }
    .cursor { display: inline-block; width: 0.6em; height: 1.2em; background: #e5e7eb; animation: blink 1s step-end infinite; vertical-align: middle; }
    @keyframes blink { 50% { opacity: 0; } }
  `;

  connectedCallback() {
    super.connectedCallback();
    store.addEventListener('change', () => {
      this.logs = [...store.logs];
    });
  }

  render() {
    return html`
      <div class="terminal">
        ${this.logs.map(log => html`
          <div class="log-entry">
            <span class="timestamp">[${log.timestamp}]</span>
            <span class="level-${log.level}">${log.level.toUpperCase()}</span>
            <span class="source">${log.source}</span>
            <span class="message">${log.message}</span>
          </div>
        `)}
        <div style="margin-top: 0.5rem;">
          <span class="source">System</span> Waiting for command...<span class="cursor"></span>
        </div>
      </div>
    `;
  }
}

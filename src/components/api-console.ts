import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../store';

@customElement('api-console')
export class ApiConsole extends LitElement {
  static properties = {
    logs: { type: Array, state: true }
  };

  private logs = store.logs;

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
    .source { color: #d946ef; margin-right: 0.5rem; font-weight: bold; }
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
        <div style="color: #6b7280; margin-bottom: 1rem; border-bottom: 1px solid #1f2937; padding-bottom: 0.5rem;">
          AESOP-OS v1.0 | Protocol Identity: 0x4145534F50 | The Herdsman’s Field
        </div>
        ${this.logs.map(log => html`
          <div class="log-entry">
            <span class="timestamp">[${log.timestamp}]</span>
            <span class="level-${log.level}">${log.level.toUpperCase()}</span>
            <span class="source">${log.source}</span>
            <span class="message">${log.message}</span>
          </div>
        `)}
        <div style="margin-top: 0.5rem; display: flex; align-items: center;">
          <span class="source">AESOP</span>
          <span style="color: #10b981; margin-right: 0.5rem;">➜</span>
          <input 
            type="text" 
            style="background: transparent; border: none; color: #e5e7eb; outline: none; flex: 1; font-family: inherit;"
            @keydown="${this._handleKeyDown}"
            placeholder="Awaiting Directive..."
          />
          <span class="cursor"></span>
        </div>
      </div>
    `;
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      const command = input.value.trim();
      if (command) {
        store.runCommand(command);
        input.value = '';
      }
    }
  }
}

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('agent-card')
export class AgentCard extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) status = 'offline';
  @property({ type: String, attribute: 'last-active' }) lastActive = '';
  @property({ type: String }) avatar = '';

  static styles = css`
    :host {
      display: block;
      background: white;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      padding: 1.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }
    .header { display: flex; align-items: center; margin-bottom: 1rem; }
    .avatar { width: 3rem; height: 3rem; border-radius: 50%; margin-right: 1rem; object-fit: cover; background-color: #f3f4f6; }
    .info { flex: 1; }
    .name { font-weight: 600; color: #111827; }
    .status { font-size: 0.875rem; color: #6b7280; display: flex; align-items: center; gap: 0.5rem; }
    .dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background-color: #9ca3af; }
    .dot.active { background-color: #10b981; }
    .meta { font-size: 0.75rem; color: #9ca3af; margin-top: 1rem; border-top: 1px solid #f3f4f6; padding-top: 0.75rem; }
  `;

  render() {
    return html`
      <div class="header">
        <img class="avatar" src="${this.avatar}" alt="${this.name}" />
        <div class="info">
          <div class="name">${this.name}</div>
          <div class="status">
            <span class="dot ${this.status === 'active' ? 'active' : ''}"></span>
            ${this.status}
          </div>
        </div>
      </div>
      <div class="meta">
        Last active: ${this.lastActive}
      </div>
    `;
  }
}

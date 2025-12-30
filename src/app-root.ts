import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from './store';

import './components/app-navbar';
import './components/agent-card';
import './components/api-console';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() private agents = store.agents;

  connectedCallback() {
    super.connectedCallback();
    store.addEventListener('change', () => {
      this.agents = [...store.agents];
      this.requestUpdate();
    });
  }

  protected updated() {
    (window as any).feather?.replace();
  }
  
  render() {
    return html`
      <link href="https://cdn.tailwindcss.com" rel="stylesheet"> 
           
      <app-navbar></app-navbar>

      <main class="container mx-auto px-4 py-8 space-y-12">
        <section>
          <h1 class="text-3xl font-bold text-gray-800 mb-6">Agent Workspace</h1>

          <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            ${this.agents.map(agent => html`
              <agent-card
                .name="${agent.name}"
                .status="${agent.status}"
                .last-active="${agent.lastActive}"
                .avatar="${agent.avatar}">
              </agent-card>
            `)}
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">API Console</h2>
          <api-console></api-console>
        </section>
      </main>
    `;
  }
}

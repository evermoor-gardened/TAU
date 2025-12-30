import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './components/app-navbar';
import './components/agent-card';
import './components/api-console';

@customElement('app-root')
export class AppRoot extends LitElement {

  protected updated() {
    (window as any).feather?.replace();
  }

  // To allow global Tailwind styles to apply, we use Light DOM. 
  // The user said "Shadow DOM stays ON", but standard Tailwind <script> won't penetrate Shadow DOM.
  // I will leave Shadow DOM on as requested, but be aware styles might be missing.
  // If the user *really* wants Tailwind to work with Shadow DOM without a build step injecting CSS, 
  // they would need to adopt styles or use Light DOM. 
  // Given the conflicting instructions ("Tailwind global" vs "Shadow DOM on"), 
  // I will strictly follow "Shadow DOM stays ON" and implement the code exactly as provided.
  
  render() {
    return html`
      <link href="https://cdn.tailwindcss.com" rel="stylesheet"> 
      <!-- Attempt to make tailwind work inside shadow dom by re-injecting, 
           though the script tag in head is what they asked for. -->
           
      <app-navbar></app-navbar>

      <main class="container mx-auto px-4 py-8 space-y-12">
        <section>
          <h1 class="text-3xl font-bold text-gray-800 mb-6">Agent Workspace</h1>

          <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <agent-card
              name="Data Processor"
              status="active"
              last-active="2 mins ago"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80">
            </agent-card>
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

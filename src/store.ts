export type AgentStatus = 'active' | 'busy' | 'offline';

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  lastActive: string;
  avatar: string;
}

export interface Log {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  source: string;
  message: string;
}

class AgentStore extends EventTarget {
  private _agents: Agent[] = [
    { 
      id: '1', 
      name: 'Data Processor', 
      status: 'active', 
      lastActive: 'Just now', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' 
    },
    { 
      id: '2', 
      name: 'Log Analyzer', 
      status: 'busy', 
      lastActive: '5 mins ago', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' 
    }
  ];

  private _logs: Log[] = [
    { id: '0', timestamp: new Date().toLocaleTimeString(), level: 'info', source: 'AESOP', message: 'Protocol 0x4145534F50 Initialized. Anchor: The Herdsman’s Field.' }
  ];

  get agents() { return this._agents; }
  get logs() { return this._logs; }

  addLog(message: string, level: Log['level'] = 'info', source = 'AESOP') {
    const log: Log = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      level,
      source,
      message
    };
    this._logs = [...this._logs, log].slice(-50);
    this.dispatchEvent(new CustomEvent('change'));
  }

  async runCommand(command: string) {
    this.addLog(`AESOP Input: ${command}`, 'info', 'User');
    
    if (command.startsWith('ask ')) {
      const prompt = command.substring(4);
      try {
        const { askGemini } = await import('./integrations/gemini');
        await askGemini(prompt);
      } catch (e) {
        // Error logged in askGemini
      }
    } else if (command === 'status') {
      this.addLog(`AESOP Diagnostics: L-01 Homeostasis Stable. ${this._agents.length} nodes active.`, 'info', 'AESOP');
    } else if (command === 'protocol') {
      this.addLog(`Directive: Ethics is a biological constraint.`, 'info', 'AESOP');
    } else {
      this.addLog(`AESOP Warning: Unrecognized pattern "${command}"`, 'warn', 'AESOP');
    }
  }

  updateAgentStatus(id: string, status: AgentStatus) {
    this._agents = this._agents.map(a => 
      a.id === id ? { ...a, status, lastActive: 'Just now' } : a
    );
    this.dispatchEvent(new CustomEvent('change'));
  }
}

export const store = new AgentStore();

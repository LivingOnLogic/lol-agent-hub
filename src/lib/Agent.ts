export type AgentConfig = {
  name: string;
  logic: (ctx: any) => Promise<any>;
  modules: string[];
};

export class Agent {
  name: string;
  logic: (ctx: any) => Promise<any>;
  modules: string[];

  constructor(config: AgentConfig) {
    this.name = config.name;
    this.logic = config.logic;
    this.modules = config.modules;
  }

  async run() {
    console.log(`[${this.name}] Agent starting...`);
    const ctx = this.createContext();
    await this.logic(ctx);
  }

  createContext() {
    return {
      fetchSignal: async (token: string, type: string) => {
        console.log(`Fetching signal for ${token}, type: ${type}`);
        return 29; // mock RSI
      },
      executeSwap: async (from: string, to: string, amount: number) => {
        console.log(`Executing swap: ${amount} ${from} → ${to}`);
      }
    };
  }
}
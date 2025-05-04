import { Agent } from './lib/Agent';

async function main() {
  const agent = new Agent({
    name: "eth-signal-buyer",
    logic: async (ctx) => {
      const rsi = await ctx.fetchSignal("ETH", "rsi");
      if (rsi < 30) {
        return ctx.executeSwap("ETH", "USDC", 0.5);
      }
    },
    modules: ["signal.mcp", "dex.mcp"]
  });

  await agent.run();
}

main();
import { ApiPromise, WsProvider } from "@polkadot/api";

const wsProvider = new WsProvider("wss://ws.test.azero.dev");

const connectToProvider = async () => {
  const api = new ApiPromise({ provider: wsProvider });
  await api.isReady;

  console.log(api.genesisHash.toHex());
};

connectToProvider();

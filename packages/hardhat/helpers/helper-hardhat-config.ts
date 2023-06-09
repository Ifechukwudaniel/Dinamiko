// Rule number one
import {
  DEFAULT_JOB_ID,
  DEFAUlT_LINK_ORACLE,
  DEFAULT_FEE,
  DEFAULT_KEEP_REGISTRY,
  DEFAULT_TRUFFLATION_ORACLE_ID,
} from "./constants";
import {
  iParamsPerNetwork,
  eEthereumNetwork,
  eNetwork,
  ePolygonNetwork,
  eArbitrumNetwork,
  eHarmonyNetwork,
  eAvalancheNetwork,
  eFantomNetwork,
  eOptimismNetwork,
  ChainNetworkConfigType,
} from "./types";
import { HardhatNetworkForkingUserConfig, HardhatNetworkUserConfig, HttpNetworkUserConfig } from "hardhat/types";

export const ALCHEMY_KEY = process.env.ALCHEMY_KEY || "";
export const FORK = (process.env.FORK || "") as eNetwork;
export const FORK_BLOCK_NUMBER = process.env.FORK_BLOCK_NUMBER ? parseInt(process.env.FORK_BLOCK_NUMBER) : 0;
export const DEFAULT_BLOCK_GAS_LIMIT = 12450000;

const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || "";

export const getAlchemyKey = (net: eNetwork) => {
  switch (net) {
    case eEthereumNetwork.kovan:
      return process.env.KOVAN_ALCHEMY_KEY || ALCHEMY_KEY;
    case eEthereumNetwork.main:
      return process.env.MAIN_ALCHEMY_KEY || ALCHEMY_KEY;
    case eOptimismNetwork.main:
      return process.env.OPTIMISM_ALCHEMY_KEY || ALCHEMY_KEY;
    case eOptimismNetwork.testnet:
      return process.env.KOVAN_OPTIMISM_ALCHEMY_KEY || ALCHEMY_KEY;
    case eEthereumNetwork.rinkeby:
      return process.env.RINKEBY_ALCHEMY_KEY || ALCHEMY_KEY;
    case ePolygonNetwork.mumbai:
      return process.env.POLYGON_MUMBAI_ALCHEMY_KEY || ALCHEMY_KEY;
    case ePolygonNetwork.polygon:
      return process.env.POLYGON_ALCHEMY_KEY || ALCHEMY_KEY;
    case eEthereumNetwork.goerli:
      return process.env.GOERLI_ALCHEMY_KEY || ALCHEMY_KEY;
    case eEthereumNetwork.sepolia:
      return process.env.SEPOLIA_ALCHEMY_KEY || ALCHEMY_KEY;
    default:
      return ALCHEMY_KEY;
  }
};

export const NETWORKS_RPC_URL: iParamsPerNetwork<string> = {
  [eEthereumNetwork.kovan]: `https://eth-kovan.alchemyapi.io/v2/${getAlchemyKey(eEthereumNetwork.kovan)}`,
  [eEthereumNetwork.main]: `https://eth-mainnet.alchemyapi.io/v2/${getAlchemyKey(eEthereumNetwork.main)}`,
  [eEthereumNetwork.coverage]: "http://localhost:8555",
  [eEthereumNetwork.hardhat]: "http://localhost:8545",
  [ePolygonNetwork.mumbai]: `https://polygon-mumbai.g.alchemy.com/v2/${getAlchemyKey(ePolygonNetwork.mumbai)}`,
  [ePolygonNetwork.polygon]: `https://polygon-mainnet.g.alchemy.com/v2/${getAlchemyKey(ePolygonNetwork.polygon)}`,
  [eArbitrumNetwork.arbitrum]: `https://arb1.arbitrum.io/rpc`,
  [eArbitrumNetwork.arbitrumTestnet]: `https://rinkeby.arbitrum.io/rpc`,
  [eEthereumNetwork.rinkeby]: `https://eth-rinkeby.alchemyapi.io/v2/${getAlchemyKey(eEthereumNetwork.rinkeby)}`,
  [eEthereumNetwork.ropsten]: `https://eth-ropsten.alchemyapi.io/v2/${getAlchemyKey(eEthereumNetwork.ropsten)}`,
  [eHarmonyNetwork.main]: `https://a.api.s0.t.hmny.io/`,
  [eHarmonyNetwork.testnet]: `https://api.s0.b.hmny.io`,
  [eAvalancheNetwork.avalanche]: "https://api.avax.network/ext/bc/C/rpc",
  [eAvalancheNetwork.fuji]: "https://api.avax-test.network/ext/bc/C/rpc",
  [eFantomNetwork.main]: "https://rpc.ftm.tools/",
  [eFantomNetwork.testnet]: "https://rpc.testnet.fantom.network/",
  [eOptimismNetwork.testnet]: `https://opt-goerli.g.alchemy.com/v2/demo`,
  [eOptimismNetwork.main]: `https://mainnet.optimism.io`,
  [eEthereumNetwork.goerli]: `https://eth-goerli.alchemyapi.io/v2/${getAlchemyKey(eEthereumNetwork.goerli)}`,
  [eEthereumNetwork.sepolia]: `https://eth-sepolia.g.alchemy.com/v2/${getAlchemyKey(eEthereumNetwork.sepolia)}`,
  [eArbitrumNetwork.goerliNitro]: `https://goerli-rollup.arbitrum.io/rpc`,
};

export const LIVE_NETWORKS: iParamsPerNetwork<boolean> = {
  [eEthereumNetwork.main]: true,
  [ePolygonNetwork.polygon]: true,
  [eArbitrumNetwork.arbitrum]: true,
  [eHarmonyNetwork.main]: true,
  [eAvalancheNetwork.avalanche]: true,
  [eFantomNetwork.main]: true,
  [eOptimismNetwork.main]: true,
};

export const getCommonNetworkConfig = (networkName: eNetwork, chainId?: number): HttpNetworkUserConfig => {
  return {
    url: NETWORKS_RPC_URL[networkName] || "",
    chainId,
    gasPrice: "auto",
    saveDeployments: true,
    accounts: {
      mnemonic: MNEMONIC,
      path: MNEMONIC_PATH,
      initialIndex: 0,
      count: 10,
    },
    live: LIVE_NETWORKS[networkName] || false,
  };
};

export const buildForkConfig = (): HardhatNetworkForkingUserConfig | undefined => {
  let forkMode: HardhatNetworkForkingUserConfig | undefined;
  if (FORK && NETWORKS_RPC_URL[FORK]) {
    forkMode = {
      url: NETWORKS_RPC_URL[FORK] as string,
    };
    if (FORK_BLOCK_NUMBER) {
      forkMode.blockNumber = FORK_BLOCK_NUMBER;
    }
  }
  return forkMode;
};

export const hardhatNetworkSettings: HardhatNetworkUserConfig = {
  gasPrice: "auto",
  initialBaseFeePerGas: 0,
  blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
  throwOnTransactionFailures: true,
  throwOnCallFailures: true,
  chainId: 31337,
  forking: buildForkConfig(),
  saveDeployments: true,
  allowUnlimitedContractSize: true,
  tags: ["local"],
  accounts:
    FORK && !!MNEMONIC
      ? {
          mnemonic: MNEMONIC,
          path: MNEMONIC_PATH,
          initialIndex: 0,
          count: 10,
        }
      : undefined,
};

export const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY || "";

export const networkConfig: ChainNetworkConfigType = {
  31337: {
    name: "hardhat",
    chainLink: {
      GET_uint256_JOB: DEFAULT_JOB_ID,
      ORACLE: DEFAUlT_LINK_ORACLE,
      KEEPER_UPDATE_INTERVAL: 3600,
      TRUFFLATION_JOB_ID: DEFAULT_JOB_ID,
      TRUFFLATION_ORACLE: DEFAULT_TRUFFLATION_ORACLE_ID,
      FEE: DEFAULT_FEE,
      REGISTER: DEFAULT_KEEP_REGISTRY,
      TRUFFLATION_FEE: DEFAULT_FEE,
    },
  },
  1: {
    name: "mainnet",
    supportedToken: {
      DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
      USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      WBTC: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      SUSHI: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
      AAVE: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      CRV: "0xD533a949740bb3306d119CC777fa900bA034cd52",
    },
    priceFeeds: {
      DAIUSD: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
      ETHUSD: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
      WETHUSD: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
      USDCUSD: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
      USDTUSD: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
      WBTCUSD: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      LINKUSD: "0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c",
      SUSHIUSD: "0xCc70F09A6CC17553b2E31954cD36E4A2d89501f7",
      AAVEUSD: "0x547a514d5e3769680Ce22B2361c10Ea13619e8a9",
      CRVUSD: "0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f",
    },
    dataFeeds: {},
  },
  11155111: {
    name: "sepolia",
    supportedToken: {
      WETH: "0xBbaace5262774cf7411bb846a815b3f38B8610ea",
      DAI: "0x6e56Ce771bD3778372E4208299D73a845d369947",
      USDC: "0xFF7e61BdA50A66A99e680f2482436f6484bBa5E9",
      USDT: "0x858180d26549c90033778a16B87A8b1810449d3e",
      WBTC: "0xCF55b24c09C98D02e513EC50BEcbC9D34e46f0fD",
      LINK: "0xC5ac1642F0752CF5CeAcdBA4a69F62e7cEEAcf7b",
      SUSHI: "0x5CC5D75806402CcAcE3354C022Df6889bb8f3eaA",
      AAVE: "0xdFB3c623133B90c66A85cbA91EDeD155300811c7",
      CRV: "0x26e89A7A7Fb58c8cc4Ac66F349D04065996bd426",
    },
    priceFeeds: {
      ETHUSD: "0x1a81afB8146aeFfCFc5E50e8479e826E7D55b910",
      WETHUSD: "0x1a81afB8146aeFfCFc5E50e8479e826E7D55b910",
      LINKUSD: "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E",
      DAIUSD: "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19",
      WBTCUSD: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
    },
    dataFeeds: {
      "ETHAPR30-Day": "0xceA6Aa74E6A86a7f85B571Ce1C34f1A60B77CD29",
      "ETHAPR90-Day": "0x7422A64372f95F172962e2C0f371E0D9531DF276",
      "BTCIRBC1-Day": "0x7DE89d879f581d0D56c5A7192BC9bDe3b7a9518e",
      "BTCIRBC1-Week": "0x2583E47DF3F959B055F4Efa90C4927658669F499",
    },
    uniswap: {
      WETH_ADDRESS: "0x9764Da7ED8efA36E639D223b4BB77018C97beeD8",
      FACTORY_ADDRESS: "0x1ebccAB91B691CB2A284d03c79A0fA983a4915D9",
      SWAP_ROUTER_ADDRESS: "0xC27EcC9dB910c18325277fd682f3082D95594d56",
      NFT_DESCRIPTOR_ADDRESS: "0x0CF3a1B58D8ADa88AB1d29c2318c2a74204a83bE",
      POSITION_DESCRIPTOR_ADDRESS: "0x187e6FE766baB1bc404Cbdc8f79F5B37718F760E",
      POSITION_MANAGER_ADDRESS: "0x082049780E461721b80BE68A5d86206431ECd74F",
    },
    chainLink: {
      GET_uint256_JOB: "ca98366cc7314957b8c012c72f05aeeb",
      ORACLE: "0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD",
      KEEPER_UPDATE_INTERVAL: 3600,
      TRUFFLATION_JOB_ID: DEFAULT_JOB_ID,
      TRUFFLATION_ORACLE: DEFAULT_TRUFFLATION_ORACLE_ID,
      TRUFFLATION_FEE: DEFAULT_FEE,
      FEE: DEFAULT_FEE,
      REGISTER: DEFAULT_KEEP_REGISTRY,
    },
  },
  80001: {
    name: "mumbai",
    subscriptionId: "1884",
    keepersUpdateInterval: "30",
    callbackGasLimit: "500000",
    supportedToken: {
      // Tokens Address
      WETH: "",
      DAI: "",
      USDC: "",
      USDT: "",
      WBTC: "",
      SUSHI: "",
      AAVE: "",
      CRV: "",
    },
    priceFeeds: {
      ETHUSD: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
      WETHUSD: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
      LINKUSD: "0x1C2252aeeD50e0c9B64bDfF2735Ee3C932F5C408",
      DAIUSD: "0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046",
      WBTCUSD: "0x007A22900a3B98143368Bd5906f8E17e9867581b",
    },
  },
};

export const developmentChain = ["hardhat", "localhost"];

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployTimeBasedSubscriptions } from "../helpers/contract-deployments";
import { REGISTRAR, UPDATEINTERVAL } from "../helpers/constants";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployTimeBasedSubscriptionsContract: DeployFunction = async function ({
  deployments,
}: HardhatRuntimeEnvironment) {
  const { log } = deployments;
  // const networkName = getNetworkName();
  // const supportedTokens = await getSupportedTokens(networkName);
  // const supportedTokensPriceFeeds = await getChainlinkPriceOracles(networkName);
  //const supportedDataFeedKeys = await getSupportedDataFeeds(networkName);
  //const { assets, sources } = mapTokenAddressToPriceFeeds(supportedTokens, supportedTokensPriceFeeds, networkName);

  //const oracleId = (await deployments.get("DinamikoFeedOracle")).address;
  //const link = (await deployments.get("LinkToken")).address;
  const registrar = REGISTRAR; //The address of the Chainlink Automation registry contract - adjust with the correct value
  const updateInterval = UPDATEINTERVAL;
  //const transactionsAddress = (await deployments.get("Transactions")).address; //??
  //const usdtAddress = (await deployMockToken("USDT", MOCK_TOKEN_LIST["USDT"])).address; //??

  const link = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; //Link token address
  const transactionsAddress = "0x0000000000000000000000000000000000000000"; //Random number for testing - necessary to adjust woth the deployment address of Transaction.sol
  const usdtAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; //USDT token address

  log("Deploying Time Based Subscriptions ...");
  console.log(
    "Link address:",
    link,
    "\n",
    "Keeper registry:",
    registrar,
    "\n",
    "Update time interval:",
    updateInterval,
    "\n",
    "Transaction address:",
    transactionsAddress,
    "\n",
    "USDT Address:",
    usdtAddress,
    "\n",
  );
  await deployTimeBasedSubscriptions(link, transactionsAddress, usdtAddress);
};

export default deployTimeBasedSubscriptionsContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployTimeBasedSubscriptionsContract.tags = ["TimeBasedSubscriptions"];

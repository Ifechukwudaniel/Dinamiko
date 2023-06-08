const contracts = {
  31337: [
    {
      name: "hardhat",
      chainId: "31337",
      contracts: {
        "EthBalanceMonitor-b6a5c332-cfb3-4f9e-b4d1-2e18a7f5907f": {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "keeperRegistryAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "minWaitPeriodSeconds",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "duplicate",
                  type: "address",
                },
              ],
              name: "DuplicateAddress",
              type: "error",
            },
            {
              inputs: [],
              name: "InvalidWatchList",
              type: "error",
            },
            {
              inputs: [],
              name: "OnlyKeeperRegistry",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountAdded",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newBalance",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "FundsAdded",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountWithdrawn",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "payee",
                  type: "address",
                },
              ],
              name: "FundsWithdrawn",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "oldAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newAddress",
                  type: "address",
                },
              ],
              name: "KeeperRegistryAddressUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "oldMinWaitPeriod",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newMinWaitPeriod",
                  type: "uint256",
                },
              ],
              name: "MinWaitPeriodUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "OwnershipTransferRequested",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Paused",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
              ],
              name: "TopUpFailed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
              ],
              name: "TopUpSucceeded",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Unpaused",
              type: "event",
            },
            {
              inputs: [],
              name: "acceptOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              name: "checkUpkeep",
              outputs: [
                {
                  internalType: "bool",
                  name: "upkeepNeeded",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "performData",
                  type: "bytes",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "targetAddress",
                  type: "address",
                },
              ],
              name: "getAccountInfo",
              outputs: [
                {
                  internalType: "bool",
                  name: "isActive",
                  type: "bool",
                },
                {
                  internalType: "uint96",
                  name: "minBalanceWei",
                  type: "uint96",
                },
                {
                  internalType: "uint96",
                  name: "topUpAmountWei",
                  type: "uint96",
                },
                {
                  internalType: "uint56",
                  name: "lastTopUpTimestamp",
                  type: "uint56",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getKeeperRegistryAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "keeperRegistryAddress",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getMinWaitPeriodSeconds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getUnderfundedAddresses",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getWatchList",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "pause",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "paused",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "performData",
                  type: "bytes",
                },
              ],
              name: "performUpkeep",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "keeperRegistryAddress",
                  type: "address",
                },
              ],
              name: "setKeeperRegistryAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "period",
                  type: "uint256",
                },
              ],
              name: "setMinWaitPeriodSeconds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "addresses",
                  type: "address[]",
                },
                {
                  internalType: "uint96[]",
                  name: "minBalancesWei",
                  type: "uint96[]",
                },
                {
                  internalType: "uint96[]",
                  name: "topUpAmountsWei",
                  type: "uint96[]",
                },
              ],
              name: "setWatchList",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "needsFunding",
                  type: "address[]",
                },
              ],
              name: "topUp",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "unpause",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "address payable",
                  name: "payee",
                  type: "address",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;

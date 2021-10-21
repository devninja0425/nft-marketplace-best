require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";
const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    // hardhat: {
    //   chainId: 1337
    // },
    mumbai: {
      // Infura
      url: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
      accounts: [privateKey]
    },
    matic: {
      // Infura
      url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      accounts: [privateKey]
    },

    rinkeby: {
      // Infura
      url: `https://rinkeby.infura.io/v3/${infuraId}`,
      accounts: [privateKey]
    },
    bsctestnet:{
      url:"https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};


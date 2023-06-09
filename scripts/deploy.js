const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();
  console.log("nftMarket deployed to:", nftMarket.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftMarket.address);
  await nft.deployed();
  console.log("nft deployed to:", nft.address);

  // const MHT = await hre.ethers.getContractFactory("MHT");
  // const mht = await MHT.deploy();
  // await mht.deployed();
  // console.log("mhtoken deployed to:", mht.address);

  // let config = `
  // export const nftmarketaddress = "${nftMarket.address}"
  // export const nftaddress = "${nft.address}"
  // export const mhtaddress = "${mht.address}"
  // export const rpc_url = "https://data-seed-prebsc-1-s1.binance.org:8545"
  // `
  
  let config = `
  export const nftmarketaddress = "${nftMarket.address}"
  export const nftaddress = "${nft.address}"
  export const rpc_url = "https://data-seed-prebsc-1-s1.binance.org:8545"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

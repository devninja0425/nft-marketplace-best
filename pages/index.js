import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import Hero from '../components/Hero/Hero';
// import Auctions from '../components/Auctions/AuctionsOne';
// import Explore from '../components/Explore/ExploreOne';

import {
  // mhtaddress,
  nftaddress, nftmarketaddress, rpc_url
} from '../config'

// import MHT from '../artifacts/contracts/MHT.sol/MHT.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {    
    const provider = new ethers.providers.JsonRpcProvider(rpc_url)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

    // const mhtcontract = new ethers.Contract(mhtaddress, MHT.abi, signer)
    // mhtcontract.approve(nftmarketaddress, price)
    // const transaction = await contract.createMarketSale(nftaddress, mhtaddress, nft.tokenId, {
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }

  
  if (loadingState === 'loaded' && !nfts.length) return (
    <section className="explore-area">
      <div className="container">
        <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
      </div>
    </section>
  )
  return (
    <div>
      <Hero />
      <section className="explore-area mt-0">
        <div className="container">
          {/* Intro */}
          <div className="intro mb-1 mb-lg-1">
            <div className="intro-content">
                <span>Explore</span>
                <h3 class="mt-3 mb-0">Exclusive Digital Assets</h3>
            </div>
          </div>
          <div className="row items">
              {nfts.map((nft, idx) => {
                  return (
                      <div key={idx} className="col-12 col-sm-6 col-lg-3 item" >
                            <div className="card">
                                <div className="image-over">
                                    <img className="card-img-top" src={nft.image} alt="" />
                                </div>

                                {/* Card Caption */}
                                <div className="card-caption col-12 p-0">
                                
                                    {/* Card Body */}
                                    <div className="card-body">
                                        <h5 className="mb-0">{nft.name}</h5>
                                        <div className="seller d-flex align-items-center my-3">
                                            <span>Description</span>
                                              <h6 className="ml-2 mb-0">{nft.description}</h6>
                                        </div>
                                
                                        <div className="card-bottom d-flex justify-content-between">
                                            <span>{nft.price} ETH</span>
                                        </div>
                                
                                        <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buyNft(nft)}><i className="icon-handbag mr-2" />Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
          </div>
        </div>
      </section>
    </div>
  )
}
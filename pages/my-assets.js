import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()
    
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
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }

  if (loadingState === 'loaded' && !nfts.length) return (
    <section className="explore-area">
      <div className="container">
        <h1 className="px-20 py-10 text-3xl">No assets owned</h1>
      </div>
    </section>
  )
  return (
    <div>
      {/* <Breadcrumb title="My assets" page="My assets owned" /> */}
      <section className="explore-area">
        <div className="container">
          {/* Intro */}
          <div className="intro mt-5 mt-lg-5 mb-1 mb-lg-1">
            <div className="intro-content">
                <span>My digital assets</span>
            </div>
          </div>
          <div className="row items explore-items">
              {nfts.map((nft, idx) => {
                  return (
                      <div key={idx} className="col-12 col-sm-6 col-lg-3 item explore-item" >
                        <div className="card">
                            <div className="image-over">
                                <img className="card-img-top" src={nft.image} alt="" />
                            </div>
                            {/* Card Caption */}
                            <div className="card-caption col-12 p-0">
                                {/* Card Body */}
                                <div className="card-body">
                                    <div className="card-bottom d-flex justify-content-between">
                                        <span>{nft.price} BNB</span>
                                    </div>
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
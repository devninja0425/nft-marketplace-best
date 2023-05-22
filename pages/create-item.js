import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

const ipfsUrl = 'https://ipfs.io/ipfs/';
const client = ipfsHttpClient(ipfsUrl);

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `${ipfsUrl}${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = ipfsUrl + added.path;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

  return (
    <div className="mt-5">
      {/* <Breadcrumb title="My assets" page="My assets owned" /> */}
      <section className="author-area">
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-12 col-md-7">
                    {/* Intro */}
                    <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                        <div className="intro-content">
                            <span>Create Item</span>
                        </div>
                    </div>
                    {/* Item Form */}
                    <form className="item-form card no-hover">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" placeholder="Asset Name" required="required" onChange={e => updateFormInput({ ...formInput, name: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <textarea className="form-control" placeholder="Asset Description" cols={30} rows={3} defaultValue={""} onChange={e => updateFormInput({ ...formInput, description: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Asset Price" required="required" onChange={e => updateFormInput({ ...formInput, price: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="input-group form-group">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="inputGroupFile01" name="Asset" onChange={onChange}/>
                                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                              {
                                fileUrl && (
                                  <img className="rounded mt-4" width="350" src={fileUrl} />
                                )
                              }
                            </div>
                            <div className="col-12">
                                <button className="btn w-100 mt-3 mt-sm-4" type="button" onClick={createMarket}>Create Digital Asset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>    
  )
}
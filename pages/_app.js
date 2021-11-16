import { useEffect, useState } from 'react'
import Web3Modal from "web3modal"
import { ethers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'

import '../styles/globals.css'
import Footer from '../components/Footer/Footer';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

import {
    // mhtaddress,
    nftaddress
} from '../config'

function Marketplace({ Component, pageProps }) {
  const [wallet, setWallet] = useState('Connect Wallet')

    async function connectWallet() {
        //  const providerOptions = {
        //     /* See Provider Options Section */
        //     metamask: {
        //         id: "injected",
        //         name: "MetaMask",
        //         type: "injected",
        //         check: "isMetaMask"
        //     },
        //     walletconnect: {
        //         package: WalletConnectProvider,
        //         options: {
        //             // Mikko's test key - don't copy as your mileage may vary
        //             infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
        //         }
        //     },
        // };

        const web3Modal = new Web3Modal({
            // network: "bsctestnet",
            // providerOptions,
            cacheProvider: false,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const accountAddress = await signer.getAddress()

        console.log("Account:", accountAddress)
        setWallet(accountAddress)
    }

  return (
    <div className="main">
      <header id="header">
        {/* Navbar */}
        <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
            <div className="container header">
                {/* Navbar Brand*/}
                <a className="navbar-brand" href="/">
                    <img className="navbar-brand-sticky" src="../assets/img/logo.png" alt="sticky brand-logo" />
                </a>
                <div className="ml-auto" />
                {/* Navbar */}
                <ul className="navbar-nav items mx-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/create-item" className="nav-link">Sell Digital Asset</a>
                    </li>
                    <li className="nav-item">
                        <a href="/my-assets" className="nav-link">My Digital Assets</a>
                    </li>
                    <li className="nav-item">
                        <a href="/creator-dashboard" className="nav-link">Creator Dashboard</a>
                    </li>
                </ul>

                {/* Navbar Toggler */}
                <ul className="navbar-nav toggle">
                    <li className="nav-item">
                        <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                            <i className="fas fa-bars toggle-icon m-0" />
                        </a>
                    </li>
                </ul>
                {/* Navbar Action Button */}
                <ul className="navbar-nav action">
                    <li className="nav-item ml-3">
                        <button className="btn ml-lg-auto btn-bordered-white" id="wallet-address" onClick={connectWallet}><i className="icon-wallet mr-md-2" />{wallet}</button>
                    </li>
                </ul>
            </div>
        </nav>
      </header>
      <Component {...pageProps} />
      <div id="menu" className="modal fade p-0">
        <div className="modal-dialog dialog-animated">
            <div className="modal-content h-100">
                <div className="modal-header" data-dismiss="modal">
                    Menu <i className="far fa-times-circle icon-close" />
                </div>
                <div className="menu modal-body">
                    <div className="row w-100">
                        <div className="items p-0 col-12 text-center" />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Marketplace
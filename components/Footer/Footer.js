import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json-2/footer";

class Footer extends Component {
    state = {
        data: {},
        socialData: [],
        widgetData_1: [],
        widgetData_2: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    socialData: res.data.socialData,
                    widgetData_1: res.data.widgetData_1,
                    widgetData_2: res.data.widgetData_2
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <footer className="footer-area">
                {/* Footer Top */}
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-lg-3 res-margin">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Logo */}
                                    <a className="navbar-brand" href="/">
                                        <img src={this.state.data.img} alt="" />
                                    </a>
                                    <p>{this.state.data.content}</p>
                                    {/* Social Icons */}
                                    <div className="social-icons d-flex">
                                        {this.state.socialData.map((item, idx) => {
                                            return (
                                                <a key={`sd_${idx}`} className={item.link} href="#">
                                                    <i className={item.icon} />
                                                    <i className={item.icon} />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3 res-margin">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h4 className="footer-title">{this.state.data.widget_1}</h4>
                                    <ul>
                                        {this.state.widgetData_1.map((item, idx) => {
                                            return (
                                                <li key={`wdo_${idx}`}><a href="#">{item.text}</a></li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3 res-margin">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h4 className="footer-title">{this.state.data.widget_2}</h4>
                                    <ul>
                                        {this.state.widgetData_2.map((item, idx) => {
                                            return (
                                                <li key={`wdo_${idx}`}><a href="#">{item.text}</a></li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h4 className="footer-title">{this.state.data.widget_3}</h4>
                                    {/* Subscribe Form */}
                                    <div className="subscribe-form d-flex align-items-center">
                                        <input type="email" className="form-control" placeholder="info@yourmail.com" />
                                        <button type="submit" className="btn"><i className="icon-paper-plane" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* Copyright Area */}
                                <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                                    {/* Copyright Left */}
                                    <div className="copyright-left">©2021 NetStorm, All Rights Reserved.</div>
                                    {/* Copyright Right */}
                                    <div className="copyright-right">Made with <i className="fas fa-heart" /> By <a href="#">Themeland</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
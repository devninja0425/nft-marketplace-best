// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MHToken is ERC20 {
    constructor() ERC20("MHToken", "MHT") {
        _mint(msg.sender, 100000 * (10 ** 18));
    }

    fallback () external payable {
        revert();
    }

    receive () external payable {
        revert();
    }
}
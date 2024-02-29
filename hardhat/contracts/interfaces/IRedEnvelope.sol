// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IRedEnvelope {
    event GiftClaimed(address indexed recipient, address indexed token, uint256 amount);

    function claim(address user) external returns (uint32);
}

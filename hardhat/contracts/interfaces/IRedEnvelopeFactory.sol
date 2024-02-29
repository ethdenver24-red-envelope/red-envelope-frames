// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "./IRedEnvelope.sol";

interface IRedEnvelopeFactory {
    event RedEnvelopeCreated(
        IRedEnvelope indexed envelope, address indexed creator, address indexed token, uint256 numGifts
    );

    function create(address token, uint256 maxGifts, euint32 totalAmount) external returns (IRedEnvelope);
}

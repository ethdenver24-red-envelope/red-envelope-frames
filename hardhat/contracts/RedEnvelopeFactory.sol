// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "./EncryptedERC20.sol";
import "./RedEnvelope.sol";
import "./interfaces/IRedEnvelopeFactory.sol";

contract RedEnvelopeFactory is IRedEnvelopeFactory {
    RedEnvelope[] public envelopes;

    function create(address token, uint256 maxGifts, euint32 totalAmount) external returns (IRedEnvelope) {
        EncryptedERC20 erc20 = EncryptedERC20(token);
        RedEnvelope envelope = new RedEnvelope(msg.sender, erc20, maxGifts, totalAmount);
        envelopes.push(envelope);
        erc20.transferFrom(msg.sender, address(envelope), totalAmount);
        emit RedEnvelopeCreated(envelope, msg.sender, token, maxGifts);
        return envelope;
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "./EncryptedERC20.sol";
import "./interfaces/IRedEnvelope.sol";

contract RedEnvelope is IRedEnvelope {
    using TFHE for euint32;

    address public creator;
    EncryptedERC20 public token;
    uint256 public maxGifts;
    uint256 public claimedGifts;

    address[] internal _claimers;
    euint32[] internal _amounts;
    euint32 internal _topAmount;

    mapping(address => ebool) internal _claimed;
    mapping(address => uint32) internal _claimedAmounts;

    constructor(address _creator, EncryptedERC20 _token, uint256 _maxGifts, euint32 _totalAmount) {
        require(_maxGifts > 0, "maxGifts must be > 0");
        require(_maxGifts <= 5000, "maxGifts must be <= 5000");
        TFHE.optReq(_totalAmount.gt(0));

        creator = _creator;
        token = _token;
        maxGifts = _maxGifts;
        _amounts = new euint32[](_maxGifts);
        _claimers = new address[](_maxGifts);

        for (uint256 i; i < _maxGifts; ++i) {
            euint32 remainder = _totalAmount.rem(TFHE.decrypt(TFHE.randEuint32()));
            _amounts[i] = TFHE.cmux(TFHE.asEbool(i == _maxGifts - 1), _totalAmount, remainder);
            _topAmount = TFHE.cmux(_amounts[i].gt(_topAmount), _amounts[i], _topAmount);
            _totalAmount = _totalAmount.sub(remainder);
        }
    }

    function claim(address user) external returns (uint32) {
        TFHE.optReq(TFHE.asEbool(claimedGifts < maxGifts));
        TFHE.optReq(TFHE.not(_claimed[user]));

        euint32 amount = _amounts[claimedGifts];
        uint32 amountDecrypted = amount.decrypt();
        _claimers[claimedGifts] = user;
        _claimed[user] = TFHE.asEbool(true);
        _claimedAmounts[user] = amountDecrypted;
        claimedGifts += 1;

        token.transfer(user, amount);

        emit GiftClaimed(user, address(token), amountDecrypted);
        return amountDecrypted;
    }

    function getClaimers() external view returns (address[] memory) {
        address[] memory claimers = new address[](claimedGifts);
        for (uint256 i; i < claimedGifts; i++) {
            claimers[i] = _claimers[i];
        }
        return claimers;
    }

    function getClaimedAmount(address user) external view returns (uint32) {
        return _claimedAmounts[user];
    }
}

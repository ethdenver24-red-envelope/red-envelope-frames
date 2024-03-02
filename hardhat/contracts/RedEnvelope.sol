// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "./EncryptedERC20.sol";
import "./interfaces/IRedEnvelope.sol";

contract RedEnvelope is IRedEnvelope {
    using TFHE for *;

    address public factory;
    address public creator;
    EncryptedERC20 public token;
    uint256 public maxGifts;
    uint256 public claimedGifts;

    address[] internal _claimers;
    euint32[] internal _amounts;
    // euint32 internal _topAmount;

    mapping(address => bool) internal _claimed;
    mapping(address => uint32) internal _claimedAmounts;

    modifier onlyFactory() {
        require(msg.sender == factory, "RedEnvelope: only factory");
        _;
    }

    constructor(address _creator, EncryptedERC20 _token, uint256 _maxGifts) {
        require(_maxGifts > 0, "maxGifts must be > 0");
        require(_maxGifts <= 5000, "maxGifts must be <= 5000");

        factory = msg.sender;
        creator = _creator;
        token = _token;
        maxGifts = _maxGifts;
        _amounts = new euint32[](_maxGifts);
        _claimers = new address[](_maxGifts);
    }

    function setAmounts(bytes calldata _totalAmount) external {
        setAmounts(TFHE.asEuint32(_totalAmount));
    }

    function setAmounts(euint32 _totalAmount) public onlyFactory {
        uint256 _maxGifts = maxGifts;
        // _topAmount = TFHE.asEuint32(0);
        for (uint256 i; i < _maxGifts; ++i) {
            euint32 remainder = _totalAmount.rem(1);
            euint32 amount = TFHE.cmux(TFHE.asEbool(i == _maxGifts - 1), _totalAmount, remainder);
            _amounts[i] = amount;
            // _topAmount = TFHE.cmux(TFHE.gt(amount, _topAmount), amount, _topAmount);
            _totalAmount = _totalAmount.sub(remainder);
        }
    }

    function claim(address user) external returns (uint32) {
        TFHE.optReq(TFHE.asEbool(claimedGifts < maxGifts));
        TFHE.optReq(TFHE.asEbool(_claimed[user]));

        euint32 amount = _amounts[claimedGifts];
        uint32 amountDecrypted = amount.decrypt();
        _claimers[claimedGifts] = user;
        _claimed[user] = true;
        _claimedAmounts[user] = amountDecrypted;
        claimedGifts += 1;

        token.transfer(user, amount);

        emit GiftClaimed(user, address(token), amountDecrypted);
        return amountDecrypted;
    }

    function canClaim(address user) external view returns (bool) {
        return !_claimed[user] && claimedGifts < maxGifts;
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

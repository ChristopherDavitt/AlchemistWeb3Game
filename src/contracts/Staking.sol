// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Staking is ERC721Holder, Ownable {
    IERC721 public nft;
    IERC20 public berry;
    IERC20 public grape;
    uint public initialNumber;
    mapping(uint256 => address) public tokenOwnerOf;
    mapping(uint256 => uint256) public tokenStakedAt;

    constructor(address _nft, address _berry, address _grape) {
        nft = IERC721(_nft);
        berry = IERC20(_berry);
        grape = IERC20(_grape);
    }

    function stake(uint256 tokenId) external {
        nft.safeTransferFrom(msg.sender, address(this), tokenId);
        tokenOwnerOf[tokenId] = msg.sender;
        tokenStakedAt[tokenId] = block.timestamp;
    }

    function createRandom(uint number) public returns(uint){
        return uint(keccak256(abi.encodePacked(initialNumber++))) % number;
    }

    function unstake(uint256 tokenId) external {
        require(tokenOwnerOf[tokenId] == msg.sender, "Not Your NFT");
        require(tokenStakedAt[tokenId] + 60 seconds < block.timestamp, "Not Done With Quest Yet");
        for (uint i; i<3; i++){
            uint num = createRandom(255);

            // calling outside NFT mint functions for items...
            if (num <= 20){
                // mint this...
                berry.transfer(msg.sender, 1);
            } else if (num <= 100) {
                grape.transfer(msg.sender, 1);
            } else {
                berry.transfer(msg.sender, 1);
            }
        }
        nft.transferFrom(address(this), msg.sender, tokenId);
        delete tokenOwnerOf[tokenId];
        delete tokenStakedAt[tokenId];
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Staking is ERC721Holder, Ownable {
    // These are the contract addresses for each potion and NFT contract for staking
    IERC721 public nft;

    // Add ERC20 tokens available for each area
    IERC20 public berry;
    IERC20 public grape;
    uint public initialNumber;

    mapping(uint256 => address) public tokenOwnerOf;
    mapping(uint256 => address) public potionOwnerOf;
    mapping(uint256 => uint256) public tokenStakedAt;
    mapping(address => uint256[]) public listOfNftStaked;

    constructor(address _nft, address _berry, address _grape) {
        nft = IERC721(_nft);
        berry = IERC20(_berry);
        grape = IERC20(_grape);
    }

    function stake(uint256 tokenId) external {
        nft.safeTransferFrom(msg.sender, address(this), tokenId);
        tokenOwnerOf[tokenId] = msg.sender;
        tokenStakedAt[tokenId] = block.timestamp;
        listOfNftStaked[msg.sender].push(tokenId);
    }

    function createRandom(uint number) public returns(uint){
        return uint(keccak256(abi.encodePacked(initialNumber++))) % number;
    }

    function unstake(uint256 tokenId) external {
        require(tokenOwnerOf[tokenId] == msg.sender, "Not Your NFT");
        require(tokenStakedAt[tokenId] + 60 seconds < block.timestamp, "Not Done With Quest Yet");
        for (uint i; i<3; i++){
            // creating random number (0 - 255)
            uint num = createRandom(255);

            // transferring ERC20 tokens...
            if (num <= 20){
                berry.transfer(msg.sender, 1);
            } else if (num <= 100) {
                grape.transfer(msg.sender, 1);
            } else {
                berry.transfer(msg.sender, 1);
            }
        }

        nft.transferFrom(address(this), msg.sender, tokenId);
        removeNFT(tokenId, msg.sender);
        delete tokenOwnerOf[tokenId];
        delete tokenStakedAt[tokenId];
    }

    function remove(uint256 _index, address _sender) internal {
        listOfNftStaked[_sender][_index] =  listOfNftStaked[_sender][listOfNftStaked[_sender].length - 1];
        listOfNftStaked[_sender].pop();
    }

    function removeNFT(uint256 _tokenId, address _sender) internal {
        for (uint256 i=0; i< listOfNftStaked[_sender].length; i++){
            if (listOfNftStaked[_sender][i] == _tokenId) {
                remove(i, _sender);
                return;
            }
        }
    }

    function getMapping(address _sender) public view returns(uint256[] memory) {
        return listOfNftStaked[_sender];
    }
}
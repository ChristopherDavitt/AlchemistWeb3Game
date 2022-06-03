// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PotionStaking is ERC721, ERC721Holder, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // These are the contract addresses for each potion
    IERC721 public selectivePotion;

    mapping(uint256 => address) public potionOwnerOf;
    mapping(uint256 => uint256) public potionStakedAt;

    constructor(address _selectivePotion) ERC721("CreatureName", "CTR") {
        selectivePotion = IERC721(_selectivePotion);
    }

    function stake(uint256 tokenId) external {
        nft.safeTransferFrom(msg.sender, address(this), tokenId);
        tokenOwnerOf[tokenId] = msg.sender;
        tokenStakedAt[tokenId] = block.timestamp;
    }

    function unstake(uint256 tokenId) external {
        require(tokenOwnerOf[tokenId] == msg.sender, "Not Your NFT");
        require(tokenStakedAt[tokenId] + 60 seconds < block.timestamp, "Not Done With Quest Yet");

        // Mint the new Creature
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        // Using OpenZeppelins burn() Function
        selectivePotion.burn(tokenId);
        delete potionOwnerOf[tokenId];
        delete potionStakedAt[tokenId];
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PotionBrew is ERC721, ERC721Holder, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Add ERC20 tokens available for each area
    IERC20 public berry;
    IERC20 public grape;

    constructor(address _berry, address _grape) ERC721("PotionName", "POT") {
        berry = IERC20(_berry);
        grape = IERC20(_grape);
    }

    function createPotion() external {
        require(berry.balanceOf(msg.sender) >= 1, "Not Enough Berry");
        require(grape.balanceOf(msg.sender) >= 1, "Not Enough Grape");
        berry.approve(msg.sender, 10);
        grape.approve(msg.sender, 10);

        // Send back to whatever quest address the quest gives out.
        berry.transfer(address(this), 1);
        grape.transfer(address(this), 1);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    
    function createPotionOwner() external onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
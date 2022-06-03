// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract PotionCreating is ERC721, ERC721Holder, Ownable {
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
        berry.transferFrom(msg.sender, address(this), 1);
        grape.transferFrom(msg.sender, address(this), 1);
        _mint(msg.sender);
        berry.burn(address(this), 1);
        grape.burn(address(this), 1);
    }
}
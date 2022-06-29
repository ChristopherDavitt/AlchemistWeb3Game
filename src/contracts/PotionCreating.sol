// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Item.sol";


contract PotionBrew is ERC20, ERC20Burnable, Ownable {

    // Add ERC20 tokens used to brew each potion
    IERC20 public berry;
    IERC20 public fungus;

    // Quest Address to send tokens back to
    address questArea1 = address(this);

    constructor(address _berry, address _fungus) ERC721("Potion Name", "Potion Name") {
        berry = Item(_berry);
        fungus = Item(_fungus);
    }

    function createPotion() external {
        require(berry.balanceOf(msg.sender) >= 1, "Not Enough Berry");
        require(fungus.balanceOf(msg.sender) >= 1, "Not Enough Fungus");
        berry.burnFrom(msg.sender, 1);
        fungus.burFrom(msg.sender, 1);
        _mint(msg.sender, 1)
    }

    function createPotionOwner() external onlyOwner {
        _mint(msg.sender, 1)
    }
}
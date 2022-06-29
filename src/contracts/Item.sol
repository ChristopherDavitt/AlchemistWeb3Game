// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Item is ERC20, ERC20Burnable, Ownable {
    constructor(
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
}

contract ItemFactory {
    event ERC20TokenCreated(address tokenAddress);

    function deployNewItem(
        string calldata name,
        string calldata symbol
    ) public returns (address) {
        Item t = new Item(
            name,
            symbol
        );
        emit ERC20TokenCreated(address(t));

        return address(t);
    }
}
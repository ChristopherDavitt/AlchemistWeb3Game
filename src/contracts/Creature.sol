// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CreatureBase is ERC721, Ownable {
    using Counters for Counters.Counter;

    address stakingContract;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Creature", "Creature") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://tbd";
    }

    function safeMint(address to) external {
        require(msg.sender == stakingContract, "Sorry You cant call this");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function changeStaking(address _stakingContract) external onlyOwner {
        stakingContract = _stakingContract;
    }
}
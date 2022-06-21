// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./CreatureERC721.sol";
import "./Item.sol";

contract QuestStaking is ERC721Holder, Ownable {
    IERC721 public alchemist;
    // These are the contract addresses for each potion
    Item public fishyPhilter;
    Item public electricVial;
    
    // These are the Creature Contracts that are internally callable on the unstake function
    CreatureBase public blupper;
    CreatureBase public tuk;
    
    // Add ERC20 tokens available for each area
    Item public kelp;
    Item public jelly;
    Item public mackerel;
    Item public giantTuna;
    Item public oysterShells;

    uint public initialNumber;

    mapping(uint256 => address) public tokenOwnerOf;
    mapping(uint256 => uint256) public tokenStakedAt;
    mapping(address => uint256[]) public listOfNftStaked;
    mapping(uint256 => uint8) public nftHaspotion;

    constructor(
        address _alchemist, 
        address _kelp, 
        address _jelly,
        address _mackerel, 
        address _giantTuna, 
        address _oysterShells, 
        address _blupper, 
        address _tuk,
        address _fishyPhilter,
        address _electricVial
        ) {
        alchemist = IERC721(_alchemist);
        // potion Initialization
        fishyPhilter = Item(_fishyPhilter);
        electricVial = Item(_electricVial);
        // Item Initialization
        kelp = Item(_kelp);
        jelly = Item(_jelly);
        mackerel = Item(_mackerel);
        giantTuna = Item(_giantTuna);
        oysterShells = Item(_oysterShells);
        // Creature Contract Initialization
        blupper = CreatureBase(_blupper);
        tuk = CreatureBase(_tuk);
    }

    function stake(uint256 tokenId, uint8 potionId) external {
        require(potionId >= 0 && potionId < 3, "Not a valid potionId");
        if (potionId == 1) {
            require (fishyPhilter.balanceOf(msg.sender) > 0, "potion not Found in Inventory");
            alchemist.safeTransferFrom(msg.sender, address(this), tokenId);
            tokenOwnerOf[tokenId] = msg.sender;
            tokenStakedAt[tokenId] = block.timestamp;
            listOfNftStaked[msg.sender].push(tokenId);
            nftHasPotion[tokenId] = 0
            fishyPhilter.burnFrom(msg.sender, 1);
            nftHaspotion[tokenId] = potionId;
        } else if (potionId == 2) {
            require (electricVial.balanceOf(msg.sender) > 0, "potion not Found in Inventory");
            alchemist.safeTransferFrom(msg.sender, address(this), tokenId);
            tokenOwnerOf[tokenId] = msg.sender;
            tokenStakedAt[tokenId] = block.timestamp;
            listOfNftStaked[msg.sender].push(tokenId);
            nftHasPotion[tokenId] = 0
            electricVial.burnFrom(msg.sender, 1);
            nftHaspotion[tokenId] = potionId;
        } else {
            alchemist.safeTransferFrom(msg.sender, address(this), tokenId);
            tokenOwnerOf[tokenId] = msg.sender;
            tokenStakedAt[tokenId] = block.timestamp;
            listOfNftStaked[msg.sender].push(tokenId);
            nftHasPotion[tokenId] = 0
        }

        
    }

    function createRandom(uint number) public returns(uint){
        return uint(keccak256(abi.encodePacked(initialNumber++))) % number;
    }

    function unstake(uint256 tokenId) external {
        require(tokenOwnerOf[tokenId] == msg.sender, "Not Your NFT");
        require(tokenStakedAt[tokenId] + 120 seconds < block.timestamp, "Not Done With Quest Yet");

        alchemist.transferFrom(address(this), msg.sender, tokenId);
        removeNFT(tokenId, msg.sender);
        delete tokenOwnerOf[tokenId];
        delete tokenStakedAt[tokenId];

        for (uint i; i<3; i++){
            // creating random number (0 - 255)
            uint num = createRandom(255);

            // transferring ERC20 tokens...
            if (num <= 50){
                kelp.transfer(msg.sender, 1);
            } else if (num <= 100) {
                jelly.transfer(msg.sender, 1);
            } else if (num <= 150) {
                giantTuna.transfer(msg.sender, 1);
            } else if (num <= 220) {
                oysterShells.transfer(msg.sender, 1);
            } else {
                mackerel.transfer(msg.sender, 1);
            }
        }
        if (nftHaspotion[tokenId] == 1) {
            blupper.safeMint(msg.sender);
        } else if (nftHaspotion[tokenId] == 2) {
            tuk.safeMint(msg.sender);
        } 

        delete nftHaspotion[tokenId];
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
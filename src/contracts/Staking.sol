// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./CreatureERC721.sol";

contract QuestStaking is ERC721Holder, Ownable {
    // Gives access to the contract to interact with the NFTs
    IERC721 public alchemist;

    // These are the contract addresses for each potion
    IERC20 public potion1;
    IERC20 public potion2;
    IERC20 public potion3;
    // etc...

    // These are the Creature Contracts that are internally callable on the unstake function
    CreatureBase public creatureName1;
    CreatureBase public creatureName2;
    CreatureBase public creatureName3;
    // etc...

    // Add ERC20 tokens available for each area
    IERC20 public berry;
    IERC20 public grape;
    IERC20 public fungus;
    // etc...

    uint public initialNumber;

    mapping(uint256 => address) public tokenOwnerOf;
    mapping(uint256 => address) public potionOwnerOf;
    mapping(uint256 => uint256) public tokenStakedAt;
    mapping(address => uint256[]) public listOfNftStaked;
    mapping(uint256 => uint256) public nftHasPotion;

    constructor(address _alchemist, address _berry, address _grape,
     address _fungus, address _creatureName1, address _creatureName2, address _creatureName3,
     address _potion1, address _potion2, address _potion3) {
        alchemist = IERC721(_alchemist);
        // Potion Initialization
        potion1 = IERC20(_potion1);
        potion2 = IERC20(_potion2);
        potion3 = IERC20(_potion3);
        // Item Initialization
        berry = IERC20(_berry);
        grape = IERC20(_grape);
        fungus = IERC20(_fungus);
        // Creature Contract Initialization
        creatureName1 = CreatureBase(_creatureName1);
        creatureName2 = CreatureBase(_creatureName2);
        creatureName3 = CreatureBase(_creatureName3);
    }

    function stake(uint256 tokenId) external {
        alchemist.safeTransferFrom(msg.sender, address(this), tokenId);
        tokenOwnerOf[tokenId] = msg.sender;
        tokenStakedAt[tokenId] = block.timestamp;
        listOfNftStaked[msg.sender].push(tokenId);
        nftHasPotion[tokenId] = 0;
    }

    function stakePotion(uint256 tokenId, uint256 potionId) external {
        require(tokenOwnerOf[tokenId] == msg.sender, "Not Your NFT");
        require(nftHasPotion[tokenId] == 0, "Potion Already Staked");
        require(potionId > 0 && potionId < 4, "Not a valid potionId");
        if (potionId == 1) {
            require (potion1.balanceOf(msg.sender) > 0, "Potion not Found in Inventory");
            potion1.transfer(address(this), 1);
            nftHasPotion[tokenId] = 1;
        } else if (potionId == 2) {
            require (potion2.balanceOf(msg.sender) > 0, "Potion not Found in Inventory");
            potion2.transfer(address(this), 1);
            nftHasPotion[tokenId] = 2;
        }
        else if (potionId == 3) {
            require (potion3.balanceOf(msg.sender) > 0, "Potion not Found in Inventory");
            potion3.transfer(address(this), 1);
            nftHasPotion[tokenId] = 3;
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

        for (uint256 i; i<3; i++){
            // creating random number (0 - 255)
            uint num = createRandom(255);

            // transferring ERC20 tokens...
            if (num <= 70){
                berry.transfer(msg.sender, 1);
            } else if (num <= 130) {
                grape.transfer(msg.sender, 1);
            } else {
                fungus.transfer(msg.sender, 1);
            }
        }

        if (nftHasPotion[tokenId] == 1) {
            creatureName1.safeMint(msg.sender);
        } else if (nftHasPotion[tokenId] == 2) {
            creatureName2.safeMint(msg.sender);
        } else if (nftHasPotion[tokenId] == 3) {
            creatureName3.safeMint(msg.sender);
        }

        delete nftHasPotion[tokenId];
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
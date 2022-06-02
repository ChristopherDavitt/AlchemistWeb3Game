// SPDX-Liscense_identifier: MIT

pragma solidity ^0.8.0;

contract RandomNumbers{

    uint[] public itemList;
    uint public initialNumber;

    function createRandom(uint number) public returns(uint){
        return uint(keccak256(abi.encodePacked(initialNumber++))) % number;
    }

    function getItems() external {
        for (uint i; i<3; i++){
            
            uint num = createRandom(255);

            // calling outside NFT mint functions for items...
            if (num <= 20){
                // mint this...
                itemList.push(1);
            } else if (num <= 100) {
                itemList.push(2);
            } else {
                itemList.push(3);
            }
        }
    }
}
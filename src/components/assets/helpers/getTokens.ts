import { ethers } from 'ethers';
import { stakingABI, alchemistABI,potionBrewABI, tokenABI, creatureABI } from './tokenABI';
import { creatures, oceanPotions, forestPotions,
        swampPotions, forestItems, swampItems, oceanItems,
        forestStaking, oceanStaking, swampStaking, forestCreatures, swampCreatures, oceanCreatures } from './contractAddresses';
import { useAppDispatch } from "../../store/hooks"

// export const berryAddress = '0xbaF4cf24911B2Bd5744De99C538eD9D14343E24D';
export const AlchemistNFTAddress = '0x229a658442fDAc37086440E809B7EC5E90C87406';
// export const grapeAddress = '0xABcd7bF65A21441910a31Df428762E6eB557dd63';
// export const fungusAddress = '0x2AEaF0B5BbD1862831589a11F82029C1aBEAd940';
// export const nftStakingAddress = '0xcf68D1f6206090F1D53F4b00dA1eB4981Af90D1E';
// export const potion1Address = '0x670e432945B22f278C8626bF2D4281bc285B7C3e';
// export const potion2Address = '0x9f6cAac27189fA0D51CfE7C122Abac60eF80a11f';
// export const potion3Address = '0x50Eb416211B7667a06031DA93A19Aa34173368B0';
// export const creature1Address = '0xFfd0f61495CCd026dAEfb898c11e719A6a133225';
// export const creature2Address = '0x7F4f0312EC3c15936a51989a8F9a372E270B0ed4';
// export const creature3Address = '0x293Be0842A38e18931719E2506e6fa4D303D203E';



export const getNftsStakedForest = async (address:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const nftStakingContract = new ethers.Contract(forestStaking, stakingABI, provider)
    try {
        const nftStakingBalance = await nftStakingContract.getMapping(address);
        const newArray:number[] = [];
        nftStakingBalance.forEach((e:any) => newArray.push(parseInt(e._hex, 16)))
        console.log(newArray)
        return newArray
    } catch (error) {
        console.log('Gettings NFT Staked ' + error)
        return []
    }
}
export const getNftsStakedSwamp = async (address:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const nftStakingContract = new ethers.Contract(swampStaking, stakingABI, provider)
    try {
        const nftStakingBalance = await nftStakingContract.getMapping(address);
        const newArray:number[] = [];
        nftStakingBalance.forEach((e:any) => newArray.push(parseInt(e._hex, 16)))
        console.log(newArray)
        return newArray
    } catch (error) {
        console.log('Gettings NFT Staked ' + error)
        return []
    }
}
export const getNftsStakedOcean = async (address:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const nftStakingContract = new ethers.Contract(oceanStaking, stakingABI, provider)
    try {
        const nftStakingBalance = await nftStakingContract.getMapping(address);
        const newArray:number[] = [];
        nftStakingBalance.forEach((e:any) => newArray.push(parseInt(e._hex, 16)))
        console.log(newArray)
        return newArray
    } catch (error) {
        console.log('Gettings NFT Staked ' + error)
        return []
    }
}

export const getNFTS = async (address: any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const alchemistNFTContract = new ethers.Contract(AlchemistNFTAddress, alchemistABI, provider)
    try {
        const nftBalance = await alchemistNFTContract.balanceOf(address);
        console.log('Getting Available NFTs: ' + nftBalance)
        
        const tokenIdArray = []
        for (let i=0; i<parseInt(nftBalance._hex, 16); i++) {
            const tokenId = await alchemistNFTContract.tokenOfOwnerByIndex(address, i)
            tokenIdArray.push(parseInt(tokenId._hex, 16))
        }

        console.log(tokenIdArray)
        return tokenIdArray
    } catch (error) {
        console.log('Gettings NFTs ' + error)
        return []
    }
}

export const getPotions = async(address:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const listOfTotalPotions = [];

    for (let i=0; i< forestPotions.length; i++){
        var potionContract = new ethers.Contract(forestPotions[i], creatureABI, provider)
        try {
            const potionBalance = await potionContract.balanceOf(address);
            listOfTotalPotions.push(parseInt(potionBalance._hex, 16))
        } catch (error) {
            console.log('Potions' + error)
            return []
        }
    }

    for (let i=0; i< swampPotions.length; i++){
        var potionContract = new ethers.Contract(swampPotions[i], creatureABI, provider)
        try {
            const potionBalance = await potionContract.balanceOf(address);
            listOfTotalPotions.push(parseInt(potionBalance._hex, 16))
        } catch (error) {
            console.log('Potions' + error)
            return []
        }
    }
    for (let i=0; i< oceanPotions.length; i++){
        var potionContract = new ethers.Contract(oceanPotions[i], creatureABI, provider)
        try {
            const potionBalance = await potionContract.balanceOf(address);
            listOfTotalPotions.push(parseInt(potionBalance._hex, 16))
        } catch (error) {
            console.log('Potions' + error)
            return []
        }
    }

    return listOfTotalPotions

}

export const getItems = async(address:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const listOfTotalItems = [];

    for (let i=0; i< forestItems.length; i++){
        var itemContract = new ethers.Contract(forestItems[i], creatureABI, provider)
        try {
            const itemBalance = await itemContract.balanceOf(address);
            listOfTotalItems.push(parseInt(itemBalance._hex, 16))
        } catch (error) {
            console.log('Items' + error)
            return []
        }
    }

    for (let i=0; i< swampItems.length; i++){
        var itemContract = new ethers.Contract(swampItems[i], creatureABI, provider)
        try {
            const itemBalance = await itemContract.balanceOf(address);
            listOfTotalItems.push(parseInt(itemBalance._hex, 16))
        } catch (error) {
            console.log('Items' + error)
            return []
        }
    }
    for (let i=0; i< oceanItems.length; i++){
        var itemContract = new ethers.Contract(oceanItems[i], creatureABI, provider)
        try {
            const itemBalance = await itemContract.balanceOf(address);
            listOfTotalItems.push(parseInt(itemBalance._hex, 16))
        } catch (error) {
            console.log('Items' + error)
            return []
        }
    }

    return listOfTotalItems

}

export const getCreatures = async(address:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const listOfCreatures: any[] = [];
    for (let i=0; i< creatures.length; i++){
        var creatureContract = new ethers.Contract(creatures[i], creatureABI, provider)
        try {
            const creatureBalance = await creatureContract.balanceOf(address);
            listOfCreatures.push(parseInt(creatureBalance._hex, 16))
        } catch (error) {
            console.log('Gettings Creatures' + error)
            return []
        }
    }
    return listOfCreatures
}

export const getApproved = async(address:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const nftContract = new ethers.Contract(AlchemistNFTAddress, alchemistABI, provider)
    
    const stakingAddresses = [
        forestStaking, swampStaking, oceanStaking
    ];
    const boolArray: boolean[] = [];
    // rest of staking contracts
    try {
        for (let i= 0; i<stakingAddresses.length; i++){
            const approved = await nftContract.isApprovedForAll(address, stakingAddresses[i]);
            console.log(approved)
            boolArray.push(approved)
        }
        return boolArray
    } catch (error) {
        console.log('Gettings NFT Staked ' + error)
        return []
    }
}

export const transferTokens = async() => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    for (let i=0; i< forestItems.length; i++){
        var itemContract = new ethers.Contract(forestItems[i], tokenABI, signer)
        try {
            const tx = await itemContract.mint(forestStaking, 100000000);
            await tx.wait()
        } catch (error) {
            console.log('Items' + error)
        }
    }

    for (let i=0; i< swampItems.length; i++){
        var itemContract = new ethers.Contract(swampItems[i], tokenABI, signer)
        try {
            const tx = await itemContract.mint(swampStaking, 100000000);
            await tx.wait()
        } catch (error) {
            console.log('Items' + error)
        }
    }
    for (let i=0; i< oceanItems.length; i++){
        var itemContract = new ethers.Contract(oceanItems[i], tokenABI, signer)
        try {
            const tx = await itemContract.mint(oceanStaking, 100000000);
            await tx.wait()
        } catch (error) {
            console.log('Items' + error)
        }
    }
}

export const allowCreatureContracts = async() => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    for (let i=0; i< forestCreatures.length; i++){
        var creatureContract = new ethers.Contract(forestCreatures[i], creatureABI, signer)
        try {
            const tx = await creatureContract.changeStaking(forestStaking);
            await tx.wait()
        } catch (error) {
            console.log('Items' + error)
        }
    }

    for (let i=0; i< swampCreatures.length; i++){
        var creatureContract = new ethers.Contract(swampCreatures[i], creatureABI, signer)
        try {
            const tx = await creatureContract.changeStaking(swampStaking);
            await tx.wait()
        } catch (error) {
            console.log('Items' + error)
        }
    }
    for (let i=0; i< oceanCreatures.length; i++){
        var creatureContract = new ethers.Contract(oceanCreatures[i], creatureABI, signer)
        try {
            const tx = await creatureContract.changeStaking(oceanStaking);
            await tx.wait()
        } catch (error) {
            console.log('Items' + error)
        }
    }
}
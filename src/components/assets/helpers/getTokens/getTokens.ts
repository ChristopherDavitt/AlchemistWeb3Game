import { ethers } from 'ethers';
import { stakingABI, alchemistABI,potionBrewABI, tokenABI, creatureABI } from '../../abis/tokenABI'
import { useAppDispatch } from "../../../store/hooks"

export const berryAddress = '0xbaF4cf24911B2Bd5744De99C538eD9D14343E24D';
export const AlchemistNFTAddress = '0x229a658442fDAc37086440E809B7EC5E90C87406';
export const grapeAddress = '0xABcd7bF65A21441910a31Df428762E6eB557dd63';
export const fungusAddress = '0x2AEaF0B5BbD1862831589a11F82029C1aBEAd940';
export const nftStakingAddress = '0xcf68D1f6206090F1D53F4b00dA1eB4981Af90D1E';
export const potion1Address = '0x670e432945B22f278C8626bF2D4281bc285B7C3e';
export const potion2Address = '0x9f6cAac27189fA0D51CfE7C122Abac60eF80a11f';
export const potion3Address = '0x50Eb416211B7667a06031DA93A19Aa34173368B0';
export const creature1Address = '0xFfd0f61495CCd026dAEfb898c11e719A6a133225';
export const creature2Address = '0x7F4f0312EC3c15936a51989a8F9a372E270B0ed4';
export const creature3Address = '0x293Be0842A38e18931719E2506e6fa4D303D203E';


export const getNftsStakedForest = async (address:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const nftStakingContract = new ethers.Contract(nftStakingAddress, stakingABI, provider)
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
    const potion1Contract = new ethers.Contract(potion1Address, potionBrewABI, provider)
    const potion2Contract = new ethers.Contract(potion2Address, potionBrewABI, provider)
    const potion3Contract = new ethers.Contract(potion3Address, potionBrewABI, provider)
    try {
        const potion1Balance = await potion1Contract.balanceOf(address);
        const potion2Balance = await potion2Contract.balanceOf(address);
        const potion3Balance = await potion3Contract.balanceOf(address);
        console.log('Potion 1 Balance' + potion1Balance)
        const potionObject = [
            parseInt(potion1Balance._hex, 16),
            parseInt(potion2Balance._hex, 16),
            parseInt(potion3Balance._hex, 16),
        ]
        return potionObject
    } catch (error) {
        console.log('Gettings Potions ' + error)
        return []
    }
}

export const getItems = async(address:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const berryContract = new ethers.Contract(berryAddress, tokenABI, provider)
    const grapeContract = new ethers.Contract(grapeAddress, tokenABI, provider)
    const fungusContract = new ethers.Contract(fungusAddress, tokenABI, provider)

    try {
        const berryBalance = await berryContract.balanceOf(address);
        const grapeBalance = await grapeContract.balanceOf(address);
        const fungusBalance = await fungusContract.balanceOf(address);
        const itemObject = [
            parseInt(berryBalance._hex, 16),
            parseInt(grapeBalance._hex, 16),
            parseInt(fungusBalance._hex, 16),
        ]
        return itemObject
    } catch (error) {
        console.log('Gettings Items' + error)
        return []
    }
}

export const getCreatures = async(address:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const creature1Contract = new ethers.Contract(creature1Address, creatureABI, provider)
    const creature2Contract = new ethers.Contract(creature2Address, creatureABI, provider)
    const creature3Contract = new ethers.Contract(creature3Address, creatureABI, provider)
    try {
        const creature1Balance = await creature1Contract.balanceOf(address);
        const creature2Balance = await creature2Contract.balanceOf(address);
        const creature3Balance = await creature3Contract.balanceOf(address);
        console.log('Creature 1 Balance' + creature1Balance)
        const creatureObject = [
            parseInt(creature1Balance._hex, 16),
            parseInt(creature2Balance._hex, 16),
            parseInt(creature3Balance._hex, 16),
        ]
        return creatureObject
    } catch (error) {
        console.log('Gettings Creatures' + error)
        return []
    }
}
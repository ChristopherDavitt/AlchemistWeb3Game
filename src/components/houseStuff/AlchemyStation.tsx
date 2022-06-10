import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import {PotionBrew} from '../popups/PotionBrew';
import { potion3Address, potion1Address, potion2Address } from '../assets/contractAddresses/contractAddresses';

export const AlchemyStation = () => {
    const potionCount = useAppSelector((state) => state.potions)
    const itemCount = useAppSelector((state) => state.items)

    const [selectedPotionIngredients, setSeletedPotionIngredients] = useState<boolean[]>()
    const [potionBrewable, setBrewable] = useState<boolean>()
    const [costs, setCosts] = useState<number[]>()
    const [popUp, setPopUp] = useState<boolean>(false)
    const [potionAddress, setPotionAddress] = useState<string>()
    const [name, setName] = useState<string>()
    const [itemNameProps, setItemNameProps] = useState<string[]>()

    const potionAddresses = [
        potion1Address,
        potion2Address,
        potion3Address
    ]

    const itemNameDict = [
        'Berry', 'Grape', 'Fungus'
    ]
    const potionNameDict = [
        'Rejuvination', 'Flask of Potatoes', 'Philter of Fire'
    ]
    // potion dict to contain the index of items in the state variable
    const potionDict = [
        [0,1], [0,2], [1,2]
    ]

    const potionCosts = [
        [1,1], [1,1], [1,1]
    ]

    const handlePopUpClose = () => {
        setPopUp(false)
    }

    const selectPotion = (index: number) => {
        const boolArray: boolean[] = []
        var brewable = true
        const costArray = potionCosts[index]
        const itemNames:string[] = []
        for (let i=0; i< potionDict[index].length; i++) {
            if (potionCosts[index][i] > potionCount[potionDict[index][i]]) {
                boolArray.push(false)
                itemNames.push(itemNameDict[potionDict[index][i]])
                brewable = false
            } else {
                boolArray.push(true)
                itemNames.push(itemNameDict[potionDict[index][i]])
            }
        }
        setSeletedPotionIngredients(boolArray)
        setBrewable(brewable)
        setCosts(costArray)
        setPotionAddress(potionAddresses[index])
        setName(potionNameDict[index])
        setItemNameProps(itemNames)
        setPopUp(true)
    }

    // For the potion pop-up, we need ingredient names, boolArray, costs, and brewable attribute

    return (
        <div style={{display: 'grid', justifyItems: 'center', alignItems: 'center' }}>
            { popUp ? <><button style={{position: 'fixed',
                                        border: 'solid 2px black',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        cursor: 'pointer',
                                        top: '70px',
                                        left: 'calc(100% - 65px)',
                                        fontSize: '30px',
                                        zIndex: '1000'}} onClick={handlePopUpClose}>X</button><PotionBrew 
                                                                                                boolArray={selectedPotionIngredients}
                                                                                                contractAddress={potionAddress}
                                                                                                costArray={costs}
                                                                                                name={name} 
                                                                                                brewable={potionBrewable}
                                                                                                itemName={itemNameProps}
                                                                                                 /></> : null }
            <h1 style={{color: 'white', textAlign: 'center'}}>Recipe Book</h1>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                {potionCount.map((value: number, index: number) => 
                    <div onClick={() => selectPotion(index)} key={index} style={{display: 'flex', cursor: 'pointer'}}>
                        <h6>{potionNameDict[index]}</h6>
                    </div>
                )}
            </div>

            <Link to={'/app/house'} className='auth'><h3 className='quest-map'>Back to House {'-->'}</h3></Link>
        </div>
    )
}
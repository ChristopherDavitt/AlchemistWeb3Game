import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import {PotionBrew} from '../popups/PotionBrew';
import { potion3Address, potion1Address, potion2Address } from '../assets/contractAddresses/contractAddresses';
import Popup from '../popups/PopUp';

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
    const [id, setId] = useState<number>()
    const [itemIds, setItemIds] = useState<number[]>()

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
        setItemIds(potionDict[index])
        setSeletedPotionIngredients(boolArray)
        setBrewable(brewable)
        setCosts(costArray)
        setPotionAddress(potionAddresses[index])
        setName(potionNameDict[index])
        setItemNameProps(itemNames)
        setId(index+1)
        setPopUp(true)
    }

    // For the potion pop-up, we need ingredient names, boolArray, costs, and brewable attribute

    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: 'black',}}>
            { popUp && <Popup handleClose={handlePopUpClose} content={<PotionBrew boolArray={selectedPotionIngredients} 
                                         contractAddress={potionAddress} costArray={costs} id={id} itemIds={itemIds}
                                         name={name} brewable={potionBrewable} itemName={itemNameProps} />}/> }

            <h1 style={{color: 'white', textAlign: 'center'}}>Recipe Book</h1>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                         alignItems: 'center', justifyItems: 'left', maxWidth: '500px', margin: ' 10px auto'}}>
                <p style={{fontSize:'12px'}}>Forest</p>
                <input id='forest' type="checkbox" />
                <p style={{fontSize:'12px'}}>Ocean</p>
                <input id='ocean' type="checkbox" />
                <p style={{fontSize:'12px'}}>Caves</p>
                <input id='caves' type="checkbox" />
                <p style={{fontSize:'12px'}}>Mountains</p>
                <input id='mountain' type="checkbox" />
                <p style={{fontSize:'12px'}}>Swamp</p>
                <input id='swamp' type="checkbox" />
                <p style={{fontSize:'12px'}}>Tundra</p>
                <input id='tundra' type="checkbox" />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '520px', border: 'double 5px white', 
                        paddingLeft: '0.5rem', justifyContent: 'center', alignItems: 'center', margin: '1rem auto'}}>
                {potionCount.map((value: number, index: number) => 
                    <div onClick={() => selectPotion(index)} key={index} style={{display: 'flex', 
                                                                                alignItems: 'center', 
                                                                                cursor: 'pointer',
                                                                                 justifyContent: 'left'}}>
                        <p style={{fontSize: '12px'}}>#{index + 1} {potionNameDict[index]}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
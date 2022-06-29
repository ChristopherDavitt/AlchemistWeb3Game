import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { PotionBrew } from '../popups/PotionBrew';
import { potions } from '../assets/helpers/contractAddresses';
import Popup from '../popups/PopUp';

import loadingGif from '../assets/images/LoadingGif.gif'

export const AlchemyStation = () => {
    const potionCount = useAppSelector((state) => state.potions)
    const itemCount = useAppSelector((state) => state.items)
    const connected = useAppSelector((state) => state.connected)
    const loading = useAppSelector((state) => state.loading)

    const [selectedPotionIngredients, setSeletedPotionIngredients] = useState<boolean[]>()
    const [potionBrewable, setBrewable] = useState<boolean>()
    const [costs, setCosts] = useState<number[]>()
    const [popUp, setPopUp] = useState<boolean>(false)
    const [potionAddress, setPotionAddress] = useState<string>()
    const [name, setName] = useState<string>()
    const [itemNameProps, setItemNameProps] = useState<string[]>()
    const [id, setId] = useState<number>()
    const [itemIds, setItemIds] = useState<number[]>()
    const [txn, setTxn] = useState(false)

    // Checkboxes
    const [forest, setForest] = useState(false)
    const [mountains, setMountains] = useState(false)
    const [caves, setCaves] = useState(false)
    const [ocean, setOcean] = useState(false)
    const [tundra, setTundra] = useState(false)
    const [swamp, setSwamp] = useState(false)
    const [allLocs, setAllLocs] = useState(true)
  

    const itemNameDict = ['Bawnberry', 'Nickelstem', 'Valeria Pedals', 'Sugarbark', 'Caapi Root',
     'Honey Fungus', 'Mugwort', 'Eel', 'Water Lillies', 'Bottle o Bugs', 
     'Sugar Soot', 'Kelp', 'Jelly Jelly', 'Mackerel', 'Giant Tuna', 
     'Oyster Shells', 'OceanPearl']

    const potionNameDict = ['Ghibl Jam', 'Sweet Sea', 'Mycil Matte', 
    'Hoppity Tonic', 'Fishy Philter', 'Electric Vial', 'Turt Tonic']
  
    // potion dict to contain the index of items in the state variable
    const potionDict = [
        [0,3,5], [0, 14, 2], [4,5,6,10], [9,8], [15, 13], [12, 11, 1], [7, 16, 11]
    ]

    const potionCosts = [
        [1,1,1], [1,1,1], [1,1,1,1], [1,1], [1,1], [1,1,1], [1,1,1]
    ]

    const handlePopUpClose = () => {
        setPopUp(false)
    }

    const handleChange = (event:any) => {
        const name:string = event.target.name
        console.log(name)
        if (name == 'forest') {
          setForest(!forest)
        } else if (name == 'caves') {
          setCaves(!caves)
        } else if (name == 'ocean') {
          setOcean(!ocean)
        } else if (name == 'tundra') {
          setTundra(!tundra)
        } else if (name == 'swamp') {
          setSwamp(!swamp)
        } else if (name == 'mountains') {
          setMountains(!mountains)
        }
    }

    const checkAllLocs = () => {
        if (!forest && !caves && !mountains && !tundra && !ocean && !swamp) {
            setAllLocs(true);
        } else {
            setAllLocs(false);
        }
    }

    useEffect(() => {
        checkAllLocs();
    }, [forest, caves, mountains, ocean, tundra, swamp])


    const selectPotion = (index: number) => {
        const boolArray: boolean[] = []
        var brewable = true
        const costArray = potionCosts[index]
        const itemNames:string[] = []
        for (let i=0; i< potionDict[index].length; i++) {
            if (potionCosts[index][i] > itemCount[potionDict[index][i]]) {
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
        setPotionAddress(potions[index])
        setName(potionNameDict[index])
        setItemNameProps(itemNames)
        setId(index+1)
        setPopUp(true)
    }

    // For the potion pop-up, we need ingredient names, boolArray, costs, and brewable attribute

    return (
        <>
        {connected ? <div style={{ width: '100%', height: '100%', backgroundColor: 'black',}}>
            { popUp && <Popup handleClose={handlePopUpClose} content={<PotionBrew boolArray={selectedPotionIngredients} 
                                         contractAddress={potionAddress} costArray={costs} id={id} itemIds={itemIds}
                                         name={name} brewable={potionBrewable} itemName={itemNameProps} 
                                         handleClose={handlePopUpClose} />}/> }

            <h1 style={{margin: 0, textAlign: 'center'}}>Recipe Book</h1>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                         alignItems: 'center', justifyItems: 'left', maxWidth: '500px', margin: ' 10px auto'}}>
                <p style={{fontSize:'12px'}}>Forest</p>
                <input onChange={(e) => handleChange(e)} name='forest' type="checkbox" />
                <p style={{fontSize:'12px'}}>Ocean</p>
                <input onChange={(e) => handleChange(e)} name='ocean' type="checkbox" />
                <p style={{fontSize:'12px'}}>Caves</p>
                <input onChange={(e) => handleChange(e)} name='caves' type="checkbox" />
                <p style={{fontSize:'12px'}}>Mountains</p>
                <input onChange={(e) => handleChange(e)} name='mountains' type="checkbox" />
                <p style={{fontSize:'12px'}}>Swamp</p>
                <input onChange={(e) => handleChange(e)} name='swamp' type="checkbox" />
                <p style={{fontSize:'12px'}}>Tundra</p>
                <input onChange={(e) => handleChange(e)} name='tundra' type="checkbox" />
            </div>
            <div style={{display: 'grid', gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr', gridTemplateColumns: '1fr 1fr', maxWidth: '520px', maxHeight: '390px', height: '50vh',overflowY: 'auto', border: 'solid 3px white', borderRadius: '5px',  
                        paddingLeft: '0.5rem', justifyContent: 'center', alignItems: 'center', margin: '1rem auto'}}>
                {forest || allLocs ? potionCount.slice(0,2).map((value: number, index: number) => 
                    <div onClick={() => selectPotion(index)} key={index} style={{display: 'flex', 
                                                                                alignItems: 'center', 
                                                                                cursor: 'pointer',
                                                                                 justifyContent: 'left'}}>
                        <p style={{fontSize: '12px'}}>#{index + 1} {potionNameDict[index]}</p>
                    </div>
                ): null}
                {swamp || allLocs ? potionCount.slice(2,4).map((value: number, index: number) => 
                    <div onClick={() => selectPotion(index + 2)} key={index + 2} style={{display: 'flex', 
                                                                                alignItems: 'center', 
                                                                                cursor: 'pointer',
                                                                                 justifyContent: 'left'}}>
                        <p style={{fontSize: '12px'}}>#{index + 3} {potionNameDict[index + 2]}</p>
                    </div>
                ): null}
                {ocean || allLocs ? potionCount.slice(4,6).map((value: number, index: number) => 
                    <div onClick={() => selectPotion(index + 4)} key={index + 4} style={{display: 'flex', 
                                                                                alignItems: 'center', 
                                                                                cursor: 'pointer',
                                                                                 justifyContent: 'left'}}>
                        <p style={{fontSize: '12px'}}>#{index + 5} {potionNameDict[index + 4]}</p>
                    </div>
                ): null}
            </div>
        </div> : loading ? <div style={{width: '100%', height: '80vh', display: 'grid', 
                        justifyItems: 'center',alignContent: 'center', margin: 0}}>
                <p>Loading ...</p>
                <img src={loadingGif} alt="loading-gif" />
            </div> : !connected ? <div style={{width: '100%', height: '80vh', display: 'grid', 
                        justifyContent: 'center', alignItems: 'center'}}>
                <p>connect Wallet</p>
            </div>  : <p>Refresh Page</p>}
        </>
    )
}
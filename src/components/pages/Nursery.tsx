import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { creature1Address } from '../assets/contractAddresses/contractAddresses';
import { useAppSelector } from '../store/hooks';

export const Nursery =()=> {

    const creatureDict = [
        "Ghiblun", "Hoppunny", "Pluckinerr", "Flux", // Forest
        "Dirtruk", "Juepl", "Ghree", "Lundkrid", "Hazurk", // Forest
        "Gratur", "Phoog", "Skitt", "Swupix", "Caplin", "Crugley", // Swamp
        "Ingk", "Tuk", "Stagbu", "Creighb", "Ghoyster", "Ghoster", "Bol",  // Ocean
        "Turple", "Rainbo", "Blupper",                                    // Ocean
        "Furbat", "Geopul", "Crawk", "Mander", "Plubite", "Troglogbite", "Atelig", // Cave
        "Gohot", "Asgred", "Snuphex", "Cyl", "Hram", "Flutter",                     // Mtn
        "Icegol", "Lyr", "Engui", "Pubear", "Snuphex", "Walrax", "Moog", "Sussky"   // Tundra
    ]

    const descriptionDict = [
        "Hoppy creature that likes to eat small fruits. Found in Forest.",
        "Somewhat Like a bunny, but much smaller, and likes to spend time underground in the root systems of trees. Found in Forest",
        "Flying creature that has strong wings, and an even stronger beak. Spends time high up in trees. Found in Forest"
    ]

    const [width, setWindowWidth] = useState(0)
    const [mobile, setMobile] = useState(false)

    const count = useAppSelector((state)=> state.creatures)

    const [name, setName] = useState<string>('???')
    const [description, setDescription] = useState<string>('Unknown')
    const [idView, setIdView] = useState<string>('#0')
    const [idNumber, setIdNumber] = useState<string>('0')
    const [hiddenArray, setHiddenArray] = useState<boolean[]>([])
    const [creatures, setCreatures] = useState(false)
    
    // Image should correlate to the ipfs ID number
    const [image, setImage] = useState<string>('')

    useEffect(() => {
        const boolArray = []
        for (let i=0; i< count.length; i++) {
            if (count[i] > 0){
                boolArray.push(true)
            } else {
                boolArray.push(false)
            }
        }
        console.log('bool array rerendered')
        setHiddenArray(boolArray);
        updateDimensions();

        window.addEventListener("resize", updateDimensions);
        return () => 
            window.removeEventListener("resize",updateDimensions);
        }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        if (width < 767) {
            setMobile(true)
        } else {
            setMobile(false)
        }
        setWindowWidth(width)
        console.log('editing dimendions')
    }

    const handleCreatureState = (index: number) => {
        
        if (count[index] > 0) {
            setName(creatureDict[index])
            setIdView(`#${index+1}`)
            setDescription(descriptionDict[index])
            setIdNumber(String(index));
        } else {
            setName('???');
            setIdView('#0');
            setDescription('Unknown');
            setIdNumber(String(index));
        }

    }

    const findRegexMatch = (str: string) => {
        const reg = /\d{1,2}/;
        return str.match(reg)
    }

    const toggleShowCreatures = () => {  
        setCreatures(!creatures)
    }

    return (
        <div style={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
            }}>
            
            <h1 style={{color: 'white', textAlign: 'center'}}>{!mobile && 'Welcome to the '} Nursery</h1>
            <div style={!mobile ? {
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gap: '0.5rem',
                width: '700px'
                } : {display: 'grid',width: '100%'}}>
                    
                {!mobile ? <div className='creature-sidebar' style={{border: 'solid 2px white', height: '400px'}}>
                    {count.map((value: number, index: number) => 
                    // On click here, change state variables to pass through into the creatureBio
                        <div key={index} onClick={() => handleCreatureState(index)} style={{display: 'flex', color: 'white', justifyContent: 'space-between', border: 'solid 1px grey', padding: '0.5rem' }}>
                            {!hiddenArray[index] ? <h6>???</h6> : <h6>{creatureDict[index]}</h6> }
                            <h6>#{index + 1}</h6>
                        </div>
                    )}
                </div> : null}
                

                <div className='creature-bio' style={{border: 'solid 2px white', margin: 'auto',
                 width: `${mobile ? '350px' : '100%'}`, minWidth: '350px', maxWidth: '500px', height: '400px', overflow: 'auto', display: 'grid', justifyItems: 'center' }} >
  
                    {/* ipfs://fdfahvur/{id}.json */}
                    {!mobile ?  <h4>{name}</h4> : <select style={{height: '50px',
                    color: 'white', backgroundColor: 'black', margin: 'auto', width: '200px'}} 
                    onChange={(e) => handleCreatureState(Number(findRegexMatch(e.target.value)) - 1)} name='creatures'>
                        {count.map((value: number, index: number) => 
                            <option key={index} value={!hiddenArray[index] ? `#${index+1} ???`   : `#${index + 1} ` + creatureDict[index] } >
                                {!hiddenArray[index] ? `#${index+1} ???`   : `#${index + 1} ` + creatureDict[index] }</option>
                        )}
                    </select>  }

                    <img src='https://via.placeholder.com/150' alt='creature-image' />
                    <div style={{padding: '10px'}}>
                        <p style={{fontSize: '12px' }}>Found:</p>
                        <br />
                        <p style={{fontSize: '12px' }}>Description: {description} </p>
                    </div>
                </div>
                
            </div>
            <br></br>
            <Link to={'/app'} className='auth'><h3 className='quest-map'>Back to Map {'-->'}</h3></Link>
        </div>
    )
}
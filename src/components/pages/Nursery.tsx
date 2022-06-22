import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { creature1Address } from '../assets/helpers/contractAddresses';
import { useAppSelector } from '../store/hooks';

export const Nursery =()=> {

    const creatureDict = [
        'Marbley','Phoog',  
        'Ghiblin','Hazurk',
        'Blupper', 'Tuk',
    ]

    const descriptionDict = [
        "Tree creature that sits alone in the tree canopies. When resting, their tail lights up.",
        "Small creature that likes to eat bugs, and climb trees.",
        "Hoppy creature that likes to eat small fruits, and spend its time in the root systems of trees.",
        "Bear like. Spends time at the river dams interacting with the fish. Can't tell if they eat fish...",
        "Seal like creature that emits a powder. Fish seem to follow them.",
        "Shell creature that spends its time deep on the ocean floor. Sometimes comes up to the shore at night."
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
    const [location, setLocation] = useState<string>()

    const locationDict = ['Swamp', 'Swamp', 'Forest','Forest', 'Ocean','Ocean']

    useEffect(() => {
        const boolArray = []
        for (let i=0; i< count.length; i++) {
            if (count[i] > 0){
                boolArray.push(true)
            } else {
                boolArray.push(false)
            }
        }
        setHiddenArray(boolArray);
        updateDimensions();

        window.addEventListener("resize", updateDimensions);
        return () => 
            window.removeEventListener("resize",updateDimensions);
    }, [count])

    const updateDimensions = () => {
        const width = window.innerWidth
        if (width < 767) {
            setMobile(true)
        } else {
            setMobile(false)
        }
        setWindowWidth(width)
    }

    const handleCreatureState = (index: number) => {
        
        if (count[index] > 0) {
            setName(creatureDict[index])
            setIdView(`#${index+1}`)
            setDescription(descriptionDict[index])
            setIdNumber(String(index + 1));
            setLocation(locationDict[index]);
        } else {
            setName('???');
            setLocation('Unknown');
            setIdView('#0');
            setDescription('Unknown');
            setIdNumber(String(0));
        }

    }

    const findRegexMatch = (str: string) => {
        const reg = /\d{1,2}/;
        return str.match(reg)
    }

    return (
        <motion.div
        initial={{opacity: 0}}
         animate={{opacity: 1}}>
            
        <div style={{width: '97vw', height: '92vh'}} >
            <div style={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                position: 'sticky',
                margin: 'auto',
                top: 'calc(50% - 270px)', 
                maxHeight: '600px'
                }}>
                
                <p style={{fontSize: '32px',color: 'white', textAlign: 'center'}}>{!mobile && 'Welcome to the '} Nursery</p>
                <div style={!mobile ? {
                    display: 'grid',
                    gridTemplateColumns: '1fr 3fr',
                    gap: '0.5rem',
                    width: '700px'
                    } : {display: 'grid', width: '100%'}}>
                        
                    {!mobile ? <div className='creature-sidebar' style={{border: 'solid 2px white', borderRadius: '7px',overflowY: 'auto', height: '400px'}}>
                        {hiddenArray.map((value: boolean, index: number) => 
                        // On click here, change state variables to pass through into the creatureBio
                            <div 
                                key={index}
                                onClick={() => handleCreatureState(index)} 
                                style={{display: 'flex', cursor: 'pointer', color: 'white', alignItems: 'center',
                                        justifyContent: 'space-between', border: 'solid 1px grey', padding: '0.5rem' }}>
                                {!value 
                                ? <p style={{ fontSize: '12px' }}>???</p> 
                                : <p style={{ fontSize: '12px' }}>{creatureDict[index]}</p> 
                                }
                                <p style={{fontSize: '12px'}}>#{index + 1}</p>
                            </div>
                        )}
                    </div> : null}
                    

                    <div className='creature-bio' style={{border: 'solid 2px white', margin: 'auto', borderRadius: '7px',
                    width: `${mobile ? '350px' : '100%'}`, minWidth: '340px', maxWidth: '500px', height: '400px', display: 'grid', justifyItems: 'center' }} >
    
                        {/* ipfs://fdfahvur/{id}.json */}
                        {!mobile ?  <h4>{name}</h4> : <select style={{height: '50px',
                        color: 'white', backgroundColor: 'black', margin: 'auto', width: '200px'}} 
                        onChange={(e) => handleCreatureState(Number(findRegexMatch(e.target.value)) - 1)} name='creatures'>
                            {hiddenArray.map((value: boolean, index: number) => 
                                <option key={index} value={!value ? `#${index+1} ???`   : `#${index + 1} ` + creatureDict[index] } >
                                    {!value ? `#${index+1} ???`   : `#${index + 1} ` + creatureDict[index] }</option>
                            )}
                        </select>  }

                        <img style={{border: 'double 10px white'}} src={'https://gateway.pinata.cloud/ipfs/QmYjasF2yyqaoSSkmxfqN28sLiqpc5r4XXk2gxr4KnpRm7/' + idNumber + '.png'} alt='creature-image' />
                        <div style={{padding: '10px'}}>
                            <p style={{fontSize: '12px' }}>Found: {location}</p><br />
                            <p style={{fontSize: '12px' }}>Description: {description} </p>
                        </div>
                    </div>
                    
                </div>
                <br></br>
                <Link to={'/app'} className='auth'><h3 className='quest-map'>Back to Map {'-->'}</h3></Link>
            </div>
        </div>
        </motion.div>
    )
}
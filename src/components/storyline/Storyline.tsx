import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { motion } from 'framer-motion';

import SceneOne from './scenes/SceneOne';


export const Storyline = () => {
  
    const creatures = useAppSelector((state) => state.creatures);
    const items = useAppSelector((state) => state.items);
    
    const [story, setStory] = useState<boolean>(false)
    const [storyNumber, setStoryNumber] = useState<number>(0);
    const [creatureNumber, setCreatureNumber] = useState<number>(0);
    const [runeCount, setRuneCount] = useState<number>(0);
    const [endingScene, setEndingScene] = useState<boolean>(false);


    const indexOfFirstRune:number = 14;

    useEffect(() => {
      getCreatures();
      getRunes();
      getLastCreature();
    }, [creatures, items])
  
    const getCreatures = () => {
      var creatureNum: number = 0;
      for (let i = 0; i < creatures.length; i++){
        if (creatures[i] > 0){
          creatureNum++
        }
      }
      setCreatureNumber(creatureNum)
    }

    const getRunes = () => {
      var runes:number = 0
      for (let i = indexOfFirstRune; i < items.length; i++){
        if (items[i] > 0){
          runes++;
        }
      }
      setRuneCount(runes);
    }

    const getLastCreature = () => {
      if (creatures[creatures.length - 1] > 0){
        setEndingScene(true)
      } 
    }


    const showStory = (storyNum:number) => {
      setStory(true);
      setStoryNumber(storyNum);
    }

    const buttonStyle = {
      width: '200px',
      height: '180px',
    }
    return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}>
        
        {story && <SceneOne />}

        <div style={{width: '90vw'}}>
          <button onClick={() => showStory(1)} style={buttonStyle}>Story Begins</button>
          {
            creatureNumber > 3 ? 
            <button onClick={() => showStory(2)}>Creature Updates</button> : 
            <button disabled>Unknown</button>
          }
          {
            runeCount > 0 ? 
            <button onClick={() => showStory(2)}>New Items Founds</button> : 
            <button disabled>Unknown</button>
          }
          {
            creatureNumber > 16 ? 
            <button onClick={() => showStory(2)}>Creatures Acting Strangly</button> : 
            <button disabled>Unknown</button>
          }
          {
            runeCount > 3 ? 
            <button onClick={() => showStory(2)}>Runes Acting Strange</button> : 
            <button disabled>Unknown</button>
          }
          {
            endingScene ? 
            <button onClick={() => showStory(5)}>Final Encounter</button> : 
            <button disabled>Unknown</button>
          }
        </div>
    </motion.div>
  )
}

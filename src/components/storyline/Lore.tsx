import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Lore() {

    const sentenceOne:string = "  Outside the small village of Del Mar, lived an old alchemist retired from his days of chemistry and science."
    const sentenceTwo: string = "  One night as he stared up into the night, he saw what looked like a meteorite streaming through the sky toward the mountainside."
    const sentenceThree: string = "  It struck the base of the mountains, and a ball of yellow light illuminated the impact zone for a brief period of time."
    const sentenceFour: string = "  Curiously the alchemist wandered toward the crash, but when he got there, he found nothing. Only a few small broken limbs from the trees."
    const sentenceFive:string = "  Perplexed by this, he decided to wander around more to see if he could find the answer to this mystery."
    const sentenceSix: string = "  As he walked around, he began to hear strange, almost unearthly noises echoing through the mountains.... Suddenly, in the midst of his fright, an unknown visitor popped out onto the trail."
    const sentenceSeven: string = "  'A Creature From Beyond This World' "
    const sentenceEight: string = "  It disappeared before he could study it, but this brief encounter brought new meaning to the alchemist."
    const sentenceNine: string = "  He hurried back to his cabin and got out his recipe book, where he looked to find some old potions that could attract these new creatures."
    const sentenceTen: string = "  What ensues is a long journey to uncover the mystery of who these creatures are.... and just why they came here..." 
    const sentenceEleven: string = "  This is the story of THE ALCHEMIST"

    const sentences: string[] = [
      sentenceOne,
      sentenceTwo,
      sentenceThree,
      sentenceFour, 
      sentenceFive,
      sentenceSix,
      sentenceSeven,
      sentenceEight,
      sentenceNine,
      sentenceTen,
      sentenceEleven
    ]

    const [str, setStr] = useState<string>('')
    const [count, setCount] = useState<number>(0)
    const [sentence, setSentence] = useState<string>(sentences[0])
    const [buttonReveal, setButtonReveal] = useState(false);
    const [mintButtonReveal, setMintButtonReveal] = useState(false);

    const [mobile, setMobile] = useState(false);

    var index = useRef(0)

    useEffect(() => {
      function tick() {
        setStr(prev => prev + sentence[index.current]);
        index.current++;
      }
      if (index.current < sentence.length - 1) {
        let addChar = setInterval(tick, 50);
        return () => clearInterval(addChar);
      } else {
        console.log('Button Reveal')
        if (count > 9){
          setTimeout(() => {
            setMintButtonReveal(true)
          }, 1000)
        } else{ 
          setTimeout(() => {
            setButtonReveal(true)
          }, 1000)
        }
      }
    }, [str, sentence]);

    useEffect(() => {
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => 
          window.removeEventListener("resize",updateDimensions);
  }, [])

  const updateDimensions = () => {
      if (window.innerWidth < 600) {
        setMobile(true);
      } else {
        setMobile(false)
      }  
  }

    const incrementSentence = () => {
      setStr(' ');
      setSentence(sentences[count + 1])
      setCount(count + 1)
      setButtonReveal(false)
      index.current = 0
    }

  return (
    <motion.div initial={{opacity: 0}} transition={{duration: 1}} animate={{opacity: 1}} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '90vh'}}>
        <div style={{display: 'flex',maxWidth: '600px', width: '100%', height: '200px',
                     flexDirection: 'column', justifyContent: 'space-between', lineHeight: '1.3'}}>
          
          <p style={{fontSize: `${mobile ? '12px' : '16px'}`}}>{str}</p>
          
          {buttonReveal ? 
            <motion.button initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2}} 
                            onClick={() => incrementSentence()}
                            style={{width: '200px', height: '60px', margin: 'auto'}}>Next</motion.button>
          : null }

          {mintButtonReveal && 
          <Link style={{ margin: 'auto'}} to='/minter'>
            <motion.button style={{width: '200px', height: '60px'}} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2}}>Start Your Journey</motion.button>
          </Link>} 
        </div>
        
        
    </motion.div>
  )
}

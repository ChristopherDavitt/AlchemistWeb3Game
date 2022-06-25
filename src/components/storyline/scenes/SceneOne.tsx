import React, { useEffect, useRef, useState } from 'react'

export default function SceneOne() {

    const sentenceOne:string = "Outside the small village of Del Mar, lived an old alchemist retired from his days of chemistry and science."
    const sentenceTwo: string = "One night as he stared up into the night sky, he saw what looked like a meteorite streaming through the sky toward the mountainside."
    const sentenceThree: string = "It struck the base of the mountains, and a ball of yellow light illuminated the impact zone for a brief period of time."
    const sentenceFive: string = "Curiously the alchemist wandered toward the crash, but when he got there, he found nothing. Only a few small broken limbs from the trees."
    const sentenceSix:string = "Perplexed by this, he decided to wander around more to see if he could find the answer to what just happened."
    const sentenceSeven: string = "As he walked around, he began to hear weird noises that sounded almost unearthly. And just as he was starting to get scared, an unknown visitor popped out onto the trail."
    const sentenceEight: string = " 'A Creature From Beyond This World' "
    const sentenceNine: string = "It disappeared before he could study it more, but this brief encounter brought new meaning to the alchemist."
    const sentenceTen: string = "He hurried back to his cabin, and got out his old recipe book, where he thought there would be some potions to attract these new creatures."
    const sentenceEleven: string = "What ensues is a long quest to discover the mystery of what these creatures are, and perhaps why they came here..." 

    const [str, setStr] = useState<string>('')
    const [count, setCount] = useState<number>(0)
    const [sentence, setSentence] = useState<string>('')

    const index = useRef(0)

    useEffect(() => {
        function tick() {
          setStr(prev => prev + sentence[index.current]);
          index.current++;
        }
        if (index.current < sentence.length) {
          let addChar = setInterval(tick, 100);
          return () => clearInterval(addChar);
        }
      }, [str, sentence]);

    const incrementSentence = () => {
        setCount(count + 1)
    }

    const setScene = () => {
        setStr('');
        setSentence(sentenceTwo);
        
    }



  return (
    <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center'}}>
        <button onClick={() => setSentence(sentenceOne)}>Click Me</button>
        <p style={{fontSize: '8px'}}>{str}</p>
    </div>
  )
}

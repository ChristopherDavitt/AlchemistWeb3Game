import React, { useState } from 'react'
import { Link } from 'react-router-dom'



export const Minter = () => {
  
    const [count, setCount] = useState(1)

    function handleNegate () {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    function handlePlus () {
        if (count < 10) {
            setCount(count + 1)
        }
    }

    return (
        <div className="Minter">
            <h1 style={{justifyContent: 'center', display: 'grid'}} className='minter-h'>Start Your Adventure Here</h1>
            <div style={{justifyContent: 'center', display: 'grid'}}>
                <img src={'#'}></img>
                <h2 className='minter-h'>Price: 0.02 ETH</h2>
                <h2 className='minter-h'>Supply: 2/10000</h2>
                <h2 className='minter-h'>Mint Amount: {count} <span><button onClick={handleNegate}>-</button><button onClick={handlePlus} >+</button></span></h2>
            </div>
            <br></br>
            <div style={{justifyContent: 'center', display:'flex', alignItems: 'center'}}>
                <button style={{width: '200px', height: '50px'}} >Mint</button>
            </div>
            <br></br>
            <br></br>
            <Link style={{justifyContent: 'center', display:'grid'}} to={'/'}>Back to Home</Link>
        </div>
    );
}

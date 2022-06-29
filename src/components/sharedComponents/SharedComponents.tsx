import React from 'react';
import { Link } from 'react-router-dom';

export const MobileCard = (props:any) => {

  const cardStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '5px',
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '120px',
    boxShadow: '0 0 10px 0 rbg(200,250,250)'
  }

  return (
    <Link style={{textDecoration: 'none'}} to={props.path}>
        <div className='mobile-card' style={cardStyle}>
            <div style={{position: 'relative', top: '100px'}}>
                <p style={{textAlign:'center', fontSize: '13px'}}>{props.name}</p>
            </div>
        </div>
    </Link>
  )
}

export const MobileCardNoLink = (props:any) => {

    const cardStyle = {
      width: '120px',
      height: '120px',
      borderRadius: '5px',
      backgroundImage: `url(${props.image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '120px',
      boxShadow: '0 0 10px 0 rbg(200,250,250)',
      cursor: 'pointer'
    }
  
    return (
      <div style={{textDecoration: 'none'}}>
          <div onClick={props.handleClick} className='mobile-card' style={cardStyle}>
              <div style={{position: 'relative', top: '100px' }}>
                  <p style={{textAlign:'center', fontSize: '13px'}}>{props.name}</p>
              </div>
          </div>
      </div>
    )
  }

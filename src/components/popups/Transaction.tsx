import React from "react";
import txnWait from '../assets/images/txnWait.gif'

const Transaction = (props:any) => {

    const popUpStyle:any = {
        position: 'fixed',
        backgroundColor:'#00000050',
        left: '0',
        top: '0',
        width: '100%',
        height: '100vh',
        zIndex: '1000',
    }

    const boxStyle: any = {
        position: 'relative',
        width: '50%',
        maxWidth: '300px',
        backgroundColor: 'rgb(0, 0, 0)',
        border: 'solid 10px rgb(15, 15, 15)',
        marginTop: '20vh',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '10px',
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'grid',
        justifyItems: 'center'
    }

  return (
    <div style={popUpStyle}>
      <div style={boxStyle}>
        <img src={txnWait} alt="txn" />
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default Transaction

import React from "react";

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
        maxWidth: '400px',
        backgroundColor: 'rgb(0, 0, 0)',
        border: 'solid 10px rgb(15, 15, 15)',
        marginTop: '50px',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '10px',
        overflowX: 'hidden',
        overflowY: 'auto',
    }

  return (
    <div style={popUpStyle}>
      <div style={boxStyle}>
        {props.content}
      </div>
    </div>
  );
};

export default Transaction

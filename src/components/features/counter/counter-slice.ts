import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0
}

export function updateEth(state:any, eth:number) {
    return {
        type: UPDATE_ETH,
        ...state,
        value: eth
    }
}
const UPDATE_ETH = 'UPDATE_ETH'

const counterSlice = createSlice ({
    name: 'counter',
    initialState,
    reducers: {
        // getETH
        incremented(state) {
            state.value;
        }
    }
})


export const { incremented } = counterSlice.actions;
export default counterSlice.reducer;
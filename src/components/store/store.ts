import { legacy_createStore } from "redux";

const reducer = (state = { creatures: [],
    items: [],
    potions: [], 
    nftStaked: {forest: [] },
    nfts: 0, 
    connected: false,
    address: '0x0000000000000000000000000000000000000000' }, action:any) => {
  switch (action.type) {
    case "UPDATE_CREATURES":
      return {...state, creatures: action.payload};
    case "UPDATE_ITEMS":
      return {...state, items: action.payload};
    case "UPDATE_POTIONS":
      return {...state, potions: action.payload};
    case "NFTS_STAKED":
      return {...state, nftStaked: action.payload};
    case "NFTS_AVAIL":
      return {...state, nfts: action.payload};
    case "CONNECT_WALLET":
      return {...state, connected: true};
    case "UPDATE_ADDRESS":
      return {...state, address: action.payload};
    case "DISCONNECT_WALLET":
      return {...state, connected: false};
    default:
      return state;
  }
};

export const store = legacy_createStore(reducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
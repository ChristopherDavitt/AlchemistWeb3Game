import { legacy_createStore } from "redux";

const reducer = (state = { creatures: {Boog: 0, Asriel: 0, Garchud: 0},
    items: {berry: 0, grape: 0, fungus: 0},
    potions: {potion1: 0, potion2: 0, potion3: 0}, 
    nftStaked: {forest: 0},
    nfts: {nfts: 0}, 
    connected: false }, action:any) => {
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
    case "DISCONNECT_WALLET":
      return {...state, connected: false};
    default:
      return state;
  }
};

export const store = legacy_createStore(reducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
import { legacy_createStore } from "redux";

const reducer = (state = { pets: [], items: 0, potions: [], nftStaked: [] }, action:any) => {
  switch (action.type) {
    case "UPDATE_PETS":
      return {...state, pets: action.payload};
    case "UPDATE_ITEMS":
      return {...state, items: action.payload};
    case "UPDATE_POTIONS":
      return {...state, potions: action.payload};
    case "NFTS_STAKED":
      return {...state, potions: action.payload};
    case "POTIONS_STAKED":
      return {...state, potions: action.payload};
    default:
      return state;
  }
};

export const store = legacy_createStore(reducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
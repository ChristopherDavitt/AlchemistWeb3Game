import { legacy_createStore } from "redux";

const defaultState = { 
  creatures: [],
  items: [],
  potions: [], 
  nftStaked: 
    {
      forest: [],
      caves: [],
      tundra: [],
      mountains: [],
      ocean: [],
      swamp: []
    },
  nfts: [], 
  connected: false,
  address: '0x0000000000000000000000000000000000000000'
}

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case "UPDATE_CREATURES":
      return {...state, creatures: action.payload};
    case "UPDATE_ITEMS":
      return {...state, items: action.payload};
    case "UPDATE_POTIONS":
      return {...state, potions: action.payload};
    case "NFTS_STAKED_FOREST":
      return {...state, 
                nftStaked : {
                  ...state.nftStaked,
                  forest: action.payload
                }
              };
    case "NFTS_STAKED_MOUNTAINS":
      return {...state, 
        nftStaked : {
          ...state.nftStaked,
          mountains: action.payload
        }
      };
    case "NFTS_STAKED_CAVES":
      return {...state, 
        nftStaked : {
          ...state.nftStaked,
          caves: action.payload
        }
      };
    case "NFTS_STAKED_OCEAN":
      return {...state, 
        nftStaked : {
          ...state.nftStaked,
          ocean: action.payload
        }
      };
    case "NFTS_STAKED_SWAMP":
      return {...state, 
        nftStaked : {
          ...state.nftStaked,
          swamp: action.payload
        }
      };
    case "NFTS_STAKED_TUNDRA":
      return {...state, 
        nftStaked : {
          ...state.nftStaked,
          tundra: action.payload
        }
      };
    case "NFTS_AVAIL":
      return {...state, nfts: action.payload};
    case "CONNECT_WALLET":
      return {...state, connected: true};
    case "UPDATE_ADDRESS":
      return {...state, address: action.payload};
    case "DISCONNECT_WALLET":
      return defaultState;
    default:
      return state;
  }
};

export const store = legacy_createStore(reducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
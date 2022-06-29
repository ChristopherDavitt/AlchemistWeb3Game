export const networks  = <any> {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"]
    },
    mumbai: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Polygon Testnet Mumbai",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: [
        "https://matic-mumbai.chainstacklabs.com",
        "https://rpc-mumbai.maticvigil.com",
        "https://matic-testnet-archive-rpc.bwarelabs.com"
        ],
      blockExplorerUrls: ["https://mumbai.polygonscan.com"]
    },
    rinkeby: {
      chainId: `0x${Number(4).toString(16)}`,
      chainName: "Rinkeby Testnet",
      nativeCurrency: {
        name: "Rinkeby Ether",
        symbol: "RIN",
        decimals: 18
      },
      rpcUrls: [
        "https://rinkeby.infura.io/v3/",
        "wss://rinkeby.infura.io/ws/v3/"
      ],
      blockExplorerUrls: ["https://rinkeby.etherscan.io"]
    }
  };
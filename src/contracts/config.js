export const CONTRACT_ADDRESS = "0x9672D83D9a31cc133C371380C82f7DE39204e2a5"

export const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "cardID",
				"type": "string"
			},
			{
				"internalType": "uint16",
				"name": "amount",
				"type": "uint16"
			}
		],
		"name": "addCard",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "string[]",
				"name": "idList",
				"type": "string[]"
			}
		],
		"name": "getUserDB",
		"outputs": [
			{
				"internalType": "uint16[]",
				"name": "",
				"type": "uint16[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "fromWallet",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "toWallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "cardID",
				"type": "string"
			},
			{
				"internalType": "uint16",
				"name": "amount",
				"type": "uint16"
			}
		],
		"name": "handleTrade",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "userInventory",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
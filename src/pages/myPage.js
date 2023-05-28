import React, { useContext } from "react"
import Web3 from "web3"
import { userContext } from "../context"


const MyPage = () => {

	const { account, setAccount } = useContext(userContext)

	const connectWallet = async () => {
		if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
			const web3 = new Web3(window.ethereum)
			const accounts = await web3.eth.requestAccounts()
			setAccount(accounts[0])
			// console.log(accounts[0])
		}
	}

	
	return (
		<div>
			<button onClick={connectWallet}>Connect to Metamask</button>
			{account}
		</div>
	)
}

export default MyPage
import React from "react"
import Web3 from 'web3'

const HomePage = () => {

	let web3
	const connectether = () => {
		if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
			window.ethereum.request({method : "eth_requestAccounts"})
			web3 = new Web3(window.ethereum)
		}
		else {
			console.log("Metamask not installed");
		}
	}

	return (
		<div>
            home
			<div>
				<button onClick={connectether}>Connect to blockchain</button>
			</div>
		</div>
	)
}

export default HomePage
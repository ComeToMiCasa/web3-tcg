import React from "react"
import Web3 from "web3"
import { useState} from "react"

const HomePage = () => {
	let web3
	const [getError, setError] = useState('')
	const connectether = async () => {
		if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
			try {
				await window.ethereum.request({method : "eth_requestAccounts"})
				global.web3 = new Web3(window.ethereum)
			} catch(err) {
				setError(err.message)
			}
		}
		else {
			setError("Metamask not installed");
		}
	}

	return (
		<div>
            home
			<div>
				<button onClick={connectether}>Connect to blockchain</button>
			</div>
			<div>
				<p>{getError}</p>
			</div>
		</div>
	)
}

export default HomePage
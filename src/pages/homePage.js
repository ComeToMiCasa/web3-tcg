import React from "react"
import Web3 from "web3"
import { useState} from "react"

const HomePage = () => {
	const [getError, setError] = useState('')
	let [balance, setBalance] = useState('')
	let [wallet, setWallet] = useState('')
	let web3
	//web3.eth.defaultchain = 'goerli';
	const connectether = async () => {
		if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
			try {
				await window.ethereum.request({method : "eth_requestAccounts"})
				web3 = new Web3(window.ethereum)
			} catch(err) {
				setError(err.message)
			}
		}
		else {
			setError("Metamask not installed");
		}
	}

	const getWallet = async () => {
		wallet = await window.ethereum.request({
			method: 'eth_requestAccounts',
		});
		setWallet(wallet)
		let wei = await web3.eth.getBalance(wallet.toString());
		//balance = parseFloat(balance);
		//console.log(balance);
		setBalance(wei / (10**18))
		//balance = web3.eth.getBalance("0xa22eed359d4bf60cde7e92586fc7583aade2d0e5");
		//balance = web3.eth.getBalance("0xa22eEd359D4Bf60CDe7E92586Fc7583aadE2D0E5");

		console.log(wallet);
		console.log(balance);
		return wallet;
	};

	const sendEther = async(e) =>{
		e.preventDefault();

		await web3.eth.sendTransaction({
			from: wallet,
			to: e.target.received.value,
			value: web3.utils.toWei(e.target.amout.value, 'ether'), // error!
		});
	};

	return (
		<div>
            home
			<div>
				<button onClick={connectether}>Connect to blockchain</button>
				<button onClick={getWallet}>Check Wallet Address</button>
			</div>
			<div>
				<div>내 지갑 주소: {wallet} </div>
				<div>현재 코인 보유량: {balance} ETH </div>
			</div>
			<div>
				<p>{getError}</p>
			</div>
			<div>
				<form onSubmit = {sendEther}>
					<input type = "text" id = "received" placeholder = "전송할 주소" />
					<input type = "number" id = "amount" placeholder = "보낼 금액" />
					<input type = "submit" value = "전송" />
				</form>
			</div>
		</div>
	)
}

export default HomePage
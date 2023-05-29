import React, { useContext, useEffect, useState } from "react"
import Web3 from "web3"
import { userContext } from "../context"
import { db, storage } from "../firebase"
import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import { CONTRACT_ABI, CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS } from "../contracts/config"



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

	const [idList, setIdList] = useState([])


	const getCards = async () => {
		const cardRef = collection(db, "Cards")
		const q = query(cardRef)

		const querySnapshot = await getDocs(q)
		// const cards = querySnapshot.docs.map((docSnapshot) => {
		// 	const id = docSnapshot.id
		// 	const { name, text, image } = docSnapshot.data()
		// 	return { id, name, text, image }
		// })
		const idList = querySnapshot.docs.map((docSnapshot) => (docSnapshot.id))
		// setCards(cards)
		setIdList(idList)
	}

	useEffect(() => { getCards() }, [])

		// contract에 카드 추가용
	// 웬만하면 쓰지 말 것
	const addCardsToChain = () => {
		const web3 = new Web3(window.ethereum)

		const CardContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
		idList.forEach((id) => {
			CardContract.methods.addCard(account, id, Math.floor(Math.random() * 3)).send({ from: account })
		})
	}


	const addCardToContract = async () => {
		const web3 = new Web3(window.ethereum)
		// await window.ethereum.enable()

		const CardContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

		await CardContract.methods.addCard(account, idList[0], 16).send({ from: account })
	}

	const [balance, setBalance] = useState(0)

	const getTokenBalance = async () => {
		const web3 = new Web3(window.ethereum)
		const TokenContract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS)

		const balance = await TokenContract.methods.balanceOf(account).call()
		setBalance(balance)
	}

	useEffect(() => { 
		if(account != null) {
			console.log(account)
			getTokenBalance() 
		}
	}, [account])
	
	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			width: 500,
			marginLeft: "auto",
			marginRight: "auto",
		}}>
			<button onClick={connectWallet}>Connect to Metamask</button>
			<button onClick={addCardToContract}>Get One Card</button>
			<button onClick={addCardsToChain}>Get Cards</button>

			<div>
			address: {account}

			</div>
			balance: {balance}
		</div>
	)
}

export default MyPage
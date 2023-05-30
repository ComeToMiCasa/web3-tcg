import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore"
import React, { useContext, useEffect, useState } from "react"
import { db } from "../firebase"
import Card from "../components/card"
import "../styles/card.css"
import { userContext } from "../context"
import Web3 from "web3"
import { CONTRACT_ABI, CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS } from "../contracts/config"


const MarketPage = () => {

	const [deals, setDeals] = useState([])

	const { account } = useContext(userContext)

	const getDeals = async () => {
		const marketRef = collection(db, "Market")
		const q = query(marketRef)

		const querySnapshot = await getDocs(q)

		const deals = await Promise.all(querySnapshot.docs.map(
			async (docSnapshot) => {
				const dealID = docSnapshot.id
				const { item, price, seller, cnt } = docSnapshot.data()

				const cardRef = doc(db, "Cards", item)
				const cardSnap = await getDoc(cardRef)
				// console.log(id, item, price, seller)
				// console.log(cardSnap.data())
				return { dealID, item, price, seller, cnt, ...cardSnap.data(), id: cardSnap.id}
			}))

		setDeals(deals)
	}

	useEffect(() => { getDeals() }, [])

	const [isPopupVisible, setIsPopupVisible] = useState(false)
	const [popupDeal, setPopupDeal] = useState(null)

	const togglePopupOn = (num) => {
		setIsPopupVisible(true)
		setPopupDeal(num)
	}

	const togglePopupOff = () => {
		setIsPopupVisible(false)
	}

	const dealList = deals.map((deal, i) => {
		return (
			<div key={i} className="DealContainer">
				<Card {...deal} handleClick={() => togglePopupOn(i)}/>
				<div>
				Price: {deal.price}
				</div>
				<div>
				Seller: {deal.seller.username}
				</div>
				<div style={{
					overflowWrap: "break-word",
					width: 200,
					marginBottom: 50
				}}>
					{deal.seller.account}
				</div>
			</div>
		)
	})

	// const addCardToContract = async () => {
	// 	const web3 = new Web3(window.ethereum)
	// 	// await window.ethereum.enable()

	// 	const CardContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

	// 	await CardContract.methods.addCard(account, "test1", 16).send({ from: account })
	// }




	return (
		<div>
			{account}
			<div className="Inventory">
				{dealList}
				{isPopupVisible ? 
					<DealPopup dealInfo={deals[popupDeal]} handleToggleOff={togglePopupOff}/> : 
					<div/>
				}
			</div>
		</div>
		
	)
}

const DealPopup = ({ dealInfo, handleToggleOff }) => {

	const [buyCnt, setBuyCnt] = useState(null)

	const { seller, cnt, price, item, dealID } = dealInfo

	const { account } = useContext(userContext)

	const handleBuy = async () => {
		const leftover = cnt - buyCnt
		if (leftover === 0) {
			deleteDoc(doc(db, "Market", dealID))
		} else if (leftover > 0) {
			// console.log(leftover)
			updateDoc(doc(db, "Market", dealID), {
				cnt: leftover
			})
		} else {
			alert("최대 개수 초과")
			return
		}

		const web3 = new Web3(window.ethereum)

		const CardContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
		const TokenContract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS)

		await CardContract.methods.handleTrade(seller.account, account, item, buyCnt).send({ from: account })
		await TokenContract.methods.transfer(seller.account, price * buyCnt).send({ from: account })

		handleToggleOff()
	}


	return (
		<div className="CardPopup" >
			<div className="CloseButton" onClick={handleToggleOff}>
			X
			</div>
			<div className="CardContainer">
				<Card {...dealInfo} large={true}/>
			</div>
			<div className="CardForm">
				{"최대 개수: " + dealInfo.cnt}

				<input
					placeholder="개수"
					value={buyCnt}
					onChange={(e) => setBuyCnt(e.target.value)}
				/>
				<button onClick={handleBuy}>
					구매
				</button>
			</div>
		</div>
	)
}

export default MarketPage
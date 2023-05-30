import React, { useContext, useEffect, useState } from "react"
import { db, storage } from "../firebase"
import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"
import Card from "../components/card"
import "../styles/card.css"
import CardPopup from "../components/cardPopup"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contracts/config"
import Web3 from "web3"
import { userContext } from "../context"


const InventoryPage = () => {

	const [cards, setCards] = useState([])
	const [idList, setIdList] = useState([])

	// db에 카드 추가용 매크로
	const addCardToDB = async () => {
		const imageRef = ref(storage, "tmp.jpeg")
		const imageURL = await getDownloadURL(imageRef)

		addDoc(collection(db, "Cards"), {
			name: "TEST",
			text: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
			image: imageURL
		}).then((docRef) => {
			console.log(docRef.id)
		})
	}




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

	const { account, setAccount } = useContext(userContext)

	const getUserInventory = async () => {
		const web3 = new Web3(window.ethereum)

		const CardContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
        
		const res = await CardContract.methods.getUserDB(account, idList).call()
		return res
	}

	const _filterAndGet = async () => {
		if(idList.length !== 0 && account !== undefined) {
			const res = await getUserInventory()
			const zippedList = idList.map((id, i) => [id, Number(res[i])])
			const filteredList = zippedList.filter((items) => items[1] !== 0)
			
			const cards = await Promise.all(filteredList.map(
				async (items) => {
					const id = items[0]

					const cardRef = doc(db, "Cards", id)
					const cardSnap = await getDoc(cardRef)
					return {
						id: cardSnap.id,
						cnt: items[1],
						...cardSnap.data()
					}
				}
			))
			console.log(cards)
			setCards(cards)
		}
	}

	useEffect(() => {
		_filterAndGet()
	}, [idList, account])

	const [isPopupVisible, setIsPopupVisible] = useState(false)
	const [popupCard, setPopupCard] = useState(null)

	const togglePopupOn = (num) => {
		setIsPopupVisible(true)
		setPopupCard(num)
	}

	const togglePopupOff = () => {
		setIsPopupVisible(false)
	}

	useEffect(() => { getCards() }, [])

	const cardList = cards.map((card, i) => {
		return (<Card {...card} handleClick={() => togglePopupOn(i)} large={false} key={i} />)
	})

	

	return (
		<div className="Inventory">
			<div style={{width: 1500}}>
				inventory
			</div>
			{cardList}
			{isPopupVisible ? <CardPopup cardInfo={cards[popupCard]} handleToggleOff={togglePopupOff}/> : <div></div>}
		</div>
	)
}

export default InventoryPage
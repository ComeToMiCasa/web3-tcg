import React, { useEffect, useState } from "react"
import { db, storage } from "../firebase"
import { addDoc, collection, getDocs, query } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"
import Card from "../components/card"
import "../styles/card.css"
import CardPopup from "../components/cardPopup"

const InventoryPage = () => {

	const [cards, setCards] = useState([])

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
		const cards = querySnapshot.docs.map((docSnapshot) => {
			const id = docSnapshot.id
			const { name, text, image } = docSnapshot.data()
			return { id, name, text, image }
		})
		setCards(cards)
	}

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
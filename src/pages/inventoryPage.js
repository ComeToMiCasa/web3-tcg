import React, { useEffect, useState } from "react"
import { db, storage } from "../firebase"
import { addDoc, collection, getDocs, query } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"
import Card from "../components/card"
import "../styles/card.css"

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
			const { name, text, image } = docSnapshot.data()
			return { name, text, image }
		})
		setCards(cards)
	}

	useEffect(() => {
		getCards()
	}, [])

	const cardList = cards.map((card, i) => {
		console.log("card", card)
		return (<Card {...card} key={i} />)
	})

	return (
		<div className="Inventory">
			<div style={{width: 1500}}>
				inventory
			</div>
			{cardList}
		</div>
	)
}

export default InventoryPage
import React from "react"
import { db } from "../firebase"
import { addDoc, collection } from "firebase/firestore"

const InventoryPage = () => {

	const cardList = []

	const setCards = () => {
		addDoc(collection(db, "Cards"), {
			name: "TEST",
			text: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
		}).then((docRef) => {
			console.log(docRef.id)
		})
	}

	return (
		<div>
            Inventory
			<button onClick ={setCards}>test</button>
		</div>
	)
}

export default InventoryPage
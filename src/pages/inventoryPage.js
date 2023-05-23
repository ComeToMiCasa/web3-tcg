import React from "react"
import { db, storage } from "../firebase"
import { addDoc, collection } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"

const InventoryPage = () => {

	const cardList = []

	// db에 카드 추가용 매크로
	const setCards = async () => {
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

	return (
		<div>
            Inventory
			{/* <button onClick ={setCards}>Add Card</button> */}
		</div>
	)
}

export default InventoryPage
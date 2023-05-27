import React, { useContext, useState } from "react"
import "../styles/card.css"
import Card from "./card"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"
import { userContext } from "../context"

const CardPopup = ({ cardInfo, handleToggleOff }) => {

	const { id } = cardInfo
	
	const { uid, username } = useContext(userContext)
	
	const [price, setPrice] = useState(null)

	const handleSell = () => {
		addDoc(collection(db, "Market"), {
			seller: {
				uid,
				username
			},
			item: id,
			price
		}).then((docRef) => {
			// console.log(docRef.id)
			handleToggleOff()
		})
	}
    
	return (
		<div className="CardPopup">
			<div className="CloseButton" onClick={handleToggleOff}>
			X
			</div>
			<div className="CardContainer">
				<Card {...cardInfo} large={true}/>
			</div>
			<div className="CardForm">
				<input
					placeholder="가격"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<button onClick={handleSell}>
					판매
				</button>
			</div>
		</div>
	)
}

export default CardPopup
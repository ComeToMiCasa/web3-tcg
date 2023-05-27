import { collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import Card from "../components/card"
import "../styles/card.css"


const MarketPage = () => {

	const [deals, setDeals] = useState([])

	const getDeals = async () => {
		const marketRef = collection(db, "Market")
		const q = query(marketRef)

		const querySnapshot = await getDocs(q)

		const deals = await Promise.all(querySnapshot.docs.map(
			async (docSnapshot) => {
				const dealID = docSnapshot.id
				const { item, price, seller } = docSnapshot.data()

				const cardRef = doc(db, "Cards", item)
				const cardSnap = await getDoc(cardRef)
				// console.log(id, item, price, seller)
				// console.log(cardSnap.data())
				return { dealID, item, price, seller, ...cardSnap.data(), id: cardSnap.id}
			}))

		setDeals(deals)
	}

	useEffect(() => { getDeals() }, [])


	const dealList = deals.map((deal, i) => {
		return (
			<div key={i} className="DealContainer">
				<Card {...deal} />
				<div>
				Price: {deal.price}
				</div>
				<div>
				Seller: {deal.seller.username}
				</div>
			</div>
		)
	})

	return (
		<div className="Inventory">
			{dealList}
		</div>
	)
}

export default MarketPage
import React, { useEffect } from "react"
import "../styles/card.css"

const Card = ({ name, text, image }) => {
	useEffect(() => console.log("name", name), [])
	return (
		<div className="Card">
			<div className="ImageContainer">
				<img src={image} className="Image"></img>
			</div>
			<div className="NameContainer">
				{name}
			</div>
			<div className="TextContainer">
				{text}
			</div>
		</div>
	)
}

export default Card
import React, { useEffect } from "react"
import "../styles/card.css"

const Card = ({ id, name, text, image, handleClick, large }) => {

	return (
		<div className={large ? "Card Large" : "Card"} onClick={large ? () => {} : handleClick}>
			<div className="ImageContainer">
				<img src={image} className="Image"></img>
			</div>
			<div className="NameContainer">
				{id}
			</div>
			<div className="TextContainer">
				{text}
			</div>
		</div>
	)
}

export default Card
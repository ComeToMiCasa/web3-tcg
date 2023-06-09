import React, { useEffect } from "react"
import "../styles/card.css"

const Card = ({ id, name, text, image, cnt, handleClick, large }) => {

	return (
		<div className={large ? "Card Large" : "Card Small"} onClick={large ? () => {} : handleClick}>
			<div className="CountContainer">
				{cnt}
			</div>
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
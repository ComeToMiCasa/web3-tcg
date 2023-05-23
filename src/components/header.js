import React from "react"
import "../App.css"
import { Link } from "react-router-dom"

const Header = () => {
	return (
		<div className="Header">
			<Link to="/" style={{textDecoration: "none", color: "inherit"}}>
				<div className="HeaderLogo">
                (대충 로고)
				</div>
			</Link>
			
			<div className="HeaderButtons">
				<Link to="/inventory" style={{textDecoration: "none", color: "inherit"}}>
					<div className="HeaderButton">
                    Inventory
					</div>
				</Link>
				<Link to="/market" style={{textDecoration: "none", color: "inherit"}}>
					<div className="HeaderButton">
                    Market
					</div>
				</Link>

			</div>
		</div>
	)
}

export default Header
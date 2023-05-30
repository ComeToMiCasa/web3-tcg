import React, { useContext } from "react"
import "../App.css"
import { Link } from "react-router-dom"
import { userContext } from "../context"
import { signOut } from "firebase/auth"
import auth from "../auth"

const Header = () => {
	const { uid } = useContext(userContext)

	const handleSignOut = () => {
		signOut(auth)
			.then(() => console.log("sign out success"))
			.catch((e) => console.error(e))
	}
	return (
		<div className="Header">
			<Link to="/" style={{textDecoration: "none", color: "inherit"}}>
				<div className="HeaderLogo">
					WEB3-TCG
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
				<Link to="/mypage" style={{textDecoration: "none", color: "inherit"}}>
					<div className="HeaderButton">
                    Mypage
					</div>
				</Link>
				{uid ? 
					(<div className="HeaderButton"
						onClick={handleSignOut}
					>
					Log Out
					</div>) :
					<Link to="/login" style={{textDecoration: "none", color: "inherit"}}>
						<div className="HeaderButton">
					Log In
						</div>
					</Link>
				}
			</div>
		</div>
	)
}

export default Header
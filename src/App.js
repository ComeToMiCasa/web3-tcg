import React, { useEffect, useState } from "react"
import InventoryPage from "./pages/inventoryPage"
import "./App.css"
import Header from "./components/header"
import { Routes, Route } from "react-router-dom"
import MarketPage from "./pages/marketPage"
import HomePage from "./pages/homePage"
import LoginPage from "./pages/loginPage"
import { onAuthStateChanged } from "firebase/auth"
import auth from "./auth"
import { userContext } from "./context"

const App = () => {

	const [username, setUsername] = useState("")
	const [uid, setUid] = useState("")

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid)
				setUsername(user.displayName)
			} else {
				setUid(null)
				setUsername(null)
			}
		})
		return unsubscribe
	}, [])

	return (
		<userContext.Provider value={{ username, setUsername, uid, setUid }}>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />}/>
					<Route path="/inventory" element={<InventoryPage />}/>
					<Route path="/market" element={<MarketPage />}/>
					<Route path="/login" element={<LoginPage />}/>
				</Routes>
			
			</div>
		</userContext.Provider>
	)
}

export default App
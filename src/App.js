import React, { useEffect, useState } from "react"
import InventoryPage from "./pages/inventoryPage"
import "./App.css"
import Header from "./components/header"
import { Routes, Route } from "react-router-dom"
import MarketPage from "./pages/marketPage"
import HomePage from "./pages/homePage"
import LoginPage from "./pages/loginPage"
import MyPage from "./pages/myPage"
import { onAuthStateChanged } from "firebase/auth"
import auth from "./auth"
import { userContext } from "./context"
import { doc, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import Web3 from "web3"

const App = () => {

	const [username, setUsername] = useState("")
	const [uid, setUid] = useState("")

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			// console.log(user)
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

	const [account, setAccount] = useState()


	const connectWallet = async () => {
		if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
			const web3 = new Web3(window.ethereum)
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			  });
			setAccount(accounts[0])
			// console.log(accounts[0])
		}
	}


	useState(() => {
		connectWallet()
	}, [])


	return (
		<userContext.Provider value={{ username, setUsername, uid, setUid, account, setAccount }}>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />}/>
					<Route path="/inventory" element={<InventoryPage />}/>
					<Route path="/market" element={<MarketPage />}/>
					<Route path="/login" element={<LoginPage />}/>
					<Route path="/mypage" element={<MyPage />}/>
				</Routes>
			
			</div>
		</userContext.Provider>
	)
}

export default App
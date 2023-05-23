import React from "react"
import InventoryPage from "./pages/inventoryPage"
import "./App.css"
import Header from "./components/header"
import { Routes, Route } from "react-router-dom"
import MarketPage from "./pages/marketPage"
import HomePage from "./pages/homePage"

const App = () => {


	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />}/>
				<Route path="/inventory" element={<InventoryPage />}/>
				<Route path="/market" element={<MarketPage />}/>
			</Routes>
			
		</div>
	)
}

export default App
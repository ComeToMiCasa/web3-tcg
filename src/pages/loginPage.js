import React from "react"
import { signInWithPopup } from "firebase/auth"
import auth, { googleProvider } from "../auth"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"
import { ReactComponent as GoogleLogo} from "../images/Google-color.svg"

const LoginPage = () => {

	const navigate = useNavigate()

	const handleSignIn = (provider) => {
		signInWithPopup(auth, provider)
			.then((res) => {
				const user = res.user
				console.log(user.uid)
			})
			.then(() => {
				navigate(-1)
			})
			.catch((e) => console.error(e))
	}

	return (
		<div className="LoginContainer">
			<div className="SocialLoginButton" id="Google" onClick={() => handleSignIn(googleProvider)}>
				<GoogleLogo className="SocialLogo"/>
				<div className="SocialText">Google 계정으로 로그인</div>
			</div>
		</div>
	)
}

export default LoginPage
import Form from "../components/Form";
import RegisterLayout from "../layouts/registerLayout";
import { signInUser } from "../services/firebaseAuth";
import { useNavigate } from "react-router-dom";
import * as React from "react";
const SignIn = () => {
// Component logic . . .
// 🔄 State for form fields and feedback

	const [email, setEmail] = React.useState(null);
	const [password, setPassword] = React.useState(null);
	const [message, setMessage] = React.useState(null);
	const [emailError, setEmailError] = React.useState(null);
	const [passwordError, setPasswordError] = React.useState(null);
	const navigate = useNavigate();

	// 🔐 Handle login logic
	const login = async (e) => {
		e.preventDefault();
				// Reset errors/messages before new attempt
		setEmailError(null);
		setPasswordError(null);
		setMessage(null)
		try {
			await signInUser(email, password);
			console.log("login success");
			setMessage("success");
			setTimeout(() => { // Navigate after delay
				navigate("/employees");
			}, 1500);
		} catch (error) {
			// Handle specific Firebase auth errors
			switch (error.code) {
				case "auth/invalid-credential":
					setMessage("invalid credential");
					break;
				case "auth/invalid-email":
					setEmailError("Please type a valid email");
					break;
				case "auth/missing-email":
					setEmailError("Required")
					break
				case "auth/missing-password":
					setPasswordError("Required")
					break
				default:
					setMessage("failed");
					break;
			}
			console.error(error.code);
		}
	};
		// 🧱 Render layout and login form
	return (
		<>
			<RegisterLayout title={"Sign in"}>
				<Form
					handleAuthentication={login}
					setEmail={setEmail}
					setPassword={setPassword}
					setEmailError={setEmailError}
					setPasswordError={setPasswordError}
					emailError={emailError}
					passwordError={passwordError}
					message={message}
				/>
			</RegisterLayout>
		</>
	);
};

export default SignIn;

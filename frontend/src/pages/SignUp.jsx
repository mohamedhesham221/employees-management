import Form from "../components/Form";
import RegisterLayout from "../layouts/registerLayout";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/firebaseAuth";

const SignUp = () => {
	// Component logic . . .
// 🔄 State for form fields and feedback
	const [email, setEmail] = React.useState(null);
	const [password, setPassword] = React.useState(null);
	const [message, setMessage] = React.useState(null);
	const [emailError, setEmailError] = React.useState(null);
	const [passwordError, setPasswordError] = React.useState(null);
	const [name, setName] = React.useState("");
	const [nameError, setNameError] = React.useState("");
	const navigate = useNavigate();
		// ✅ Regex for valid names (letters & spaces only)
	const NAME_REGEX = /^[A-Za-z\s]+$/;

		// 🔎 Name validation logic
	const nameValidation = () => {
		if (!name.length) {
			setNameError("Name cannot be empty");
			return false;
		} else if (!name.match(NAME_REGEX)) {
			setNameError("Please type a valid name");
			return false;
		} else if (name.length < 3) {
			setNameError("Name must be more than 3 charachters");
			return false;
		}
		return true;
	};

		// 📝 Handle user registration
	const register = async (e) => {
		e.preventDefault();
		// 🔁 Reset errors/messages before re-submitting
		setEmailError(null);
		setPasswordError(null);
		setNameError(null);
		setMessage(null)
		const isValid = nameValidation();
		if (!isValid) return;

		try {
			await registerUser(email, password, name)
			console.log("registeration success");
			setMessage("successed");
			setTimeout(() => {
				navigate("/sign-in")
			}, 1500);
		} catch (error) {
						// ❌ Handle Firebase auth errors
			switch (error.code) {
				case "auth/email-already-in-use":
					setEmailError("Email already in use");
					break;
				case "auth/invalid-email":
					setEmailError("Please type a valid email");
					break;
				case "auth/weak-password":
					setPasswordError("Password must be at least 6 charachters");
					break;
				case "auth/missing-email":
					setEmailError("Required")
					break
				case "auth/missing-password" :
					setPasswordError("Required")
					break
				default:
					setMessage("failed");
					break;
			}
			console.error(error.code);
			setMessage("failed");
		} 
	};
	// 🧱 Render layout and sign-up form
	return (
		<>
			<RegisterLayout title={"Sign up"}>
				<Form
					handleAuthentication={register}
					message={message}
					setEmail={setEmail}
					setPassword={setPassword}
					emailError={emailError}
					passwordError={passwordError}
					setName={setName}
					nameError={nameError}
				/>
			</RegisterLayout>
		</>
	);
};

export default SignUp;

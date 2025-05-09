import "./App.css";
import { Routes, Route } from "react-router-dom";
import {SignIn, SignUp, IntroPage, Employees, Employe} from "./pages"
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
	return (
		<>
			<Routes>
				<Route path="*" element={<IntroPage />} />
				<Route path="sign-in" element={<SignIn />} />
				<Route path="sign-up" element={<SignUp />} />
				<Route
					path="employees"
					element={
						<ProtectedRoute>
							<Employees />
						</ProtectedRoute>
					}
				/>
				<Route path="/:id" 
					element= { 
						<ProtectedRoute>
							<Employe />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default App;

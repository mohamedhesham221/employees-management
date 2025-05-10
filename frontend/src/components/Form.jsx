import { Link, useLocation } from "react-router-dom";
import * as React from "react";
import images from "../utils/images";

const Form = ({
	handleAuthentication,
	message,
	setEmail,
	setPassword,
	emailError,
	passwordError,
	setName,
	nameError,
}) => {
	// Component logic . . .
	const location = useLocation();
	const isSignUp = location.pathname === "/sign-up";
	return (
		<form
			onSubmit={handleAuthentication}
			noValidate
			className="text-[var(--text-color)] "
		>
			{/* Hidden legend for accessibility (screen readers) */}
			<fieldset className="flex flex-col gap-3">
				<legend className="hidden">User info</legend>
				{/* Show the Name input only on the sign-in page */}
				{isSignUp && (
					<div className="flex flex-col gap-1">
						<label htmlFor="name" className="md:text-xl">
							Name
						</label>
						<input
							type="text"
							id="name"
							placeholder="e.g:- John Doe"
							className="input-style"
							onChange={(e) => setName(e.target.value)}
						/>
						{/* Placeholder for validation error message */}
						<span
							className={`${
								nameError ? "block" : "hidden"
							} text-[var(--accent-red)]`}
						>
							<sup>*</sup> {nameError}
						</span>
					</div>
				)}
				<div className="flex flex-col gap-1">
					<label htmlFor="email" className="md:text-xl">
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="e.g:- example@gmail.com"
						className="input-style"
						onChange={(e) => setEmail(e.target.value)}
					/>
					{/* Placeholder for validation error message */}
					<span
						className={`${
							emailError ? "block" : "hidden"
						} text-[var(--accent-red)]`}
					>
						<sup>*</sup> {emailError}
					</span>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="password" className="md:text-xl">
						{location.pathname === "/sign-up" ? "Create password" : "Password"}
					</label>
					<input
						type="password"
						id="password"
						className="input-style"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{/* Placeholder for validation error message */}
					<span
						className={`${
							passwordError ? "block" : "hidden"
						} text-[var(--accent-red)]`}
					>
						<sup>*</sup> {passwordError}
					</span>
				</div>
			</fieldset>
			{/* Submit button — changes text based on current route */}
			<button
				type="submit"
				className="btn btn-neutral w-full mt-5 bg-[var(--text-color)]"
			>
				{isSignUp ? "Register" : "Sign in"}
			</button>
			{/* Conditional rendering of the link — depends on the current page */}
			{isSignUp ? (
				<p className="flex justify-center items-center mt-4 gap-x-2">
					<span className="text-[var(--table-row-text)]">
						Already have an account?
					</span>
					<Link
						to="/sign-in"
						className="font-semibold text-[var(--text-color)]"
					>
						Sign In
					</Link>
				</p>
			) : (
				<p className="flex justify-center items-center mt-4 gap-x-2">
					<span className="text-[var(--table-row-text)]">
						Don’t have an account?
					</span>
					<Link
						to="/sign-up"
						className="font-semibold text-[var(--text-color)]"
					>
						Sign Up
					</Link>
				</p>
			)}
			<div
				className={`flex items-center justify-start gap-2 ${
					message ? "block " : "hidden "
				} ${
					message === "success"
						? "text-[var(--accent-green)]"
						: "text-[var(--accent-red)]"
				} mt-4`}
			>
				{message === "success" ? (
					<img src={images.checkmark} alt="Checkmark Icon" />
				) : (
					<img src={images.wrongSign} alt="Wrong Icon" />
				)}
				<p>
					{isSignUp
						? `Registeration ${message}`
						: message === "invalid credential"
						? `Something wrong may email/password incorrect`
						: `Login ${message}`}
				</p>
			</div>
		</form>
	);
};

export default Form;

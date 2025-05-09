import { roles } from "../utils/common";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	addEmploye,
	updateEmploye,
	getEmployeById,
} from "../services/firebaseDB";
import * as React from "react";
import InputField from "./InputField";
const ModalForm = ({ type, id }) => {
	const queryClient = useQueryClient();
	const [dataWillEdit, setDataWillEdit] = React.useState({});

	// Reset Form after submision
	React.useEffect(() => {
		if (!id || id.length === 0) return;
		const getEmployeDataWillEdit = async () => {
			const data = await getEmployeById(id);
			setDataWillEdit(data);
		};
		getEmployeDataWillEdit();
	}, [id]);
	const {
		address,
		age,
		country,
		date,
		email,
		name,
		phoneNumber,
		rate,
		role,
		salary,
	} = dataWillEdit?.data || {};
	console.log(dataWillEdit);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			address: address || "",
			age: age || "",
			country: country || "",
			date: date || "",
			email: email || "",
			name: name || "",
			phoneNumber: phoneNumber || "",
			rate: rate || "",
			role: id ? role : "Select a role",
			salary: salary || "",
		},
	});
	React.useEffect(() => {
		if (id) {
			reset({
				address,
				age,
				country,
				date,
				email,
				name,
				phoneNumber,
				rate,
				role,
				salary,
			});
		}
	}, [
		address,
		age,
		country,
		date,
		email,
		id,
		name,
		phoneNumber,
		rate,
		reset,
		role,
		salary,
	]);
	// add new employee to cach
	const addMutation = useMutation({
		mutationFn: addEmploye,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: "employees" });
		},
	});
	// update cach employee
	const updateMutation = useMutation({
		mutationFn: ({ id, data }) => updateEmploye({ id, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: "employees" });
		},
	});
	const onSubmit = (data) => {
		if (type === "add") {
			addMutation.mutate(data);
			document.getElementById("add_modal").close(); //Close add modal
		} else {
			updateMutation.mutate({ id, data });
			document.getElementById("edit_modal").close(); //Close update modal
		}
		reset(); //reset form after submission
	};

	return (
		<>
			<form className="py-4" onSubmit={handleSubmit(onSubmit)} method="dialog">
				{/* Personal Information Section */}
				<fieldset className="flex flex-wrap gap-4">
					<legend className="hidden">Employe information</legend>
					{/* Name Field */}
					<div className="w-full md:w-[48%]">
						<InputField
							register={register}
							errors={errors}
							label="name"
							inputType="text"
							requiredMsg="Name is required"
							patternVal={/^[A-Za-z ]+$/}
							patternMsg="Please type a real name"
							placeholder="e.g:- John Doe"
						/>
						
					</div>
					{/* Email Field */}
					<div className="w-full md:w-[48%]">
					<InputField
							register={register}
							errors={errors}
							label="email"
							inputType="email"
							requiredMsg="Email is required"
							patternVal={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/}
							patternMsg="Please enter a valid email address"
							placeholder="mail@gmail.com"
						/>
					</div>
					{/* Phone Number Field with its validation */}
					<div className="w-full md:w-[48%]">
					<InputField
							register={register}
							errors={errors}
							label="phoneNumber"
							inputType="tel"
							requiredMsg="Phone number is required"
							patternVal={/^\+?[1-9]\d{1,14}$/}
							patternMsg="Please enter a valid phone number"
							placeholder="phone number"
						/>
					</div>
					{/* Age Field */}
					<div className="w-full md:w-[48%]">
					<InputField
							register={register}
							errors={errors}
							label="age"
							inputType="number"
							requiredMsg="Age is required"
							placeholder="age"
							patternMin={18}
							patternMinMsg={"Age must be greater than or equal to 18"}
							patternMax={100}
							patternMaxMsg={"Age must be less than or equal to 100"}
						/>
					</div>
					{/* Country Field */}
					<div className="w-full">
					<InputField
							register={register}
							errors={errors}
							label="country"
							inputType="text"
							requiredMsg="Country is required"
							patternVal={/^[A-Za-z\s]+$/}
							patternMsg="Please enter a valid country name"
							placeholder="Egypt, etc."
						/>
					</div>
					{/* Address Field */}
					<div className="w-full">
					<InputField
							register={register}
							errors={errors}
							label="address"
							inputType="text"
							requiredMsg="Address is required"
							placeholder="New Cairo, Egypt"
						/>
					</div>
				</fieldset>
				{/* Employee Details Section */}
				<fieldset className="flex flex-wrap gap-4 mt-6">
					<legend className="hidden">Employe details</legend>
					{/* Role Selection */}
					<div className="md:!w-[48%]">
						<select
							className="select select-md bg-white focus:outline-none rounded-2xl cursor-pointer input-style !text-[var(--text-color)] !border-[var(--main-bg)]"
							{...register("role", { required: true })}
						>
							<option disabled={true} value="Select a role">
								Select a role
							</option>
							{roles.map((option, index) => {
								return <option key={index}>{option}</option>;
							})}
						</select>
						{errors.role && (
							<span className="text-[var(--accent-red)]">
								This field is required
							</span>
						)}
					</div>
					{/* Salary Field */}
					<div className="w-full md:w-[48%]">
					<InputField
							register={register}
							errors={errors}
							label="salary"
							inputType="number"
							requiredMsg="This field is required"
							placeholder="Salary"
						/>
					</div>
					{/* Rating Field */}
					<div className="w-full md:w-[48%]">
					<InputField
							register={register}
							errors={errors}
							label="rate"
							inputType="number"
							requiredMsg="Rate is required"
							placeholder="rating"
							patternMin={0}
							patternMinMsg={"Rate must be greater than or equal to 0"}
							patternMax={5}
							patternMaxMsg={"Rate must be less than or equal to 5"}
						/>
					</div>
					{/* Date Field */}
					<div className="w-[48%]">
						<input
							type="date"
							className="input-style !text-[var(--text-color)] !border-[var(--main-bg)]"
							{...register("date", { required: true })}
						/>
						{errors.date && (
							<span className="text-[var(--accent-red)]">
								This field is required
							</span>
						)}
					</div>
				</fieldset>
				{/* Action Buttons */}
				<div className="flex justify-end mt-4 ">
					{type === "add" ? (
						<button className="btn bg-[var(--accent-blue)] w-30">Add</button>
					) : (
						<button className="btn bg-[var(--accent-blue)] w-30">Edit</button>
					)}
				</div>
			</form>
		</>
	);
};

export default ModalForm;

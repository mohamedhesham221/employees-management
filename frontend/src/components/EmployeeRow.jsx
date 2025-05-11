import * as React from "react";
import images from "../utils/images";
import { formatDate, formatAmount } from "../utils/common";
import { Link } from "react-router-dom";

// Component to render a single employee row in the table

const EmployeeRow = ({ employee, setImpID }) => {
	// Decide which icon to show based on employee rate
	const rateIcon =
		Number(employee.data.rate) >= 4 ? images.highRate : images.LowRate;
	// get employee data to edit
	//open modal depend on its type
	const openModal = (modalType) => {
		if (modalType === "update") {
			setTimeout(() => {
				document.getElementById("edit_modal").showModal();
			},500)
		} else {
			document.getElementById("delete_modal").showModal();
		}
		setImpID(employee.id);
	};
	return (
		<>
			{/* Show the employee data */}
			<tr className="border-b last-of-type:border-0 border-[var(--table-border)] text-center hover:bg-[var(--table-hover-bg)] cursor-pointer">
				<th>{employee.id.slice(0, 6)}</th>
				<td className="whitespace-nowrap">{employee.data.name}</td>
				<td>{employee.data.role}</td>
				<td>{employee.data.email}</td>
				<td>{employee.data.phoneNumber}</td>
				<td>{employee.data.age}</td>
				<td>{employee.data.country}</td>
				<td>{formatAmount(employee.data.salary)}</td>
				<td>
					<span className="flex items-center justify-center">
						{Number(employee.data.rate)}
						<img src={rateIcon} alt="Rate icon" />
					</span>
				</td>
				<td className="whitespace-nowrap">{formatDate(employee.data.date)}</td>
				{/* Action dropdown: Edit, Delete, View */}
				<td className="w-12">
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn m-1 bg-transparent border-0 shadow-none p-0 w-4 h-12"
						>
							<img src={images.dots} alt="Open actions menu" />
						</div>
						<ul className="dropdown-content menu bg-[var(--table-hover-bg)] rounded-box z-1 w-52 p-2 shadow-sm items-center flex-row justify-between">
							<li>
								<button onClick={() => openModal("update")}>
									<img
										src={images.update}
										alt="Edit employee"
										className="lg:w-7"
									/>
								</button>
							</li>
							<li>
								<button onClick={() => openModal("delete")}>
									<img
										src={images.delete}
										alt="Delete employee"
										className="lg:w-7"
									/>
								</button>
							</li>
							{/* View button, navigates to detail page */}
							<li>
								<Link key={employee.id} to={`/${employee.id}`}>
									<img
										src={images.view}
										alt="View employee details"
										className="lg:w-7"
									/>
								</Link>
							</li>
						</ul>
					</div>
				</td>
			</tr>
		</>
	);
};

export default EmployeeRow;

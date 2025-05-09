import ModalForm from "./ModalForm";
import images from "../utils/images";

const EditModal = ({id}) => {
	return (
		<>
			<dialog
				id="edit_modal"
				className="modal modal-bottom sm:modal-middle px-5"
			>
				<div className="modal-box bg-white">
					<h3 className="font-bold text-lg text-[var(--text-color)]">
						Update Employe
					</h3>
					<ModalForm type={"edit"} id={id}/>
					<div className="modal-action absolute top-0 right-6">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="cursor-pointer bg-transparent  rounded-full ">
								<img src={images.closeIcon} className="w-5" alt="close form icon" />
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default EditModal;

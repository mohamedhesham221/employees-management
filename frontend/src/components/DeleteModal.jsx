import images from "../utils/images";
import { deleteEmployee } from "../services/firebaseDB";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteModal = ({id}) => {
const queryClient = useQueryClient();
	const deleteMutation = useMutation({
		mutationFn: deleteEmployee,
		onSuccess: () => queryClient.invalidateQueries({queryKey: "employees"})
	})
	const onDelete = () => {
		deleteMutation.mutate(id)
	}
	
	return (
		<>
			<dialog id="delete_modal" className="modal">
				<div className="modal-box text-center">
					<img
						src={images.closeIcon}
						alt="Delete icon"
						className="w-12 lg:w-24 mx-auto mb-5"
					/>
					<h3 className="font-bold text-lg">Are you sure?</h3>
					<p className="py-4">
						Do you really want to delete these records? This process cannot be
						undone.
					</p>
					<div className="modal-action">
						<form method="dialog" className=" flex gap-4">
							<button className="btn btn-error text-white">Cancel</button>
							<button className="btn btn-warning text-white" onClick={onDelete}>Delete</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default DeleteModal;

// custom component for input filed
/**
 * 
 * props:-
  *    register: A function from react-hook-form used to register the field with validation.
  *    errors: Contains the validation errors for the fields.
  *    label: The name of the field used in the label and in register.
  *    inputType: The input type, such as text or number.
  *    requiredMsg: The error message when the field is left empty
  *    patternVal: The pattern that the input must match
	*    patternMsg:  The error message when the input does not match the pattern.
	*    patternMin: The minimum allowed value for the input
	*    patternMinMsg: The error message when the value is less than the minimum.
	*    patternMax: The maximum allowed value for the input.
	*    patternMaxMsg: The error message when the value exceeds the maximum.
	*    placeholder: The placeholder text shown in the input field before data is entered.
 */
const InputField = ({
	//Component logic . . .
	register,
	errors,
	label,
	inputType,
	requiredMsg,
	patternVal,
	patternMsg,
	patternMin,
	patternMinMsg,
	patternMax,
	patternMaxMsg,
	placeholder,
}) => {
	return (
		<>
			<label className="floating-label">
				<span className="!bg-white text-[var(--text-color)]">
					{label === "phoneNumber" && "phone number"}
				</span>
				{label === "age" || label === "rate" ? (
					<input
						type={inputType}
						{...register(label, {
							required: requiredMsg,
							min: {
								value: patternMin,
								message: patternMinMsg,
							},
							max: {
								value: patternMax,
								message: patternMaxMsg,
							},
						})}
						placeholder={placeholder}
						className="input-style !text-[var(--text-color)] !border-[var(--main-bg)]"
					/>
				) : (
					<input
						type={inputType}
						{...register(label, {
							required: requiredMsg,
							pattern: {
								value: patternVal,
								message: patternMsg,
							},
						})}
						placeholder={placeholder}
						className="input-style !text-[var(--text-color)] !border-[var(--main-bg)]"
					/>
				)}
			</label>
			{errors[label] && (
				<span className="text-[var(--accent-red)]">
					{errors[label]?.message}
				</span>
			)}
		</>
	);
};

export default InputField;

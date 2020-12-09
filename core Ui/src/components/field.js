import React from 'react';

const Field = ({ handleChange, handleBlur, name, type, values, touched, errors, disabled, ...props }) => {
	return (
		<div className="form-group">
			<label className="text-uppercase" htmlFor={name}>
				{name.replace(/_/g, ' ')}
			</label>
			<input
				className="form-control"
				id={name}
				disabled={disabled}
				{...props}
				name={name}
				type={disabled ? 'text' : type}
				onChange={handleChange}
				onBlur={handleBlur}
				value={values[name]}
			/>
			{touched[name] && errors[name] ? <small className="text-danger">{errors[name]}</small> : null}
		</div>
	);
};

export default Field;

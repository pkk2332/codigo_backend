import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Axios from 'axios';
import Field from './field';

const Schema = Yup.object({
	title: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	expiry_date: Yup.string().required('Required'),
	quantity: Yup.number().required('Required'),
	payment_discount_type: Yup.string().required('Required'),
	discount_percent: Yup.number().required('Required'),
	maximun_limit: Yup.number().required('Required')
});

const Form = ({ initialValues, submitCall, disableFileds = [] }) => {
	const { handleBlur, handleChange, handleSubmit, values, touched, errors } = useFormik({
		initialValues: initialValues,
		validationSchema: Schema,
		onSubmit: submitCall
	});
	const [ paymentType, setPaymentType ] = useState([]);

	const getPaymentType = async () => {
		const { data } = await Axios.get('evouchers/payment/list');
		setPaymentType(data);
	};
	useEffect(() => {
		getPaymentType();
	}, []);
	return (
		<form action="" onSubmit={handleSubmit}>
			<Field
				handleBlur={handleBlur}
				type="text"
				name="title"
				handleChange={handleChange}
				values={values}
				disabled={disableFileds.includes('title')}
				touched={touched}
				errors={errors}
			/>
			<Field
				handleBlur={handleBlur}
				type="text"
				name="description"
				disabled={disableFileds.includes('description')}
				handleChange={handleChange}
				values={values}
				touched={touched}
				errors={errors}
			/>
			<Field
				handleBlur={handleBlur}
				type="date"
				name="expiry_date"
				disabled={disableFileds.includes('expiry_date')}
				handleChange={handleChange}
				values={values}
				touched={touched}
				errors={errors}
			/>
			<Field
				handleBlur={handleBlur}
				type="number"
				disabled={disableFileds.includes('amount')}
				name="amount"
				handleChange={handleChange}
				values={values}
				touched={touched}
				errors={errors}
			/>
			<Field
				handleBlur={handleBlur}
				type="number"
				name="quantity"
				disabled={disableFileds.includes('quantity')}
				handleChange={handleChange}
				values={values}
				touched={touched}
				errors={errors}
			/>
			<Field
				handleBlur={handleBlur}
				type="number"
				name="maximun_limit"
				disabled={disableFileds.includes('maximun_limit')}
				handleChange={handleChange}
				values={values}
				touched={touched}
				errors={errors}
			/>
			<Field
				handleBlur={handleBlur}
				type="number"
				name="discount_percent"
				disabled={disableFileds.includes('discount_percent')}
				handleChange={handleChange}
				values={values}
				touched={touched}
				min={0}
				max={100}
				errors={errors}
			/>
			<div className="form-group">
				<label htmlFor="exampleFormControlSelect1">Payment Discount Type</label>
				<select
					onChange={handleChange}
					disabled={disableFileds.includes('payment_discount_type')}
					name="payment_discount_type"
					id="payment_discount_type"
					className="form-control"
				>
					<option disabled value="" />
					{paymentType.map((payment) => {
						if (payment === values.payment_discount_type) {
							return (
								<option selected key={payment} value={payment}>
									{payment}
								</option>
							);
						}
						return (
							<option key={payment} value={payment}>
								{payment}
							</option>
						);
					})}
				</select>
			</div>
			<div className="d-flex">
				<button type="submit" className="mt-5 ml-auto btn btn-primary">
					Submit
				</button>
			</div>
		</form>
	);
};

export default Form;

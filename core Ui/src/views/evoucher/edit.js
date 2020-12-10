import React, { useState, useEffect } from 'react';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination } from '@coreui/react';
import qs from 'qs';

import Axios from 'axios';
import Form from '../../components/form';
import { useHistory, useParams } from 'react-router-dom';

const Users = () => {
	const { id } = useParams();
	const history = useHistory();
	const [ initialValues, setinitialValues ] = useState(null);
	useEffect(() => {
		Axios.get('/evouchers/' + id).then(({ data }) => {
			data.expiry_date = new Date(data.expiry_date).toLocaleDateString();
			setinitialValues(data);
		});
	}, []);
	const submitCall = async (values) => {
		try {
			await Axios.post('evouchers/' + id, qs.stringify(values), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
			alert('Action Successful');

			return history.push('/evoucher');
		} catch (error) {
			return alert('Action Failed');
		}
	};

	return (
		<CRow className="justify-content-center">
			<CCol col={12} lg={9}>
				<CCard>
					<CCardHeader>Evoucher</CCardHeader>
					<CCardBody>
						{initialValues && (
							<Form
								disableFileds={[
									'expiry_date',
									'amount',
									'quantity',
									'discount_percent',
									'payment_discount_type'
								]}
								submitCall={submitCall}
								initialValues={initialValues}
							/>
						)}
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Users;

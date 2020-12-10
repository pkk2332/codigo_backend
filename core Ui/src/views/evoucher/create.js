import React, { useState, useEffect } from 'react';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination } from '@coreui/react';
import qs from 'qs';

import Axios from 'axios';
import Form from '../../components/form';
import { Router, useHistory } from 'react-router-dom';

const Users = () => {
	const history = useHistory();
	const initialValues = {
		title: '',
		description: '',
		expiry_date: '',
		quantity: 1,
		payment_discount_type: '',
		discount_percent: 0,
		maximun_limit: 1
	};
	const submitCall = async (values) => {
		try {
			await Axios.post('evouchers', qs.stringify(values), {
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
						<Form submitCall={submitCall} initialValues={initialValues} />
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Users;

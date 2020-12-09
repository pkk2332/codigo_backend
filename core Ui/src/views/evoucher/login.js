import React, { useState, useEffect } from 'react';
import { Route, Router, useHistory, useLocation } from 'react-router-dom';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination } from '@coreui/react';
import { isLogin } from '../../containers/TheContent';
import Axios from 'axios';

const Users = () => {
	const history = useHistory();
	const login = async () => {
		try {
			const { data } = await Axios.post('evouchers/auth/login');
			localStorage.setItem('token', data.token);
			history.push('/evoucher');
		} catch (error) {}
	};
	useEffect(() => {
		if (isLogin()) {
			history.push('/evoucher');
		}
	});
	return (
		<CRow>
			<CCol xl={12} className="justify-content-center d-flex">
				<button onClick={login} className="btn btn-primary mx-auto">
					Sign In
				</button>
			</CCol>
		</CRow>
	);
};

export default Users;

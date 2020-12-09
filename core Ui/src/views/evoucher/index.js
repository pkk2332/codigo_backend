import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination } from '@coreui/react';

import Axios from 'axios';

const Users = () => {
	const history = useHistory();

	const queryPage = useLocation().search.match(/page=([1-9]+)/, '');
	const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
	const [ page, setPage ] = useState(currentPage);
	const [ vouchers, setVoucher ] = useState([]);

	const totalPage = () => {
		var totalPage = vouchers.length / 5;

		if (totalPage !== 0) {
			totalPage = totalPage + 1;
		}
		return Math.round(totalPage);
	};
	const keys = vouchers.length > 0 && Object.keys(vouchers[0]);
	keys && keys.push('action');

	const pageChange = (newPage) => {
		currentPage !== newPage && history.push(`/evoucher?page=${newPage}`);
	};

	useEffect(
		() => {
			currentPage !== page && setPage(currentPage);
		},
		[ currentPage, page ]
	);

	const fetchData = async () => {
		const { data } = await Axios.get('evouchers');
		setVoucher(data);
	};

	useEffect(() => {
		fetchData();
		// const urlParams = new URLSearchParams(window.location.search);
		// const myParam = urlParams.get('page');
	}, []);
	const changeActiveStatus = async (id) => {
		try {
			await Axios.post('evouchers/active/' + id);
			fetchData();
			alert('Action successful');
		} catch (error) {
			alert('Action Failed');
		}
	};
	return (
		<CRow>
			<CCol col={12}>
				<CCard>
					<CCardHeader>Evoucher</CCardHeader>
					<CCardBody>
						<CDataTable
							items={vouchers}
							fields={keys}
							hover
							striped
							itemsPerPage={5}
							activePage={page}
							// clickableRows
							scopedSlots={{
								expiry_date: (item) => <td>{new Date(item.expiry_date).toLocaleDateString()}</td>,
								action: (item) => (
									<td>
										<button className="btn btn-success" onClick={() => changeActiveStatus(item.id)}>
											{item.active ? 'Disable' : 'Enable'}
										</button>

										<button
											onClick={() => history.push(`evoucher/edit/${item.id}`)}
											className="ml-2 mt-2 btn btn-success"
										>
											Edit
										</button>
									</td>
								)
							}}
						/>
						<CPagination
							activePage={page}
							onActivePageChange={pageChange}
							pages={totalPage()}
							doubleArrows={false}
							align="center"
						/>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Users;

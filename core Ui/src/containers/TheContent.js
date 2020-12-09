import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react';

// routes config
import routes from '../routes';
import Axios from 'axios';

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse" />
	</div>
);

export const isLogin = () => {
	const token = localStorage.getItem('token');
	if (token) {
		Axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
	}
	return !!token;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	return <Route {...rest} render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

const TheContent = () => {
	return (
		<main className="c-main">
			<CContainer fluid>
				<Suspense fallback={loading}>
					<Switch>
						{routes.map((route, idx) => {
							if (route.auth) {
								return (
									<PrivateRoute
										key={idx}
										path={route.path}
										exact={route.exact}
										name={route.name}
										component={route.component}
									/>
								);
							}
							return (
								route.component && (
									<Route
										key={idx}
										path={route.path}
										exact={route.exact}
										name={route.name}
										render={(props) => (
											<CFade>
												<route.component {...props} />
											</CFade>
										)}
									/>
								)
							);
						})}
						<Redirect from="/" to="/login" />
					</Switch>
				</Suspense>
			</CContainer>
		</main>
	);
};

export default React.memo(TheContent);

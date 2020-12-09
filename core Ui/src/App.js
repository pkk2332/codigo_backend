import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse" />
	</div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages

class App extends Component {
	render() {
		return (
			<HashRouter>
				<React.Suspense fallback={loading}>
					<Switch>
						<Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
					</Switch>
				</React.Suspense>
			</HashRouter>
		);
	}
}

export default App;

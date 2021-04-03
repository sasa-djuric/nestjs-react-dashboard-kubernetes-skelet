import './index.scss';
import '../node_modules/antd/dist/antd.css';

// Libs
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, ReactQueryDevtools } from 'react-query-service';
import { init } from '@startup/services';

// Components
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Containers
import App from './app';

// Config
import queryClient from './config/query-client';
import { isDev, mockAPI } from './config/dev';

// Contexts
import AuthProvider from './contexts/auth/auth.context';

if (isDev && mockAPI) {
	require('@startup/services/mocks').startMockServer();
}

init(queryClient);

Spin.setDefaultIndicator(<LoadingOutlined />);

ReactDOM.render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			{isDev && <ReactQueryDevtools />}
			<AuthProvider>
				<App />
			</AuthProvider>
		</QueryClientProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

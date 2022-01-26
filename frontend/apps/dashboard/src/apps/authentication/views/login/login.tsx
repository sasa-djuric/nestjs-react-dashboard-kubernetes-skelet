// Libs
import { useNavigate } from 'react-router';

// Containers
import LoginForm from '../../forms/login';
import Layout from '../../layout';

// Services
import { LoginResponse } from '@app/services/authentication';

// Hooks
import useAuth from '../../hooks/use-auth';

interface LoginProps {}

const LoginView: React.FunctionComponent<LoginProps> = () => {
	const navigate = useNavigate();
	const { updateAuthState } = useAuth();

	function onSuccess(data: LoginResponse) {
		localStorage.setItem('token', data.token);
		updateAuthState();
		navigate('/');
	}

	return (
		<Layout>
			<LoginForm onSuccess={onSuccess} />
		</Layout>
	);
};

export default LoginView;

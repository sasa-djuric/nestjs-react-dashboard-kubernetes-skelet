// Libs
import { Suspense } from 'react';
import { RouteComponentProps } from 'react-router';

// Components
import { Card, PageHeader } from 'antd';
import ErrorBoundary from '../../../../components/service-error-boundary';
import Spinner from '../../../../components/spinner';

// Containers
import CreateUserForm from '../../forms/create';

// Hooks
import useAuth from '../../../../hooks/use-auth';

// Services
import { Role } from '@app/services/roles';
import { refreshToken } from '../../../../services/authentication.service';

interface Params {
    id?: string;
}

interface CreateProps extends RouteComponentProps<Params> {
    isEditMode?: boolean;
}

const RolesCreateView: React.FunctionComponent<CreateProps> = ({
    isEditMode,
    history,
    match,
}) => {
    const { authState, updateAuthState } = useAuth();
    const id = match.params.id ? +match.params.id : null;

    function onSubmit(promise: Promise<Role>) {
        promise.then(async (result) => {
            if (result.id === authState.user?.roleId) {
                await refreshToken();
                await updateAuthState();
            }

            history.goBack();
        });
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Roles"
                subTitle={!isEditMode ? 'Create new role' : 'Edit role'}
                style={{ marginBottom: '24px' }}
                onBack={() => history.goBack()}
            />
            <Card>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <CreateUserForm
                            id={id}
                            isEditMode={!!isEditMode}
                            onSubmit={onSubmit}
                        />
                    </Suspense>
                </ErrorBoundary>
            </Card>
        </div>
    );
};

export default RolesCreateView;
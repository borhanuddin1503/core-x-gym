import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useSecureAxios from '../services/Axios/SecureAxios/useSecureAxios';

const useUserRole = () => {
    const { user, loading: authLoading } = UseAuth();
    const axiosSecure = useSecureAxios();

    const { data: role = 'member', isLoading: roleLoading, refetch } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data.role;
        },
    });

    return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;
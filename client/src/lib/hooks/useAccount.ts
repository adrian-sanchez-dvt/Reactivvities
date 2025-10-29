import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../schemas/loginShema"
import agent from "../api/agent"
import { useLocation, useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    const loginUser = useMutation({
        mutationFn: async (creds:LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey:['user']
            });
        }
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds)
        },
        onSuccess: () => {
            toast.success('Register successful - you can now login');
            navigate('/login');
        }
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey:['user']});
            queryClient.removeQueries({queryKey:['activities']});
            navigate('/');
        }
    });

    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const resp = await agent.get<User>('/account/user-info');
            return resp.data;
        },
        enabled: !queryClient.getQueryData(['user'])
            && location.pathname !== '/login'
            && location.pathname !== '/register',
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser,
    }
}
import { axiosPrivate } from "../services/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth.authToken}`;
                }
                return config;
            }, error => {
                return Promise.reject(error);
            }
        );

        // handling 401 error (caused by expired token)
        const responseIntercept = axiosPrivate.interceptors.response.use(
            // if no error, do nothing
            response => response,
            // if error, check if it's a 401 error then fetch new authToken by using refreshToken 
            // and then retry the request
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true; // set to resend
                    const newAuthToken = await refresh(); // fetch new authToken
                    if (newAuthToken) { // if new authToken is fetched
                        prevRequest.headers.Authorization = `Bearer ${newAuthToken}`;
                        return axiosPrivate(prevRequest);
                    } else { // refresh token is expired
                        setAuth({}); // clear auth
                        navigate('/login', { replace: true }); // redirect to login page
                    }
                }
                return Promise.reject(error);
            }
        );

        // remove interceptors
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;

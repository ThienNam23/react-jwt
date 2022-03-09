import axios from "../services/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    // This function fetches new authToken by using refreshToken then store it in AuthContext 
    const refresh = async () => {
        try {
            const response = await axios.post("/api/v1/auth/refresh-token", {
                refreshToken: auth.refreshToken
            }, {
                withCredentials: true
            });
            // Store new token in AuthContext
            setAuth(prev => {
                console.log("Prev: ", prev);
                console.log("Response: ", response);
                return {
                    ...prev,
                    authToken: response.data.authToken,
                    // refreshToken: response.data.refreshToken
                }
            });
            return response.data.authToken;
        } catch (error) {
            // if can't refresh token (mostly due to expiration), logout
            // TODO: logout to fetch new token
            console.log("Error: ", error.response);
            console.log("Need to log in!");
        }
        return null;
    }
    return refresh;
}

export default useRefreshToken;
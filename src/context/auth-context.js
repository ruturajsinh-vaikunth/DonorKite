// import React from "react";
// import { useRouter } from "next/router";
// import { useAuth } from '@saas-ui/react';


// const AuthContext = React.createContext();
// // const { Provider } = AuthContext;

// const { isAuthenticated } = useAuth()

// export const ProtectRoute = ({ children }) => {
//     const router = useRouter();
    
//     const isLoggedIn = authContext.isAuthenticated;

//     if (isLoggedIn && window.location.pathname === "/") {
//         router.push("/dashboard");
//     } else if (!isLoggedIn && window.location.pathname !== "/") {
//         router.push("/");
//     }

//     return children;
// };
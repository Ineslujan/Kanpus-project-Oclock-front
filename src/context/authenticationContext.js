import React, { createContext, useState } from 'react';

export const AuthenticationContext = createContext ();

const AuthenticationContextProvider = (props) => {
    const [authentication, setAuthentication] = useState("coucou ma belle Ines")
    return (
        <AuthenticationContext.Provider value = {{ authentication, setAuthentication }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContextProvider;
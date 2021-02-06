import React, { FunctionComponent, useState } from "react";

export const Auth: FunctionComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    function login() {
        setIsAuthenticated(true);
    }

    function logout() {
        setIsAuthenticated(false);        
    }
    
    
    return (
        <div>
            
        </div>
    );
} 
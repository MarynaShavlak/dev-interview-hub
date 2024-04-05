import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {routesConfig} from "shared/config/routeConfig/routeConfig";

export const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(routesConfig).map(({path, element})=> (
                    <Route
                        key ={path}
                        path={path}
                        element={(<div className='page-wrapper'>
                            {element}
                        </div>)} />
                ) )}
            </Routes>
        </Suspense>
    );
};


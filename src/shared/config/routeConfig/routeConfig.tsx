import React from "react";
import {RouteProps} from "react-router-dom";
import {MainPage} from "pages/MainPage";
import {AboutPage} from "pages/AboutPage";

export enum AppRoutes {
    MAIN='main',
    ABOUT = 'about'
}

export const RoutePath: Record<AppRoutes, string> ={
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
}
export const routesConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage/>
    },


}

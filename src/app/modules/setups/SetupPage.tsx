import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {ToolbarWrapper} from "../../../_metronic/layout/components/toolbar";
import SageModule from "./components/SageModule.tsx";
import SageUser from "./components/SageUser.tsx";
import {Chapter} from "./components/Chapter.tsx";
import {Cases} from "./components/Cases.tsx";
import React from "react";
import {Contents} from "./components/Contents.tsx";

const widgetsBreadCrumbs: Array<PageLink> = [
    {
        title: 'Setups',
        path: '#',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const SetupPage = () => {
    return(
        <Routes>
            <Route
                element={
                    <>
                        <ToolbarWrapper />
                        <Outlet />
                    </>
                }>
                <Route
                    path='user-devices'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>User Devices</PageTitle>
                            <SageModule />
                        </>
                    }
                />
                <Route
                    path='chapters'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>Chapters </PageTitle>
                            <Chapter />
                        </>
                    }
                />
                <Route
                    path='cases'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>Cases</PageTitle>
                            <Cases />
                        </>
                    }
                />
                <Route
                    path='contents'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>Contents</PageTitle>
                            <Contents />
                        </>
                    }
                />
                <Route
                    path='app-users'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>App Users</PageTitle>
                            <SageUser />
                        </>
                    }
                />

                <Route index element={<Navigate to='/setup' />} />
            </Route>
        </Routes>
    )

}

export default SetupPage
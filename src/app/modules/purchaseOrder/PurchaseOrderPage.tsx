import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import Requisition from "./requisition/Requisition.tsx";
import {ToolbarWrapper} from "../../../_metronic/layout/components/toolbar";
import NotificationBoard from "./notification/NotificationBoard.tsx";


const widgetsBreadCrumbs: Array<PageLink> = [
    {
        title: 'Purchase Order',
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
const PurchaseOrderPage = () =>{

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
                    path='requisition'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>Requisitions</PageTitle>
                            <Requisition />
                        </>
                    }
                />
                <Route
                    path='notifications'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>Notifications</PageTitle>
                            <NotificationBoard />
                        </>
                    }
                />

                <Route index element={<Navigate to='/po' />} />
            </Route>
        </Routes>
    )

}

export default PurchaseOrderPage
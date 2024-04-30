import {Badge, Modal, Table, Tabs, TabsProps} from "antd";
import {Content} from "../../../../_metronic/layout/components/content";
import Requests from "./Requests.tsx";
import Approvals from "./Approvals.tsx";
import {useFetchData} from "../../../services/DataSource.ts";

const NotificationBoard = () => {
    // Generate dummy data for the table
    const requestData = [
        {
            key: '1',
            ponumber: 'PO-001',
            date: '2021-09-01',
            requester: 'John Doe',
            reference: 'RFQ-001',
            status: 'Approved'
        },
        {
            key: '2',
            ponumber: 'PO-002',
            date: '2021-09-02',
            requester: 'Jane Doe',
            reference: 'RFQ-002',
            status: 'Approved'
        },
        {
            key: '3',
            ponumber: 'PO-003',
            date: '2021-09-03',
            requester: 'John Doe',
            reference: 'RFQ-003',
            status: 'Approved'
        },
        {
            key: '4',
            ponumber: 'PO-004',
            date: '2021-09-04',
            requester: 'Jane Doe',
            reference: 'RFQ-004',
            status: 'Approved'
        },
    ];

    const approvalData = [
        {
            key: '1',
            ponumber: 'PO-001',
            date: '2021-09-01',
            requester: 'John Doe',
            reference: 'RFQ-001',
            status: 'Approved'
        },
        {
            key: '2',
            ponumber: 'PO-002',
            date: '2021-09-02',
            requester: 'Jane Doe',
            reference: 'RFQ-002',
            status: 'Approved'
        },
    ];

    const {
        allPurchaseOrder,
        allSageModules,
        allSageModuleUsers,
        allSageUsers,
        loadingPOs,
    }= useFetchData();


    const completedData = allPurchaseOrder?.data?.filter((item: any) => {
        return item?.iscomplete === 1
    })

    const pendingData = allPurchaseOrder?.data?.filter((item: any) => {
        return item?.iscomplete === 0
    })


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <>
                <Badge count={pendingData?.length} showZero={true} title="Downlines" size="small">
                    <span>Requests</span>
                </Badge>
            </>,
            children: <>
                <Requests data={pendingData} loading={loadingPOs}/>
            </>,
        },
        {
            key: '2',
            label: <>
                <Badge count={completedData?.length} showZero={true} title="Downlines" size="small">
                    <span>Approvals</span>
                </Badge>
            </>,
            children: <> <Approvals data={completedData}/></>,
        },
    ];

    return (
        <Content>
            <div className={`card mb-5 mb-xxl-8`}>
                <div className='card-body pt-9 pb-0'>
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>
        </Content>
    )
}

export default NotificationBoard
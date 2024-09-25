import {Table} from "antd";
import {Content} from "../../../../_metronic/layout/components/content";
import React from "react";
import {useFetchData} from "../../../services/DataSource.ts";

const Attendance = () => {

    const {allAttendance, loadingAttendance, allStaffs} = useFetchData()

    const columns = [
        {
            title: 'Staff',
            dataIndex: 'staffId',
            key: 'staffId',
            render: (staffId: number) => {
                const staff = allStaffs?.data.find((staff: any) => staff.id === staffId)
                return staff ? `${staff.fname} ${staff.sname}` : 'N/A'
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time In',
            dataIndex: 'timeIn',
            key: 'timeIn',
        },
        {
            title: 'Time Out',
            dataIndex: 'timeOut',
            key: 'timeOut',
        },
    ]

    return (
        <>
            <Content>
                <div className={`card mb-5 mb-xxl-8`}>
                    <div className='card-body pt-9 pb-0'>

                        <Table bordered={true} columns={columns} dataSource={allAttendance?.data} loading={loadingAttendance} />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default Attendance;

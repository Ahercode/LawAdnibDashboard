import {Table} from "antd";
import POModal from "../components/ POModal.tsx";
import React, {useState} from "react";
import {commonPOColumn, ConvertToDate} from "../../services/ServiceFactory.tsx";


type ApprovalsProps = {
    data: any[]

}
const Approvals = ({data}:ApprovalsProps) => {

    const [record, setRecord] = useState<any>({})
    const [showModal, setShowModal] = useState(false)
    const handleModal = ( element:any ) => {
        setShowModal(true)
        setRecord(element)
    }

    const handleCancel = () => {
        setShowModal(false)
        setRecord({})
    }

    const columns = commonPOColumn({handleModal, isApproval: true})

    return (
        <>
            <div>
                <Table columns={columns} dataSource={data}/>
            </div>
            <POModal
                isApproval={true}
                record={record}
                showModal={showModal}
                handleSubmit={handleModal}
                handleCancel={handleCancel}
            />
        </>
    )
}

export default Approvals
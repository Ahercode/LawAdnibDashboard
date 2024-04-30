import {message, Modal, Table} from "antd";
import {useQueryClient, useQuery, useMutation} from "react-query";
import {patchItem, sendEmail} from "../../../services/ApiCalls.ts";
import React, {useState} from "react";
import clsx from "clsx";
import POModal from "../components/ POModal.tsx";
import {commonPOColumn, ConvertToDate} from "../../services/ServiceFactory.tsx";

type RequestsProps = {
    data: any[],
    loading: boolean
}

const Requests  = ({data, loading}:RequestsProps) => {

    const queryClient = useQueryClient()
    const [record, setRecord] = useState<any>({})
    const [showModal, setShowModal] = useState(false)

    const {mutate: patchDa} = useMutation(patchItem, {
        onSuccess: () => {
            queryClient.invalidateQueries('purchaseorders')

            // console.log('res: ', res)
            setShowModal(false)
            message.success('You have successfully approved the PO Request.')
        },
        onError: (error) => {
            console.log('patch error: ', error)
        }
    })

    const handlePatch = (element: any) => {
        const item = {
            url: 'PurchaseOrder',
            id: element?.poriseq,
            data: [{
                op: 'replace',
                path: '/audtuser',
                value: 'PHILIP'
            }]
        }

        patchDa(item)

        const emailData = {
            url: 'PurchaseOrder/SendEmail',
            data: {
                to: 'philipkelly407@gmail.com',
                subject: 'PO Request Approval',
                body: 'Your PO request have been approved! ' + " " + element?.comment
            }}

        console.log("Email Data", emailData)

        const res = sendEmail(emailData)
        

    }

    const handleModal = ( element:any ) => {
        setShowModal(true)
        setRecord(element)
    }

    const handleCancel = () => {
        setShowModal(false)
        setRecord({})
    }


    const columns = commonPOColumn({handleModal, isApproval: false})


    return (

        <>
            <div>
                <Table columns={columns} dataSource={data} loading={loading}/>
            </div>
            <POModal
                isApproval={false}
                record={record}
                showModal={showModal}
                handleSubmit={handlePatch}
                handleCancel={handleCancel}

            />
        </>
    )
}

export default Requests
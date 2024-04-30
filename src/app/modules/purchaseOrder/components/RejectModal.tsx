import { Modal } from "antd";
import {RequestsProps} from "../_modal.ts";

const RejectModal = ({ handleSubmit, handleCancel, showModal, record, isApproval }:RequestsProps) => {

    return (
        <>
            <Modal
                title={isApproval ? 'Approve PO Request' : 'Request Details'}
                open={showModal}
                width={800}
                onOk={() => handleSubmit(record)}
                onCancel={handleCancel}
                footer={[
                    <button key="back" className={isApproval?"btn btn-danger": "btn btn-light-danger me-8"} onClick={handleCancel}>
                        {isApproval ? 'Close' : 'Reject'}
                    </button>,
                    isApproval ? null : <button key="submit" className="btn btn-primary" onClick={() => handleSubmit(record)}>
                        Approve
                    </button>,
                ]}
            >

            </Modal>
        </>
    );
}
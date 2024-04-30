import {Modal} from "antd";
import {HandleCancelType, HandlePatchType, RequestsProps} from "../_modal.ts";
import {KTIcon} from "../../../../_metronic/helpers";
import {ConvertToDate} from "../../services/ServiceFactory.tsx";
import {useState} from "react";



const POModal = ({record, showModal, handleSubmit, handleCancel, isApproval}:RequestsProps) => {

    const [comment, setComment] = useState('');

    const handleCancelHere = () => {
        setComment('')
        handleCancel()
    }

    return (
        <Modal
            title={isApproval ? 'Approve PO Request' : 'Request Details'}
            open={showModal}
            width={800}
            onOk={() => handleSubmit({...record, comment: comment})}
            onCancel={handleCancel}
            footer={[
                <button key="back" className={isApproval?"btn btn-danger": "btn btn-light-danger me-8"} onClick={handleCancelHere}>
                    {isApproval ? 'Close' : 'Reject'}
                </button>,
                isApproval ? null : <button key="submit" className="btn btn-primary" onClick={() => handleSubmit({...record, comment: comment})}>
                    Approve
                </button>,
            ]}
        >
            <hr/>
            <div className='card-px pt-5 pb-10 flex-grow-1'>
                <div className='row g-0 mt-5 mb-10'>
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            <div className='symbol symbol-40px me-3'>
                                <div className='symbol-label bg-light-inf'>
                                    <KTIcon iconName='text-number' className='fs-1 text-primary'/>
                                </div>
                            </div>
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>{record?.ponumber}</div>
                                <div className='fs-7 text-muted fw-semibold'>PO Number</div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            <div className='symbol symbol-40px me-3'>
                                <div className='symbol-label bg-ltext-warni'>
                                    <KTIcon iconName='user-tick' className='fs-1 text-primary'/>
                                </div>
                            </div>
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>{record?.audtuser}</div>
                                <div className='fs-7 text-muted fw-semibold'>Requester</div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            <div className='symbol symbol-40px me-3'>
                                <div className='symbol-label '>
                                    <KTIcon iconName='calendar-tick' className='fs-1 text-primary'/>
                                </div>
                            </div>
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>
                                    <ConvertToDate dateString={record?.date?.toString()}/>
                                </div>
                                <div className='fs-7 text-muted fw-semibold'>Date</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*New row */}
                <div className='row g-0 mt-10 mb-10'>
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            <div className='symbol symbol-40px me-3'>
                                <div className='symbol-label bg-light-inf'>
                                    <KTIcon iconName='copy-success' className='fs-1 text-primary'/>
                                </div>
                            </div>
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>{record?.vdcode}</div>
                                <div className='fs-7 text-muted fw-semibold'>Vendor Code</div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            <div className='symbol symbol-40px me-3'>
                                <div className='symbol-label bg-ltext-warni'>
                                    <KTIcon iconName='document' className='fs-1 text-primary'/>
                                </div>
                            </div>
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>{record?.vdname}</div>
                                <div className='fs-7 text-muted fw-semibold'>Vendor Name</div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            <div className='symbol symbol-40px me-3'>
                                <div className='symbol-label bg-light-succe'>
                                    <KTIcon iconName='tag' className='fs-1 text-primary'/>
                                </div>
                            </div>
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>
                                    {record?.scamount}
                                </div>
                                <div className='fs-7 text-muted fw-semibold'>Transaction Amount</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*New row */}
                <div className='row g-0 mt-10 mb-10'>
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            <div className='symbol symbol-40px me-3'>
                                <div className='symbol-label bg-light-prima'>
                                    <KTIcon iconName='fasten' className='fs-1 text-primary'/>
                                </div>
                            </div>
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>
                                    {record?.reference?.trim() === undefined ||record?.reference?.trim() === "" ? "No reference" : record?.reference}</div>
                                <div className='fs-7 text-muted fw-semibold'>Reference</div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            <div className='symbol symbol-40px me-3'>
                                <div className='symbol-label bg-light-prima'>
                                    <KTIcon iconName='euro' className='fs-1 text-primary'/>
                                </div>
                            </div>
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>
                                    {record?.currency}</div>
                                <div className='fs-7 text-muted fw-semibold'>Currency</div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            <div className='symbol symbol-40px me-3'>
                                <div className='symbol-label bg-light-prima'>
                                    <KTIcon iconName='directbox-default' className='fs-1 text-primary'/>
                                </div>
                            </div>
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>
                                    {record?.isprinted ===0 ?"No":"Yes"}</div>
                                <div className='fs-7 text-muted fw-semibold'>Printed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            {
                isApproval ?
                    null :
                    <div className='col-  mb-3'>
                        <label className='form-label fs-6 fw-bolder text-gray-600'>Comment</label>
                        <textarea
                            className="form-control "
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
            }

        </Modal>
    )
}

export default POModal;
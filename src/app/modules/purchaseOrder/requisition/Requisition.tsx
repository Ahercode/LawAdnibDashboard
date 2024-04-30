import {useState} from "react";
import {Modal, Table} from 'antd';
import {Content} from "../../../../_metronic/layout/components/content";

const Requisition  = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title:"Requisition Number"
        },
        {
            title:"Vender"
        },
        {
            title:"Name"
        },
        {
            title:"Printed"
        },
        {
            title:"Requisition Date"
        },
        {
            title:"Description"
        },
        {
            title:"Reference"
        },
        {
            title:"Completed"
        },
        {
            title:"Requested By"
        }
    ]

    return (
        <>
            <Content>
                <div className={`card mb-5 mb-xxl-8`}>
                    <div className='card-body pt-9 pb-0'>
                        <div className="d-flex justify-content-end align-content-end pb-7">
                            <button
                                className='btn btn-info btn-sm'
                                onClick={showModal}
                            >
                                Create New
                            </button>
                        </div>
                        <div>

                        </div>
                        <Table
                            columns={columns}
                        />
                        <Modal
                            open={isModalOpen}
                            onCancel={handleCancel}
                            onOk={handleOk}
                            width={1080}
                            title="Create New Requisition"
                        >
                            <hr/>

                        </Modal>
                    </div>
                </div>
            </Content>
        </>
        //<div
        //     style={{
        //         padding:"0 100px",
        //         // margin:"0 30px"
        //     }}
        //     className="bg-white mt-7 "
        // >
        //     <div className="d-flex justify-content-end align-content-end pb-7">
        //         <button
        //             className='btn btn-info btn-sm'
        //             onClick={showModal}
        //         >
        //             Create New
        //         </button>
        //     </div>
        //     <div  className="border border-gray-400 rounded">
        //
        //         <Table columns={columns}/>
        //     </div>
        //     <Modal
        //         open={isModalOpen}
        //         onCancel={handleCancel}
        //         onOk={handleOk}
        //         width={1080}
        //         title="Create New Requisition"
        //     >
        //         <hr/>
        //
        //     </Modal>
        // </div>
    );
}

export default Requisition;
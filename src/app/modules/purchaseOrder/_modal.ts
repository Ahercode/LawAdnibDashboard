export  type RecordType = {
    ponumber: string;
    date: string;
    audtuser: string;
    reference: string;
    vdcode: string;
    vdname: string;
    scamount: number;
};

export type HandlePatchType = (item: RecordType) => void;
export type HandleCancelType = () => void;

export type RequestsProps = {
    record: any
    showModal: boolean
    handleSubmit: HandlePatchType
    handleCancel: HandleCancelType
    isApproval: boolean
}




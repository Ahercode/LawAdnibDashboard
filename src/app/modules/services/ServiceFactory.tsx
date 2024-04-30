
type ConvertToDateProps = {
    dateString: string
}
type getColumnsProps = {
    handleModal: (record: any) => void
    isApproval: boolean
}

export const ConvertToDate = ({ dateString}:ConvertToDateProps) =>{

    let formattedDate = new Date(Number(dateString.slice(0,4)), Number(dateString.slice(4,6)) - 1, Number(dateString.slice(6,8)));

    return (
        <>
            {formattedDate.toDateString()}
        </>
    )
}

export const commonPOColumn = ({handleModal, isApproval}:getColumnsProps) => [
    {
        title: 'PO Number',
        dataIndex: 'ponumber',
        key: 'ponumber',
    },
    {
        title: 'Date',
        render: (text: any, record: any) => (
            <>
                <ConvertToDate dateString={record?.date?.toString()}/>
            </>
        )
    },
    {
        title: 'Requester',
        dataIndex: 'audtuser',
        key: 'audtuser',
    },
    {
        title: 'Reference',
        dataIndex: 'reference',
        key: 'reference',
        render: (text: any, record: any) => (
            <>
                {record?.reference?.trim() === undefined||record?.reference?.trim() === "" ? 'No reference' : record?.reference}
            </>
        )
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text: any, record: any) => (
            <>
                <span className={isApproval ? "badge badge-light-success":"badge badge-light-warning"}>{isApproval? "Aproved": "Pendeing"}</span>
            </>
        )
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
            <div className="d-flex">
                <button className="btn btn-sm btn-light-info" onClick={() => handleModal(record)}>{isApproval ? 'View Details' : 'Approve'}</button>
            </div>
        ),
    },
];
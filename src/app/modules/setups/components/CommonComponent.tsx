import {message, Modal, Table} from "antd";
import {Content} from "../../../../_metronic/layout/components/content";
import {useState} from "react";
import clsx from "clsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useFetchData} from "../../../services/DataSource.ts";
import {BaseUrl, deleteItem, fetchData, postItem} from "../../../services/ApiCalls.ts";
import {useMutation, useQuery, useQueryClient} from "react-query";

interface CommonComponentModel {
    code: string;
    name: string;
}

type CommonComponentProps = {
    url: string;
    title: string;
    refreshKey: string
}

const validationSchema = Yup.object().shape({
    code: Yup.string().required('Code is required'),
    name: Yup.string().required('Name is required'),
});

const initialValues = {
    code: '',
    name: '',
}
const CommonComponent = ({url, title, refreshKey}:CommonComponentProps) => {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient()

    const [testField, setTestField] = useState(null)

    const handleTestField = (event: any) => {
        setTestField(event?.target.value)
    }


    const {data: gridData,
        isLoading: loadingData} = useQuery(refreshKey, () => fetchData(`${BaseUrl}/${url}`))


    // Delete function
    const {mutate: deleteDa} = useMutation(deleteItem, {
        onSuccess: () => {
            queryClient.invalidateQueries(refreshKey)
            message.success('Item deleted successfully')
        },
        onError: (error) => {
            message.error('Error deleting item: ')
        }
    })

    const handleDelete = (element: any) => {
        const item = {
            url: url,
            data: element
        }
        deleteDa(item)
    }


    const columns: any = [
        {
            title: "Code",
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: "Title",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            fixed: 'right',
            render: (text: any, record: any) => (
                <>
                    <button
                        style={{marginLeft: '10px'}}
                        className='btn btn-light-danger btn-sm'
                        onClick={() => handleDelete(record)}
                    >
                        Delete
                    </button>
                </>
            )
        }

    ]

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        formik.resetForm();
    }


    const {mutate: postDa} = useMutation(postItem, {
        onSuccess: () => {
            queryClient.invalidateQueries(refreshKey)
            message.success(`${title} created successfully`)
            setLoading(false)
            handleCancel()
        },
        onError: (error) => {
            message.error('Error creating item: ')
            setLoading(false)
        }
    })

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting}) => {
            const data = {
                url: url,
                data: {
                    code: values.code,
                    name: values.name,
                }
            }

            console.log('data to post', data)
            postDa(data)
        },
    })

    return (
        <>
            <Content>
                <div className={`card mb-5 mb-xxl-8`}>
                    <div className='card-body pt-9 pb-0'>
                        <div className="d-flex justify-content-end align-content-end pb-7">
                            <button
                                className='btn btn-primary btn-sm'
                                onClick={showModal}
                            >
                                Create New
                            </button>
                        </div>
                        <Table columns={columns} dataSource={gridData?.data} loading={loadingData}/>
                    </div>
                </div>
            </Content>
            <Modal
                title={`Create New ${title}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={
                    [
                        <button
                            key='back'
                            onClick={handleCancel}
                            className='btn btn-light-danger btn-sm'
                            style={{marginRight: '25px'}}
                        >
                            Cancel
                        </button>,
                        <button
                            key='submit'
                            onClick={formik.submitForm}
                            className='btn btn-primary btn-sm'
                        >
                            Save
                        </button>
                    ]
                }
            >
                <hr/>
                <div className='  mb-3'>
                    <label className='form-label fs-6 fw-bolder text-gray-600'>Code</label>
                    <input
                        // placeholder='Surname'
                        {...formik.getFieldProps('code')}
                        className={clsx(
                            'form-control form-control-solid',
                            {'is-invalid': formik.touched.code && formik.errors.code},
                            {
                                'is-valid': formik.touched.code && !formik.errors.code,
                            }
                        )}
                        type='text'
                        name='code'
                        autoComplete='off'
                    />
                    {formik.touched.code && formik.errors.code && (
                        <div className='fv-plugins-message-container'>
                            <span role='alert'>{formik.errors.code}</span>
                        </div>
                    )}
                </div>

                <div className=' mb-3'>
                    <label className='form-label fs-6 fw-bolder text-gray-600'>Title</label>
                    <input
                        // placeholder='Surname'
                        {...formik.getFieldProps('name')}
                        className={clsx(
                            'form-control form-control-solid',
                            {'is-invalid': formik.touched.name && formik.errors.name},
                            {
                                'is-valid': formik.touched.name && !formik.errors.name,
                            }
                        )}
                        type='text'
                        name='name'
                        autoComplete='off'
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className='fv-plugins-message-container'>
                            <span role='alert'>{formik.errors.name}</span>
                        </div>
                    )}
                </div>
                {
                    title === 'Chapters' && (
                        <div className=' mb-3'>
                            <label className='form-label fs-6 fw-bolder text-gray-600'>Title</label>
                            <input
                                // placeholder='Surname'
                                {...formik.getFieldProps('name')}
                                className={clsx(
                                    'form-control form-control-solid',
                                    {'is-invalid': formik.touched.name && formik.errors.name},
                                    {
                                        'is-valid': formik.touched.name && !formik.errors.name,
                                    }
                                )}
                                type='text'
                                name='name'
                                autoComplete='off'
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.name}</span>
                                </div>
                            )}
                        </div>
                    )

                }


            </Modal>
        </>
    )
}

export default CommonComponent;
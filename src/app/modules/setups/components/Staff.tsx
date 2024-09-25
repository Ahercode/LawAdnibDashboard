import {Input, message, Modal, Space, Steps, Table} from "antd";
import {Content} from "../../../../_metronic/layout/components/content";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useFetchData} from "../../../services/DataSource.ts";
import {useMutation, useQueryClient} from "react-query";
import {deleteItem, postItem, updateItem} from "../../../services/ApiCalls.ts";

const Staff = () => {
    const {reset, handleSubmit, register} = useForm()
    const [searchText, setSearchText] = useState('')
    const [gridData, setGridData] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const queryClient = useQueryClient()
    const {allStaffs, loadingStaffs} = useFetchData()
    const [beforeSearch, setBeforeSearch] = useState([])
    const [tempData, setTempData] = useState<any>()
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        reset()
        setIsModalVisible(false);
        setIsUpdateModalOpen(false)
        setTempData(null)
    }

    const { mutate: deleteDa } = useMutation(deleteItem, {
        onSuccess: () => {
            queryClient.invalidateQueries("staffs")
            message.success('Staff deleted successfully')
            handleOk()
        },
        onError: (error) => {
            console.log('delete error: ', error)
            message.error('Could not delete staff. Please try again.')
            handleOk()
        }
    })

    const { mutate: updateDa } = useMutation(updateItem, {
        onSuccess: () => {
            queryClient.invalidateQueries(`staffs`)
            message.success(`updated successfully.`)
            handleOk()
        },
        onError: (error) => {
            console.log('error: ', error)
            message.error(`Error updating staff. Please try again later.`)
            handleOk()
        }
    })

    const { mutate: postDa } = useMutation(postItem, {
        onSuccess: () => {
            queryClient.invalidateQueries('staffs')
            message.success('Staff created successfully')
            handleOk()
        },
        onError: (error) => {
            console.log('post error: ', error)
            message.error('Could not create staff. Please try again.')
            handleOk()
        }
    })
    function handleDelete(element: any) {
        console.log("item  to delete",element)
        const item = {
            url: "staffs",
            data: element
        }
        deleteDa(item)
    }

    const handleChange = (event: any) => {
        event.preventDefault()
        setTempData({ ...tempData, [event.target.name]: event.target.value });
    }

    const showUpdateModal = (values: any) => {
        showModal()
        setIsUpdateModalOpen(true)
        setTempData(values);
        console.log(values)
    }

    const columns = [

        {
            title: 'First Name',
            dataIndex: 'fname',
            key: 'fname',
        },{
            title: 'Surname',
            dataIndex: 'sname',
            key: 'sname',
        },{
            title: 'Other Name',
            dataIndex: 'oname',
            key: 'oname',
        },{
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },{
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },{
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (element: any) => (
                <Space>
                    <a onClick={() => showUpdateModal(element)} className='btn btn-light-warning btn-sm'>
                        Update
                    </a>
                    <a onClick={() => handleDelete(element)} className='btn btn-light-danger btn-sm'>
                        Delete
                    </a>
                </Space>
            )
        }
    ];

    const SubmitNewStaff = handleSubmit(async (values) => {
        const item = {
            data: {
                fname: values.fname,
                sname: values.sname,
                oname: values.oname,
                email: values.email,
                phone: values.phone,
                gender: values.gender,
                username: values.username,
                password: values.password,
                address: values.address,
        },
        url: 'staffs'
    }
        // make sure fname, sname, email, username, password are not empty
        if (values.fname === '' || values.sname === '' || values.email === '' || values.username === '' || values.password === '') {
            message.error('Please fill all required fields')
            return
        }

        // make sure email is valid
        if (!values.email.includes('@') || !values.email.includes('.')) {
            message.error('Please enter a valid email address')
            return
        }

        // make sure password is at least 6 characters long
        if (values.password.length < 6) {
            message.error('Password must be at least 6 characters long')
            return
        }

        // makre sure the new staff does not already exist by comparing username, email, fname, and sname
        const existingStaff = allStaffs?.data?.find((staff: any) => {
            return staff.username === values.username
                || staff.email === values.email
                || staff.fname === values.fname || staff.sname === values.sname
        })

        if (existingStaff) {
            message.error('Staff already exists')
            return
        }

        // make sure the phone number is valid
        if (values.phone && isNaN(values.phone)) {
            message.error('Phone number must be valid number')
            return
        }

        // make  sure it's a Ghanaian phone number
        if (values.phone && values.phone.length !== 10) {
            message.error('Phone number must be a valid number with 10 digits')
            return
        }


        postDa(item)
    })

    const handleUpdate = (e: any) => {
        e.preventDefault()
        const item = {
            url: 'staffs',
            data: tempData
        }
        updateDa(item)
        console.log('update: ', item.data)
    }

    const loadData = async () => {
        try {
            const response = allStaffs?.data
            setGridData(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadData()
        setBeforeSearch(allStaffs?.data)
    }, [allStaffs?.data])

    const globalSearch = (searchValue: string) => {
        const searchResult = allStaffs?.data?.filter((item: any) => {
            return (
                Object.values(item).join('').toLowerCase().includes(searchValue?.toLowerCase())
            )
        })//search the grid data
        setGridData(searchResult)
    }

    const handleInputChange = (e: any) => {
        globalSearch(e.target.value)
        if (e.target.value === '') {
            setGridData(beforeSearch)
        }
    }

  return (

      <>
          <Content>
              <div className={`card mb-5 mb-xxl-8`}>
                  <div className='card-body pt-9 pb-0'>
                      <div className="d-flex justify-content-between align-content-end pb-7">

                          <Space>
                                <Input
                                    placeholder='Enter Search Text'
                                    onChange={handleInputChange}
                                    type='text'
                                    allowClear
                                    size='large'
                                />

                          </Space>
                          <Space>

                                <button
                                    className='btn btn-primary btn-sm'
                                    onClick={showModal}
                                >
                                    Add New Staffs
                                </button>
                          </Space>
                      </div>
                      <Table bordered={true} columns={columns} dataSource={gridData} loading={loadingStaffs} />
                  </div>
              </div>
          </Content>

          <Modal
            open={isModalVisible}
            title={isUpdateModalOpen? "Update Staff": "Add New Staff"}
            onOk={isUpdateModalOpen? handleUpdate: SubmitNewStaff}
            onCancel={handleOk}
          >

              <hr/>

              <form onSubmit={isUpdateModalOpen? handleUpdate: SubmitNewStaff}>
                  <div className="row">
                      <div className="col-6">
                          <label>First Name<span style={{color: 'red'}}>*</span></label>
                          <input {...register("fname")}
                              required
                                 defaultValue={isUpdateModalOpen ?tempData?.fname : ""}
                                 className="form-control form-control-solid"
                                 onChange={handleChange}
                          />
                      </div>
                      <div className="col-6">
                          <label>Surname<span style={{color: 'red'}}>*</span></label>
                          <input {...register("sname")}
                                 required
                                 defaultValue={isUpdateModalOpen ?tempData?.sname : ""}
                                 className="form-control form-control-solid"
                                 onChange={handleChange}
                          />
                      </div>
                      <div className="col-6">
                          <label>Other Name</label>
                          <input {...register("oname")}
                                 defaultValue={isUpdateModalOpen ?tempData?.oname : ""}
                                 onChange={handleChange}
                                 className="form-control form-control-solid"/>
                      </div>
                      <div className="col-6">
                          <label>Email<span style={{color: 'red'}}>*</span></label>
                          <input {...register("email")} type="email"
                                 required
                                 defaultValue={isUpdateModalOpen ?tempData?.email : ""}
                                 onChange={handleChange}
                                 className="form-control form-control-solid"/>
                      </div>
                      <div className="col-6">
                          <label>Phone</label>
                          <input {...register("phone")}
                                 pattern="^[0-9]*$" title="Phone number must be a valid number"
                                 defaultValue={isUpdateModalOpen ?tempData?.phone : ""}
                                 onChange={handleChange}
                                 className="form-control form-control-solid"/>
                      </div>
                      <div className="col-6">
                          <label>Gender</label>
                          <input {...register("gender")}
                                 defaultValue={isUpdateModalOpen ?tempData?.gender : ""}
                                 onChange={handleChange}
                                 className="form-control form-control-solid"/>
                      </div>
                      <div className="col-6">
                          <label>Address</label>
                          <input {...register("address")}
                                 defaultValue={isUpdateModalOpen ?tempData?.address : ""}
                                 onChange={handleChange}
                                 className="form-control form-control-solid"/>
                      </div>
                      <div className="col-6">
                          <label>Username<span style={{color: 'red'}}>*</span></label>
                          <input {...register("username")}
                                 required
                                 defaultValue={isUpdateModalOpen ?tempData?.username : ""}
                                 onChange={handleChange}
                                 className="form-control form-control-solid"/>
                      </div>
                      <div className="col-6">
                          <label>Password<span style={{color: 'red'}}>*</span></label>
                          <input {...register("password")}
                                 required
                                 defaultValue={isUpdateModalOpen ?tempData?.password : ""}
                                 onChange={handleChange}
                                 className="form-control form-control-solid"/>
                      </div>
                  </div>
              </form>
          </Modal>
      </>
  )
}

export default Staff;
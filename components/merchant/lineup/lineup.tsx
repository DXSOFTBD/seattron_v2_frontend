import React, { useEffect, useState } from 'react'
import CreateLineup from './createLineup'
import { BiPlus } from 'react-icons/bi'
import { FiDelete, FiEdit } from 'react-icons/fi'
import { format } from 'date-fns'
import Loader from '@/components/common/Loader'
import Table from 'rc-table'
import TablePagination from '@/components/ui/TablePagination'
import { MdDelete } from 'react-icons/md'
import UpdateLineup from './updateLineup'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getEventLineup } from 'redux/slices/lineupSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import axios from '@/axios/config';
import { setPopup } from 'redux/slices/popupslice'
import Modal from '@/components/common/Modal'


const Lineup = ({ event }: any) => {
    const [create, setCreate] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [selectedLineup, setSelectedLineup] = useState<any>({})
    // table config
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const dispatch = useAppDispatch()
    const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
    const allData = useAppSelector((state) => state.lineupReducer.getEventLineup)
    const lineup = allData.data

    // api call for loading lineup data after page loading
    useEffect(() => {
        dispatch(getEventLineup({ token: agent.token, eventId: event.data._id }))
    }, [agent.token, event.data._id, dispatch])
    const getData = (current: any, pageSize: any) => {
        // Normally you should get the data from the server
        if (lineup?.length > 0) {
            return lineup.slice((current - 1) * pageSize, current * pageSize);
        } else return [];
    };
    const router = useRouter()

    // table columns for table data
    const columns = [
        {
            title: 'Caption',
            dataIndex: 'caption',
            className: '',
            key: 'caption',
            align: 'left',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumb',
            className: '',
            key: 'thumb',
            align: 'left',
            render: (thumb: any) => {
                return (
                    <Image src={process.env.NEXT_PUBLIC_SERVER_HOST + thumb} alt="thumbnail" width={100} height={60} />
                )
            }
        },

        {
            title: 'Last Updated',
            dataIndex: 'updatedAt',
            className: '',
            key: 'updatedAt',
            align: 'left',
            render: (updatedAt: any, { updatedBy }: any) => (
                <div>
                    <p> {format(new Date(), 'Pp')}</p>
                    <p className='text-[12px]'> by {updatedBy?.name}</p>
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: '_id',
            className: '',
            key: '_id',
            align: 'left',
            render: (_id: any, data: any) => (
                <div className='flex justify-start items-center space-x-2'>
                    {/* <MdDelete
                className='text-red-500 h-6 w-6 cursor-pointer'
                onClick={() => {
                  setShowDeleteModal(true);
                  setPartner(data);
                }}
              /> */}
                    <FiEdit
                        className='text-blue-500 h-6 w-6 cursor-pointer'
                        onClick={() => {
                            setShowEditForm(!showEditForm);
                            setSelectedLineup(data);
                        }}
                    />
                    <MdDelete onClick={() => {
                        setShowDelete(true);
                        setSelectedLineup(data);
                        // handleDelete()
                    }} className='text-red-500 w-6 h-6 cursor-pointer' />
                </div>
            ),
        },
    ];

    // delete a lineup functionality
    const handleDelete = () => {
        // console.log(selectedLineup)
        axios
            .delete('events/lineup/' + selectedLineup._id, {
                headers: {
                    'Authorization': `Bearer ${agent.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                dispatch(getEventLineup({ token: agent.token, eventId: selectedLineup.event }))

                dispatch(setPopup({
                    type: 'success',
                    message: res.data.msg,
                    show: true
                }))

                setTimeout(() => {
                    dispatch(setPopup({ show: false, type: '', message: '' }));
                }, 5000);
            })
            .catch((err) => {
                // console.log(err)
                dispatch(
                    setPopup({
                        type: 'failed',
                        message: err.response.data.message,
                        show: true,
                    })
                );
                setTimeout(() => {
                    dispatch(setPopup({ show: false, type: '', message: '' }));
                }, 5000);
            });
    }

    return (
        <div className='max-w-1280 relative'>
            {showDelete ? (
                <Modal
                    handleConfirm={handleDelete}
                    confirmText='Delete'
                    // footer={true}
                    showModal={showDelete}
                    setShowModal={setShowDelete}
                    title='Are you sure you want to delete?'
                ></Modal>
            ) : null}
            <div
                onClick={() => router.back()}
                className='h-12 w-12 my-2 rounded-lg bg-gray-300 flex items-center justify-center cursor-pointer'
            >
                <RiArrowGoBackFill className='h-6 w-6 text-gray-700 hover:text-gray-900' />
            </div>
            <div className='flex justify-between items-center'>
                <p className='dashboard_title py-4'>{event?.data?.name} Lineup</p>
                <p className='bg-brand_gradient btn flex_center hover:bg-brand_color' onClick={() => {
                    setShowEditForm(false);
                    setCreate(true)
                }}><BiPlus /> Create Lineup</p>
            </div>


            {
                create && !showEditForm ? <CreateLineup setCreate={setCreate} event={event.data} /> : null
            }
            {
                showEditForm && !create ? <UpdateLineup setShowEditForm={setShowEditForm} lineup={selectedLineup} /> : null
            }
            {!create && !showEditForm ? (
                <Loader status={allData.status}>
                    {/* <Loader status={status}> */}
                    <div className='w-full h-full grid grid-cols-1'>
                        <Table
                            //@ts-ignore
                            columns={columns}
                            className='w-full text-[14px] font-normal text-black'
                            rowClassName={({ isActive }) =>
                                isActive
                                    ? 'p-2 border-b-[1px] border-partner_color'
                                    : 'p-2 border-b-[1px] border-partner_color bg-red-100'
                            }
                            emptyText={'Empty table data'}
                            data={getData(current, size)}
                            rowKey='_id'
                            scroll={{ x: true }}
                        />

                        <TablePagination
                            current={current}
                            size={size}
                            setSize={setSize}
                            setCurrent={setCurrent}
                            data={lineup}
                        />
                    </div>
                    {/* </Loader> */}
                </Loader>
            ) : null}
        </div>
    )
}

export default Lineup
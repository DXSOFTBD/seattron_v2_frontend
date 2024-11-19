import Table from 'rc-table';
import React, { useEffect, useState } from 'react';
import { BsDownload, BsPlus } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Search from '../../common/Search';
import { CSVLink } from 'react-csv';
import TablePagination from '../../ui/TablePagination';
import Modal from '../../common/Modal';
import CreateAccount from './createAccount';
const Account = () => {
  const accounts = [
    { _id: 234, name: 'Rahim', email: 'rahimvai@demo.com', role: 'Admin' },
    {
      _id: 22334,
      name: 'Rahim',
      email: 'rahimvai@demo.com',
      role: 'Instructor',
    },
    { _id: 123234, name: 'Rahim', email: 'rahimvai@demo.com', role: 'Admin' },
    { _id: 23344, name: 'Rahim', email: 'rahimvai@demo.com', role: 'Admin' },
  ];
  const [event, setEvent] = useState<any>({});

  //delete modal settings
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteOpen = () => setDeleteModal(true);
  const deleteClose = () => setDeleteModal(false);
  // account  creating modal settings
  const [createModal, setCreateModal] = useState(false);
  const createOpen = () => setCreateModal(true);
  const createClose = () => setCreateModal(false);
  const [reload, setReload] = useState(false);

  const handleDeleteEvent = async () => {
    // const isDelete = await deleteProductById(event._id);
    // if (isDelete) {
    //   setReload(!reload);
    //   deleteClose();
    //   alert('Deleted succesfully');
    // }
  };
  // table config
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server

    return accounts.slice((current - 1) * pageSize, current * pageSize);
  };
  const handleSearch = () => {
    // console.log('search');
  };
  const csvData = accounts;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'p-4 border-2 border-gray-400',
      key: 'name',
      align: 'left',
      render: (name: any) => (
        <p className="text-teal-900 font-semibold">{name}</p>
      ),
    },
    {
      title: 'ID',
      dataIndex: '_id',
      className: 'p-4 border-2 border-gray-400',
      key: '_id',
      align: 'left',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      className: 'p-4 border-2 border-gray-400',
      key: 'email',
      align: 'left',
    },

    {
      title: 'Role',
      dataIndex: 'role',
      className: 'p-4 border-2 border-gray-400',
      key: 'role',
      align: 'left',
    },
    {
      title: 'Edit',
      key: '_id',
      align: 'center',
      className: 'p-4 border-2 border-gray-400',
      render: (id: any, pd: any) => (
        <button
          // onClick={() => {
          //   setEvent(pd);
          //   editOpen();
          // }}
          className="text-blue-900"
        >
          <FaEdit />
        </button>
      ),
    },
    {
      title: 'Delete',
      key: '_id',
      align: 'center',
      className: 'p-4 border-2 border-gray-400',
      render: (pd: any) => (
        <button
          // onClick={() => {
          //   setEvent(pd);
          //   deleteOpen();
          // }}
          className="text-red-600"
        >
          <MdDelete />
        </button>
      ),
    },
  ];

  return (
    <div className="text-black">
      <div className="w-full flex justify-center items-center rounded-md bg-teal-900 h-10 mb-4">
        {deleteModal ? (
          <Modal
            showModal={deleteOpen}
            setShowModal={deleteClose}
            title={`Delete ${event.name}`}
            confirmText="delete"
            handleConfirm={handleDeleteEvent}
          >
            <div>
              <p>Are you sure to delete {event.name} from event store</p>
            </div>
          </Modal>
        ) : null}

        {createModal ? (
          <Modal
            showModal={createModal}
            setShowModal={createClose}
            title="Create a new Event"
            confirmText=""
            handleConfirm={createClose}
          >
            <div>
              <CreateAccount setReload={setReload} reload={reload} />
            </div>
          </Modal>
        ) : null}
        <p className="text-white text-xl font-bold"> Account List</p>
      </div>
      {accounts.length > 0 && (
        <div>
          <button
            onClick={() => createOpen()}
            className="bg-teal-900 flex text-white items-center justify-center px-4 rounded-md py-2 border-1  border-brand_color hover:bg-green-600"
          >
            <BsPlus /> <span> Create An Account </span>
          </button>

          {/* products table */}
          {accounts.length ? (
            <div className="bg-white mt-6">
              <div className="flex justify-between items-center">
                <div className="w-full md:w-1/2 flex flex-col md:flex-row align-center ms-auto">
                  <Search onSearch={handleSearch} />
                </div>
                <div>
                  <CSVLink
                    data={csvData}
                    className="text-blue-600 bg-gray-300 text-lg px-2 py-2 rounded-md flex space-x-2 items-center"
                  >
                    <BsDownload />
                    Download csv
                  </CSVLink>
                </div>
              </div>

              <Table
                //@ts-ignore
                columns={columns}
                rowClassName="border-2 border-gray-700 p-4"
                className="text-black "
                emptyText={'Emty table data'}
                data={getData(current, size)}
                rowKey="id"
                scroll={{ x: true }}
              />

              <TablePagination
                current={current}
                size={size}
                setSize={setSize}
                setCurrent={setCurrent}
                data={accounts}
              />
            </div>
          ) : (
            <div className="w-full text-center">
              <p className="font-bold text-4xl text-brand_color mt-20">
                Loading...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;

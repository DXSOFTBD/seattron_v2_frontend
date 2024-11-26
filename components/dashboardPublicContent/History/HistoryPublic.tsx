import Table from "rc-table";

const HistoryPublic = () => {

  const columns = [
    {
      title: 'Order ID',
      className: 'px-2',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      width: 200,
      render: (_id: any) => <p className=''>{_id}</p>,
    },
    {
      title: 'Customer Details',
      dataIndex: 'name',
      className: 'px-2 border-r-[1px] border-l-[1px] border-brand_color',
      key: 'name',
      align: 'center',
      // render: (
      //   name: any,
      //   {
      //     email,
      //     phone,
      //   }: // country,
      //   // city,
      //   // gender,
      //   // occupation,
      //   // age,
      //   // postal_code,
      //   any
      // ) => (
      //   <div className='text-start p-2'>
      //     <p className=''>Name: {name}</p>
      //     <p className=''>Email: {email}</p>
      //     <div className=''>{phone ? <p>Phone: {phone}</p> : null}</div>

      //   </div>
      // ),
    },

    {
      title: 'Event',
      dataIndex: 'event',
      className: 'm-2',
      key: 'event',
      align: 'center',
      width: 200,
      // render: (event: any) => event.name,
    },
    {
      title: 'Package Name',
      dataIndex: 'package',
      className: 'm-2',
      key: 'package',
      align: 'center',
      width: 200,
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      className: 'm-2',
      key: 'paid',
      align: 'center',
      width: 200,
      // render: (paid: any) => (
      //   <div className=''>{paid ? <p className=''>YES</p> : 'NO'}</div>
      // ),
    },
    {
      title: 'price',
      className: '',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      width: 200,
    },

    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      className: 'm-2 min-w-32 px-2',
      key: 'createdAt',
      align: 'left',
      width: 200,
      // render: (createdAt: any) => <p> {format(new Date(createdAt), 'Pp')}</p>,
    },
  ];
  return (
    <div>
      <div className="w-full overflow-x-scroll h-full grid grid-cols-1 text-sm p-4">
        <Table
          //@ts-ignore
          columns={columns}
          className="w-full"
          rowClassName={({ paid }:any) =>
            paid
              ? "px-2 border-b-[1px] border-brand_color w-full overflow-x-scroll bg-green-100"
              : "px-2 border-b-[1px] border-brand_color w-full overflow-x-scroll"
          }
          emptyText={"Empty table data"}
          // data={getData(current, size)}
          rowKey="id"
          scroll={{ x: true }}
        />

        {/* <TablePagination
          current={current}
          size={size}
          setSize={setSize}
          setCurrent={setCurrent}
          data={orders}
        /> */}
      </div>
    </div>
  );
};

export default HistoryPublic;

import Pagination from "rc-pagination";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "rc-pagination/assets/index.css";



const TablePagination = ({
    data,setSize,setCurrent,size,current
}:any) => {
  
  const PerPageChange = (value: any) => {
    setSize(value);
    const newPerPage = Math.ceil(data.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };
  const PaginationChange = (page: any, pageSize: any) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current: any, type: any, originalElement: any) => {
    if (type === "prev") {
      return <BsArrowLeft />;
    }
    if (type === "next") {
      return <BsArrowRight />;
    }
    return originalElement;
  };

  return (
    <div>  <Pagination
    className="pagination-data"
    showTotal={(total: number, range: any) =>
      `Showing ${range[0]}-${range[1]} of ${total}`
    }
    onChange={PaginationChange}
    total={data.length}
    current={current}
    pageSize={size}
    showSizeChanger={false}
    itemRender={PrevNextArrow}
    onShowSizeChange={PerPageChange}
  /></div>
  )
}

export default TablePagination
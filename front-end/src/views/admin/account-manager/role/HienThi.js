import React from "react";
import {
  Pagination,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiURLRole } from "../../../../service/api";

const HienThi = () => {
  let [listRole, setListRole] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setToTalPages] = useState(0);
  useEffect(() => {
    loadDataListRole(currentPage);
  }, [currentPage]);
  const loadDataListRole = (currentPage) => {
    axios
      .get(apiURLRole + "/hien-thi?page=" + currentPage)
      .then((response) => {
        console.log(response.data.content);
        setListRole(response.data.content);
        setCurrentPage(response.data.number);
        setToTalPages(response.data.totalPages);
      })
      .catch((error) => {});
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
    },
    // {
    //   title: "Hành động",
    //   key: "actions",
    //   render: (text, record) => (
    //     <Space>
    //       <Button
    //       // key="detail"
    //       // onClick={() => {
    //       //   detail(record.id);
    //       // }}
    //       // type="primary"
    //       // htmlType="submit"
    //       >
    //         Detail
    //       </Button>
    //       <Button
    //       // key="update"
    //       // onClick={() => {
    //       //   update(record.id);
    //       // }}
    //       // type="primary"
    //       // htmlType="submit"
    //       >
    //         Update
    //       </Button>
    //       <Button
    //       // key="delete"
    //       // onClick={() => {
    //       //   funcDelete(record.id);
    //       // }}
    //       // type="primary"
    //       // htmlType="submit"
    //       >
    //         Delete
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div>
      <div className="table-role">
        <Table
          dataSource={listRole}
          rowKey="id"
          columns={columns}
          pagination={false}
        />
      </div>
      <Pagination
        simple
        current={currentPage + 1}
        onChange={(value) => {
          setCurrentPage(value - 1);
        }}
        total={totalPages * 10}
      />
    </div>
  );
};

export default HienThi;

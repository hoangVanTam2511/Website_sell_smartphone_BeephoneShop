import {
  Form,
  Popconfirm,
  Table,
  Input,
  Button,
  Pagination,
  Space,
} from "antd";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPencilAlt,
  faTrashAlt,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/scss/HienThiNV.scss";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { apiURLVoucher } from "../../../service/api";
import * as moment from "moment";

const currentDate = new Date().toISOString().split("T")[0];

// khởi tạo các cell
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    //copy props bắt buộc nhập các trường sau bấm edit
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

//show
const HienThiVoucher = () => {
  const [form] = Form.useForm();
  let [listVoucher, setlistVoucher] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingNgayBatDau, setEditingNgayBatDau] = useState(null);
  const [editingNgayKetThuc, setEditingNgayKetThuc] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Nhập ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    loadDataListVoucher(currentPage);
  }, [currentPage]);

  // cutstom load data
  const loadDataListVoucher = (currentPage) => {
    if (currentPage == undefined) currentPage = 0;
    axios
      .get(apiURLVoucher + "/hien-thi?page=" + currentPage)
      .then((response) => {
        const modifiedData = response.data.content.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        console.log(response);
        setlistVoucher(modifiedData);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      });
  };

  // set filter
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredDataSource = filterStatus
    ? listVoucher.filter((item) => item.trangThai === filterStatus)
    : listVoucher;

  //edit

  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.id === editingKey;

  // ham edit
  const edit = (record) => {
    console.log(record);
    form.setFieldsValue({
      ma: record.ma,
      ten: record.ten,
      ngayBatDau: record.ngayBatDau,
      ngayKetThuc: record.ngayKetThuc,
      giaTriVoucher: record.giaTriVoucher,
      trangThai: record.trangThai,
    });
    setEditingKey(record.id);
  };

  const Delete = async (record) => {
    const index = listVoucher.findIndex((item) => record.id === item.id);
    if (index > -1) {
      Swal.fire({
        title: "Bạn có muốn xóa voucher này",
        showDenyButton: true,
        confirmButtonText: "Có",
        denyButtonText: `Không`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          deleteVoucher(record.id);
          Swal.fire("Xóa thành công", "", "success");
          loadDataListVoucher();
        } else if (result.isDenied) {
        }
      });
    } else {
      Swal.fire("Không tìm thấy voucher", "", "failed");
    }
  };

  // delete
  const deleteVoucher = async (id) => {
    await axios
      .delete(`${apiURLVoucher}/deleteVoucher/${id}`)
      .then((response) => {
        loadDataListVoucher();
      });
  };

  //cancel
  const cancel = () => {
    setEditingKey("");
  };
  //save
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...listVoucher];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };
        axios
          .put(`${apiURLVoucher}/updateVoucher/${id}`, updatedItem)
          .then((response) => {
            if (response.status === 200) {
              newData.splice(index, 1, updatedItem);
              setlistVoucher(newData);
              setEditingKey("");
              loadDataListVoucher();
            }
          })
          .catch((error) => {
            console.log("Failed to update record:", error);
          });
      } else {
        newData.push(row);
        setlistVoucher(newData);
        setEditingKey("");
        setEditingNgayBatDau(null);
        setEditingNgayKetThuc(null);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const trangThaiVoucher = (trangThai) => {
    return trangThai === 1 ? "Còn Hiệu Lực" : "Hết Hiệu Lực";
  };
  //Ten column
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã Voucher",
      dataIndex: "ma",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("ma"),
    },
    {
      title: "Tên Voucher",
      dataIndex: "ten",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("ten"),
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "ngayBatDau",
      width: "10%",
      editable: true,
      render: (item) => {
        const formattedDate = item.substring(0, 10); // Lấy phần ngày tháng từ chuỗi ngày tháng
        return formattedDate;
      },
      ...getColumnSearchProps("ngayBatDau"),
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "ngayKetThuc",
      width: "10%",
      editable: true,
      render: (item) => {
        const formattedDate = moment(item).format("YYYY-MM-DD"); // Lấy phần ngày tháng từ chuỗi ngày tháng
        return formattedDate;
      },
      ...getColumnSearchProps("ngayKetThuc"),
    },
    {
      title: "Giá Trị Voucher",
      dataIndex: "giaTriVoucher",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("giaTriVoucher"),
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      width: "15%",
      editable: true,
      ...getColumnSearchProps("trangThai"),
      render: (trangThai) => trangThaiVoucher(trangThai),
    },
    {
      title: "Thao Tác",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <FontAwesomeIcon
              icon={faSave}
              onClick={() => save(record.id)}
              style={{ marginRight: "15px", cursor: "pointer" }}
            />
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <FontAwesomeIcon icon={faTimes} style={{ cursor: "pointer" }} />
            </Popconfirm>
          </span>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faPencilAlt}
              onClick={() => edit(record)}
              style={{
                cursor: "pointer",
                // opacity: editingKey === record.id ? 0.5 : 1,
                color: editingKey === record.id ? "red" : "green",
              }}
              disabled={editingKey !== ""}
            />

            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => Delete(record)}
              style={{
                cursor: "pointer",
                // opacity: editingKey === record.id ? 0.5 : 1,
                color: "#F55E4C",
                marginLeft: 20,
              }}
              disabled={editingKey !== ""}
            />
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <div className="btn-add">
        <span>
          <Form style={{ width: "20em", display: "inline-block" }}>
            <h2>Quản lí voucher</h2>
          </Form>
        </span>

        {/* Search */}
        <FontAwesomeIcon style={{ marginLeft: "5px" }} />
        <span className="bl-add">
          <Link to="/them-voucher">
            <Button className="btn-them-tk">+ Thêm voucher </Button>
          </Link>
        </span>
      </div>
      <div className="form-tbl">
        <Form
          form={form}
          component={false}
          initialValues={editingNgayBatDau || {} || editingNgayKetThuc || {}}
        >
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={filteredDataSource}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
            rowKey="id"
            style={{ marginBottom: "20px" }}
          />

          <Pagination
            simplecurrent={currentPage + 1}
            onChange={(value) => {
              setCurrentPage(value - 1);
            }}
            total={totalPages * 10}
          />
        </Form>
      </div>
    </>
  );
};

export default HienThiVoucher;

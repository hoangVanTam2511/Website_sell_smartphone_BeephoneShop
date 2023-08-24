import {
  Form,
  Popconfirm,
  Table,
  // Typography,
  Input,
  Button,
  // Select,
  Select,
  Pagination,
  Space,
} from "antd";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { apiURLNV } from "../../../../service/api";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
// import "rc-calendar/assets/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faSave,
  faTimes,
  faArrowsRotate,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
import { Link } from "react-router-dom";
// import HienThiKH from "../khachhang/HienThiKH";
import NhapTuFile from "../nhanvien/NhapTuFile";
const { Option } = Select;
const currentDate = new Date().toISOString().split("T")[0];
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
  const [ngaySinhValue, setNgaySinhValue] = useState(null);
  useEffect(() => {
    if (editing) {
      if (inputType === "date") {
        setNgaySinhValue(
          record && record.ngaySinh ? moment(record.ngaySinh) : null
        );
      }
    }
  }, [editing, record, inputType]);
  const handleDatePickerChange = (date) => {
    setNgaySinhValue(date);
  };
  const inputNode =
    inputType === "date" ? (
      <Input
        type="date"
        max={currentDate}
        value={ngaySinhValue ? moment(ngaySinhValue).format("YYYY-MM-DD") : ""}
        onChange={(e) =>
          handleDatePickerChange(moment(e.target.value, "YYYY-MM-DD"))
        }
      />
    ) : (
      <Input />
    );
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
const HienThiNV = () => {
  const [form] = Form.useForm();
  let [listNV, setListNV] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingNgaySinh, setEditingNgaySinh] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  // const [searchValue, setSearchValue] = useState("");

  // const handleChange = (event) => {
  //   const inputValue = event.target.value;
  //   setSearchValue(inputValue);
  //   searchAccounts(inputValue)
  //     .then((response) => {
  //       // Xử lý kết quả tìm kiếm ở đây
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       // Xử lý lỗi ở đây
  //       console.error(error);
  //     });
  // };

  // // Gửi yêu cầu tìm kiếm đến API backend
  // function searchAccounts(searchValue) {
  //   const apiUrl = apiURLNV + "/search-all";

  //   // Gửi yêu cầu GET với tham số tìm kiếm
  //   return axios.get(apiUrl, {
  //     params: {
  //       hoVaTen: searchValue,
  //     },
  //   });
  // }
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
          placeholder={`Search ${dataIndex}`}
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
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
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
    loadDataListRole(currentPage);
  }, [currentPage]);
  // load
  const loadDataListRole = (currentPage) => {
    axios
      .get(apiURLNV + "/hien-thi?page=" + currentPage)
      .then((response) => {
        console.log(response);
        const modifiedData = response.data.content.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        console.log(modifiedData);
        setListNV(modifiedData);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {});
  };
  const handleFilter = (status) => {
    setFilterStatus(status);
  };
  const filteredDataSource = filterStatus
    ? listNV.filter((item) => item.trangThai === filterStatus)
    : listNV;
  //edit
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    const ngaySinh = moment(record.ngaySinh, "YYYY-MM-DD"); // Tạo đối tượng Moment hiện tại
    form.setFieldsValue({
      ma: record.ma,
      hoVaTen: record.hoVaTen,
      id: record.id,
      email: record.email,
      ngaySinh: ngaySinh.format("YYYY-MM-DD"),
      trangThai: record.trangThai,
      diaChi: record.diaChi,
      matKhau: record.matKhau,
      soDienThoai: record.soDienThoai,
    });
    setEditingKey(record.id);
  };
  //cancel
  const cancel = () => {
    setEditingKey("");
  };
  //save
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...listNV];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };
        axios
          .put(`${apiURLNV}/update/${id}`, updatedItem)
          .then((response) => {
            if (response.status === 200) {
              newData.splice(index, 1, updatedItem);
              setListNV(newData);
              setEditingKey("");
              loadDataListRole();
            }
          })
          .catch((error) => {
            console.log("Failed to update record:", error);
          });
      } else {
        newData.push(row);
        setListNV(newData);
        setEditingKey("");
        setEditingNgaySinh(null);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const doChangeTrangThai = (id) => {
    //  const [trangThai, setTrangThai] = useState(record.trangThai);
    axios
      .put(apiURLNV + `/${id}/doi-tt`)
      .then((response) => {
        // Xử lý thành công
        // setTrangThai(trangThai === 1 ? 2 : 1);
        loadDataListRole(currentPage);
        console.log("Trạng thái đã được thay đổi");
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Đã xảy ra lỗi khi thay đổi trạng thái", error);
      });
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
      title: "Ma",
      dataIndex: "ma",
      width: "8%",
      ...getColumnSearchProps("ma"),
    },
    {
      title: "Họ và tên",
      dataIndex: "hoVaTen",
      width: "15%",
      editable: true,
      ellipsis: true,
      ...getColumnSearchProps("hoVaTen"),
    },

    {
      title: "Ngày Sinh",
      dataIndex: "ngaySinh",
      width: "13%",
      editable: true,
      ...getColumnSearchProps("ngaySinh"),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      editable: true,
      ellipsis: true,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      width: "14%",
      editable: true,
      ...getColumnSearchProps("soDienThoai"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      width: "10%",
      editable: true,
      ellipsis: true,
      ...getColumnSearchProps("diaChi"),
    },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      width: "10%",
      filters: [
        {
          text: "Làm việc",
          value: "1",
        },
        {
          text: "Đã nghỉ",
          value: "2",
        },
      ],
      // eslint-disable-next-line eqeqeq
      onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
      // editable: true,
      // editable: true,
      render: (text, record) => (
        <span>
          {/*  eslint-disable-next-line eqeqeq */}
          {record.trangThai == 1 ? (
            <Button type="primary" style={{ borderRadius: "30px" }}>
              Làm việc
            </Button>
          ) : // eslint-disable-next-line eqeqeq
          record.trangThai == 2 ? (
            <Button type="primary" danger style={{ borderRadius: "30px" }}>
              Đã nghỉ
            </Button>
          ) : (
            <Button type="primary" style={{ borderRadius: "30px" }}>
              Không xác định
            </Button>
          )}
        </span>
      ),
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
            <Popconfirm
              title={`Đổi trạng thái nhân viên từ ${
                record.trangThai === 1 ? "LÀM VIỆC" : "ĐÃ NGHỈ"
              } sang ${record.trangThai === 1 ? "ĐÃ NGHỈ" : "LÀM VIỆC"} `}
              onConfirm={() => {
                doChangeTrangThai(record.id);
              }}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <FontAwesomeIcon
                icon={faArrowsRotate}
                style={{ cursor: "pointer", paddingLeft: "20px" }}
                transform={{ rotate: 90 }}
                onClick={() => {
                  // Hành động khi nhấp vào biểu tượng
                }}
              />
            </Popconfirm>
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
        inputType: col.dataIndex === "ngaySinh" ? "date" : "text",
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
            <Input
              placeholder="Search by Mã, Tên,..."
              // value={searchValue}
              // onChange={handleChange}
            />
          </Form>
        </span>
        {/* Search */}
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ marginLeft: "5px" }}
        />
        <span className="bl-add">
          Trạng thái{" "}
          <Select
            defaultValue="Tất cả"
            style={{
              width: 120,
            }}
            onChange={handleFilter}
          >
            {" "}
            <Option value="">Tất cả</Option>
            <Option value={1}>Làm việc</Option>
            <Option value={2}>Đã nghỉ</Option>
          </Select>
          <Link to="/them-nhan-vien">
            <Button className="btn-them-tk">+ Thêm Tài khoản</Button>
          </Link>
          <Button className="btn-them-tu-file">
            <NhapTuFile />
          </Button>
        </span>
      </div>
      <div className="form-tbl">
        <Form
          form={form}
          component={false}
          initialValues={editingNgaySinh || {}}
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
            // {{
            //   pageSize: 10,
            //   current: currentPage + 1,
            //   total: totalPages * 10,
            //   showSizeChanger: false,
            //   onChange: (value) => {
            //     setCurrentPage(value - 1);
            //   },
            // }}
            rowKey="id"
            style={{ marginBottom: "20px" }}
          />

          <Pagination
            simple
            current={currentPage + 1}
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

export default HienThiNV;

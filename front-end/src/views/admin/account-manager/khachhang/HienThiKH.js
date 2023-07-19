import {
  Form,
  Popconfirm,
  Table,
  Input,
  Button,
  Select,
  Pagination,
  Space,
} from "antd";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
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
import NhapTuFile from "./NhapTuFile";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ExportButton from "./Export";
import ExcelUploader from "./UploadExcel";
import YourComponent from "./UploadExcel";
// import ExcelUploader from "./UploadExcel";
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
const HienThiKH = () => {
  const [form] = Form.useForm();
  let [listKH, setListKH] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingNgaySinh, setEditingNgaySinh] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

    // const isPage1Empty = currentPage === 0 && filteredDataSource.length === 0;

    // if (isPage1Empty && currentPage > 0) {
    //   setCurrentPage(0);
    //   loadDataListKH(0);
    // } else {
    //   setCurrentPage(0);
    //   loadDataListKH(0);
    // }
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  // const filteredDataSource = filterStatus
  // ? listNV.filter((item) => item.trangThai === filterStatus)
  // : listNV;
  const handleSearchTop = async () => {
    try {
      const response = await axios.get(apiURLKH + "/search-all", {
        params: {
          tenKH: searchText,
          page: currentPage,
        },
      });
      let count = 0;
      const modifiedData = response.data.content.map((item) => ({
        ...item,
        stt: ++count,
      }));

      setFilteredDataSource(modifiedData);
      setListKH(modifiedData); //1day
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error searching accounts:", error);
    }
  };

  const handleInputChangeTop = (e) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
    // setTotalPages(e.data.totalPages);
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
    loadDataListKH(currentPage);
  }, [currentPage]);
  const loadDataListKH = (currentPage) => {
    axios.get(apiURLKH + "/hien-thi?page=" + currentPage).then((response) => {
      const modifiedData = response.data.content.map((item, index) => ({
        ...item,
        stt: currentPage === 0 ? index + 1 : index + 1,
      }));

      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);
      setFilteredDataSource(modifiedData);
      setListKH(modifiedData);
    });
  };
  const handleFilter = (status) => {
    setFilterStatus(status);
  };
  // const filteredDataSource = listKH;
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
      const newData = [...listKH];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
          // id: editingKey,
        };

        axios
          .put(`${apiURLKH}/update/${id}`, updatedItem)
          .then((response) => {
            if (response.status === 200) {
              newData.splice(index, 1, updatedItem);
              setListKH(newData);
              setEditingKey("");
              loadDataListKH(currentPage);
              console.log(id);
            }
          })
          .catch((error) => {
            console.log("Failed to update record:", error);
          });
      } else {
        newData.push(row);
        setListKH(newData);
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
      .put(apiURLKH + `/${id}/doi-tt`)
      .then((response) => {
        loadDataListKH(currentPage);
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
      width: "10%",
      ...getColumnSearchProps("ma"),
    },
    {
      title: "Họ và tên",
      dataIndex: "hoVaTen",
      width: "15%",
      editable: true,
      ...getColumnSearchProps("hoVaTen"),
    },

    {
      title: "Ngày Sinh",
      dataIndex: "ngaySinh",
      width: "14%",
      editable: true,
      ...getColumnSearchProps("ngaySinh"),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "14%",
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
      width: "12%",
      editable: true,
      ellipsis: true,
      ...getColumnSearchProps("diaChi"),
    },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      width: "13%",
      filters: [
        {
          text: "Hoạt động",
          value: "1",
        },
        {
          text: "Vô hiệu hóa",
          value: "2",
        },
      ],
      // eslint-disable-next-line eqeqeq
      onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
      // editable: true,
      render: (text, record) => (
        <span>
          {/*  eslint-disable-next-line eqeqeq */}
          {record.trangThai == 1 ? (
            <Button type="primary" style={{ borderRadius: "30px" }}>
              Hoạt động
            </Button>
          ) : // eslint-disable-next-line eqeqeq
          record.trangThai == 2 ? (
            <Button type="primary" danger style={{ borderRadius: "30px" }}>
              Vô hiệu hóa
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
              title={`Đổi trạng thái tài khoản từ ${
                record.trangThai === 1 ? "HOẠT ĐỘNG" : "VÔ HIỆU HÓA"
              } sang ${record.trangThai === 1 ? "VÔ HIỆU HÓA" : "HOẠT ĐỘNG"} `}
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
          <Form
            style={{
              display: "inline-block",
              marginLeft: "50px",
              paddingBottom: " 10px",
              width: "20em",
              height: "32px",
            }}
          >
            <Input
              placeholder="Search"
              value={searchText}
              onChange={handleInputChangeTop}
              style={{
                marginLeft: "50px",
                width: "20em",
                display: "inline-block",
                borderRadius: "50px 0px 0px 50px",
              }}
            />
          </Form>
        </span>
        {/* Search */}
        {/* <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ marginLeft: "5px", cursor: "pointer" }}
        /> */}
        <Button
          onClick={handleSearchTop}
          style={{
            borderRadius: "50px",
            width: "4em",
            backgroundColor: "#4976e8",
            color: "white",
            paddingBottom: "30px",
          }}
        >
          <SearchOutlined style={{ cursor: "pointer" }} />
        </Button>
        <span className="bl-add">
          <Link to="/them-khach-hang">
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
            rowKey="id"
            style={{ marginBottom: "20px" }}
          />
          {/* <ExportButton /> */}
          {/* <Button>
           >
          </Button> */}{" "}
          <YourComponent />
          <ExcelUploader />
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

export default HienThiKH;

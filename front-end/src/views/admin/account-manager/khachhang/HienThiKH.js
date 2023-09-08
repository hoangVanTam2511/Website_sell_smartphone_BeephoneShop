import {
  Form,
  Popconfirm,
  Table,
  Input,
  Button,
  Pagination,
  Card,
  Tooltip,
  Select,
} from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faArrowsRotate,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
import { Link, useNavigate } from "react-router-dom";
import NhapTuFile from "./NhapTuFile";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

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
  // const inputRef = useRef();
  const [editingAddresses, setEditingAddresses] = useState({});
  const addressList = editingAddresses[record?.id] || [];
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
          {/* {inputNode} */}

          {/* {dataIndex === "diaChi" ? (
            addressList.map((address, addressIndex) => (
              <div key={addressIndex}>
                {address.diaChi} - {address.tinhThanhPho}
              </div>
            ))
          ) : (
            <Input ref={inputRef} />
          )} */}
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
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const handleFilter = (status) => {
    setFilterStatus(status);
  };
  const filteredDataSource = filterStatus
    ? listKH.filter((item) => item.trangThai == filterStatus)
    : listKH;
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
      setListKH(modifiedData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error searching accounts:", error);
    }
  };
  //search đầu
  const handleInputChangeTop = (e) => {
    setSearchText(e.target.value);
  };

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
      setListKH(modifiedData);
    });
  };
  //edit
  const navigate = useNavigate();

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
      // diaChi: record.diaChi,
      matKhau: record.matKhau,
      soDienThoai: record.soDienThoai,
    });
    navigate(`/update-khach-hang/${record.id}`);
    setEditingKey(record.id);
  };

  const doChangeTrangThai = (id) => {
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
    },
    {
      title: "Họ và tên",
      dataIndex: "hoVaTen",
      width: "15%",
      // compare: (a, b) => a.hoVaTen - b.hoVaTen,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "14%",
      ellipsis: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      width: "12%",
    },
    // {
    //   title: "Địa chỉ",
    //   dataIndex: "diaChi",
    //   width: "12%",
    //   ellipsis: true,
    //   render: (_, record) => (
    //     <EditableCell
    //       // editing={isEditing(record)}
    //       dataIndex="diaChi"
    //       title="Địa chỉ"
    //       record={record}
    //     />
    //   ),
    // },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      width: "11%",
      // eslint-disable-next-line eqeqeq
      onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
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
          ""
        ) : (
          <>
            <Tooltip title="Sửa Khách Hàng" color={"black"} placement="bottom">
              <FontAwesomeIcon
                icon={faPencilAlt}
                onClick={() => edit(record)}
                style={{
                  cursor: "pointer",
                  color: editingKey === record.id ? "red" : "green",
                }}
                disabled={editingKey !== ""}
              />
            </Tooltip>
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
              <Tooltip
                title="Đổi Trạng Thái"
                color={"black"}
                placement="bottom"
              >
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  style={{ cursor: "pointer", paddingLeft: "20px" }}
                  transform={{ rotate: 90 }}
                  onClick={() => {
                    // Hành động khi nhấp vào biểu tượng
                  }}
                />
              </Tooltip>
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
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Card>
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
                placeholder="Tìm theo mã / họ và tên / sdt..."
                value={searchText}
                onChange={handleInputChangeTop}
                style={{
                  width: "21em",
                  display: "inline-block",
                  borderRadius: "10px 0px 0px 10px",
                }}
              />
            </Form>
          </span>
          <Tooltip title="Search" color={"black"} placement="bottom">
            <Button
              onClick={handleSearchTop}
              style={{
                borderRadius: "30px",
                width: "4em",
                backgroundColor: "#4976e8",
                color: "white",
                paddingBottom: "30px",
              }}
            >
              <SearchOutlined style={{ cursor: "pointer" }} />
            </Button>
          </Tooltip>

          <span className="bl-add">
            Trạng thái{"  "} &nbsp;&nbsp;
            <Select
              defaultValue="Tất cả"
              style={{
                width: 200,
                marginRight: "20em",
              }}
              onChange={handleFilter}
            >
              {" "}
              <Option value="">Tất cả</Option>
              <Option value={1}>Hoạt động</Option>
              <Option value={2}>Vô hiệu hóa</Option>
            </Select>
          </span>
        </div>
      </Card>

      <Card style={{ marginTop: "10px" }}>
        {" "}
        <div className="btn-add">
          <h5>
            <FontAwesomeIcon icon={faRectangleList} /> &nbsp;Danh sách Khách
            Hàng
            <span className="bl-add">
              <Link to="/them-khach-hang">
                <Button className="btn-them-tk">+ Thêm Tài khoản</Button>
              </Link>
              <Button className="btn-them-tu-file">
                <NhapTuFile />
              </Button>
            </span>
          </h5>
        </div>
        <div className="form-tbl">
          {" "}
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
            <div className="phanTrang" style={{ textAlign: "center" }}>
              <Pagination
                simple
                current={currentPage + 1}
                onChange={(value) => {
                  setCurrentPage(value - 1);
                }}
                total={totalPages * 10}
              />
            </div>
          </Form>
        </div>
      </Card>
    </>
  );
};

export default HienThiKH;

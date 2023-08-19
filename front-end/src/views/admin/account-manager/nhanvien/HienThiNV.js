import {
  Form,
  Popconfirm,
  Table,
  Input,
  Button,
  Pagination,
  // Space,
  Tooltip,
  Select,
  Card,
} from "antd";
import moment from "moment";
import {
  useState,
  useEffect, //useRef
} from "react";
import axios from "axios";
import { apiURLNV } from "../../../../service/api";
import { SearchOutlined } from "@ant-design/icons";
// import Highlighter from "react-highlight-words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faArrowsRotate,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
import { Link, useNavigate } from "react-router-dom";
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
  useEffect(() => {}, [record]);
  const handleDatePickerChange = (date) => {
    setNgaySinhValue(date);
  };
  const inputNode =
    inputType === "date" ? (
      <Input
        type="date"
        max={currentDate}
        value={ngaySinhValue ? moment(ngaySinhValue).format("mm/dd/yyyy") : ""}
        onChange={(e) =>
          handleDatePickerChange(moment(e.target.value, "mm/dd/yyyy"))
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

  const [filterStatus, setFilterStatus] = useState(null);
  const handleFilter = (status) => {
    setFilterStatus(status);
  };
  const filteredDataSource = filterStatus
    ? listNV.filter((item) => item.trangThai === filterStatus)
    : listNV;
  const handleSearchTop = async () => {
    try {
      const response = await axios.get(apiURLNV + "/search-all", {
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

      // setFilteredDataSource(modifiedData);
      setListNV(modifiedData); //1day
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error searching accounts:", error);
    }
  };

  const [searchText, setSearchText] = useState("");
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
        // console.log(modifiedData);
        setListNV(modifiedData);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {});
  };
  const navigate = useNavigate();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    const ngaySinh = moment(record.ngaySinh, "mm/dd/yyyy"); // Tạo đối tượng Moment hiện tại
    form.setFieldsValue({
      ma: record.ma,
      hoVaTen: record.hoVaTen,
      id: record.id,
      email: record.email,
      ngaySinh: ngaySinh.format("mm/dd/yyyy"),
      trangThai: record.trangThai,
      diaChi: record.diaChi,
      matKhau: record.matKhau,
      soDienThoai: record.soDienThoai,
      xaPhuong: record.xaPhuong,
      quanHuyen: record.quanHuyen,
      tinhThanhPho: record.tinhThanhPho,
      gioiTinh: record.gioiTinh,
      anhDaiDien: record.anhDaiDien,
    });
    navigate(`/update-nhan-vien/${record.id}`);
    setEditingKey(record.id);
  };
  const doChangeTrangThai = (id) => {
    //  const [trangThai, setTrangThai] = useState(record.trangThai);
    axios
      .put(apiURLNV + `/${id}/doi-tt`)
      .then((response) => {
        loadDataListRole(currentPage);
        console.log("Trạng thái đã được thay đổi");
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Đã xảy ra lỗi khi thay đổi trạng thái", error);
      });
  };
  const handleInputChangeTop = (e) => {
    setSearchText(e.target.value);
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
      // ...getColumnSearchProps("ma"),
    },
    {
      title: "Họ và tên",
      dataIndex: "hoVaTen",
      width: "15%",
      editable: true,
      ellipsis: true,
      // ...getColumnSearchProps("hoVaTen"),
    },

    // {
    //   title: "Ngày Sinh",
    //   dataIndex: "ngaySinh",
    //   width: "13%",
    //   editable: true,
    //   ...getColumnSearchProps("ngaySinh"),
    // },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      editable: true,
      ellipsis: true,
      // ...getColumnSearchProps("email"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      width: "14%",
      editable: true,
      // ...getColumnSearchProps("soDienThoai"),
    },
    {
      title: "Địa chỉ",
      // dataIndex: "diaChiTongHop",
      width: "10%",
      editable: true,
      ellipsis: true,
      render: (text, record) => {
        return (
          <span>
            {record.diaChi} {record.xaPhuong}
            {record.quanHuyen} {record.tinhThanhPho}
          </span>
        );
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      width: "10%",
      // filters: [
      //   {
      //     text: "Làm việc",
      //     value: "1",
      //   },
      //   {
      //     text: "Đã nghỉ",
      //     value: "2",
      //   },
      // ],
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
                record.trangThai === 1 ? "LÀM VIỆC" : "ĐÃ NGHỈ"
              } sang ${record.trangThai === 1 ? "ĐÃ NGHỈ" : "LÀM VIỆC"} `}
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
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  style={{ cursor: "pointer" }}
                  transform={{ rotate: 90 }}
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
        inputType: col.dataIndex === "ngaySinh" ? "date" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Card>
        {/* <h5 style={{ marginBottom: "10px" }}>
          {" "}
          <FontAwesomeIcon icon={faFilter} />
          &nbsp;Lọc
        </h5> */}

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
              <Option value={1}>Làm việc</Option>
              <Option value={2}>Đã nghỉ</Option>
            </Select>
          </span>
        </div>
      </Card>

      <Card style={{ marginTop: "10px" }}>
        {" "}
        <div className="btn-add">
          <h5>
            <FontAwesomeIcon icon={faRectangleList} /> &nbsp;Danh sách Nhân viên
            <span className="bl-add">
              <Link to="/them-nhan-vien">
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
          <Form form={form} component={false}>
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

export default HienThiNV;

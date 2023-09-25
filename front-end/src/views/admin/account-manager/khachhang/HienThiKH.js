import {
  Form,
  Popconfirm,
  Table,
  Input,
  Button,
  Select,
  Avatar,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../../components/Card";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import "../../../../assets/scss/HienThiNV.scss";
import { Link, useNavigate } from "react-router-dom";
import NhapTuFile from "./NhapTuFile";
import style from './style.css';
import { TextField, Tooltip, Zoom, IconButton, Pagination, Select as SelectMui, MenuItem, FormControl } from "@mui/material";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

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

  const [openSelect, setOpenSelect] = useState(false);

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };


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
  }, [currentPage, searchText]);
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
      align: "center",
      render: (text) => <span>{text}</span>,
      // sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      align: "center",
    },
    {
      title: "Họ và tên",
      dataIndex: "hoVaTen",
      align: "center",
      // compare: (a, b) => a.hoVaTen - b.hoVaTen,
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      align: "center",
      render: (text, record) =>
        <span >{record.soDienThoai || "..."}</span>
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
      align: "center",
      dataIndex: "trangThai",
      // eslint-disable-next-line eqeqeq
      onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
      render: (text, record) => (
        <span>
          {/*  eslint-disable-next-line eqeqeq */}
          {record.trangThai == 1 ? (
            <div
              className="rounded-pill mx-auto badge-primary"
              style={{
                height: "35px",
                width: "96px",
                padding: "4px",
              }}
            >
              <span
                className="text-white"
                style={{ fontSize: "14px" }}
              >
                Hoạt động
              </span>
            </div>
          ) : // eslint-disable-next-line eqeqeq
            record.trangThai == 2 ? (
              <div
                className="rounded-pill mx-auto badge-danger"
                style={{
                  height: "35px",
                  width: "140px",
                  padding: "4px",
                }}
              >
                <span
                  className="text-white"
                  style={{ fontSize: "14px" }}
                >
                  Ngừng hoạt động
                </span>
              </div>
            ) : (
              <div
                className="rounded-pill mx-auto badge-primary"
                style={{
                  height: "35px",
                  width: "130px",
                  padding: "4px",
                }}
              >
                <span
                  className="text-white"
                  style={{ fontSize: "14px" }}
                >
                  Không xác định
                </span>
              </div>
            )}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          ""
        ) : (
          <>
            <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
              <IconButton size="" onClick={() => edit(record)}>
                <BorderColorOutlinedIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom}
              title={record.trangThai == 1 ? "Ngừng kích hoạt" : "Kích hoạt"}
            >
              <IconButton onClick={() => doChangeTrangThai(record.id)} size="" className='ms-2' style={{ marginTop: "6px" }}>
                <AssignmentOutlinedIcon color={record.trangThai == 1 ? "error" : "success"} />
              </IconButton>
            </Tooltip>
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
      <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010" }}>
        <Card className="">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title mt-2">
              <TextField
                label="Tìm khách hàng"
                value={searchText}
                onChange={handleInputChangeTop}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    textTransform: "capitalize",
                  },
                }}
                inputProps={{
                  style: {
                    height: "23px",
                    width: "190px",
                  },
                }}
                size="small"
                className=""
              />
              <Button
                // onClick={handleRefreshData}
                className="rounded-2 ms-2"
                type="warning"
                style={{ width: "100px", fontSize: "15px" }}
              >
                <span
                  className="text-dark"
                  style={{ fontWeight: "500", marginBottom: "2px" }}
                >
                  Làm Mới
                </span>
              </Button>
            </div>

            <div className="mt-2 d-flex">
              <div className='ms-4 me-5 d-flex' style={{ height: "40px", position: "relative", cursor: "pointer" }}>
                <div onClick={handleOpenSelect} className="" style={{ marginTop: "7px" }}>
                  <span className='ms-2 ps-1' style={{ fontSize: "15px", fontWeight: "450" }}>Trạng Thái: </span>
                </div>
                <FormControl sx={{
                  minWidth: 50,
                }} size="small">
                  <SelectMui
                    MenuProps={{
                      PaperProps: {
                        style: {
                          borderRadius: '7px',
                        },
                      },
                    }}
                    IconComponent={KeyboardArrowDownOutlinedIcon}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none !important',
                      },
                      '& .MuiSelect-select': {
                        color: '#2f80ed',
                        fontWeight: "500",
                      },
                    }}
                    open={openSelect}
                    onClose={handleCloseSelect}
                    onOpen={handleOpenSelect}
                    defaultValue={14}
                  >
                    <MenuItem className='' value={14}>Tất cả</MenuItem>
                    <MenuItem value={15}>Hoạt động</MenuItem>
                    <MenuItem value={20}>Ngừng hoạt động</MenuItem>
                  </SelectMui>
                </FormControl>
              </div>
              <Link to="/them-khach-hang" className="me-3">
                <Button
                  // onClick={handleCreateNewOrderPending}
                  className="rounded-2 button-mui"
                  type="primary"
                  style={{ height: "40px", width: "auto", fontSize: "15px" }}
                >
                  <PlusOutlined className="ms-1"
                    style={{
                      position: "absolute",
                      bottom: "12.5px",
                      left: "12px",
                    }}
                  />
                  <span
                    className="ms-3 ps-1"
                    style={{ marginBottom: "3px", fontWeight: "500" }}
                  >
                    Tạo tài khoản
                  </span>
                </Button>
              </Link>
              <Link to="/them-khach-hang">
                <Button
                  // onClick={handleCreateNewOrderPending}
                  className="rounded-2 button-mui"
                  type="primary"
                  style={{ height: "40px", width: "auto", fontSize: "15px" }}
                >
                  <PlusOutlined className="ms-1"
                    style={{
                      position: "absolute",
                      bottom: "12.5px",
                      left: "12px",
                    }}
                  />
                  <span
                    className="ms-3 ps-1"
                    style={{ marginBottom: "3px", fontWeight: "500" }}
                  >
                    Nhập từ file
                  </span>
                </Button>
              </Link>
            </div>
          </Card.Header>
          <Card.Body>
            <Table
              dataSource={filteredDataSource}
              columns={mergedColumns}
              pagination={false}
              rowKey="id"
            />
          </Card.Body>
          <div className='mx-auto'>
            <Pagination color="primary" /* page={parseInt(currentPage)} key={refreshPage} count={totalPages} */
              /* onChange={handlePageChange} */ />
          </div>
          <div className="mt-4"></div>
        </Card>
      </div>


      {/*
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
            <FontAwesomeIcon icon={faList} /> &nbsp;Danh sách Khách Hàng
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
*/}
    </>
  );
};

export default HienThiKH;

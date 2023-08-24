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
import { apiURLKhuyenMai } from "../../../service/api";
import "../../../assets/scss/quanLyPromotion.scss";

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
const HienThiKhuyenMai = () => {
  const [form] = Form.useForm();
  let [listKhuyenMai, setlistKhuyenMai] = useState([]);
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
    loadDataListKhuyenMai(currentPage);
  }, [currentPage]);

  // cutstom load data
  const loadDataListKhuyenMai = (currentPage) => {
    if (currentPage == undefined) currentPage = 0;
    axios
      .get(apiURLKhuyenMai + "/hien-thi?page=" + currentPage)
      .then((response) => {
        const modifiedData = response.data.content.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        console.log(response);
        setlistKhuyenMai(modifiedData);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      });
  };

  // set filter
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredDataSource = filterStatus
    ? listKhuyenMai.filter((item) => item.trangThai === filterStatus)
    : listKhuyenMai;

  //edit

  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.id === editingKey;

  // ham edit
  const edit = (record) => {
    console.log(record);
    form.setFieldsValue({
      ma: record.ma,
      tenKhuyenMai: record.tenKhuyenMai,
      mucGiamGiaTheoPhanTram: record.mucGiamGiaTheoPhanTram,
      mucGiamGiaTheoSoTien: record.mucGiamGiaTheoSoTien,
      ngayBatDau: record.ngayBatDau,
      ngayKetThuc: record.ngayKetThuc,
      dieuKienGiamGia: record.dieuKienGiamGia,
      trangThai: record.trangThai,
    });
    setEditingKey(record.id);
  };

  const Delete = async (record) => {
    const index = listKhuyenMai.findIndex((item) => record.id === item.id);
    if (index > -1) {
      Swal.fire({
        title: "Bạn có muốn xóa khuyến mãi này",
        showDenyButton: true,
        confirmButtonText: "Có",
        denyButtonText: `Không`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          deleteKhuyenMai(record.id);
          Swal.fire("Xóa thành công", "", "success");
          loadDataListKhuyenMai();
        } else if (result.isDenied) {
        }
      });
    } else {
      Swal.fire("Không tìm thấy khuyến mãi", "", "failed");
    }
  };

  // delete
  const deleteKhuyenMai = async (id) => {
    await axios
      .delete(`${apiURLKhuyenMai}/delete-khuyen-mai/${id}`)
      .then((response) => {
        loadDataListKhuyenMai();
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
      const newData = [...listKhuyenMai];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };
        axios
          .put(`${apiURLKhuyenMai}/update-khuyen-mai/${id}`, updatedItem)
          .then((response) => {
            if (response.status === 200) {
              newData.splice(index, 1, updatedItem);
              setlistKhuyenMai(newData);
              setEditingKey("");
              loadDataListKhuyenMai();
            }
          })
          .catch((error) => {
            console.log("Failed to update record:", error);
          });
      } else {
        newData.push(row);
        setlistKhuyenMai(newData);
        setEditingKey("");
        setEditingNgayBatDau(null);
        setEditingNgayKetThuc(null);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const ConverttrangThai = (trangThai) => {
    return trangThai === true ? "Còn Hiệu Lực" : "Hết Hiệu Lực";
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
      title: "Mã",
      dataIndex: "ma",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("ma"),
    },
    {
      title: "Tên",
      dataIndex: "tenKhuyenMai",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("ten"),
    },
    {
      title: "Giảm Giá (%)",
      dataIndex: "mucGiamGiaTheoPhanTram",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("mucGiamGiaTheoPhanTram"),
    },
    {
      title: "Giảm Giá ($)",
      dataIndex: "mucGiamGiaTheoSoTien",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("mucGiamGiaTheoSoTien"),
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "ngayBatDau",
      width: "10%",
      editable: true,
      render: (ngayBatDau) => {
        const date = new Date(ngayBatDau);
        const formattedDate = date.toLocaleDateString("en-US");
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
        const formattedDate = item.substring(0, 10); // Lấy phần ngày tháng từ chuỗi ngày tháng
        return formattedDate;
      },
      ...getColumnSearchProps("ngayKetThuc"),
    },
    {
      title: "Điều Kiện Giảm Giá",
      dataIndex: "dieuKienGiamGia",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("dieuKienGiamGia"),
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      width: "15%",
      editable: true,
      ...getColumnSearchProps("trangThai"),
      render: (trangThai) => ConverttrangThai(trangThai),
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
      <div className="your-component-container">
        <div className="btn-add">
          <span>
            <Form style={{ width: "20em", display: "inline-block" }}>
              <h2>Quản lí Khuyến Mãi</h2>
              <Space>
                <Form.Item name="ma" noStyle>
                  <Input
                    ref={searchInput}
                    placeholder="Tìm kiếm Khuyến Mãi"
                    value={searchText}
                    style={{ marginBottom: "0.1%", width: "15em" }}
                  />
                </Form.Item>
                <Button type="primary" icon={<SearchOutlined />}>
                  Tìm kiếm
                </Button>
                {/* <Button onClick={() => clearFilters && handleReset(clearFilters)}>
                Reset
              </Button> */}
              </Space>
            </Form>
          </span>

          {/* Search */}
          <FontAwesomeIcon style={{ marginLeft: "5px" }} />
          <span className="bl-add">
            <Link to="/them-khuyen-mai">
              <Button className="btn-add-promotion">+ Thêm Khuyến Mãi </Button>
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
      </div>
    </>
  );
};

export default HienThiKhuyenMai;

import {
  Form,
  Popconfirm,
  Table,
  Input,
  Button,
  Space,
} from "antd";
import Swal from 'sweetalert2'
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { apiURLManHinh } from "../../../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination, } from "@mui/material";
import {
  faPencilAlt,
  faTrashAlt,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

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
  const inputNode =
  (
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
  let [listMauSac, setlistMauSac] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    loadDatalistMauSac(currentPage);
  }, [currentPage]);


  // cutstom load data
  const loadDatalistMauSac = (currentPage) => {
    if (currentPage == undefined) currentPage = 0;
    axios.get(apiURLManHinh + "/view-all?page=" + currentPage).then((response) => {
      const modifiedData = response.data.content.map((item, index) => ({
        ...item,
        stt: index + 1,
      }));
      setlistMauSac(modifiedData);
      setCurrentPage(response.data.number ? 1 : response.data.number + 1);
      setTotalPages(response.data.totalPages);
    });
  };

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
  };

  // set filter
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredDataSource = filterStatus
    ? listMauSac.filter((item) => item.trangThai === filterStatus)
    : listMauSac;

  //edit

  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.id === editingKey;

  // ham edit
  const edit = (record) => {
    form.setFieldsValue({
      ma: record.ma,
      kichThuoc: record.kichThuoc,
    });
    setEditingKey(record.id);
  };

  const Delete = async(record) => {
    const index = listMauSac.findIndex((item) => record.id === item.id);
    if(index > -1){
      Swal.fire({
        title: 'Bạn có muốn xóa màn hình này',
        showDenyButton: true,
        confirmButtonText: 'Có',
        denyButtonText: `Không`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          deleteColor(record.id)
          Swal.fire('Xóa thành công', '', 'success')
          loadDatalistMauSac();
        } else if (result.isDenied) {

        }
      })

    } else{
      Swal.fire('Không tìm thấy màn hình', '', 'failed')
    }
  };
  
  // delete
  const deleteColor = async (id) => {
    await axios.delete(`${apiURLManHinh}/delete?id=${id}`).then(
      (response)=>{
        loadDatalistMauSac();
      })
   
  }

  //cancel
  const cancel = () => {
    setEditingKey("");
  };
  //save
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...listMauSac];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };
        axios
          .put(`${apiURLManHinh}/update/${id}`, updatedItem)
          .then((response) => {
            if (response.status === 200) {
              newData.splice(index, 1, updatedItem);
              setlistMauSac(newData);
              setEditingKey("");
              loadDatalistMauSac();
            }
          })
          .catch((error) => {
            console.log("Failed to update record:", error);
          });
      } else {
        newData.push(row);
        setlistMauSac(newData);
        setEditingKey("");
        setEditingNgaySinh(null);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
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
      ...getColumnSearchProps("ma"),
    },
    {
      title: "Kích thước màn hình ",
      dataIndex: "kichThuoc",
      width: "15%",
      editable: true,
      ...getColumnSearchProps("kichThuoc"),
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
                marginLeft:20
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
            <h2>Quản lí màn hình</h2>
          </Form>
        </span>

        {/* Search */}
        <FontAwesomeIcon

          style={{ marginLeft: "5px" }}
        />
        <span className="bl-add">


          <Link to="/them-man-hinh">
            <Button className="btn-them-tk">+ Thêm màn hình </Button>
          </Link>

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

          <Pagination
            style={{ marginLeft: `35%`}}
            page={parseInt( currentPage )}
            count={totalPages}
            onChange={chuyenTrang}
            color="primary"
          />
        </Form>
      </div>
    </>
  );
};

export default HienThiKH;

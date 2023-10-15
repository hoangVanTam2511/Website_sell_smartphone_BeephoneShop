import {
  Form,
  Table,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURLMauSac } from "../../../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import {
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
import AddProperty from "../mau-sac/add-property";
import UpdateProperty from "../mau-sac/update-property"
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//show
const HienThiKH = () => {
  const [form] = Form.useForm();
  let [listColor, setlistColor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [textSearch, setTextSearch] = useState("");

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    loadDatalistColor(currentPage);
  }, [currentPage, textSearch]);


  const loadDatalistColor = (currentPage) => {
    if (currentPage === undefined || isNaN(currentPage)) currentPage = 1;
    axios
      .get(apiURLMauSac + "/search?page=" + currentPage + "&text=" + textSearch)
      .then((response) => {
        console.log(response);
        setlistColor(response.data.content);
        setCurrentPage( response.data.number + 1 );
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.log(error));
  };


  const deleteColor = async (record) => {
    setOpenModalConfirm(false)
    const index = listColor.findIndex((item) => record.id === item.id);
    if (index > -1) {
      const item = listColor[index];
      axios.delete(apiURLMauSac + `/delete/${item.id}`).then((response) => {
        if (response.status === 200) {
          const newData = [...listColor];
          newData.splice(index, 1);
          setlistColor(newData);
        }
      });
      toast.success("Bạn đã xóa thành công ");

    } else {
      console.log("Oh no, that item does not exist!");
    }
    return;
  };


  const handleTextSearch = (e) => {
    setTextSearch( e.target.value );
  };


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
    },
    {
      title: "Tên màu sắc",
      dataIndex: "tenMauSac",
      width: "15%",
    },
    {
      title: "Thao Tác",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <UpdateProperty color = {record} colors={listColor} loadData={loadDatalistColor} currentPage = {currentPage}/>

            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => setOpenModalConfirm(true)}
              style={{
                cursor: "pointer",
                color: "#F55E4C",
                marginLeft: 20,
              }}
            />

            <Modal
              title="Xác nhận"
              open={openModalConfirm}
              onOk={() => deleteColor(record)}
              onCancel={() => setOpenModalConfirm(false)}
            >
              Bạn có muốn xóa chip này ?
            </Modal>
          </>
        );
      },
    },
  ];


  return (
    <>
      <div className="card " style={{ padding: ` 1% 3%`, marginTop: `2%` }}>
        <div className="btn-add">
          <span>
            <Form
              style={{
                width: "20em",
                display: "inline-block",
                margin: `2% 35%`,
              }}
            >
              <h2>Quản lí màu sắc</h2>
            </Form>
          </span>

          <br />
          <FontAwesomeIcon style={{ marginLeft: "5px" }} />
          <span>
            <Form
              style={{ width:  "20em", display: "inline-block", height: "40px" }}
            >
              <TextField
                label="Tìm kiếm màu sắc"
                value={textSearch}
                onChange={handleTextSearch}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    textTransform: "capitalize",
                  },
                }}
                inputProps={{
                  style: {
                    height: "23px",
                    width: "290px",
                  },
                }}
                size="small"
                className=""
              />
            </Form>
          </span>
          <span className="bl-add">
            <AddProperty colors={listColor} loadData={loadDatalistColor} />
          </span>
        </div>

        <div className="form-tbl">
          <Form form={form} component={false}>
            <Table
              bordered
              columns={columns}
              dataSource={listColor}
              pagination={false}
              rowKey="id"
              style={{ marginBottom: "20px" }}
            />

            <Pagination
              style={{ marginLeft: `37%` }}
              page={parseInt(currentPage)}
              count={totalPages}
              onChange={chuyenTrang}
              color="primary"
            />
          </Form>
        </div>
        
      </div>
    </>
  );
};

export default HienThiKH;

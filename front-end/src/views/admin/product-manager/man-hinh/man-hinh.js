import {
  Form,
  Table,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURLManHinh } from "../../../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import {
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
import AddProperty from "../man-hinh/add-property";
import UpdateProperty from "../man-hinh/update-property"
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//show
const HienThiKH = () => {
  const [form] = Form.useForm();
  let [listDisplay, setlistDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [textSearch, setTextSearch] = useState("");

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    loadDatalistDisplay(currentPage);
  }, [currentPage, textSearch]);


  const loadDatalistDisplay = (currentPage) => {
    if (currentPage === undefined || isNaN(currentPage)) currentPage = 1;
    axios
      .get(apiURLManHinh + "/search?page=" + currentPage + "&text=" + textSearch)
      .then((response) => {
        console.log(response);
        setlistDisplay(response.data.content);
        setCurrentPage( response.data.number + 1 );
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.log(error));
  };


  const deleteColor = async (record) => {
    setOpenModalConfirm(false)
    const index = listDisplay.findIndex((item) => record.id === item.id);
    if (index > -1) {
      const item = listDisplay[index];
      axios.delete(apiURLManHinh + `/delete/${item.id}`).then((response) => {
        if (response.status === 200) {
          const newData = [...listDisplay];
          newData.splice(index, 1);
          setlistDisplay(newData);
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
      title: "Kích thước màn hình",
      dataIndex: "kichThuocManHinh",
      width: "15%",
    },
    {
      title: "Độ phân giải",
      dataIndex: "doPhanGiai",
      width: "15%",
    },
    {
      title: "Thao Tác",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <UpdateProperty display = {record} displays={listDisplay} loadData={loadDatalistDisplay} currentPage = {currentPage}/>

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
              Bạn có muốn xóa màn hình này ?
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
              <h2>Quản lí màn hình</h2>
            </Form>
          </span>

          <br />
          <FontAwesomeIcon style={{ marginLeft: "5px" }} />
          <span>
            <Form
              style={{ width:  "20em", display: "inline-block", height: "40px" }}
            >
              <TextField
                label="Tìm kiếm màn hình"
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
            <AddProperty displays={listDisplay} loadData={loadDatalistDisplay} />
          </span>
        </div>

        <div className="form-tbl">
          <Form form={form} component={false}>
            <Table
              bordered
              columns={columns}
              dataSource={listDisplay}
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

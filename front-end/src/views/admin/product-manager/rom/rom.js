import {
  Form,
  Table,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURLrom } from "../../../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import {
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
import AddProperty from "../rom/add-property";
import UpdateProperty from "../rom/update-property"
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//show
const HienThiKH = () => {
  const [form] = Form.useForm();
  let [listRom, setlistRom] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [textSearch, setTextSearch] = useState("");

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    loadDatalistRom(currentPage);
  }, [currentPage, textSearch]);


  const loadDatalistRom = (currentPage) => {
    if (currentPage === undefined || isNaN(currentPage)) currentPage = 1;
    axios
      .get(apiURLrom + "/search?page=" + currentPage + "&text=" + textSearch)
      .then((response) => {
        console.log(response);
        setlistRom(response.data.content);
        setCurrentPage( response.data.number + 1 );
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.log(error));
  };


  const deleteCamera = async (record) => {
    setOpenModalConfirm(false)
    const index = listRom.findIndex((item) => record.id === item.id);
    if (index > -1) {
      const item = listRom[index];
      axios.delete(apiURLrom + `/delete/${item.id}`).then((response) => {
        if (response.status === 200) {
          const newData = [...listRom];
          newData.splice(index, 1);
          setlistRom(newData);
        }
      });
      toast.success("Bạn đã xóa thành công rom[" + item.ma + "]: " + item.kichThuocRom + ` GB`);
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
      title: "Kích thước rom(GB)",
      dataIndex: "kichThuocRom",
      width: "15%",
    },
    {
      title: "Thao Tác",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <UpdateProperty rom = {record} roms={listRom} loadData={loadDatalistRom} currentPage = {currentPage}/>

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
              onOk={() => deleteCamera(record)}
              onCancel={() => setOpenModalConfirm(false)}
            >
              Bạn có muốn xóa rom này ?
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
              <h2>Quản lí rom</h2>
            </Form>
          </span>

          <br />
          <FontAwesomeIcon style={{ marginLeft: "5px" }} />
          <span>
            <Form
              style={{ width:  "20em", display: "inline-block", height: "40px" }}
            >
              <TextField
                label="Tìm kiếm rom"
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
            <AddProperty roms={listRom} loadData={loadDatalistRom} />
          </span>
        </div>

        <div className="form-tbl">
          <Form form={form} component={false}>
            <Table
              bordered
              columns={columns}
              dataSource={listRom}
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

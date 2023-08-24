import {
  Form,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Input,
  Button,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURLRole } from "../../../../service/api";
import { Link } from "react-router-dom";
import "../../../../assets/scss/HienThiNV.scss";
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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
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

const App = () => {
  const [form] = Form.useForm();
  let [listRole, setListRole] = useState([]);
  // let [currentPage, setCurrentPage] = useState(0);
  // let [totalPages, setToTalPages] = useState(0);

  useEffect(() => {
    loadDataListRole();
  }, []);

  const loadDataListRole = () => {
    axios
      .get(apiURLRole + "/hien-thi")
      .then((response) => {
        console.log(response);
        const modifiedData = response.data.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        setListRole(modifiedData);
        // setCurrentPage(response.data.number);
        // setToTalPages(response.data.totalPages);
      })
      .catch((error) => {});
  };

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ma: "",
      ten: "",
      id: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...listRole];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };

        // Make API call to update the record
        axios
          .put(apiURLRole + "/update/" + id, updatedItem)
          .then((response) => {
            if (response.status === 200) {
              newData.splice(index, 1, updatedItem);
              setListRole(newData);
              setEditingKey("");
            }
          })
          .catch((error) => {
            console.log("Failed to update record:", error);
          });
      } else {
        newData.push(row);
        setListRole(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
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
      width: "25%",
      editable: true,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      width: "25%",
      editable: true,
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
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
      <Form form={form} component={false}>
        <div
          className="btn-add"
          style={{ textAlign: "right", marginBottom: "20px" }}
        >
          <Link to="/them-chuc-vu">
            <Button className="btn-them-tk">+ Thêm Chức vụ</Button>
          </Link>
        </div>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={listRole}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
          rowKey="id"
        />
      </Form>
    </>
  );
};

export default App;

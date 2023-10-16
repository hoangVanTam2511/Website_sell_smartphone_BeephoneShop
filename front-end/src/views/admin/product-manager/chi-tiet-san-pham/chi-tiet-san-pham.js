import {
  Form,
  Table,
  Input,
  Button,
  Select,
  Space,
  Slider,
  Carousel
} from 'antd'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  apiURLSanPham,
  apiURLChip,
  apiURLDongSanPham,
  apiURLManHinh,
  apiURLMauSac,
  apiURLHang,
  apiURLPin,
  apiURLram,
  apiURLrom,
  apiURLChiTietSanPham,
  apiURLAnh
} from '../../../../service/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import '../../../../assets/scss/HienThiNV.scss'
import { Link } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import ConfigDetail from "../chi-tiet-san-pham/config-detail";
import ExcelExportHelper from "../chi-tiet-san-pham/ExcelExportHelper"; 


const contentStyle = {
  height: '159px',
  color: '#fff',
  width: `248px`,
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}

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
  const inputNode = <Input />

  return (
    //copy props bắt buộc nhập các trường sau bấm edit
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

//show
const HienThiChiTietSanPham = () => {
  const { idSanPham } = useParams()
  const [form] = Form.useForm()
  let [listChiTietSanPham, setlistChiTietSanPham] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [editingNgaySinh, setEditingNgaySinh] = useState(null)
  const [filterStatus, setFilterStatus] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  // const searchInput = useRef(null);
  const [listColor, setlistColor] = useState([])
  const [listChip, setlistChip] = useState([])
  const [listRam, setListRam] = useState([])
  const [listManHinh, setlistManHinh] = useState([])
  const [listRom, setlistRom] = useState([])
  const [listPin, setListPin] = useState([])
  const [listNhaSanXuat, setlistNhaSanXuat] = useState([])
  const [listDongSanPham, setListDongSanPham] = useState([])
  const [priceBiggest, setpriceBiggest] = useState(0)
  const [listImage, setListImage] = useState(new Map())
  

  const [chiTietSanPham, setchiTietSanPham] = useState({
    sanPham: '',
    dongSanPham: '',
    nhaSanXuat: '',
    mauSac: '',
    pin: '',
    ram: '',
    rom: '',
    chip: '',
    manHinh: '',
    donGiaMin: '',
    donGiaMax: '',
    trangThai: ''
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={e => e.stopPropagation()}
      >
        <Input
          // ref={searchInput}
          placeholder={`Nhập ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />

        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90
            }}
          >
            Reset
          </Button>

          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  useEffect(() => {
    loadDatalistChiTietSanPham(currentPage)
    loadDataComboBox()
  }, [currentPage, chiTietSanPham])

  // cutstom load data
  const loadDatalistChiTietSanPham = async currentPage => {
    if (currentPage == undefined) currentPage = 0
    axios.get(apiURLChiTietSanPham + `/${idSanPham}`).then(response => {
      const modifiedData = response.data.map((item, index) => ({
        ...item,
        tags: [item.tenDongSanPham, item.tenNhaSanXuat, item.tenChip],
        stt: index + 1
      }))
      modifiedData.map((item) => {
        axios.get(apiURLAnh + `/${item.id}`).then(response => {
          setListImage(map => new Map(map.set(item.id,response.data)))
        })
      })
      console.log(listChiTietSanPham)
      setlistChiTietSanPham(modifiedData)
      setCurrentPage(response.data.number)
      setTotalPages(response.data.totalPages)
    })

    axios.get(apiURLSanPham + '/don-gia-lon-nhat').then(response => {
      setpriceBiggest(response.data)
    })
  }

  const filteredDataSource = filterStatus
    ? listChiTietSanPham.filter(item => item.trangThai === filterStatus)
    : listChiTietSanPham

  //edit
  const [editingKey, setEditingKey] = useState('')

  const isEditing = record => record.id === editingKey

  const doChangeTrangThai = (e, record) => {
    axios
      .delete(apiURLSanPham + `/doi-trang-thai/${record.id}`)
      .then(response => {
        // Xử lý thành công
        // setTrangThai(trangThai === 1 ? 2 : 1);
        loadDatalistChiTietSanPham(currentPage)
        console.log('Trạng thái đã được thay đổi')
      })
      .catch(error => {
        // Xử lý lỗi
        console.error('Đã xảy ra lỗi khi thay đổi trạng thái', error)
      })
  }

  const handleChange = value => {
    setchiTietSanPham({
      ...chiTietSanPham,
      [String(value).slice(0, String(value).indexOf(':'))]: String(value).slice(
        String(value).indexOf(':') + 1
      )
    })
  }

  const handleText = e => {
    setchiTietSanPham({ ...chiTietSanPham, sanPham: e.target.value })
  }

  const sliderChange = e => {
    setchiTietSanPham({
      ...chiTietSanPham,
      ['donGiaMin']: e[0],
      ['donGiaMax']: e[1]
    })
  }

  const loadDataComboBox = async () => {
    axios.get(apiURLDongSanPham + '/get-list').then(response => {
      var itemAll = {
        label: 'Tất cả',
        value: 'dongSanPham:'
      }
      const modifiedData = response.data.map((item, index) => ({
        label: item.tenDongSanPham,
        value: 'dongSanPham:' + item.tenDongSanPham
      }))
      modifiedData.unshift(itemAll)
      setListDongSanPham(modifiedData)
    })
    axios.get(apiURLHang + '/get-list').then(response => {
      var itemAll = {
        label: 'Tất cả',
        value: 'nhaSanXuat:'
      }
      const modifiedData = response.data.map((item, index) => ({
        label: item.tenNhaSanXuat,
        value: 'nhaSanXuat:' + item.tenNhaSanXuat
      }))
      modifiedData.unshift(itemAll)
      setlistNhaSanXuat(modifiedData)
    })

    axios.get(apiURLPin + '/get-list').then(response => {
      var itemAll = {
        label: 'Tất cả',
        value: 'pin:'
      }
      const modifiedData = response.data.map((item, index) => ({
        label: item.dungLuong + ' mah',
        value: 'pin:' + item.dungLuong
      }))
      modifiedData.unshift(itemAll)
      setListPin(modifiedData)
    })

    axios.get(apiURLram + '/get-list').then(response => {
      var itemAll = {
        label: 'Tất cả',
        value: 'ram:'
      }
      const modifiedData = response.data.map((item, index) => ({
        label: item.kichThuoc + ' GB',
        value: 'ram:' + item.kichThuoc
      }))
      modifiedData.unshift(itemAll)
      setListRam(modifiedData)
    })

    axios.get(apiURLrom + '/get-list').then(response => {
      var itemAll = {
        label: 'Tất cả',
        value: 'rom:'
      }
      const modifiedData = response.data.map((item, index) => ({
        label: item.kichThuoc + ' GB',
        value: 'rom:' + item.kichThuoc
      }))
      modifiedData.unshift(itemAll)
      setlistRom(modifiedData)
    })

    axios.get(apiURLChip + '/get-list').then(response => {
      var itemAll = {
        label: 'Tất cả',
        value: 'chip:'
      }
      const modifiedData = response.data.map((item, index) => ({
        label: item.tenChip,
        value: 'chip:' + item.tenChip
      }))
      modifiedData.unshift(itemAll)
      setlistChip(modifiedData)
    })

    axios.get(apiURLMauSac + '/get-list').then(response => {
      var itemAll = {
        label: 'Tất cả',
        value: 'mauSac:'
      }
      const modifiedData = response.data.map((item, index) => ({
        label: item.tenMauSac,
        value: 'mauSac:' + item.tenMauSac
      }))
      modifiedData.unshift(itemAll)
      setlistColor(modifiedData)
    })

    axios.get(apiURLManHinh + '/get-list').then(response => {
      var itemAll = {
        label: 'Tất cả',
        value: 'manHinh:'
      }
      const modifiedData = response.data.map((item, index) => ({
        label: item.kichThuoc + ' inch',
        value: 'manHinh:' + item.kichThuoc
      }))
      modifiedData.unshift(itemAll)
      setlistManHinh(modifiedData)
    })
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: '5%',
      render: text => <span>{text}</span>,
      sorter: (a, b) => a.stt - b.stt
    },
    {
      title: 'Ảnh',
      dataIndex: 'kichThuocRam',
      width: '2%',
      render: (_, record) => {
       console.log(listImage.get(record.id))
        return (
          <>
            <Carousel style={{ width: `194px` }} autoplay>
              { listImage.get(record.id) === undefined  ? "":
              listImage.get(record.id).map((item) => {
                return(
                <div>
                   <img  style={contentStyle} src={item.duongDan}/>
                </div>
                )
              })}
            </Carousel>
          </>
        )
      }
    },
    {
      title: 'Ram',
      dataIndex: 'kichThuocRam',
      width: '5%',
      editable: true
    },
    {
      title: 'Rom',
      dataIndex: 'kichThuocRom',
      width: '5%',
      editable: true
    },
    {
      title: 'Màu sắc',
      dataIndex: 'mauSac',
      width: '5%',
      editable: true
    },
    {
      title: 'Số lượng tồn',
      dataIndex: 'soLuong',
      width: '5%',
      editable: true
    },
    {
      title: 'Đơn giá',
      dataIndex: 'donGia',
      width: '5%',
      editable: true
    },
    {
      title: 'Thao Tác',
      dataIndex: 'operation',
      width: '2%',
      render: (_, record) => {
        return (
          <>
           <ConfigDetail productDetail = {record} />
          </>
        )
      }
    }
  ]

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  return (
    <>
      <h2 className='text-center font-weight-bold'>
        Quản lí chi tiết sản phẩm
      </h2>
      <br />
      <div className="card " style={{ padding: ` 2% 3%` }}>
        <div
          className="btn-add"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>
            <Form
              style={{ width: "20em", display: "inline-block", height: "40px" }}
            >
              <Input
                placeholder="Nhập tên hoặc màu sắc hoặc hình thức "
                name="sanPham"
                style={{ height: "40px" }}
                onChange={(e) => handleText(e)}
              />
            </Form>
          </span>

          {/* Search */}
          <FontAwesomeIcon style={{ marginLeft: "2%" }} />
          <span className="btn-add">
            {/* <Button
              className="btn-them-tu-file"
              style={{ height: "40px", width: "auto", fontSize: "15px" }}
            >
              {/* <ExcelExportHelper data={listMauSac} /> 
            </Button> */}

            <Link to="/them-san-pham">
              <Button
                className="btn-them-tk"
                style={{ height: "40px", width: "auto", fontSize: "15px" }}
              >
                + Thêm sản phẩm{" "}
              </Button>
            </Link>
          </span>
        </div>

        <div
          className="btn-add"
          style={{
            width: `100%`,
            marginRight: 20,
            justifyContent: "center",
            marginTop: `2%`,
          }}
        >

          <Select
            defaultValue="Chọn dòng sản phẩm"
            style={{ width: `23%`, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: "Chọn một dòng sản phẩm",
                options: listDongSanPham,
              },
            ]}
          />

          <Select
            listItemHeight={10}
            listHeight={250}
            defaultValue="Chọn nhà sản xuất"
            style={{ width: `23%`, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: "Chọn một nhà sản xuất",
                options: listNhaSanXuat,
              },
            ]}
          />

          <Select
            defaultValue="Chọn màu sắc"
            style={{ width: `23%`, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: "Chọn một màu sắc",
                options: listColor,
              },
            ]}
          />

          <Select
            defaultValue="Chọn pin"
            style={{ width: `23%`, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: "Chọn một dung lượng pin",
                options: listPin,
              },
            ]}
          />

          <Select
            defaultValue="Chọn ram"
            style={{ width: `23%`, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: "Chọn một dung lượng ram",
                options: listRam,
              },
            ]}
          />

          <Select
            defaultValue="Chọn rom"
            style={{ width: `23%`, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: "Chọn một dung lượng rom",
                options: listRom,
              },
            ]}
          />

          <Select
            defaultValue="Chọn chip"
            style={{ width: `23%`, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: "Chọn một chip",
                options: listChip,
              },
            ]}
          />

          <Select
            defaultValue="Chọn kích cỡ màn hình"
            style={{ width: `23%`, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: "Chọn một kích cỡ màn hình",
                options: listManHinh,
              },
            ]}
          />

          <div className="d-flex">
            <label style={{ color: "black" }}>Lựa chọn khoảng giá : </label>

            <Button
              style={{ marginLeft: 40, marginBottom: 20 }}
              type="primary"
              ghost
            >
              {chiTietSanPham.donGiaMin == ""
                ? "0".toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"
                : chiTietSanPham.donGiaMin
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"}
            </Button>
            <Slider
              onChange={(e) => sliderChange(e)}
              style={{ width: 250, marginLeft: 5, marginBottom: 20 }}
              min={0}
              max={Number(priceBiggest)}
              step={1000000}
              range
              defaultValue={[0, Number(priceBiggest)]}
            />
            <Button
              style={{ marginLeft: 5, marginBottom: 20 }}
              type="primary"
              ghost
            >
              {chiTietSanPham.donGiaMax == ""
                ? priceBiggest
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"
                : chiTietSanPham.donGiaMax
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"}
            </Button>
          </div>

          <div className="d-flex">
            <label style={{ color: "black" }}>Lựa chọn trạng thái : </label>

            <Select
              defaultValue="Chọn trạng thái"
              style={{ width: 250, marginLeft: 40, marginBottom: 20 }}
              onChange={handleChange}
              options={[
                {
                  label: "Vui lòng chọn trạng thái",
                  options: [
                    {
                      value: "trangThai: ",
                      label: "Tất cả",
                    },
                    {
                      value: "trangThai:1",
                      label: "Kinh doanh",
                    },
                    {
                      value: "trangThai:0",
                      label: "Ngừng kinh doanh",
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className='card ' style={{ padding: 10 }}>
        <div
          style={{
            color: 'black',
            marginLeft: 10,
            marginTop: 20,
            fontWeight: 'bold'
          }}
        >
          <FontAwesomeIcon icon={faList} /> Danh sách các cấu hình
        </div>

        <div className='form-tbl'>
          <Form
            form={form}
            component={false}
            initialValues={editingNgaySinh || {}}
          >
            <Table
              components={{
                body: {
                  cell: EditableCell
                }
              }}
              bordered
              dataSource={filteredDataSource}
              columns={mergedColumns}
              rowClassName='editable-row'
              pagination={false}
              rowKey='id'
              style={{ marginBottom: '20px',textAlign:`center` }}
            />
          </Form>
        </div>
      </div>
    </>
  )
}

export default HienThiChiTietSanPham

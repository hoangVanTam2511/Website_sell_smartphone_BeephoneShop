import {
  Form,
  Popconfirm,
  Table,
  Input,
  Button,
  Select,
  Pagination,
  Space,
  Switch,
  Slider,
  Tag
} from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  apiURLSanPham,
  apiURLChip,
  apiURLDongSanPham,
  apiURLManHinh,
  apiURLMauSac,
  apiURLNhaSanXuat,
  apiURLPin,
  apiURLram,
  apiURLrom
} from '../../../../service/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import '../../../../assets/scss/product.css'
import { Link, useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import ExcelExportHelper from "../chi-tiet-san-pham/ExcelExportHelper";


const currentDate = new Date().toISOString().split('T')[0]

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
const HienThiKH = () => {
  const [form] = Form.useForm()
  let [listMauSac, setlistMauSac] = useState([])
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
  let navigate = useNavigate()
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
    loadDatalistMauSac(currentPage)
    loadDataComboBox()
  }, [currentPage, chiTietSanPham])

  // cutstom load data
  const loadDatalistMauSac = async currentPage => {
    if (currentPage == undefined) currentPage = 0
    axios
      .post(apiURLSanPham + '/products?page=' + currentPage, chiTietSanPham)
      .then(response => {
        const modifiedData = response.data.content.map((item, index) => ({
          ...item,
          tags: [item.tenDongSanPham, item.tenNhaSanXuat, item.tenChip]
        }))
        console.log(modifiedData)
        setlistMauSac(modifiedData)
        setCurrentPage(response.data.number)
        setTotalPages(response.data.totalPages)
      })

    axios.get(apiURLSanPham + '/don-gia-lon-nhat').then(response => {
      setpriceBiggest(response.data)
    })
  }

  const filteredDataSource = filterStatus
    ? listMauSac.filter(item => item.trangThai === filterStatus)
    : listMauSac

  //edit
  const [editingKey, setEditingKey] = useState('')

  const isEditing = record => record.id === editingKey

  const doChangeTrangThai = (e, record) => {
    console.log(record.delected)
    axios
      .delete(apiURLSanPham + `/doi-trang-thai/${record.id}`)
      .then(response => {
        // Xử lý thành công
        // setTrangThai(trangThai === 1 ? 2 : 1);
        loadDatalistMauSac(currentPage)
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
    axios.get(apiURLNhaSanXuat + '/get-list').then(response => {
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
      title: 'Tên sản phẩm',
      dataIndex: 'tenSanPham',
      width: '5%',
      editable: true
    },
    {
      title: 'Thông tin',
      dataIndex: 'tags',
      width: '65%',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 2 ? 'geekblue' : 'GREEN'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'delected',
      width: '5%',
      filters: [
        {
          text: 'Kinh doanh',
          value: 'true'
        },
        {
          text: 'Ngừng kinh doanh',
          value: 'false'
        }
      ],
      // eslint-disable-next-line eqeqeq
      onFilter: (value, record) => record.delected == value,
      filterSearch: true,
      // editable: true,
      // editable: true,
      render: (text, record) => (
        <span>
          <Space direction='vertical'>
            <Switch
              style={{ borderRadius: '30px', width: 140 }}
              onChange={e => doChangeTrangThai(e, record)}
              checkedChildren='Kinh doanh'
              unCheckedChildren='Ngừng kinh doanh'
              defaultChecked={record.delected}
            />
          </Space>
        </span>
      )
    },
    {
      title: 'Thao Tác',
      dataIndex: 'operation',
      width: '2%',
      render: (_, record) => {
        return (
          <>
            <FontAwesomeIcon
              icon={faEye}
              onClick={() => navigate(`/chi-tiet-san-pham/${record.id}`)}
              style={{
                cursor: 'pointer',
                color: editingKey === record.id ? 'red' : 'green'
              }}
            />
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
      <h2 className='text-center font-weight-bold'>Quản lí sản phẩm</h2>
      <br />
      <div className='card ' style={{ padding: ` 0 73px` }}>
      
        <div className='btn-add'>
          <span>
            <Form style={{ width: '20em', display: 'inline-block', height: "40px" }}>
              <Input
                placeholder='Nhập tên hoặc màu sắc hoặc hình thức '
                name='sanPham'
                style={{ height: "40px" }}
                onChange={e => handleText(e)}
              />
            </Form>
          </span>

          {/* Search */}
          <FontAwesomeIcon style={{ marginLeft: '5px' }} />
          <span className='bl-add'>
            
            <Button className='btn-them-tu-file'  style={{ height: "40px", width: "auto", fontSize: "15px" }}>
              <ExcelExportHelper data={listMauSac} />
            </Button>

            <Link to='/them-san-pham'>
              <Button className='btn-them-tk'  style={{ height: "40px", width: "auto", fontSize: "15px" }} >+ Thêm chi tiết sản phẩm </Button>
            </Link>

          </span>
        </div>

        <div
          className='btn-add'
          style={{ width: 1020, marginRight: 20, justifyContent: 'center', marginTop: `2%` }}
        >
          {/* <Select
          defaultValue="Chọn sản phẩm"
          style={{ width: 200,marginRight:15,marginBottom:20 }}
          onChange={handleChange}
          options={[
            {
              label: 'Chọn một sản phẩm',
              options: listSanPham
            },
          ]}
        /> */}

          <Select
            defaultValue='Chọn dòng sản phẩm'
            style={{ width: 200, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: 'Chọn một dòng sản phẩm',
                options: listDongSanPham
              }
            ]}
          />

          <Select
            listItemHeight={10}
            listHeight={250}
            defaultValue='Chọn nhà sản xuất'
            style={{ width: 200, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: 'Chọn một nhà sản xuất',
                options: listNhaSanXuat
              }
            ]}
          />

          <Select
            defaultValue='Chọn màu sắc'
            style={{ width: 200, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: 'Chọn một màu sắc',
                options: listColor
              }
            ]}
          />

          <Select
            defaultValue='Chọn pin'
            style={{ width: 200, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: 'Chọn một dung lượng pin',
                options: listPin
              }
            ]}
          />

          <Select
            defaultValue='Chọn ram'
            style={{ width: 200, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: 'Chọn một dung lượng ram',
                options: listRam
              }
            ]}
          />

          <Select
            defaultValue='Chọn rom'
            style={{ width: 200, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: 'Chọn một dung lượng rom',
                options: listRom
              }
            ]}
          />

          <Select
            defaultValue='Chọn chip'
            style={{ width: 200, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: 'Chọn một chip',
                options: listChip
              }
            ]}
          />

          <Select
            defaultValue='Chọn kích cỡ màn hình'
            style={{ width: 200, marginRight: 15, marginBottom: 20 }}
            onChange={handleChange}
            options={[
              {
                label: 'Chọn một kích cỡ màn hình',
                options: listManHinh
              }
            ]}
          />

          <div className='d-flex'>
            <label style={{ color: 'black' }}>Lựa chọn khoảng giá : </label>

            <Button
              style={{ marginLeft: 40, marginBottom: 20 }}
              type='primary'
              ghost
            >
              {chiTietSanPham.donGiaMin == ''
                ? '0'.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ'
                : chiTietSanPham.donGiaMin
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ'}
            </Button>
            <Slider
              onChange={e => sliderChange(e)}
              style={{ width: 250, marginLeft: 5, marginBottom: 20 }}
              min={0}
              max={Number(priceBiggest)}
              step={1000000}
              range
              defaultValue={[0, Number(priceBiggest)]}
            />
            <Button
              style={{ marginLeft: 5, marginBottom: 20 }}
              type='primary'
              ghost
            >
              {chiTietSanPham.donGiaMax == ''
                ? priceBiggest
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ'
                : chiTietSanPham.donGiaMax
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ'}
            </Button>
          </div>

          <div className='d-flex'>
            <label style={{ color: 'black' }}>Lựa chọn trạng thái : </label>

            <Select
              defaultValue='Chọn trạng thái'
              style={{ width: 250, marginLeft: 40, marginBottom: 20 }}
              onChange={handleChange}
              options={[
                {
                  label: 'Vui lòng chọn trạng thái',
                  options: [
                    {
                      value: 'trangThai: ',
                      label: 'Tất cả'
                    },
                    {
                      value: 'trangThai:1',
                      label: 'Kinh doanh'
                    },
                    {
                      value: 'trangThai:0',
                      label: 'Ngừng kinh doanh'
                    }
                  ]
                }
              ]}
            />
          </div>
        </div>
      </div>

      <div className='card ' style={{ padding: ` 0 7px` }}>
    
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
              style={{ marginBottom: '20px' }}
            />

            <Pagination
              style={{ transform: `translateX(${450}px)`, width: 200 }}
              simplecurrent={currentPage + 1}
              onChange={value => {
                setCurrentPage(value - 1)
              }}
              total={totalPages * 10}
            />
          </Form>
        </div>
      </div>
    </>
  )
}

export default HienThiKH

import React, { useEffect, useState } from "react";
import { Row, Col, Image, Table } from "react-bootstrap";
import Card from "../../../../../components/Card";
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import AddIcon from '@mui/icons-material/Add';
import ReactPaginate from 'react-paginate';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const BootstrapTable = () => {


  const [products, setProducts] = useState([])

  const [totalUsers,setToTalUsers] = useState(0);

  const [totalPages,setTotalPages] = useState(0);

  const { id } = useParams()
  useEffect(() => {
    loadUsers(1)
  }, [])

  const loadUsers = async (page) => {
    const result = await axios.get(`http://localhost:8080/camera/view-all?page=${page}`)
    setProducts(result.data.content)
    setToTalUsers(result.data.totalElements)
    setTotalPages(result.data.totalPages)
  }

  const deleteProduct = async (id) => {
    Swal.fire({
      title: 'Bạn có muốn xóa màu này',
      showDenyButton: true,
      confirmButtonText: 'Có',
      denyButtonText: `Không`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteColor(id)
        Swal.fire('Xóa thành công', '', 'success')
      } else if (result.isDenied) {
      }
    })

  }


  const deleteColor = async (id) => {
    await axios.delete(`http://localhost:8080/camera/delete?id=${id}`)
    loadUsers()
  }

  const handlePageClick = (event) => {
    loadUsers(+event.selected + 1)
  }
  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Quản lí camera

                  <Link to={`/them-mau-sac`} className="btn btn-outline-success " style={{ marginLeft: 20 }}>
                    <AddIcon />
                  </Link>
                </h4>


              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className=" mb-0" role="grid">
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Dộ phân giải </th>
                      <th>Hành động </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.map((product, index) => (
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <h6>{product.ma}</h6>
                            </div>
                          </td>
                          <td>
                            <h6>{product.doPhanGiai}</h6>
                          </td>

                          <td>


                            <button className="btn btn-outline-danger mr-2"
                              style={{ marginRight: 20 }}
                              onClick={() => deleteProduct(product.id)}
                            >
                              <DeleteIcon />
                            </button>
                            <Link className="btn btn-outline-primary"
                              to={`/sua-mau-sac/${product.id}`}
                            >
                              <EditIcon />
                            </Link>

                          </td>

                        </tr>
                      ))
                    }


                  </tbody>
                </Table>

                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Sau "
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  pageCount={totalPages}
                  previousLabel="Trước"

                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-time"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                />


              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BootstrapTable;

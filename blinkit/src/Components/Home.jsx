import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductAsync } from "../Services/Actions/productAction";
import { Button, Spinner, Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">All Products</h2>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="custom-table text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.title}</td>
                  <td>{prod.desc}</td>
                  <td>₹ {prod.price}</td>
                  <td>{prod.category}</td>
                  <td>
                    <img src={prod.image} alt={prod.title} height="80" style={{ objectFit: "cover" }} />
                  </td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(prod.id)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(prod.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Home;

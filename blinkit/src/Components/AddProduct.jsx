import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import generateUniqueId from "generate-unique-id";
import { useDispatch } from "react-redux";
import { addProduct } from "../Services/Actions/productAction";


const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });

    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" }); // remove error on valid input
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!inputForm.title.trim()) newErrors.title = "Title is required";
    if (!inputForm.desc.trim()) newErrors.desc = "Description is required";
    if (!inputForm.price.trim()) newErrors.price = "Price is required";
    if (!inputForm.category || inputForm.category === "Select Category")
      newErrors.category = "Category is required";
    if (!inputForm.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let id = generateUniqueId({ length: 6, useLetters: false });
      inputForm.id = id;

      dispatch(addProduct(inputForm));
      navigate("/");
    }
  };

  return (
    <Container className="add-product-form p-4 mt-4 mb-5 rounded shadow">
      <h2 className="mb-4 text-success fw-semibold">Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        {/* Title */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Title</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              placeholder="Enter Title"
              name="title"
              value={inputForm.title}
              onChange={handleChanged}
              className="form-control-custom"
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Description */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Description</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              placeholder="Enter Description"
              name="desc"
              value={inputForm.desc}
              onChange={handleChanged}
              className="form-control-custom"
              isInvalid={!!errors.desc}
            />
            <Form.Control.Feedback type="invalid">{errors.desc}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Price */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Price</Form.Label>
          <Col sm="6">
            <Form.Control
              type="number"
              placeholder="Enter Price"
              name="price"
              value={inputForm.price}
              onChange={handleChanged}
              className="form-control-custom"
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Category */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Category</Form.Label>
          <Col sm="6">
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
              className="form-control-custom"
              isInvalid={!!errors.category}
            >
              <option>Select Category</option>
              <option value="Dairy, Bread & Eggs">Dairy, Bread & Eggs</option>
              <option value="Snacks & Munchies">Snacks & Munchies</option>
              <option value="Cold Drinks & Juices">Cold Drinks & Juices</option>
              <option value="Candies & Gums">Candies & Gums</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Image URL */}
        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Image URL</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              placeholder="Enter Image URL"
              name="image"
              value={inputForm.image}
              onChange={handleChanged}
              className="form-control-custom"
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        

        <Button type="submit" className="blinkit-btn">Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;

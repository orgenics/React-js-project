import { useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import generateUniqueId from "generate-unique-id";
import { addnewProductAsync } from "../../services/action/MenAction.js";

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    pname: "",
    pdesc: "",
    category: "Under",
    pimg: "",
    psize: [],
    Brand: "Under",
    price: "",
  };

  const [inputForm, setInputForm] = useState(initialState);

  const handleChanged = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setInputForm((prev) => ({
        ...prev,
        psize: checked
          ? [...prev.psize, value]
          : prev.psize.filter((v) => v !== value),
      }));
    } else {
      setInputForm({
        ...inputForm,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...inputForm,
      id: generateUniqueId({ length: 4, useLetters: false }),
    };
    dispatch(addnewProductAsync(newProduct));
    navigate("/Men");
  };

  return (
    <Container className="my-5">
      <Card className="shadow p-4">
        <h3 className="text-center mb-4 text-primary">Add New Product</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Left Column */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="pname"
                  value={inputForm.pname}
                  onChange={handleChanged}
                  placeholder="Enter Product Name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  type="text"
                  name="pdesc"
                  value={inputForm.pdesc}
                  onChange={handleChanged}
                  placeholder="Enter Product Description"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={inputForm.category}
                  onChange={handleChanged}
                  required
                >
                  <option value="Under">Under</option>
                  <option value="T-Shirts">T-Shirt</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Shirts">Shirt</option>
                  <option value="Jackets">Jacket</option>
                  <option value="Hoodies">Hoodie</option>
                  <option value="Sweaters">Sweater</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  name="Brand"
                  value={inputForm.Brand}
                  onChange={handleChanged}
                  required
                >
                  <option value="Under">Under</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Puma">Puma</option>
                  <option value="Zara">Zara</option>
                  <option value="Reebok">Reebok</option>
                  <option value="Levis">Levi's</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Right Column */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={inputForm.price}
                  onChange={handleChanged}
                  placeholder="Enter Product Price"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Available Sizes</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size, i) => (
                    <Form.Check
                      key={i}
                      type="checkbox"
                      name="psize"
                      value={size}
                      label={size}
                      checked={inputForm.psize.includes(size)}
                      onChange={handleChanged}
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="pimg"
                  value={inputForm.pimg}
                  onChange={handleChanged}
                  placeholder="Enter Product Image URL"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-3">
            <Button variant="primary" type="submit" className="px-5">
              Add Product
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Addproduct;

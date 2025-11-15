import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { addNewProductAsync } from "../../services/action/propertyAction";
import { useNavigate } from "react-router";
import "./Addproduct.css";
import uploadImage from "../../services/file/uploadfile";

export default function Addproduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isCreated } = useSelector((state) => state);

  const initialState = {
    id: "",
    pname: "",
    desc: "",
    img: "",
    price: "",
    brand: "",
    category: "",
    gender: "",
    pattern: [],
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [error, setError] = useState({});

  const Handelchange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setInputForm((prev) => ({
        ...prev,
        pattern: checked ? [...prev.pattern, value] : prev.pattern.filter((v) => v !== value),
      }));
    } else {
      setInputForm({ ...inputForm, [name]: value });
    }
  };


  const handleImage = async(e) => {
        let imageUrl = await uploadImage(e.target.files[0]);
        setInputForm({
            ...inputForm,
            img: `${imageUrl}`
        });
    }
  const validate = () => {
    let err = {};
    if (!inputForm.pname.trim()) err.pname = "Product Name is required";
    if (!inputForm.desc.trim()) err.desc = "Product Description is required";
    if (!inputForm.img.trim()) err.img = "Product Image URL is required";
    if (!inputForm.price.trim()) err.price = "Product Price is required";
    if (!inputForm.brand.trim()) err.brand = "Product Brand is required";
    if (!inputForm.category.trim()) err.category = "Product Category is required";
    if (inputForm.pattern.length === 0) err.pattern = "Product Pattern is required";

    setError(err);
    return Object.keys(err).length !== 0;
  };

  const Handelsubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      const newdata = { ...inputForm, id: String(Math.floor(Math.random() * 100)) };
      dispatch(addNewProductAsync(newdata));
      navigate(`/${inputForm.gender === "men" ? "Men" : inputForm.gender === "women" ? "Women" : "Kids"}`);
    }
  };

  useEffect(() => {
    if (isCreated) {
      navigate(`/${inputForm.gender === "men" ? "Men" : inputForm.gender === "women" ? "Women" : "Kids"}`);
    }
  }, [isCreated]);

  return (
    <Container className="add-product redesigned mt-5 p-4">
      <div className="form-card shadow-lg p-4 rounded-4">
        <h2 className="text-center mb-4 fw-bold">Add New Product</h2>
        {isError && <p className="text-danger text-center">{isError}</p>}

        <Form onSubmit={Handelsubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="pname" value={inputForm.pname} onChange={Handelchange} placeholder="Enter product name" />
            {error.pname && <div className="error-text">{error.pname}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="desc" value={inputForm.desc} onChange={Handelchange} placeholder="Enter product description" />
            {error.desc && <div className="error-text">{error.desc}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="file" name="img" onChange={handleImage} placeholder="Paste product image URL" />
            {error.img && <div className="error-text">{error.img}</div>}
          </Form.Group>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Select name="brand" value={inputForm.brand} onChange={Handelchange}>
                <option value="">Select Brand</option>
                {["Nike", "Adidas", "Puma", "Reebok"].map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </Form.Select>
              {error.brand && <div className="error-text">{error.brand}</div>}
            </Col>

            <Col md={6} className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={inputForm.category} onChange={Handelchange}>
                <option value="">Select Category</option>
                {["Blazers", "Cargos", "Jackets", "Jeans", "Hoodies"].map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </Form.Select>
              {error.category && <div className="error-text">{error.category}</div>}
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="price" value={inputForm.price} onChange={Handelchange} placeholder="₹ Price" />
            {error.price && <div className="error-text">{error.price}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pattern Types</Form.Label>
            <div className="pattern-box d-flex flex-wrap gap-3 p-2 rounded-3 border">
              {["Solid", "Checked", "Striped", "Printed", "Graphic", "Embroidered"].map((v, i) => (
                <Form.Check
                  name="pattern"
                  onChange={Handelchange}
                  key={i}
                  type="checkbox"
                  value={v}
                  label={v}
                  className="pattern-item p-2 rounded-3 shadow-sm bg-light d-flex align-items-center"
                />
              ))}
            </div>
            {error.pattern && <div className="error-text">{error.pattern}</div>}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Product For</Form.Label>
            <div className="gender-box d-flex gap-4">
              <Form.Check type="radio" value="men" onChange={Handelchange} name="gender" label="Men" />
              <Form.Check type="radio" value="women" onChange={Handelchange} name="gender" label="Women" />
              <Form.Check type="radio" value="kids" onChange={Handelchange} name="gender" label="Kids" />
            </div>
          </Form.Group>

          <div className="text-center">
            <Button variant="success" className="px-5 py-2" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

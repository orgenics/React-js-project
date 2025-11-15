import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { getProductAsync, updateProductAsync } from '../../services/action/propertyAction';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

const EditProduct = () => {
    const { id } = useParams();
    const { product, isUpdated } = useSelector(state => state.productReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialState = {
        id: "",
        pname: "",
        desc: "",
        img: "",
        price: "",
        brand: "",
        category: "",
        gender: "",
        pattern: []
    }

    const [inputForm, setInputForm] = useState(initialState);

    const Handelchange = (e) => {
        const { name, value, type, checked } = e.target
        if (type == 'checkbox') {
            setInputForm((prev) => ({
                ...prev,
                pattern: checked ? [...prev.pattern, value] : prev.pattern.filter(v => v != value)
            }))
        }
        else {
            setInputForm({
                ...inputForm,
                [name]: value
            })
        }
    }

    const Handelsubmit = (e) => {
        e.preventDefault();
        dispatch(updateProductAsync(inputForm));
    }

    useEffect(() => {
        if (isUpdated) {
            if (inputForm.gender === 'women') {
                navigate('/Women')
            }
            else if (inputForm.gender === 'men') {
                navigate('/Men')
            }
            else if (inputForm.gender === 'kids') {
                navigate('/Kids')
            }
        }
    }, [isUpdated])

    useEffect(() => {
        if (product) {
            setInputForm(product)
        }
    }, [product])

    useEffect(() => {
        dispatch(getProductAsync(Number(id)));
    }, [id]);

    return (
        <>
            <h1 className='text-center my-5'>Edit Product</h1>
            <Container className='mt-5'>
                <Form onSubmit={Handelsubmit}>
                    <Form.Group as={Row} className="mb-3 text-center" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Product Name :
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name='pname' value={inputForm.pname}
                                onChange={Handelchange} placeholder="Enter Product Name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 text-center" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Product Description :
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name='desc' onChange={Handelchange} value={inputForm.desc} placeholder="Enter Product Description" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 text-center" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Product img :
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name='img' onChange={Handelchange} value={inputForm.img} placeholder="Enter Product img url" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 text-center" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Product Brand :
                        </Form.Label>
                        <Col sm="6">
                            <Form.Select name='brand' value={inputForm.brand} onChange={Handelchange} aria-label="Default select example">
                                <option value={""}>select brand</option>
                                {['Nike', 'Adidas', 'Puma', 'Reebok'].map((v, i) => <option key={i} value={v}>{v}</option>)}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 text-center" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Category Type:
                        </Form.Label>
                        <Col sm="6">
                            <Form.Select name='category' value={inputForm.category} onChange={Handelchange} aria-label="Default select example">
                                <option value={""}>select category</option>
                                {['Blazers', 'Cargos', 'Jackets', 'Jeans', 'Hoodies'].map((v, i) => <option key={i} value={v}>{v}</option>)}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 text-center" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Product Price :
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name='price' onChange={Handelchange} value={inputForm.price} placeholder="Enter Product Price" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 text-center" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Pattern Type:
                        </Form.Label>
                        <Col sm="1">
                            {
                                ['Solid', 'Checkered', 'Striped', 'Printed'].map((v, i) => <Form.Check name='pattern' onChange={Handelchange} key={i} type={"checkbox"} value={v} label={v} checked={inputForm.pattern.includes(v)} />)
                            }
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 " controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Product for :
                        </Form.Label>
                        <Col sm="6">
                            <Form.Check
                                type={"radio"} value="men" onChange={Handelchange} name='gender' label="men"
                                checked={inputForm.gender === 'men'}

                            />
                            <Form.Check
                                type={"radio"} value="women" onChange={Handelchange} name='gender' label="women"
                                checked={inputForm.gender === 'women'}
                            />
                              <Form.Check
                                type={"radio"} value="kids" onChange={Handelchange} name='gender' label="kids"
                                checked={inputForm.gender === 'kids'}
                            />
                        </Col>
                    </Form.Group>

                    <Button variant="success" className='my-2' style={{ marginLeft: '25%' }} type="submit">Update Product</Button>

                </Form>
            </Container>

{/* 
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
                        <Form.Control type="text" name="img" value={inputForm.img} onChange={Handelchange} placeholder="Paste product image URL" />
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
                </Container> */}
        </>
    )
}

export default EditProduct



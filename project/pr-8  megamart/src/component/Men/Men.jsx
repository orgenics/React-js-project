import { useEffect, useState } from "react";
import { Card, Form, Badge, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Deleteproduct, getAllproduct } from "../../services/action/MenAction";
import { useNavigate } from "react-router";

const Men = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state);

  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  useEffect(() => {
    dispatch(getAllproduct());
  }, [dispatch]);

  const categories = ["T-Shirts", "Jeans", "Shirts", "Jackets"];
  const brands = ["Nike", "Adidas", "Puma", "Zara"];

  const filteredProducts = products.filter((product) => {
    const matchesName = product.pname.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesBrand = selectedBrand ? product.Brand === selectedBrand : true;
    const matchesPrice = Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1];
    return matchesName && matchesCategory && matchesBrand && matchesPrice;
  });

  const handleEdit = (id) => navigate(`/edit-product/${id}`);
  const handleDelete = (id) => dispatch(Deleteproduct(id));

  return (
    <div style={{ display: "flex", gap: "25px", flexWrap: "wrap", minHeight: "100vh", backgroundColor: "#f5f6fa", padding: "20px" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "260px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        padding: "25px",
        height: "fit-content",
        position: "sticky",
        top: "20px"
      }}>
        <h5 className="text-primary mb-4">Filter Products</h5>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Search by Name</Form.Label>
          <Form.Control type="text" placeholder="e.g. T-shirt" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Category</Form.Label>
          <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (<option key={idx} value={cat}>{cat}</option>))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Brand</Form.Label>
          <Form.Select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">All Brands</option>
            {brands.map((brand, idx) => (<option key={idx} value={brand}>{brand}</option>))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Price Range (₹)</Form.Label>
          <Row>
            <Col>
              <Form.Control type="number" placeholder="Min" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} />
            </Col>
            <Col>
              <Form.Control type="number" placeholder="Max" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="outline-primary" size="sm" className="w-100 mt-2" onClick={() => {
          setFilter(""); setSelectedCategory(""); setSelectedBrand(""); setPriceRange([0, 10000]);
        }}>Reset Filters</Button>
      </div>

      {/* Products Grid */}
      <div style={{ flex: 1 }}>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredProducts.map((v, i) => (
            <Col key={i}>
              <Card className="h-100 shadow-sm border-0 rounded-3" style={{ transition: "transform 0.2s", cursor: "pointer" }}>
                <Card.Img variant="top" src={v.pimg} style={{ height: "220px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }} />
                <Card.Body>
                  <Card.Title className="fw-bold" style={{ fontSize: "14px" }}>{v.pname}</Card.Title>
                  <Card.Text style={{ fontSize: "13px", color: "#6c757d", minHeight: "40px" }}>{v.pdesc}</Card.Text>
                  <div className="fw-bold text-primary mb-1">₹{v.price}</div>
                  <div style={{ fontSize: "12px", color: "#495057" }}><strong>Brand:</strong> {v.Brand || "N/A"}</div>
                  <div style={{ fontSize: "12px", color: "#495057" }}><strong>Category:</strong> {v.category || "N/A"}</div>
                  <div className="mt-2">
                    {v.psize && v.psize.length > 0 ? v.psize.map((s, idx) => (
                      <Badge key={idx} bg="secondary" className="me-1 py-1 px-2" style={{ fontSize: "10px" }}>{s}</Badge>
                    )) : <span>N/A</span>}
                  </div>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <Button variant="warning" size="sm" onClick={() => handleEdit(v.id)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(v.id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredProducts.length === 0 && (
          <p className="text-center text-muted mt-5 fs-6">No products match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Men;

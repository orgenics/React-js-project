import { useEffect, useState } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, getallproductAsync } from "../../services/action/propertyAction";
import { useNavigate } from "react-router";
import "./Men.css";

const Men = () => {
  const {products} = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [genreFilter, setGenreFilter] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [showCategory, setShowCategory] = useState(true);
  const [showBrand, setShowBrand] = useState(true);
  const [showPattern, setShowPattern] = useState(true);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const handelDelete = (id) => {
    dispatch(deleteProductAsync(id));
  };

  const handelEdit = (id) => {
    navigate(`/editproduct/${id}`);
  };

  useEffect(() => {
    dispatch(getallproductAsync());
  }, [])

  const handleGenreFilter = (e) => {
    const filter = e.target.value;
    setGenreFilter(filter);
    let sorted = [...sortedProducts];
    if (filter === "low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (filter === "high") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sorted);
  };

  const applyFilters = (categories, brands, patterns) => {
    let filtered = [...products];

    if (categories.length > 0) {
      filtered = filtered.filter((p) => categories.includes(p.category));
    }

    if (brands.length > 0) {
      filtered = filtered.filter((p) => brands.includes(p.brand));
    }

    if (patterns.length > 0) {
      filtered = filtered.filter((p) =>
        p.pattern?.some((pt) => patterns.includes(pt))
      );
    }

    setSortedProducts(filtered);
  };


  const handleCategoryChange = (e) => {
    const value = e.target.value;
    let updated = e.target.checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((v) => v !== value);
    setSelectedCategories(updated);
    applyFilters(updated, selectedBrands, selectedPatterns);
  };


  const handleBrandChange = (e) => {
    const value = e.target.value;
    let updated = e.target.checked
      ? [...selectedBrands, value]
      : selectedBrands.filter((v) => v !== value);
    setSelectedBrands(updated);
    applyFilters(selectedCategories, updated, selectedPatterns);
  };

  const handlePatternChange = (e) => {
    const value = e.target.value;
    let updated = e.target.checked
      ? [...selectedPatterns, value]
      : selectedPatterns.filter((v) => v !== value);
    setSelectedPatterns(updated);
    applyFilters(selectedCategories, selectedBrands, updated);
  };

  const handleClear = () => {
    setSortedProducts(products);
    setGenreFilter("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPatterns([]);
  };

  const categoryList = ["Blazers", "Cargos", "Chinos", "Jackets", "Jeans", "Joggers"];
  const brandList = ["Nike", "Adidas", "Puma", "Reebok"];
  const patternList = ["Solid", "Checkered", "Striped", "Printed"];

  return (
    <>

      <Container>
        <Row>
          {/* <div className="col-4">
            <div className="filter d-flex align-items-center justify-content-between">
              <h2>FILTERS</h2>
              <button className="clear mx-4" onClick={handleClear}>
                CLEAR ALL
              </button>
            </div>

            <div className="category-filter mt-4">
              <div
                className="d-flex justify-content-between align-items-center dropdown-header"
                onClick={() => setShowCategory(!showCategory)}
                style={{ cursor: "pointer" }}
              >
                <h5 className="mb-0">Category Type</h5>
                <span style={{ fontSize: "20px", color: "#777" }}>
                  {showCategory ? "▴" : "▾"}
                </span>
              </div>
              {showCategory && (
                <div className="dropdown-body mt-3">
                  {categoryList.map((cat) => (
                    <div key={cat} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <input
                          type="checkbox"
                          id={cat}
                          value={cat}
                          onChange={handleCategoryChange}
                          checked={selectedCategories.includes(cat)}
                        />
                        <label htmlFor={cat} className="ms-2">{cat}</label>
                      </div>
                      <span className="text-muted small">
                        {products.filter((p) => p.category === cat).length}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="brand-filter mt-4">
              <div
                className="d-flex justify-content-between align-items-center dropdown-header"
                onClick={() => setShowBrand(!showBrand)}
                style={{ cursor: "pointer" }}
              >
                <h5 className="mb-0">Brand Type</h5>
                <span style={{ fontSize: "20px", color: "#777" }}>
                  {showBrand ? "▴" : "▾"}
                </span>
              </div>
              {showBrand && (
                <div className="dropdown-body mt-3">
                  {brandList.map((brand) => (
                    <div key={brand} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <input
                          type="checkbox"
                          id={brand}
                          value={brand}
                          onChange={handleBrandChange}
                          checked={selectedBrands.includes(brand)}
                        />
                        <label htmlFor={brand} className="ms-2">{brand}</label>
                      </div>
                      <span className="text-muted small">
                        {products.filter((p) => p.brand === brand).length}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pattern-filter mt-4">
              <div
                className="d-flex justify-content-between align-items-center dropdown-header"
                onClick={() => setShowPattern(!showPattern)}
                style={{ cursor: "pointer" }}
              >
                <h5 className="mb-0">Pattern Type</h5>
                <span style={{ fontSize: "20px", color: "#777" }}>
                  {showPattern ? "▴" : "▾"}
                </span>
              </div>
              {showPattern && (
                <div className="dropdown-body mt-3">
                  {patternList.map((pattern) => (
                    <div key={pattern} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <input
                          type="checkbox"
                          id={pattern}
                          value={pattern}
                          onChange={handlePatternChange}
                          checked={selectedPatterns.includes(pattern)}
                        />
                        <label htmlFor={pattern} className="ms-2">{pattern}</label>
                      </div>
                      <span className="text-muted small">
                        {products.filter((p) => p.pattern?.includes(pattern)).length}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div> */}

<div className="col-4">
  <div className="filter-card">
    <div className="filter-header d-flex align-items-center justify-content-between">
      <h2 className="filter-title">FILTERS</h2>
      <button className="clear-btn" onClick={handleClear}>CLEAR ALL</button>
    </div>

    {/* Category */}
    <div className={`dropdown ${showCategory ? "open" : ""}`}>
      <div
        className="dropdown-header"
        onClick={() => setShowCategory(!showCategory)}
        role="button"
        aria-expanded={showCategory}
      >
        <h5 className="mb-0">Category Type</h5>
        <span className="chev">{showCategory ? "▴" : "▾"}</span>
      </div>

      {showCategory && (
        <div className="dropdown-body">
          {categoryList.map((cat) => (
            <div key={cat} className="filter-row">
              <div className="left">
                <input
                  type="checkbox"
                  id={cat}
                  value={cat}
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes(cat)}
                />
                <label htmlFor={cat} className="ms-2 label-text">{cat}</label>
              </div>
              <div className="right">
                <span className="count">{products.filter((p) => p.category === cat).length}</span>
                <span className="item-arrow">›</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Brand */}
    <div className={`dropdown ${showBrand ? "open" : ""}`}>
      <div
        className="dropdown-header"
        onClick={() => setShowBrand(!showBrand)}
        role="button"
        aria-expanded={showBrand}
      >
        <h5 className="mb-0">Brand Type</h5>
        <span className="chev">{showBrand ? "▴" : "▾"}</span>
      </div>

      {showBrand && (
        <div className="dropdown-body">
          {brandList.map((brand) => (
            <div key={brand} className="filter-row">
              <div className="left">
                <input
                  type="checkbox"
                  id={brand}
                  value={brand}
                  onChange={handleBrandChange}
                  checked={selectedBrands.includes(brand)}
                />
                <label htmlFor={brand} className="ms-2 label-text">{brand}</label>
              </div>
              <div className="right">
                <span className="count">{products.filter((p) => p.brand === brand).length}</span>
                <span className="item-arrow">›</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Pattern */}
    <div className={`dropdown ${showPattern ? "open" : ""}`}>
      <div
        className="dropdown-header"
        onClick={() => setShowPattern(!showPattern)}
        role="button"
        aria-expanded={showPattern}
      >
        <h5 className="mb-0">Pattern Type</h5>
        <span className="chev">{showPattern ? "▴" : "▾"}</span>
      </div>

      {showPattern && (
        <div className="dropdown-body">
          {patternList.map((pattern) => (
            <div key={pattern} className="filter-row">
              <div className="left">
                <input
                  type="checkbox"
                  id={pattern}
                  value={pattern}
                  onChange={handlePatternChange}
                  checked={selectedPatterns.includes(pattern)}
                />
                <label htmlFor={pattern} className="ms-2 label-text">{pattern}</label>
              </div>
              <div className="right">
                <span className="count">{products.filter((p) => p.pattern?.includes(pattern)).length}</span>
                <span className="item-arrow">›</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>

          <div className="col-8">
            <div className="d-flex justify-content-end my-3">
              <select
                className="sort-select"
                value={genreFilter}
                onChange={handleGenreFilter}
              >
                <option value="">Sort by price:</option>
                <option value="low">Price Low to High</option>
                <option value="high">Price High to Low</option>
              </select>
            </div>


            <div className="cards-container">
              {sortedProducts && sortedProducts.length > 0 ? (
                sortedProducts.map((v, i) => (
                  <Card key={i} className="card-custom mb-3 shadow-sm">
                    <Card.Img variant="top" src={v.img} />
                    <Card.Body className="card-body-custom">
                      <h5>{v.pname}</h5>

                      <p>Brand: {v.brand} </p>
                      <p className="price">₹{v.price}</p>
                      <p className="pattern">Pattern: {v.pattern?.join(", ")}</p>

                      <div className="btn-group">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handelDelete(v.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handelEdit(v.id)}
                        >
                          Edit
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <h2>No products found</h2>
              )}
            </div>

          </div>
        </Row>
      </Container>
    </>
  );
};

export default Men;




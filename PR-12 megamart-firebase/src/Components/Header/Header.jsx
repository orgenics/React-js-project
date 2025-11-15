import { Container, Navbar, Row } from "react-bootstrap";
import "./Header.css";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync } from "../../services/action/propertyauthAction";
const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const handleLogout = () => {
    dispatch(signOutAsync());
  };
  return (
    <>
      <Container>
        <Row className="header pb-3">
          <div className="col-4">
            <Link to="/" className="logo">
              <h1>megamart</h1>
            </Link>
          </div>

          <div className="col-4">
            <div className="search-button d-flex justify-content-center align-items-center mt-2 position-relative">
              <input
                type="text"
                className="search-input"
                placeholder="Search"
              />
              <img
                src="./src/img/search-interface-symbol.png"
                alt=""
                className="search-icon"
              />
            </div>
          </div>

          <div className="col-4 d-flex justify-content-end align-items-center">
            <Navbar.Text>
              {!user ? (
                <Link className="btn btn-warning" to={"/signIn"}>
                  SignIN
                </Link>
              ) : (
                <div>
                  <Link>{user.email}</Link>{" "}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </Navbar.Text>
            <div className="cart-button d-flex align-items-center mx-3 mt-2 ">
              <img
                src="./src/img/location.png"
                className="mx-2"
                alt=""
                height={20}
              />
              <img
                src="./src/img/user.png"
                alt=""
                className="mx-2"
                height={20}
              />
              <img
                src="./src/img/heart.png"
                alt=""
                className="mx-2"
                height={20}
              />
              <Link to={"/Addproduct"} className="btn btn-success btn-sm mx-2">
                Add
              </Link>
            </div>
          </div>
        </Row>
      </Container>
      <Container>
        <Row>
          <div className="cart-menu col-12 my-3 d-flex justify-content-center ">
            <div className="menu d-flex">
              <ul className="d-flex gap-4 pt-2 align-items-center">
                <Link to="/Men">
                  <li>Men</li>
                </Link>
                <Link to="/Women">
                  <li>Women</li>
                </Link>
                <Link to="/Kids">
                  <li>Kids</li>
                </Link>
                <li>Footwear</li>
                <li>Accessories</li>
                <li>Brands</li>
              </ul>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};
export default Header;

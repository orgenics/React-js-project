import { Container, Row } from "react-bootstrap";
import "./Banner.css";
const Banner = () => {
  return (
    <Container fluid>
      <Row>
        <div className="col-12 py-5">
          <div className="d-flex justify-content-center">
            <img
              src="./src/img/banner2.avif"
              alt="Website banner"
              className="img-fluid banner-image w-100"
            />
          </div>
        </div>
      </Row>
    </Container>
  );
};
export default Banner;

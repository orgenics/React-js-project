import { Container, Row } from 'react-bootstrap';

const Explore = () => {
    return (
        <div>
            <h1 style={{ textAlign: "center" }} className='py-3'>EXPLORE MORE</h1>
            <Container>
                <Row>
                    <div className="explore-img py-3 d-flex">
                        <div className="col-2">
                            <img src="./src/img/e1.png" alt="" />
                        </div>

                        <div className="col-2">
                            <img src="./src/img/e2.png" alt="" />
                        </div>

                        <div className="col-2">
                            <img src="./src/img/e3.png" alt="" />
                        </div>

                        <div className="col-2">
                            <img src="./src/img/e4.png" alt="" />
                        </div>

                        <div className="col-2">
                            <img src="./src/img/e5.png" alt="" />
                        </div>

                    </div>

                </Row>
            </Container>
        </div>
    )
};

export default Explore;

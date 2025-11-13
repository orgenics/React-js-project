import { Container, Row } from "react-bootstrap";
import './Footer.css'


const Footer = () => {
    return (
        <>
            <Container>
                <Row className="footer py-5">
                    <div className="col-3">
                        <div className="top-categores">
                            <h2>Top Categories</h2>
                            <ul className="list-unstyled my-3">
                                <li>Men</li>
                                <li>Women</li>
                                <li>Kids</li>
                                <li>Footwear</li>
                                <li>Innerwear</li>
                                <li>Accessories</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="top-brands">
                            <h2>Top Brands</h2>
                            <ul className="list-unstyled my-3">
                                <li>U.S.Polo Assn</li>
                                <li>Arrow</li>
                                <li>Flying Machine</li>
                                <li>Tommy Hilfiger</li>
                                <li>Calvin Klein</li>
                                <li>AD By Arvind</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="top-useful-link">
                            <h2>Useful Links</h2>
                            <ul className="list-unstyled my-3">
                                <li>About Us</li>
                                <li>Privacy Policy</li>
                                <li>Terms & Conditions</li>
                                <li>Returns and Cancellation policy</li>
                                <li>Help and FAQ's</li>
                                <li>Delivery and Shipping Policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="contect-us">
                            <h2>Contect Us</h2>
                            <div className="icons my-3">
                                <img src="./src/img/telephone.png" alt="" height={20} />
                                <span className="ms-2">+91 9740542174</span>
                            </div>
                            <div className="icons my-3">
                                <img src="./src/img/email.png" alt="" height={20} />
                                <span className="ms-2">care@megamartfashions.com</span>
                            </div>
                            <div className="icons my-3">
                                <img src="./src/img/message.png" alt="" height={25} />
                                <span className="ms-2">Message Us</span>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="col-12">
                        <div className="download">
                            <h2>DOWNLOAD THE APP</h2>
                            <img className="my-3 me-3" src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/google-play.png" alt="" />
                            <img className="ms-3" src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/app-stor.png" alt="" />
                            <hr style={{ width: "100%" }}></hr>
                        </div>
                        <div className="copy-right">
                            <p className="text-center" style={{ fontSize: "12px" , color:"#777"}}>@ 2022 Megamart. All Rights Reserved</p>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}
export default Footer;
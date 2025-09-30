import leaf1 from "../assets/image/leaf-1.png";
import leaf2 from "../assets/image/leaf-2.png";
import leaf3 from "../assets/image/leaf-3.png";
import reservationPizza from "../assets/image/reservation-pizza.png";
import bookJamun from "../assets/image/book-jamun.png";
import bookLeaf from "../assets/image/book-leaf.png";
import "./Reservation.css";

function Reservation() {
    return (
        <section className="reservation-part">
            <div className="form-main">
                {/* Left Side: Form */}
                <div className="main-section">
                    <div className="section-heading">
                        <h5 className="sub-title">Reservation</h5>
                        <h2>Book A Table Now!</h2>
                    </div>
                    <form className="main">
                        <div className="main-input">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Name*" required />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email*" required />
                            </div>
                        </div>
                        <div className="main-input">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Phone*" required />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Date*" required />
                            </div>
                        </div>
                        <div className="main-input">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Time*" required />
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" placeholder="Guests*" required />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-button">
                                <button className="btn-ct">BOOK NOW</button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Side: Pizza Image */}
                <div className="pizza-section">
                    <div className="reservation-pizza">
                        <div className="book-leaf book-leaf-1">
                            <img src={leaf1} alt="Leaf" />
                        </div>
                        <div className="book-leaf book-leaf-2">
                            <img src={leaf2} alt="Leaf" />
                        </div>
                        <div className="book-leaf book-leaf-3">
                            <img src={leaf3} alt="Leaf" />
                        </div>
                        <img src={reservationPizza} className="pizz-img" alt="Pizza" />
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="book-jamun">
                <img src={bookJamun} alt="Jamun" />
            </div>
            <div className="book-leaf-big">
                <img src={bookLeaf} alt="Leaf" />
            </div>
        </section>
    );
}

export default Reservation;

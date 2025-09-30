import allFoods from "../assets/image/all-kinds-of-foods.png";
import freshFoods from "../assets/image/fresh-foods.png";
import bestTaste from "../assets/image/best-taste.png";
import onTimeDelivery from "../assets/image/on-time-delivery.png";
import strengthVacter from "../assets/image/strength-vacter.png";
import "./Strength.css";

function Strength() {
    return (

        <section className="strength-part">
            <div className="container">
                <div className="text">
                    <div className="section-heading wow fadeInUp">
                        <h5 className="sub-title">Our Strength</h5>
                        <h2 className="sub-name">Why We Are The Best?</h2>
                    </div>
                    <div className="strength-vacter wow fadeInRight animation-delay-5">
                        <img src={strengthVacter} alt="Vacter Image" />
                    </div>
                </div>

                <div className="strength-main">
                    <div className="strength-box">
                        <div className="strength-icon">
                            <img src={allFoods} alt="All kinds of Foods" />
                        </div>
                        <div className="strength-content">
                            <h4 className="strength-title">All kinds of Foods</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                        </div>
                    </div>

                    <div className=" strength-box ">
                        <div className="strength-icon">
                            <img src={freshFoods} alt="Fresh Foods" />
                        </div>
                        <div className="strength-content">
                            <h4 className="strength-title">Fresh Foods</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                        </div>
                    </div>
                    <div className=" strength-box ">
                        <div className="strength-icon">
                            <img src={bestTaste} alt="Best Taste" />
                        </div>
                        <div className="strength-content">
                            <h4 className="strength-title">Best Taste</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                        </div>
                    </div>
                    <div className="strength-box">
                        <div className="strength-icon">
                            <img src={onTimeDelivery} alt="On Time Delivery" />
                        </div>
                        <div className="strength-content">
                            <h4 className="strength-title">On Time Delivery</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                        </div>
                    </div>
                </div>

            </div>

        </section>

    );
}

export default Strength;

import React, { useEffect } from "react";
import { WOW } from "wowjs";   // <- yaha { WOW } import karo
import "animate.css";
import "./homebanner.css";

// Image imports
import cartIcon from "../assets/image/cart-icon.png";
import mainPizza from "../assets/image/pizza-1.png";
import onion from "../assets/image/onion.png";
import pizzaSmall from "../assets/image/banner-img-bottom.png";

const HomeBanner = () => {
    useEffect(() => {
        new WOW().init();
    }, []);

    return (
        <section className="hero-section">
            <div className="container" style={{ paddingTop: '170px', paddingBottom: '170px', paddingLeft: '60px', paddingRight: '60px' }}>
                <div className="hero-text wow animate__animated animate__fadeInLeft">
                    <h1 className="wow animate__animated animate__fadeInLeft" data-wow-delay="0.2s">
                        Handmade, <br />
                        With an Extra <br />
                        Pinch of <span className="highlight">Love</span>
                    </h1>
                    <p className="wow animate__animated animate__fadeInUp" data-wow-delay="0.4s">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <button
                        className="order-btn wow animate__animated animate__bounceInUp"
                        data-wow-delay="0.6s"
                    >
                        ORDER NOW
                    </button>
                </div>

                <div className="hero-image">
                    <img
                        src={mainPizza}
                        alt="Main Pizza"
                        className="main-pizza wow animate__animated animate__fadeInRight"
                        data-wow-delay="0.4s"
                    />
                    <img
                        src={onion}
                        alt="Onion Slice"
                        className="onion wow animate__animated animate__fadeInDown"
                        data-wow-delay="0.8s"
                    />
                    <img
                        src={pizzaSmall}
                        alt="Small Pizza"
                        className="pizza-small wow animate__animated animate__fadeInUp"
                        data-wow-delay="1s"
                    />
                </div>
            </div>
        </section>
    );
};

export default HomeBanner;

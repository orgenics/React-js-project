import React, { useEffect } from "react";
import { WOW } from "wowjs/dist/wow";
import "animate.css/animate.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Daily.css";

// Image imports
import PizzaImg from "../assets/image/daily-fresh.png";
import GarlicImg from "../assets/image/daily-fresh-vacter.png";

export default function PizzaSection() {
    useEffect(() => {
        new WOW().init();
    }, []);

    return (
        <section className="pizza-section container-fluid py-5 px-4">
            <div className="row align-items-center gx-0">
                {/* Left pizza image */}
                <div className="col-md-5 pizza-img">
                    <img
                        src={PizzaImg}
                        alt="Pizza Plate"
                        className="img-fluid pizza-image wow animate__animated animate__fadeInLeft"
                        data-wow-delay="0.3s"
                    />
                </div>

                {/* Pizza text */}
                <div className="col-md-4 text-start pizza-text">
                    <h2
                        className="fw-bold mb-3 wow animate__animated animate__fadeInUp"
                        data-wow-delay="0.5s"
                    >
                        Daily fresh and <br /> always tasty
                    </h2>
                    <p
                        className="text-muted fs-5 wow animate__animated animate__fadeInUp"
                        data-wow-delay="0.7s"
                    >
                        There are many variations of passages of Lorem Ipsum available, but
                        the majority haved
                    </p>
                </div>

                {/* Garlic image */}
                <div className="col-md-3 text-center">
                    <img
                        src={GarlicImg}
                        alt="Garlic"
                        className="img-fluid garlic-img wow animate__animated animate__fadeInRight"
                        data-wow-delay="0.9s"
                    />
                </div>
            </div>
        </section>
    );
}

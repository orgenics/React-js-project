import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OurStory.css";

import ourStoryImg from "../assets/image/our-story.png";
import onionImg from "../assets/image/onion.png";
import leafImg from "../assets/image/black-jamun.png";

export default function OurStory() {
    return (
        <section className="pizzon-section py-5">
            <div className="container">
                <div className="row align-items-center">
                    {/* Left Pizza Image */}
                    <div className="col-md-6 text-center text-md-start">
                        <div className="pizza-wrapper position-relative d-inline-block">
                            <img
                                src={ourStoryImg}
                                alt="Pizza"
                                className="img-fluid pizza-img"
                            />

                            {/* Onion decoration */}
                            <img
                                src={onionImg}
                                alt="Onion"
                                className="decor onion"
                            />

                            {/* Leaf decoration */}
                            <img
                                src={leafImg}
                                alt="Leaf"
                                className="decor leaf"
                            />
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="col-md-6 main-content mt-4 mt-md-0">
                        <p className="sub-heading">Our Story</p>
                        <h2 className="main-heading">
                            The Pizzon Has <br /> Excellent Of Quality Foods
                        </h2>
                        <p className="description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book. It has survived not
                            only five centuries, but also the leap into electronic typesetting,
                            remaining essentially unchanged.
                        </p>
                        <a href="#" className="btn custom-btn">
                            READ MORE
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

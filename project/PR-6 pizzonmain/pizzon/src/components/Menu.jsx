import React, { useEffect } from 'react';
import { WOW } from 'wowjs';
import 'animate.css';
import './Menu.css';

import pizza1 from '../assets/image/pizza-1.png';
import pizza2 from '../assets/image/pizza-2.png';
import pizza3 from '../assets/image/pizza-3.png';

const pizzas = [
    { title: "Veggie pizza", price: "$25.00", image: pizza1 },
    { title: "Shrimp pizza", price: "$35.00", image: pizza2 },
    { title: "Seafood pizza", price: "$65.00", image: pizza3 }
];

const MenuSection = () => {
    useEffect(() => {
        new WOW().init();
    }, []);

    return (
        <section className="container main-section py-5">
            <div className="d-flex align-items-center flex-wrap mb-5">
                <div>
                    <p className="text-danger fw-semibold subtitle d-flex align-items-center wow animate__animated animate__fadeInDown" data-wow-delay="0.2s">
                        Popular Dishes <span className="red-line ms-2"></span>
                    </p>
                    <h1 className="fw-bold wow animate__animated animate__fadeInUp" data-wow-delay="0.4s">
                        Browse Our Menu
                    </h1>
                </div>
            </div>

            {/* Cards */}
            <div className="row justify-content-center g-4">
                {pizzas.map((pizza, index) => (
                    <div className="col-md-4" key={index}>
                        <div
                            className="card border-1 p-3 menu-card h-100 wow animate__animated animate__zoomIn"
                            data-wow-delay={`${0.2 * (index + 1)}s`}  // delay per card
                        >
                            <img src={pizza.image} className="menu-image mx-auto mb-3" alt={pizza.title} />
                            <div>
                                <div className="d-flex justify-content-between mb-2">
                                    <h5 className="fw-semibold mb-0">{pizza.title}</h5>
                                    <span className="text-danger fw-bold">{pizza.price}</span>
                                </div>
                                <div className="text-warning mb-2">★★★★★</div>
                                <p className="text-muted small mb-3">
                                    All the Lorem Ipsum generators on to Internet tend to repeat
                                </p>
                                <button className="btn btn-warning rounded-pill fw-semibold px-4">ORDER NOW</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MenuSection;

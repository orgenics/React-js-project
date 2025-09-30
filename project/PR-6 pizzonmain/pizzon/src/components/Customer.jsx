import { useState, useEffect } from "react";
import './Customer.css'
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

import client1 from "../assets/image/client-1.jpg";
import client2 from "../assets/image/client-2.jpg";
import client3 from "../assets/image/client-3.jpg";
import leaf from "../assets/image/leaf.png";

function Feedback() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    let feed = [
        { img: client1, name: "Johan Doe", text: "“Lorem Ipsum is simply dummy text of the print book. It has survived not only five centuries, but also the leap”" },
        { img: client2, name: "Alex Saanu", text: "“Lorem Ipsum is simply dummy text of the print book. It has survived not only five centuries, but also the leap”" },
        { img: client3, name: "Takar Bowa", text: "“Lorem Ipsum is simply dummy text of the print book. It has survived not only five centuries, but also the leap”" },
    ];

    // ✅ अगर mobile है तो सिर्फ पहला ही दिखाना
    if (isMobile) {
        feed = [feed[0]];
    }

    return (
        <section className='feedback'>
            <div className="feedback-img d-none d-md-none d-lg-none d-xl-none d-xl-flex d-xxl-flex d-lg-block">
                <img src={leaf} alt="leaf" />
            </div>
            <div className="container">
                <div className="col-12 d-flex justify-content-between pb-5">
                    <div className="title1">
                        <h4 className='feed-title text-danger '>Customer Feedback</h4>
                        <h2 className='mb-5 fs-1'>Client Testimonials</h2>
                    </div>
                    <span className='d-flex justify-content-end text-warning'>
                        <BsArrowLeftCircleFill /> &nbsp;
                        <BsArrowRightCircleFill />
                    </span>
                </div>
                <div className="feedback2">
                    <div className="row justify-content-center">
                        {feed.map((v, i) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-5" key={i}>
                                <div className="feed-box">
                                    <div className="feed-img">
                                        <img src={v.img} alt={v.name} />
                                    </div>
                                    <div className="feed-info">
                                        <h4 className='mt-4 mb-3'>{v.name}</h4>
                                        <p className='mb-3 fs-5' style={{ color: '#777777' }}>{v.text}</p>
                                        <ul className='breadcrumb text-warning mb-3 d-flex justify-content-center'>
                                            <FaStar /> &nbsp;
                                            <FaStar /> &nbsp;
                                            <FaStar /> &nbsp;
                                            <FaStar /> &nbsp;
                                            <FaStar />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Feedback;

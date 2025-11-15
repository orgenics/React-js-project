import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Slider.css'
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';


const Slider = () => {
    return (
        <div className="home-slider">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
            >

                <SwiperSlide>
                    <div className="banner">
                        <img src="./src/img/14.png" alt="Banner 1" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="banner">
                        <img src="./src/img/15.png" alt="Banner 2" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="banner">
                        <img src="./src/img/16.png" alt="Banner 3" />
                    </div>
                </SwiperSlide>

            </Swiper>
            
        </div>
    
    );
};

export default Slider;

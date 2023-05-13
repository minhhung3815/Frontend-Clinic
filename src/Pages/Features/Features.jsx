import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import './Features.css';

const Features = (props) => {

    const { title, description, img } = props.feature;
    useEffect(() => {
        AOS.init({
                duration: 2000,
            });
        AOS.refresh();
      }, []);

    return (
        <div>
            <div className="single-feature-box" data-aos="fade-right">
                <div className="icon-box">
                    <img src={img} alt="" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            </div>
    );
};

export default Features;

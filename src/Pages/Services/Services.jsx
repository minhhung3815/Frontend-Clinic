import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from 'react';
import './Services.css';

const Services = (props) => {

    const {title, description, link, img} = props.treatment;
    useEffect(() => {
        AOS.init({
                duration: 2000,
            });
        AOS.refresh();
      }, []);
    return (
        <>
            <div>
                <div className="single-service-box" data-aos="flip-left">
                    <div className="service-icon">
                        <img src={img} alt="" />
                    </div>
                    <h3 >{title}</h3>
                    <p style={{width:'80%'}}>{description}</p>
                    <a href=".#">{link}</a>
                </div>
            </div>
        </>
    );
};

export default Services;
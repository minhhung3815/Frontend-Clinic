import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import promoBanner from 'Assets/Images/doctor-nurse.png';
import './Promo.css';

const Promo = () => {
    return (
        <section className="promo-wrapper" style={{backgroundColor:'cadetblue', display:'flex', flexDirection:'row-reverse'}}>
            <Container>
                <div className="align-items-center" style={{display:'flex', alignItems:'center'}}>
                    <div md={12} sm={12} lg={6}>
                        <div className="promo-content text-white text-start">
                            <h1 style={{width:'50%'}} className="mt-sm-req">Request your appointment and start your smile makeover!</h1>
                            <Link to="/login"><button href=".#" className="theme-btn btn-fill mt-4">Request Appointment</button></Link>
                        </div>
                    </div>
                    <div md={12} sm={12} lg={6}>
                        <div className="promo-banner">
                            <img src={promoBanner} alt="" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
        
    );
};

export default Promo;
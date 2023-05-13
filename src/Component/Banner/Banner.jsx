import "@fontsource/josefin-sans";
import {  Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import doctorfinding from 'Assets/Images/doctorfinding.c2532ac3.png';
import heroTeeth from 'Assets/Images/hero-theeth.54c2c4e9.png';
import womanbrush from 'Assets/Images/woman-brush.c4158ac5.png';
import './Banner.css';
import{Button} from 'antd'


const Banner = () => {
    return (
            <section className="single-hero-slide text-white d-flex justify-content-center align-items-center" style={{backgroundColor:'cadetblue'}}>
                <Container style={{display:'flex', flexDirection:'row-reverse'}}>
                    <div style={{display:'flex'}}>
                        <div>
                            <div className="hero-slide-left justify-content-end align-items-center text-center text-lg-start" style={{textAlign:'start'}}>
                                <h2>Better Life Through</h2>
                                <h1>Better Dentistry</h1>
                                <p className="mb-xs-2" style={{width:'70%'}}>Join us to a fun and friendly dental environment. Our professionals are working so hard to see smile on your face that you deserve! We are dedicated about our duties.</p>
                                <div className="banner-btn m-sm-auto">
                                    <Link to="/login"><Button type="primary" danger className="button">Appoinment</Button></Link>
                                    <button className='theme-btn bth-blank'>Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="hero-slide-right text-center text-lg-start mt-sm-5">
                                <div className="animate-img">
                                    <img src={womanbrush} alt="" className="img-fluid aimg1" />
                                    <img src={doctorfinding} alt="" className="img-fluid aimg2" />
                                </div>
                                <img src={heroTeeth} alt="" className="heroTeeth"/>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
    );
};

export default Banner;
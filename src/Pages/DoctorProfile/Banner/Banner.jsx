import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import brushMan from 'Assets/Images/brushman.png';
import HeroMainbg from 'Assets/Images/hero-main-bg.png';
import injectTool from 'Assets/Images/inject-tool.png';
import inject from 'Assets/Images/injection.png';
import staircaseMan from 'Assets/Images/staircase.png';
import './Banner.css'
const Banner = () => {
    return (
        <section className="banner-all text-white" style={{backgroundColor:'cadetblue', display:'flex', justifyContent:'center'}}>
            <Container>
                <Row className="align-items-center">
                    <Col md={6} lg={6} sm={12}>
                        <div className="section-title">
                            <h1>Dr. Nathan Currie</h1>
                        </div>
                        <div className="breadcrumb-nav">
                            <a href="/" className="text-decoration-none text-white">Home Page</a>
                            <span href="/" className="text-decoration-none text-white ml-2">Dr. Nathan Currie</span>
                        </div>
                    </Col>
                    <Col md={6} lg={6} sm={12}>
                        <div className="hero-slide-right text-start">
                            <div className="banner-animate">
                                <img src={HeroMainbg} alt="" className="img-fluid" />
                                <img src={staircaseMan} alt="" className="img-fluid a2" />
                                <img src={brushMan} alt="" className="img-fluid a3" />
                                <img src={inject} alt="" className="img-fluid a4" />
                                <img src={injectTool} alt="" className="img-fluid a5" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Banner;
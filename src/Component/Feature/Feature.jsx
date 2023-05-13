import { Container, Row } from "react-bootstrap";
import { FakeFeatures } from "./Features";
import Features from "Pages/Features/Features";

const Feature = () => {
    return (
        <section className="feature-wrapper">
            {/* <Container> */}
                <div className="g-3" style={{display:'flex', justifyContent:'space-evenly'}}>
                        {
                            FakeFeatures.map(feature => (
                                <Features key={feature.id} feature={feature}></Features>
                            ))
                        }
                </div>
            {/* </Container> */}
        </section>
    );
};

export default Feature;
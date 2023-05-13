import React from 'react';
import { FakeService } from './Treatment';
import Services from 'Pages/Services/Services';

const Service = () => {
    return (
        <section className="service-wrapper">
            <div >
                <div style={{fontSize:'35px'}}>
                    <h1>Treatments</h1>
                </div>
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly', alignItems:'center', marginLeft:'80px'}}>
                    {
                        FakeService.map(treatment => (
                            <Services key={treatment.id} treatment={treatment} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Service;
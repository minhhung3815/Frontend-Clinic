import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';
import './SingleDoctors.css'
const SingleDoctor = (props) => {
  const { avatar, name, description, _id } = props.doctor;
  return (
    <div className="single-feature-box sigle-doctor">
      <div className="doctors-profile" data-aos="fade-down">
        <img src={avatar?.url} alt="" />
      </div>
      <div className="doctors-info" data-aos="fade-left">
        <h3 className="mb-0">
          <a href=".#">{name}</a>
        </h3>
        {/* <span>{status}</span> */}
      </div>
      <div>
        <Button type="text" style={{ color: "black" , display:'flex', alignItems:'center'}}>
          <NavLink to={`/doctors/${_id}`}>More Info</NavLink>
          <ArrowRightOutlined style={{marginLeft:'10px'}}/>
        </Button>
        
      </div>
    </div>
  );
};

export default SingleDoctor;

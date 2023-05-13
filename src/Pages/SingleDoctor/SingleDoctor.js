import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';
import './SingleDoctors.css'
const SingleDoctor = (props) => {
  const { avatar, name, description, _id } = props.doctor;
  return (
    // <div className="text-center border shadow-sm p-4 rounded-md">
    //   <img
    //     className="w-full border ring-1 rounded-lg mx-auto"
    //     src={avatar?.url}
    //     alt=""
    //   />
    //   <div className="py-5">
    //     <h2 className="primary-color font-bold">{name}</h2>
    //     <h2>{description}</h2>
    //     <div>
    //       <Button type="text" style={{ color: "black" }}>
    //         <NavLink to={`/doctors/${_id}`}>More Info</NavLink>
    //       </Button>
    //     </div>
    //   </div>
    // </div>
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
        <Button type="text" style={{ color: "black" }}>
          <NavLink to={`/doctors/${_id}`}>More Info</NavLink>
          <ArrowRightOutlined/>
        </Button>
        
      </div>
    </div>
  );
};

export default SingleDoctor;

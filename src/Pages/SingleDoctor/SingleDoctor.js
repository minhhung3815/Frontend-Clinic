import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

const SingleDoctor = (props) => {
  const { avatar, name, description, _id } = props.doctor;
  return (
    <div className="text-center border shadow-sm p-4 rounded-md">
      <img
        className="w-full border ring-1 rounded-lg mx-auto"
        src={avatar?.url}
        alt=""
      />
      <div className="py-5">
        <h2 className="primary-color font-bold">{name}</h2>
        <h2>{description}</h2>
        <div>
          <Button type="text" style={{ color: "black" }}>
            <NavLink to={`/doctors/${_id}`}>More Info</NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleDoctor;

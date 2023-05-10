import React, { useEffect, useState } from "react";
import SingleDoctor from "../SingleDoctor/SingleDoctor";
import { Button } from "antd";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { useNavigate, NavLink } from "react-router-dom";

const MeetDoctorSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getDoctor = async () => {
      try {
        const response = await axiosPrivate.get("/user/account/doctor", {
          signal: controller.signal,
        });
        isMounted && setDoctors(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getDoctor();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl md:text-5xl pb-4 md:py-8 text-center primary-color font-bold">
        Meet Our Doctors
      </h2>
      <p className="text-justify px-5 md:px-0 md:text-center text-xl md:w-2/3 mx-auto mb-12">
        Our administration and support staff all have exceptional people skills
        and trained to assist you with all medical enquiries.
      </p>
      <div className="grid grid-cols-1 m-5 md:m-0 md:grid-cols-4 gap-8">
        {doctors.slice(0, 4).map((doctor) => (
          <SingleDoctor key={doctor._id} doctor={doctor}></SingleDoctor>
        ))}
      </div>
      <div className="text-center py-12">
        <Button
          type="default"
          style={{
            background: "#e1f1fd",
            fontSize: 20,
            color: "#4663ac",
            fontWeight: "bold",
          }}
          size="large"
        >
          <NavLink to={`/doctors`}>All Doctors Profile</NavLink>
        </Button>
      </div>
    </div>
  );
};

export default MeetDoctorSection;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Banner from "./Banner/Banner";
import Details from "./Details/Details";
function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState("");
  useEffect(() => {}, []);
  return (
    <>
    <Banner></Banner>
    <Details></Details>
    </>
  );
}

export default DoctorDetail;

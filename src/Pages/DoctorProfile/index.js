import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState("");
  useEffect(() => {}, []);
  return (
    <div style={{ color: "black" }}>
      <h1>{doctor?.name}</h1>
      <p>Price: ${doctor.staff}</p>
      <p>{doctor.address}</p>
    </div>
  );
}

export default DoctorDetail;

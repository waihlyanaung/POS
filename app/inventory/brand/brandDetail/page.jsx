"use client"
import { get } from "@/app/Global/api/inventory";

import React, { useState, useEffect } from "react";


const page = ({id}) => {
 
 
    const [brandData, setBrandData] = useState([]);
    
    useEffect(() => {
      get(`/brand/${id}`)
        .then((response) => {
          console.log(response);
          setBrandData(response.data);
        })
        .catch((error) => {
          console.error("GET Error:", error);
        });
    }, [id]);
    


  return (
    <div>
      
      <p>Company: {brandData?.company}</p>
      <p>Agent: {brandData?.agent}</p>
      <p>Phone Number: {brandData?.phone_no}</p>
    
    </div>
  );
};
  

export default page;
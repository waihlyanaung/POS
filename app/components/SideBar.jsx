"use client"

import Body from "./SideBar/Body";
import Foot from "./SideBar/Foot";
import Head from "./SideBar/Head";
import Profile from "./SideBar/Profile";

const SideBar = () => {
  return (
    <div className='flex flex-col h-full '>
      <div >
        <Head />
      </div>
      <div className='h-3/6'>
        <Body />
      </div>
      {/* <div className='h-2/6 h'>
        <Foot />
      </div> */}
     
    </div>
  );
};

export default SideBar;
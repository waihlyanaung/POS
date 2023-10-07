"use client";

import doc from "@/public/doc.gif";
import Image from "next/image";
import { BiLogOutCircle } from "react-icons/bi";
const Foot = () => {
  return (
    <div className='flex flex-col justify-around h-full items-start'>
      <Image className="w-full" src={doc} alt="doc" />
      <button className='flex gap-2 items-center text-zinc-500 bg-purple-100 px-5 py-2 hover:text-zinc-600 hover:bg-purple-200 transition duration-150 rounded-r-xl'>
        Log Out <BiLogOutCircle />
      </button>
    </div>
  );
};

export default Foot;

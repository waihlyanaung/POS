"use client";

import Link from "next/link";
import { MdCookie } from "react-icons/md";

const Head = () => {
  return (
    <div className="px-10 flex flex-col items-start h-full justify-center gap-5 border-b rounded-md">
      {/* <Link href="/category">
        <div className="text-3xl p-2 bg-[#7522e9] rounded-lg text-white">
          <MdCookie />
        </div>
      </Link> */}
      <span className="font-semibold text-neutral-500">Point of sale</span>
    </div>
  );
};

export default Head;

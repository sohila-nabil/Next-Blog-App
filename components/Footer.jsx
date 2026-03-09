import { assets } from "../Assets/assets";
import Image from "next/image";
export default function Footer() {
  return (
    <div className="flex flex-col justify-around gap-2 sm:gap-0 sm:flex-row items-center bg-black py-5 mt-10">
        <Image src={assets.logo_light} alt="logo" width={120} />
        <p className="text-white text-sm">Copyright © 2024 BlogApp. All rights reserved.</p>
        <div className="flex gap-4">
            <Image src={assets.facebook_icon} alt="facebook" width={40} />
            <Image src={assets.twitter_icon} alt="twitter" width={40} />
            <Image src={assets.googleplus_icon} alt="googleplus" width={40} />
        </div>
     
    </div>
  );
}

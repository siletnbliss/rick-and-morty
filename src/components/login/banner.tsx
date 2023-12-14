import Image from "next/image";
import React from "react";
function LoginBanner() {
  return (
    <div className="w-full h-full">
      <Image
        className="object-cover rounded-r bg-repeat"
        src="/login/banner-2.jpg"
        fill
        quality={100}
        alt="space banner"
      />
    </div>
  );
}

export default LoginBanner;

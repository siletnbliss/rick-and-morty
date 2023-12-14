"use client";

import React from "react";
import { motion } from "framer-motion";
import { Logo } from "../ui/logo";
import { CardDescription, CardTitle } from "../ui/card";

export function LoginHeader() {
  return (
    <>
      <div className="mb-12">
        <Logo size={75} />
      </div>
      <motion.div
        animate={{
          y: [-20, 0],
          opacity: [0, 1],
          transition: {
            ease: "easeIn",
          },
        }}
      >
        <CardTitle>
          <div className="mb-2">Welcome to all things Rick and Morty.</div>
        </CardTitle>
        <CardDescription>
          {`Log in to find all the info you need about everyone's favorite TV
          show.`}
        </CardDescription>
      </motion.div>
    </>
  );
}

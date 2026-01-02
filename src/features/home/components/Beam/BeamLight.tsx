"use client"
import { motion } from "framer-motion";

function BeamLight() {
  const width = 500;
  const height = 500;
  const path = "M250 400H451V250";

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="-z-10 absolute right-[260px] top-[190px] lg:block"
      fill="none"
    >
      <defs>
        <linearGradient id="beamGradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#194993" />
          <stop offset="100%" stopColor="#0065FF" />
        </linearGradient>
      </defs>

      <motion.path
        d={path}
        stroke="url(#beamGradient)"
        strokeWidth={2}
        fill="none"
        strokeDasharray="200 800"
        initial={{ strokeDashoffset: 800 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </svg>
  );
}

export default BeamLight;

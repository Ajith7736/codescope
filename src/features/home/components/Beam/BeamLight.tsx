"use client"
import { useTheme } from "next-themes"



function BeamLight() {

  const { resolvedTheme } = useTheme();


  return (
    <> {resolvedTheme === "dark" ? <svg width="400" height="300" className="-z-10 absolute xss:hidden right-[200px] top-[189px] lg:block beam-light" viewBox="0 0 429 378" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_dddddd_1_2)">
        <path d="M113.46 263.46H314.46V113.46" stroke="#2B7FFF" />
      </g>
      <defs>
        <filter id="filter0_dddddd_1_2" x="0" y="0" width="428.421" height="377.421" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="1.35072" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="2.70144" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_1_2" result="effect2_dropShadow_1_2" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="9.45504" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect2_dropShadow_1_2" result="effect3_dropShadow_1_2" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="18.9101" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect3_dropShadow_1_2" result="effect4_dropShadow_1_2" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="32.4173" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect4_dropShadow_1_2" result="effect5_dropShadow_1_2" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="56.7302" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect5_dropShadow_1_2" result="effect6_dropShadow_1_2" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_1_2" result="shape" />
        </filter>
      </defs>
    </svg> : <svg width="400" height="300" className="-z-10 absolute xss:hidden right-[200px] top-[189px] lg:block beam-light" viewBox="0 0 429 378" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_dddddd_1_2)">
        <path d="M113.46 263.46H314.46V113.46" stroke="#2B7FFF" />
      </g>
    </svg> 
    }
    </>
  )
}

export default BeamLight

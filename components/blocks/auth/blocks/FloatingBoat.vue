<template>
  <div>
    <div class="boat">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 204.04 144.29"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="142.85"
            y1="103.82"
            x2="142.85"
            y2="7.8"
            gradientTransform="translate(-79.06 -9.19) rotate(0.43)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#e6e7e8" />
            <stop offset="0.03" stop-color="#e8e9ea" />
            <stop offset="0.22" stop-color="#f5f6f6" />
            <stop offset="0.47" stop-color="#fdfdfd" />
            <stop offset="1" stop-color="#fff" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-2"
            x1="187.87"
            y1="58.81"
            x2="253.88"
            y2="58.81"
            gradientTransform="translate(-79.06 -9.19) rotate(0.43)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#fff" />
            <stop offset="1" stop-color="#e6e7e8" />
          </linearGradient>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <polygon
              class="cls-1"
              points="0 95.21 47.65 143.58 48.01 95.57 0 95.21"
            />
            <polygon
              class="cls-2"
              points="143.67 144.29 47.65 143.58 48.01 95.57 143.67 144.29"
            />
            <polygon
              class="cls-3"
              points="143.67 144.29 174.03 96.51 48.01 95.57 143.67 144.29"
            />
            <polygon
              class="cls-1"
              points="204.04 96.73 143.67 144.29 174.03 96.51 204.04 96.73"
            />
            <polygon
              class="cls-4"
              points="108.74 0 108.02 96.02 18 95.34 108.74 0"
            />
            <polygon
              class="cls-5"
              points="108.69 6 120.02 96.11 174.03 96.51 108.69 6"
            />
            <polygon
              class="cls-6"
              points="108.74 0 108.02 96.02 120.02 96.11 108.74 0"
            />
          </g>
        </g>
      </svg>
    </div>
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 585.87 237.15"
      class="hover-up-down"
    >
      <defs>
        <style>
          .cls-rock-1 {
            fill: #876f6f;
          }
          .cls-rock-2 {
            fill: #fff;
          }
          .cls-rock-2,
          .cls-rock-4 {
            opacity: 0.3;
          }
          .cls-rock-3 {
            opacity: 0.2;
          }
          .cls-rock-5 {
            opacity: 0.05;
          }
          .cls-rock-6 {
            fill: #4181ae;
          }
        </style>
      </defs>
      <title>waterberg</title>
      <polygon
        class="cls-rock-1"
        points="0 30.9 26.53 79.24 170.56 169.47 267.48 237.15 390.54 218.48 490.53 203.31 585.87 17.47 0 30.9"
      />
      <polygon
        class="cls-rock-2"
        points="0 30.9 26.53 79.24 185.18 125.97 236.74 49.43 0 30.9"
      />
      <polygon
        class="cls-rock-3"
        points="236.74 49.43 185.18 125.97 267.48 237.15 303.37 30.9 236.74 49.43"
      />
      <polygon
        class="cls-rock-3"
        points="26.53 79.24 185.18 125.97 170.56 169.47 26.53 79.24"
      />
      <polygon
        class="cls-rock-2"
        points="385.37 149.6 420.44 30.9 303.37 30.9 385.37 149.6"
      />
      <polygon
        class="cls-rock-4"
        points="267.48 237.15 385.37 149.6 490.53 203.31 267.48 237.15"
      />
      <polygon
        class="cls-rock-5"
        points="267.48 237.15 303.37 30.9 385.37 149.6 267.48 237.15"
      />
      <polygon
        class="cls-rock-3"
        points="420.44 30.9 385.37 149.6 585.87 17.47 420.44 30.9"
      />
      <polygon
        class="cls-rock-6"
        points="585.87 17.47 420.44 30.9 303.37 30.9 236.74 49.43 0 30.9 86.72 0 550.95 2.42 585.87 17.47"
      />
    </svg>
  </div>
</template>
<style lang="scss">
// COLOR VARIABLES
$c-01: #72bfd1; // Blue
$c-02: #d81e56; // White
$c-03: rgba($c-02, 0.6); // Baby Blue

// SIZE VARIABLES
$width--lg: 100px; // Resize boat by editing only this variable
$width--sm: round($width--lg * 0.67);
$half--sm: round($width--sm / 2);
$border: ($width--lg / 100);

// ILLUSTRATION
.boat {
  animation: sail_away 5s ease-in-out infinite alternate;
}
.cls-1 {
  fill: #e81e49;
}
.cls-2 {
  fill: #bb1f3f;
}
.cls-3 {
  fill: #db1f56;
}
.cls-4 {
  fill: url(#linear-gradient);
}
.cls-5 {
  fill: url(#linear-gradient-2);
}
.cls-6 {
  fill: #a4a4a4;
}
@keyframes sail_away {
  0% {
    transform: rotate(0deg) translate(0px);
  }
  50% {
    transform: rotate(2deg) translate(20px);
  }
  100% {
    transform: rotate(-3deg) translate(-10px);
  }
}
.hover-up-down {
  animation: hover-up-down 5s infinite alternate;
}
@keyframes hover-up-down {
  0% {
    transform: translate(20px) translateY(-5px);
  }
  50% {
    transform: translate(-25px) translateY(-10px) rotate(2deg);
  }
  100% {
    transform: translate(0px) translateY(-5px);
  }
}
</style>

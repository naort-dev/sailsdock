<template>
  <b-container class="loading-wrapper text-center h-100">
    <b-row class="justify-content-center h-100">
      <b-col align-self="center" sm="4">
        <svg class="ui-boat" width="100" viewBox="0 0 204.04 144.29">
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
        <div class="ui-waves">
          <svg class="ui-wave-one">
            <g>
              <polyline id="ui-wave-polyline" />
            </g>
          </svg>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { TweenMax, TweenLite, Sine } from 'gsap'
export default {
  mounted() {
    TweenLite.defaultEase = Sine.easeInOut
    TweenLite.set('#ui-wave-polyline', { y: 5, x: 75 })
    const svg = document.querySelector('.ui-wave-one')
    const wave = document.querySelector('#ui-wave-polyline')
    const width = 150

    const amplitude = 5
    const frequency = 10
    const segments = 50
    const interval = width / segments

    for (let i = 0; i < segments; i++) {
      const norm = i / segments
      const point = wave.points.appendItem(svg.createSVGPoint())

      point.x = i * interval
      point.y = amplitude / 2

      TweenMax.to(point, 1.5, { y: -point.y, repeat: -1, yoyo: true }).progress(
        norm * frequency
      )
    }
  }
}
</script>

<style lang="scss">
.loading-wrapper {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
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
.ui-waves {
  width: 100%;
  margin: auto;
}
.ui-wave-one {
  height: 2rem;
  fill: #64c6ff;
}
#ui-wave-polyline {
  fill: none;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #a8d1ef;
}
.ui-boat {
  animation: sail_away 5s ease-in-out infinite alternate;
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
}
</style>

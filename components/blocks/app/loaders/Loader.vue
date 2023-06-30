<template>
  <transition-group name="fade">
    <div v-if="$store.state.loader" :key="1" class="loading-wrapper zoom-in">
      <div :style="styles" class="rotate-logo-wrapper">
        <svg
          id="Layer_1"
          class="rotate-logo"
          fill="white"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 636.34 642.58"
        >
          <path
            class="spinner"
            d="M356.2,199.28C304,182.74,241.53,177,203.87,179.19c-67.3,4-153.16,39.43-187.48,108.81-5.44,11-29.6,59.85-6.7,92.07C24.42,400.77,55.32,410,80,405.18c30.19-5.92,33.26-29.42,82-50.22,12-5.11,37.09-15.82,45.2-6.7,5.74,6.46.25,20.07-1.67,25.11-22.9,59.9-8.86,144.35-6.7,157.35,4.32,26,14.27,85.85,60.26,105.46,34.56,14.74,80.77,3.05,103.79-25.11,4.36-5.33,15.44-20.48,16.74-78.67,2-91-22.91-151.27-5-160.7,5.74-3,12.89.77,18.41,3.35,54,25.19,134.23,17.36,177.44-8.37,29.69-17.69,71.32-56.34,65.28-100.44-5.26-38.39-43.44-59.34-45.2-60.26-22.61-12-48.55-9.1-100.43-3.35-42,4.65-58.32,11.12-92.07,6.7C378.5,206.76,365.13,202.11,356.2,199.28Z"
          />
          <path
            d="M385,.09c41.28,2.1,72.9,42.7,73.55,82.3.81,49.34-46.46,95.37-92.82,87.56-36.26-6.1-61.66-43.42-63-78.8C300.87,45.91,338.14-2.3,385,.09Z"
          />
        </svg>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '100px'
    },
    background: {
      type: String,
      default: '#13171c'
    },
    duration: {
      type: String,
      default: '3.2s'
    }
  },
  computed: {
    styles() {
      return {
        backgroundColor: this.background,
        width: this.size,
        height: this.size,
        animationDuration: this.duration
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 1000;
  width: 100%;
  background: white;
}
.rotate-logo-wrapper {
  animation: rotate-logo-wrapper 5s infinite;
  will-change: transform;
  @keyframes rotate-logo-wrapper {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(360deg) scale(0.5);
      border-radius: 50%;
    }
    75% {
      transform: rotate(180) scale(2.5);
    }
    100% {
      transform: rotate(0deg);
    }
  }
}
.rotate-logo {
  animation: rotate-logo 5s infinite;
  will-change: transform;
  @keyframes rotate-logo {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    25% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    50% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
    75% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
  }
}
.spinner {
  padding: 5px;
  display: inline-block;
  animation: rotateplane 3.2s infinite ease-in-out;
}
@keyframes rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  25% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  75% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
}
</style>

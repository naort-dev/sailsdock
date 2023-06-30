<template>
  <div class="loading-wrapper zoom-in child-key-right-in">
    <div :style="styles" class="rotate-logo-wrapper">
      <svg
        id="Layer_1"
        width="80px"
        height="80px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 200.6 232"
        style="enable-background:new 0 0 200.6 232;"
        xml:space="preserve"
      >
        <path
          class="st0-logo"
          d="M114.2,220.3V0.4c0,0-73.8,35.1-107.3,107.6c-19.3,41.7,4.9,107.3,11.7,124c25.2-7.3,57.3-11.7,92.3-11.7
	C112,220.3,113.1,220.3,114.2,220.3z"
        />
        <path
          class="st0-logo"
          d="M179.7,151.5c-24.2-38.1-55-49-55-49l1.5,118.1c27.9,1,53.4,4.9,74.4,10.7C200.7,218.5,199,182.1,179.7,151.5z"
        />
      </svg>
    </div>
  </div>
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
      default: '#65c5ff'
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
.st0-logo {
  fill: #fff;
}
.st1-logo {
  fill: #65c5ff;
}
.loading-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 1000;
  width: 100%;
  top: 0;
}
.rotate-logo-wrapper {
  align-self: center;
  width: 100%;
  height: 100%;
  text-align: center;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
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

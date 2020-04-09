<template>
  <view
    class="simple-slider"
    :style="{
      backgroundColor: backgroundColor,
      height: size + sizeUnit,
      width: strokeWidth
    }"
  >
    <view class="click-bar" @click="handleClick">
      <view
        class="point"
        v-for="(item, index) in points"
        :key="index"
        :data-mun="item"
        :style="{
          height: 100 / density + '%'
        }"
      ></view
    ></view>
    <view
      class="bar"
      :style="{
        height: posVal + '%',
        backgroundColor: activeColor
      }"
    >
    </view>
    <view
      class="block"
      :class="{ 'block-hover': hover }"
      :style="{
        bottom: posVal + '%',
        width: `calc(${blockSize} + 28rpx)`,
        height: `calc(${blockSize} + 28rpx)`
      }"
      @touchstart="touchS"
      @touchmove="touchM"
      @touchend="touchE"
    >
      <view
        class="dist"
        :style="{
          width: blockSize,
          height: blockSize,
          backgroundColor: blockColor
        }"
      ></view>
    </view>
  </view>
</template>

<script>
let calcPos = {};
let systemInfo = uni.getSystemInfoSync();

export default {
  props: {
    value: {
      default: 0,
      type: Number
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 100,
      type: Number
    },
    step: {
      default: 1,
      type: Number
    },
    size: {
      default: "100"
    },
    sizeUnit: {
      default: "rpx"
    },
    strokeWidth: {
      default: "3px"
    },
    disabled: {},
    blockSize: {
      default: "12px"
    },
    backgroundColor: {
      default: "#e2e4e5"
    }, // 滑块右侧背景条的颜色
    activeColor: {
      //   default: "linear-gradient(360deg, #ff5f52 0%, #ff170d 100%)"
      default: "#ff170d"
    }, //滑块左侧已选择部分的线条颜色
    blockColor: {
      default: "#ff170d"
    }, //滑块的颜色
    density: {
      default: 100
    }
  },
  data() {
    return {
      hover: false,
      rate: systemInfo.windowWidth / 750,
      posVal: 0,
      _posVal: 0
    };
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    points() {
      var arr = [],
        num = this.density + 1;
      while (num--) {
        arr.push(num);
      }
      return arr;
    }
  },
  watch: {
    value: {
      handler(val) {
        this.posVal = ((val - this.min) * 100) / (this.max - this.min);
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    handleClick(e) {
      var val = e.target.dataset.mun * (100 / this.density);
      var r = (100 / (this.max - this.min)) * this.step;
      var v = Math.round(val / r) * r;
      this._posVal = v;
      var d = this.max - this.min;
      this.val = Math.round(((d * this._posVal) / 100 + this.min) * 100) / 100;
      this.$emit("changing", this.val);
    },
    touchS(e) {
      if (this.disabled) return;
      this.hover = true;
      var s = e.changedTouches[0];
      calcPos.touchS = s;
      calcPos.touchS.val = this.posVal;
    },
    touchM(e) {
      if (this.disabled) return;
      var m = e.changedTouches[0];
      // val: 滑动距离的百分比

      var val =
        Math.round(
          (Number(calcPos.touchS.val) +
            (calcPos.touchS.pageY - m.pageY) /
              ((this.sizeUnit == "rpx" ? this.size * this.rate : this.size) /
                100)) *
            100
        ) / 100;

      if (val > 100) {
        this._posVal = 100;
      } else if (val < 0) {
        this._posVal = 0;
      } else {
        var r = (100 / (this.max - this.min)) * this.step;
        var v = Math.round(val / r) * r;
        this._posVal = v;
      }
      var d = this.max - this.min;
      this.val = Math.round(((d * this._posVal) / 100 + this.min) * 100) / 100;
      this.$emit("changing", this.val);
    },
    touchE(e) {
      if (this.disabled) return;
      this.$emit("changed", this.val);
      this.hover = false;
    }
  }
};
</script>

<style lang="scss">
.simple-slider {
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  .click-bar {
    height: 100%;
    width: 18px;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // z-index: 100;
    .point {
      width: 100%;
      flex-shrink: 0;
    }
  }
  .bar {
    width: 100%;
    height: 50%;
    border-radius: 2px;
  }
  .block {
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, 50%);
    .dist {
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .block-hover {
    transform: translate(-50%, 50%) scale(1.3);
    .dist {
      box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

<template>
    <div :class="mainlog">
      <transition mode="out-in">
      <router-view :login_box='login_box' ></router-view>
      </transition>
    </div>
</template>

<script>
export default {
  props: ['login_box', 'mainlog']
}
</script>

<style lang="less" scoped>
.v-enter,
.v-leave-to{
  opacity: 0;
  transform: translateX(140px);
}
.v-enter-active,
.v-enter-active{
  transition: all 100 ease;
}
.pcmainlog{
    background: url('~@/../../assets/a.jpg');
    background-size:100% 100%;
    height: 100%;
    font-family:"新宋体";
}
.mbmainlog{
    background: url('~@/../../assets/mb.jpg');
    background-size:100% 100%;
    height: 100%;
    font-family:"新宋体";
}
.v-enter,
.v-leave-to{
  opacity: 0;
  transform: translateX(140px);
}
.v-enter-active,
.v-enter-active{
  transition: all 1s ease;
}
</style>

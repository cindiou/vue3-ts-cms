<template>
  <div class="not-found">
    <h2 class="title">抱歉，您访问的页面已前往银河系...无法连接成功...</h2>
    <div class="placeHolder">
      <span>4</span>
      <span>0</span>
      <span>4</span>
      <img class="img" src="~assets/img/404_bg2.jpg" alt="404恐龙" />
    </div>
    <el-button @click="goHome" type="info">返回首页</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const goHome = () => {
      router.push("/login");
    };
    return {
      goHome,
    };
  },
});
</script>

<style scoped lang="scss">
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2.title {
    color: #666;
  }

  .placeHolder {
    line-height: 1;
    margin: 0;
    padding: 40px 0 60px 0;
    font-size: 160px;
    color: #666;

    position: relative;

    .img {
      display: none;
      position: absolute;
      right: -180px;
      bottom: 50px;
      height: 160px;
    }
    span {
      &:not(:first-child) {
        margin-left: 30px;
      }
      /*  &:nth-child(2) {
        display: inline-block;
        transform: rotateZ(45deg);
        position: relative;
        &::before {
          content: "0";
          position: absolute;
          transform: rotateZ(-90deg);
        }
        &::after {
          content: ".";
          position: absolute;
          left: 28px;
          top: -54px;
        }
      } */
    }
  }
}
</style>

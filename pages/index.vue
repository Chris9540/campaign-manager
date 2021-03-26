<template>
  <Page name="Home" route="/" style="padding:0; display: block">
    <div class="box right">
      <div></div>
    </div>
    <div class="slider">
      <div class="box left">
        <div></div>
      </div>
    </div>
  </Page>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
      loggedin: false,
    }
  },
  computed: {
    ...mapState('auth', ['accessToken']),
    isAuthenticated() {
      return this.accessToken;
    },
  },
  mounted() {
    console.log(this.$store)
  }
}
</script>

<style lang="scss" scoped>
.slider {
  width:100%;
  overflow: hidden;
  display: inline-block;
  transform: skewX(-45deg) translateX(-50%);
  border-right: 10px solid ghostwhite;
  pointer-events: none;
}
.box { 
  width: 100vw;
  height: calc(100vh - #{$header-height});
  div { 
    display: block; 
    width: 100%; 
    height: 100%;
  }
}
.left {
  transform: skewX(45deg);
  background-color: $grey-2;
  margin-left: 50%;
  pointer-events: auto;
  background: url("/img/left-index.jpeg") no-repeat;
}
.right {
  background-color:  $grey-3;
  position: absolute;
  background: url("/img/right-index.jpg") no-repeat;
}
.login-box {
  position: fixed;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top:50%;
  width: 400px;
  height: fit-content;
  transition: all ease-out 3000ms;
}
.hide {
  opacity: 0;
  top: -100%;
}
</style>


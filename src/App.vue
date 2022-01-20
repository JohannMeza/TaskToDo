<template>
  <div class="home" :class="{ 'home-active': navbarEmit }">
    <nav-bar 
    @navbar="emitNavbar"
    @navbarSwitch="navbarSwitchEmit"
    ></nav-bar>

    <router-view 
    :valueSwitchNav="{ value: navbarValueEmit, icon: classIcon}"
    @iconEmit="emitIcon"
    ></router-view>
  </div>
</template>

<script>
import { ref } from 'vue';
import NavBar from './components/layout/NavbarComponent.vue';


export default {
  name: 'App',

  components: { NavBar },

  props: {
    valueSwitchNav: Object
  },

  setup () {
    const navbarEmit = ref();
    const navbarValueEmit = ref("Hoy");
    const classIcon = ref();

    const emitNavbar = (info) => {
      navbarEmit.value = info
    }

    const navbarSwitchEmit = (info) => {
      navbarValueEmit.value = info
    }

    const emitIcon = (info) => {
      classIcon.value = info
    }

    return { 
      // --- variables
      navbarEmit, 
      navbarValueEmit,
      classIcon,

      // --- functions
      emitNavbar, 
      navbarSwitchEmit,  
      emitIcon,
    }
  }
}

</script>

<style lang="scss">
// Imports base
@import './dev/scss/base/color.scss';
@import './dev/scss/base/base.scss';
@import './dev/scss/breakpoint/breakpoint.scss';


.home {
  width: 90%;
  max-width: 1080px;
  // height: 100%;
  margin: 0 auto 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 25px;
  
  @include laptop () {
    width: 80%;
    max-width: 1080px;
    height: 100%;
    margin: 0 auto 0;
    display: grid;
    grid-template-columns: 25% 1fr;
    grid-gap: 25px;
  }
}

.home-active {
  width: 95%;
  // height: 100vh;
  max-width: none;
  grid-template-columns: 1fr;    

  @include laptop () {
    grid-template-columns: 25% 1fr;
  }
}

</style>

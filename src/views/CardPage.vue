<template>
  <div class="card">
    <span class="card-fondo__icon"><i :class="valueSwitchNav.icon"></i></span>

    <div class="card__title">
      <h1 class="text-capitalize card-title"> {{ valueSwitchNav.icon ? valueSwitchNav.icon.title : pathTitle }} </h1>
      <router-link :to="pathBack"><i :class="valueSwitchNav.icon ? valueSwitchNav.icon.icono : 'fas fa-plus-square'"></i></router-link>
    </div>

    <router-view :valueTitleActivity="pathTitle" v-bind="valueSwitchNav"></router-view>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

export default {
  name: 'CardPage',
  
  props: {
    valueSwitchNav: Object,
    valueTitleActivity: String,
  },

  setup (props) {
    const route = useRoute();
    const pathTitle = ref(route.params.name);
    const pathBack = ref(route.path)

    watchEffect(() => {
      props.valueSwitchNav
      const pathArray = route.path.split('/');
      let pathLatest = (pathArray[pathArray.length - 1] === 'table') ? "agregar" : (pathArray[pathArray.length - 1] === 'agregar') ? "table" : '';
      pathBack.value = `/activity/${pathTitle.value}/${pathLatest}`;
    })

    return { pathTitle, pathBack };
  },
}
</script>

<style lang="scss" scoped>
.card-fondo__icon {
    font-size: 200px;
    position: absolute;
    z-index: -1;
    top: -8%;
    right: -5%;
    transform: rotate(45deg);
    opacity: .23;
  }
  .card {
    padding: 25px 0;
  }

  .card__title {
    display: flex;
    align-items: center;
    gap: 25px;
    & > a {
      font-size: 25px;
      color: var(--c-orange-regular);
      cursor: pointer;
      &:hover {
        opacity: .7;
      }
    }
  }

  .text-capitalize {
    text-transform: capitalize;
  }

  .card-title {
    font-size: 18px;
    color: var(--c-white-extra-light);
  }
</style>
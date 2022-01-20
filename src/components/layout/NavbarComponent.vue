<template>
  <div class="home__navbar">
    <div class="navbar__name"> 
      <keep-alive>
        <component :is="componentsKeep" @componentsKeepString="emitComponents" :dataUser="userData"></component>
      </keep-alive>
    </div>

    <nav class="navbar__menu">
      <ul class="menu">
        <li class="menu__list">
          <i class="fas fa-home"></i>
          <router-link to="/" class="menu__link active" @click="resetData">Inicio</router-link>
        </li>
        
        <hr class="menu__separate">

        <li class="menu__list">
          <i class="fab fa-angular"></i>
          <a class="menu__link menu__link-main menu__link-active" @click="emitNavbarSwitch(0)">Hoy</a>
        </li>

        <li class="menu__list">
          <i class="fas fa-calendar-day"></i>
          <a class="menu__link" @click="emitNavbarSwitch(1)">Día</a>
        </li>

        <li class="menu__list">
          <i class="fas fa-calendar-week"></i>
          <a class="menu__link" @click="emitNavbarSwitch(7)">Semana</a>
        </li>

        <li class="menu__list">
          <i class="fas fa-calendar-alt"></i>
          <a class="menu__link" @click="emitNavbarSwitch(30)">Mes</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, ref, watchEffect } from 'vue';
import { getUser } from "../../services/UserServices.js";

// --- cOMPONENTES
import UserData from '../UserData.vue';
import UserForm from '../UserForm.vue';

export default {
  name: 'Navbar',

  emits: ['navbar', 'navbarSwitch'],

  components: { UserData, UserForm },

  props: {
    dataUser: Object
  },

  setup (props, context) {
    const route = useRoute();
    const pathDiffence = ref('/');
    const valuePath = ref(false);
    const userData = ref({});
    const componentsKeep = ref('UserData')

    const listarUser = async () => {
      const res = await getUser();
      userData.value = res.data[0]
    }

    const emitNavbar = () => {
      context.emit('navbar', valuePath.value)
    }    

    const emitNavbarSwitch = (day, value = false) => {
      let d = new Date();
      let time = d.setDate(d.getDate() - day);
      let date = new Date(time);
      let options = {year: 'numeric', month: 'numeric', day: 'numeric',};
      let result = date.toLocaleDateString('en', options); // 10/29/2013

      const $linkNav = (event)
        ? (!event.target.matches(".active"))
          ? event.target
          : document.querySelector(".menu__link.menu__link-active")
        : event || document.querySelector(".menu__link.menu__link-active");

      if (!value) document.querySelector(".menu__link.menu__link-active").classList.remove("menu__link-active");

      if (!$linkNav.matches('.menu__link-active')) {
        ($linkNav) ? $linkNav.classList.add("menu__link-active") : '';
      }

      $linkNav ? context.emit('navbarSwitch', { text: $linkNav.textContent, day: result }) : ''
    }

    const emitComponents = (info) => {
      componentsKeep.value = info
      listarUser()
    }

    const resetData = () => {
      document.querySelector(".menu__link.menu__link-active").classList.remove("menu__link-active");
      document.querySelector(".menu__link-main").classList.add("menu__link-active");
      emitNavbarSwitch(0, true)
    }

    onMounted(() => emitNavbarSwitch(0))

    watchEffect(() => {
      if (route.path !== pathDiffence.value) {
        valuePath.value = true
      } else {
        valuePath.value = false
      }

      emitNavbar()
    })

    listarUser()

    return { userData, valuePath, componentsKeep, emitNavbarSwitch, resetData, emitComponents };
  },
}
</script>

<style lang="scss" scoped>
.home__navbar {
  background: var(--bg-purple-dark);
  border-radius: 25px;
  user-select: none;
}

  .navbar__name {
    // height: 65%;
    background: var(--bg-purple-low);
    border-radius: 25px;
    padding: 35px 15px;
  }


  .navbar__avatar {
    margin: 10px 0;
    width: 100px;
    border-radius: 50%;
    border: 3px solid #fff;
  }

  

  // --- Menu 
  .menu__link {
    color: var(--c-purple-extra-light);
    cursor: pointer;
    transition: transform .5s ease, opacity .5s ease;

    &:hover {
      opacity: 1 !important;
    }
  }

  .menu__link-active {
    transform: translateX(10px);
    opacity: 1 !important;
  }

  .menu__link:not(.active) {
    opacity: .5;
  }

  .navbar__menu {
    padding: 20px 15px;
  }

  .menu__list {
    margin: 15px 0;

    & > i {
      font-size: 20px;
      opacity: .3;
      margin-right: 15px;
    }
  }



  .menu__separate {
    opacity: .5;
  }
</style>
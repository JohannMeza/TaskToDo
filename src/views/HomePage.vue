<template>
    <div class="home__cards">
      <!-- Work -->
      <router-link 
      to="/activity/trabajo/table" 
      class="home__card home__card--orange"
      @click="emitIcon({ icono: 'fas fa-briefcase', title: 'Trabajo' })">
        <span class="icon-card">
          <i class="fas fa-briefcase"></i>
        </span>  

        <div class="card__content">
          <div class="content__text">
            <h2 class="content__text-title">Trabajo</h2>
            <span class="content__text-icon">
              <!-- icono -->
              <i class="fas fa-ellipsis-h"></i>
            </span>
          </div>

          <span class="content__text-hour">{{ parseInt(hourActivity.hourWork.hourOld / 60) }} hrs</span>
          <span class="content__text-last"> {{ valueNav }} - {{ parseInt(hourActivity.hourWork.hourNew / 60) }}</span>
        </div>
      </router-link>
      
      <!-- Play -->
      <router-link 
      to="/activity/juego/table" 
      class="home__card home__card--light-blue"
      @click="emitIcon({ icono: 'fas fa-gamepad', title: 'Juego' })"
      >
        <span class="icon-card">
          <i class="fas fa-gamepad"></i>
        </span>        

        <div class="card__content">
          <div class="content__text">
            <h2 class="content__text-title">Juego</h2>
            <span class="content__text-icon">
              <!-- icono -->
              <i class="fas fa-ellipsis-h"></i>
            </span>
          </div>

          <span class="content__text-hour">{{ parseInt(hourActivity.hourPlay.hourOld / 60) }} hrs</span>
          <span class="content__text-last">{{ valueNav }} - {{ parseInt(hourActivity.hourPlay.hourNew / 60) }}</span>
        </div>
      </router-link>
      
      <!-- Study -->
      <router-link 
      to="/activity/estudio/table" 
      class="home__card home__card--red"
      @click="emitIcon({ icono: 'fas fa-book-open', title: 'Estudio' })"
      >
        <span class="icon-card">
          <i class="fas fa-book-open"></i>
        </span>        

        <div class="card__content">
          <div class="content__text">
            <h2 class="content__text-title">Estudio</h2>
            <span class="content__text-icon">
              <!-- icono -->
              <i class="fas fa-ellipsis-h"></i>
            </span>
          </div>

          <span class="content__text-hour">{{ parseInt(hourActivity.hourStudy.hourOld / 60) }} hrs</span>
          <span class="content__text-last">{{ valueNav }} - {{ parseInt(hourActivity.hourStudy.hourNew / 60) }}</span>
        </div>
      </router-link>
      
      <!-- Exercise -->
      <router-link 
      to="/activity/ejercicio/table" 
      class="home__card home__card--greeen"
      @click="emitIcon({ icono: 'fas fa-running', title: 'Ejercicio' })"
      >
        <span class="icon-card">
          <i class="fas fa-running"></i>
        </span>

        <div class="card__content">
          <div class="content__text">
            <h2 class="content__text-title">Ejercicio</h2>
            <span class="content__text-icon">
              <!-- icono -->
              <i class="fas fa-ellipsis-h"></i>
            </span>
          </div>

          <span class="content__text-hour">{{ parseInt(hourActivity.hourExercise.hourOld / 60) }} hrs</span>
          <span class="content__text-last">{{ valueNav }} - {{ parseInt(hourActivity.hourExercise.hourNew / 60) }}</span>
        </div>
      </router-link>
      
      <!-- Social -->
      <router-link 
      to="/activity/social/table" 
      class="home__card home__card--purple"
      @click="emitIcon({ icono: 'fas fa-comments', title: 'Social' })"
      >
        <span class="icon-card">
          <i class="fas fa-comments"></i>
        </span>        

        <div class="card__content">
          <div class="content__text">
            <h2 class="content__text-title">Social</h2>
            <span class="content__text-icon">
              <!-- icono -->
              <i class="fas fa-ellipsis-h"></i>
            </span>
          </div>

          <span class="content__text-hour">{{ parseInt(hourActivity.hourSocial.hourOld / 60) }} hrs</span>
          <span class="content__text-last">{{ valueNav }} - {{ parseInt(hourActivity.hourSocial.hourNew / 60) }}</span>
        </div>
      </router-link>
      
      <!-- Self care -->
      <router-link 
      to="/activity/cuidado personal/table" 
      class="home__card home__card--yellow"
      @click="emitIcon({ icono: 'fas fa-heartbeat', title: 'Cuidado personal' })"
      >
        <span class="icon-card">
          <i class="fas fa-heartbeat"></i>
        </span>        

        <div class="card__content">
          <div class="content__text">
            <h2 class="content__text-title">Cuidado personal</h2>
            <span class="content__text-icon">
              <!-- icono -->
              <i class="fas fa-ellipsis-h"></i>
            </span>
          </div>

          <span class="content__text-hour">{{ parseInt(hourActivity.hourSelfCare.hourOld / 60) }} hrs</span>
          <span class="content__text-last">{{ valueNav }} - {{ parseInt(hourActivity.hourSelfCare.hourNew / 60) }}</span>
        </div>
      </router-link>
    </div>
</template>

<script>
import { getHours } from '../services/TaskServices';
import { computed, ref, watchEffect } from 'vue';

export default {
  
  props: {
    valueSwitchNav: Object
  },

  setup (props, context) {
    const valueNavDate = ref('');

    const hourActivity = ref({
      hourWork: {
        hourNew: 0,
        hourOld: 0
      },
      hourPlay: {
        hourNew: 0,
        hourOld: 0
      },
      hourStudy: {
        hourNew: 0,
        hourOld: 0
      },
      hourExercise: {
        hourNew: 0,
        hourOld: 0
      },
      hourSocial: {
        hourNew: 0,
        hourOld: 0
      },
      hourSelfCare: {
        hourNew: 0,
        hourOld: 0
      },
    });

    let valueSwitchHourUpdate = 0;

    const getHourActivity = async (date) => {
      let res = null

      if (!date) {
        date = new Date().toLocaleDateString().split('/');
        let año = date[2], mes = date[0], dia = date[1];
        res = await getHours(`${dia}-${mes}-${año}`);
      } else {
        date = date.split('/').join('-');
        res = await getHours(date);
      }

      let arrFind = [];

      if (res.data.length === 0) {
        hourActivity.value.hourWork.hourNew = 0
        hourActivity.value.hourPlay.hourNew = 0
        hourActivity.value.hourStudy.hourNew = 0
        hourActivity.value.hourExercise.hourNew = 0
        hourActivity.value.hourSocial.hourNew = 0
        hourActivity.value.hourSelfCare.hourNew = 0

        hourActivity.value.hourWork.hourOld = 0
        hourActivity.value.hourPlay.hourOld = 0
        hourActivity.value.hourStudy.hourOld = 0
        hourActivity.value.hourExercise.hourOld = 0
        hourActivity.value.hourSocial.hourOld = 0
        hourActivity.value.hourSelfCare.hourOld = 0

        valueSwitchHourUpdate = 1 // Update hour old
      } else {
        res.data.forEach(el => {
          if (el._id === 'trabajo') {
            hourActivity.value.hourWork.hourNew = el.hora
            if (!valueSwitchHourUpdate) hourActivity.value.hourWork.hourOld = el.hora
            arrFind.push(el._id);
          } else if (el._id === 'juego') {
            hourActivity.value.hourPlay.hourNew = el.hora
            if (!valueSwitchHourUpdate) hourActivity.value.hourPlay.hourOld = el.hora
            arrFind.push(el._id);
          } else if (el._id === 'estudio') {
            hourActivity.value.hourStudy.hourNew = el.hora
            if (!valueSwitchHourUpdate) hourActivity.value.hourStudy.hourOld = el.hora
            arrFind.push(el._id);
          } else if (el._id === 'ejercicio') {
            hourActivity.value.hourExercise.hourNew = el.hora
            if (!valueSwitchHourUpdate) hourActivity.value.hourExercise.hourOld = el.hora
            arrFind.push(el._id);
          } else if (el._id === 'social') {
            hourActivity.value.hourSocial.hourNew = el.hora
            if (!valueSwitchHourUpdate) hourActivity.value.hourSocial.hourOld = el.hora
            arrFind.push(el._id);
          } else if (el._id === 'cuidado personal') {
            hourActivity.value.hourSelfCare.hourNew = el.hora
            if (!valueSwitchHourUpdate)  hourActivity.value.hourSelfCare.hourOld = el.hora
            arrFind.push(el._id);
          }
        })

        valueSwitchHourUpdate = 1 // Update hour old

        if (!arrFind.includes('trabajo')) {
            hourActivity.value.hourWork.hourNew = 0
        } 
        if (!arrFind.includes('juego')) {
            hourActivity.value.hourPlay.hourNew = 0
        }
        if (!arrFind.includes('estudio')) {
            hourActivity.value.hourStudy.hourNew = 0
        }
        if (!arrFind.includes('ejercicio')) {
            hourActivity.value.hourExercise.hourNew = 0
        }
        if (!arrFind.includes('social')) {
            hourActivity.value.hourSocial.hourNew = 0
        }
        if (!arrFind.includes('cuidado personal')) {
            hourActivity.value.hourSelfCare.hourNew = 0
        }
      }
    }
    
    const valueNav = computed(() => {
      return (props.valueSwitchNav.value.text === "Hoy" || props.valueSwitchNav.value === "Hoy")
        ? "Hoy" 
        : (props.valueSwitchNav.value.text === "Día" || props.valueSwitchNav.value === "Día")
          ? "Ayer" 
          : (props.valueSwitchNav.value.text === "Semana" || props.valueSwitchNav.value === "Semana")
            ? "Semana pasada" 
            : (props.valueSwitchNav.value.text === "Mes" || props.valueSwitchNav.value === "Mes")
              ? "Mes pasado"
              : "Error"
    })

    const emitIcon = (info) => {
      context.emit('iconEmit', info)
    }

    watchEffect(() => {
      getHourActivity(props.valueSwitchNav.value.day)
    })
    
    return { valueNav, hourActivity, valueNavDate, emitIcon }
  }
}
</script>

<style lang="scss" scoped>
.home__card--orange { background: var(--bg-orange-regular); }
.home__card--light-blue { background: var(--bg-light-blue-regular); }
.home__card--red { background: var(--bg-red-regular); }
.home__card--greeen { background: var(--bg-green-regular); }
.home__card--purple { background: var(--bg-purple-regular); }
.home__card--yellow { background: var(--bg-yellow-regular); }

.home__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 25px;
}
  .home__card {
    padding-top: 30px;
    border-radius: 25px;
    overflow: hidden;
    position: relative;
  }

  .content__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content__text-icon {
    color: var(--c-purple-extra-light);
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: var(--bg-purple-dark);
      border-radius: 50%;
    }
  }
  .icon-card {
    font-size: 70px;
    position: absolute;
    z-index: 10;
    top: -15px;
    right: 15px;
    opacity: .23;
    transform: rotate(45deg);
  }
  
  .card__content {
    background: var(--bg-purple-dark);
    height: 100%;
    border-radius: 25px;
    padding: 35px 25px;
    cursor: pointer;
    position: relative;
    z-index: 100;
    transition: background .5s ease;
    &:hover { 
      background: var(--bg-purple-medium);
    }
  }


  // --- Cards
  .content__text-title {
    font-size: 14px;
    color: var(--c-white-extra-light);
  }

  .content__text-hour {
    color: var(--c-purple-extra-light);
    font-size: 50px;
    font-weight: 300;
    display: block;
  }

  .content__text-last {
    color: var(--c-purple-extra-light);
    margin-top: 5px;
  }
</style>
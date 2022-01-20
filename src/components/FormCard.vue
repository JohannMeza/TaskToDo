<template>
  <form class="form" @submit.prevent="saveTasksPost">
    <div class="form-box">
      <span class="form-icon">
        <i class="fas fa-thumbtack"></i>  
      </span>

      <input type="text" class="form-input" placeholder="Descripción de la tarea" v-model="dataActivity.description">
    </div>

    <div class="form-content">
      <div class="form-box">
        <span class="form-icon">
          <i class="fas fa-calendar-week"></i>
        </span>
        
        <input type="date" class="form-input" :max="dateNow" v-model="dataActivity.date">
      </div>
      
      <div class="form-box">
        <span class="form-icon">
          <i class="fas fa-clock"></i>
        </span>

        <input type="number" class="form-input" placeholder="Minutos" v-model="dataActivity.hour">
      </div>
    </div>

    <button :disabled="!dataActivity.description || !dataActivity.date || !dataActivity.hour" type="submit" class="form-send">Agregar</button>
  </form>
</template>

<script>
import { computed, ref } from "vue"
import { saveTask } from "../services/TaskServices";
import { useRouter } from 'vue-router';

export default {
  name: 'FormCard',

  data () {
    return {
      self: this
    }
  },

  props: {
    valueTitleActivity: String,
  },

  methods: {
    saveTaskPost() {
      this.$router.push("/")
    }
  },

  setup (props) {
    const router = useRouter()
    const dateNow = computed(() => {
      let mes = `0${new Date().getMonth() + 1}`.substr(-2),
        dia = new Date().getDate(),
        año = new Date().getFullYear();
      
      return `${año}-${mes}-${dia}`
    })

    const dataActivity = ref({
      title: `${props.valueTitleActivity}`,
      description: null,
      date: dateNow.value,
      hour: null
    });    

    const saveTasksPost = async () => {
      const { title, description, date, hour } = dataActivity.value;
      await saveTask({ title, description, date, hour });
      router.push({ name: 'TablePage'})
    }
    
    
    return  { dataActivity, saveTasksPost, dateNow };
  }
}
</script>

<style scoped lang="scss">
  @import '../dev/scss/mixin/flex.scss';

  .form {
    margin-top: 25px;
    @include flex-box (null, flex-start, column, null, 25px)
  }
  .form-content { 
    width: 100%;
    @include flex-box (null, null, row, wrap, 25px);
    & > .form-box {
      flex: 1 0 250px;
    }
  }
  .form-box {
    width: 100%;
    position: relative;
    flex: 1 0 auto;
  }
  .form-icon {
    color: var(--c-purple-extra-light);
    position: absolute;
    top: 50%;
    left: 15px;
    font-size: 20px;
    transform: translateY(-50%);
  }
  .form-input {
    width: 100%;
    height: 45px;
    border-radius: 5px;
    padding: 0 25px 0 55px;
    background: var(--bg-purple-dark);
    color: var(--c-purple-extra-light);
    font-size: 20px;
  }
  .form-send {
    background: var(--bg-purple-medium);
    color: var(--c-white-extra-light);
    padding: 8px 20px;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(1);
    }
  }

  button[disabled] {
    background: var(--bg-purple-dark);
    opacity: .5;
    &:hover {
      transform: none;
    }
  }
</style>
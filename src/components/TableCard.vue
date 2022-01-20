<template>
  <div>
    <table class="table">
      <thead class="table__thead">
        <tr>
          <th>#</th>
          <th>Nombre de la actividad</th>
          <th>Fecha</th>
          <th>Horas dedicadas</th>
          <th>Operaciones</th>
        </tr>
      </thead>

      <tbody class="table__tbody">
        <tr v-for="(task, index) in tasks" :key="index" >
          <th>{{ index + 1 }}</th>
          <td>{{ task.description }}</td>
          <td>{{ cutDate(task.date) }}</td>
          <td>Hrs. {{ parseInt(task.hour / 60) }} Min. {{ task.hour % 60 }}</td>
          <td>
            <button class="btn-delete" @click="removTask(task._id)"><i class="fas fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination" :style="{ width: totalPage > 3 ? '500px' : '250px' }">
      <div class="pagination__btn" v-if="totalPage > 3" id="btn-first" @click="paginate(0)">First page</div>
      <div class="pagination__btn square" id="btn-before" @click="paginate(0)"><i class="fas fa-angle-double-left"></i></div>
      <div class="pagination__btn square btn-number active" @click="paginate"> {{ btnPosition.before }} </div>
      <div class="pagination__btn square btn-number" v-if="totalPage > 1" @click="paginate"> {{ btnPosition.current }} </div>
      <div class="pagination__btn square btn-number" v-if="totalPage > 2" @click="paginate"> {{ btnPosition.after }} </div>
      <div class="pagination__btn square" id="btn-after" @click="paginate(1)"><i class="fas fa-angle-double-right"></i></div>
      <div class="pagination__btn" v-if="totalPage > 3" id="btn-last" @click="paginate(1)">Last page</div>
    </div>
  </div>
</template> 

<script>
import { onMounted, ref, watchEffect } from 'vue';
import { deleteTask, getTasks } from '../services/TaskServices.js';

export default {
  name: 'TableCard',

  props: {
    valueTitleActivity: String,
    valueSwitchNav: Object,
  },

  setup (props, context) {
    let tasks = ref('');
    let btnPosition = ref({
      before: 1,
      current: 2,
      after: 3,
    })
    const totalPage = ref(null);

    const listarTareas = async (day, page = 1) => {
      let perpage = 5
      let date = day.split('/').join('-');
      const res = await getTasks(props.valueTitleActivity, date, page);
      totalPage.value = Math.ceil(res.data.cant / perpage)
      tasks.value = res.data.task;
    }

    const removTask = async (id) => {
      if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        await deleteTask(id)
        listarTareas(context.attrs.value.day)
      }
    }

    const paginate = (value) => {
      // --- Botones Numeros
      if (event.target.matches(".btn-number")) {
        document.querySelector(".btn-number.active").classList.remove("active");
        event.target.classList.add("active");
      }

      if (event.target.matches("#btn-before, #btn-before *, #btn-after, #btn-after *")) {
        if (!value) {
          if (btnPosition.value.before > 1) {
            btnPosition.value.before --
            btnPosition.value.current --
            btnPosition.value.after --
          }
        } else {
          if (btnPosition.value.after < totalPage.value) {
            btnPosition.value.before ++
            btnPosition.value.current ++
            btnPosition.value.after ++
          }
        }
      }

      // --- Botones posteriores
      if (event.target.matches("#btn-first, #btn-last")) {
        if (!value) {
          btnPosition.value.before = 1
          btnPosition.value.current = 2
          btnPosition.value.after = 3
        } else {
          btnPosition.value.before = totalPage.value - 2
          btnPosition.value.current = totalPage.value - 1
          btnPosition.value.after = totalPage.value
        }
      }

      setTimeout(() => listarTareas(context.attrs.value.day, document.querySelector(".btn-number.active").textContent), 0)    
    }

    onMounted(() => {
      watchEffect(() => {
        listarTareas(context.attrs.value.day)
      })
    })

    

    const cutDate = (stringDate = '...') => {
      return stringDate.substring(0,10)
    }

    return { tasks, cutDate, btnPosition, totalPage, removTask, paginate }
  }
}
</script>

<style scoped lang="scss">

  // --- tabla de actividades
  .table {
    width: 100%;
    background: var(--bg-purple-dark);
    padding: 25px;
    border-radius: 25px;
    border-spacing: 0;
    margin-top: 35px;
  }
    .table__thead {
      color: var(--c-purple-extra-light);
      & > tr th{
        border-bottom: 0.2px solid;
        padding: 15px 0;
        text-align: start;
      }
    }

    .table__tbody {
      color: var(--c-purple-extra-light);
      font-weight: 300;
      & > tr td, & > tr th{
        text-align: start;
        padding: 15px 0;
      }
    }

    .btn-delete {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      color: var(--c-white-extra-light);
      font-size: 18px;
      cursor: pointer;
      background: var(--c-red-regular);
      &:hover {
        opacity: .85;
      }

      &:active {
        transform: scale(.95);
      }
    }

    .pagination {
      width: 550px;
      margin: 25px 0 0 auto;
      display: flex;
      justify-content: space-between;
      gap: 15px;
    }

    .pagination__btn {
      height: 40px;
      border-radius: 5px;
      background: var(--bg-purple-medium);
      color: var(--c-white-extra-light);
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background .5s ease;
      user-select: none;
      &:hover {
        background: var(--bg-purple-dark);
      }
      &:active {
        transform: scale(.95);
      }
    }

    .square {
      padding: 0;
      width: 40px;
    }

    .square.active {
      background: var(--bg-purple-dark);
    }
</style>
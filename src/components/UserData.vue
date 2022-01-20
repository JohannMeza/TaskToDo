<template>
  <div>
    <img :src="dataUser.imgUrl" class="navbar__img">
    <div>
      <span class="text-report">Reporte para</span>
      <h1 class="text-name">{{ dataUser.name }} <br> {{ dataUser.lastname }}</h1>

      <div class="message">
        <hr class="message-separate">
        <span class="message-paragraph">{{ dataUser.description }}</span>
        <button class="message-btn" @click="updatearUser()">Editar perfil</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserData',
  
  emits: [ 'componentsKeepString' ],

  props: {
    dataUser: Object
  },

  setup (props, context) {
    const updatearUser = () => {
      context.emit('componentsKeepString', 'UserForm')
    } 

    return { updatearUser }
  }
}
</script>

<style lang="scss" scoped>
  .navbar__img {
    width: 120px;
    border-radius: 50%;
    border: 5px solid #fff;
  }
  .text-report {
    color: var(--c-purple-extra-light);
  }
  .text-name {
    font-size: 35px;
    color: var(--c-white-extra-light);
    font-weight: 300;
    margin-top: 10px;
  }
  .message {
    margin-top: 15px;
  }
    .message-separate {
      margin: 10px 0 20px;
      width: 150px;
    }
    .message-paragraph {
      font-weight: 300;
      font-size: 14px;
      color: var(--c-white-extra-light);
    }
    .message-btn {
      background: var(--bg-purple-medium);
      color: var(--c-white-extra-light);
      font-weight: 300;
      padding: 8px 25px;
      margin-top: 15px;
      font-size: 14px;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
      }

      &:active {
        transform: scale(1);
      }
    }
</style>
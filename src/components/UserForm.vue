<template>
  <form enctype="multipart/form-data" @submit.prevent="updatearUser(dataUser._id)" class="user-form">
    <label for="image" title="Cambiar imagen"><img :src="dataUser.imgUrl" class="navbar__img"></label>
    
    <div class="user-form__box">
      <input type="text" placeholder="Nombre" class="user-form__input" v-model="user.name">
    </div>

    <div class="user-form__box">
      <input type="text" placeholder="Apellido" v-model="user.lastname" class="user-form__input">
    </div>

    <input type="file" id="image" name="image" v-show="false" @change="updloadImage">
    <div class="user-form__box">
      <textarea placeholder="Descripcion" maxlength="50" rows="5" v-model="user.description" class="user-form__input"></textarea>
    </div>

    <button type="submit" class="message-btn">Editar perfil</button>
  </form>
</template>

<script>
import { ref, watchEffect } from "vue"
import { updateUser, upload } from "../services/UserServices";

export default {
  name: 'UserForm',
  
  props: {
    dataUser: Object
  },

  emits: [ 'componentsKeepString' ],

  setup (props, context) {
    let user = ref();

    const value = (data) => {
      user.value = data
    }

    watchEffect(() => {
      value(props.dataUser)
    })

    const updatearUser = async (id) => {
      if (event.target.image.files.length !== 0) {
        // user.value.imgUrl = event.target.image.files
        // console.log(user.value.imgUrl ,event.target.image.files)
      }

      const res = await updateUser(id, user.value);
      const up = await upload();
      console.log(up)
      user.value = res.data;
      context.emit('componentsKeepString', 'UserData')
    } 

    const updloadImage = () => {
      console.log(event.target.files[0])
      // user.value.imgUrl = event.target.files[0]
    }

    return { user, updatearUser, updloadImage }
  }
}
</script>

<style scoped lang="scss">
  .navbar__img {
    width: 120px;
    border-radius: 50%;
    border: 5px solid #fff;
    cursor: pointer;
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
  .user-form__box {
    margin: 10px 0;
  }

  .user-form__input {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    background: var(--bg-purple-regular);
    padding: 0 15px;
    color: var(--c-purple-extra-light);
  }

  input[class="user-form__input"]::placeholder,
  textarea[class="user-form__input"]::placeholder {
    color: red;
    color: red;
  }

  textarea[class="user-form__input"] {
    padding: 5px 15px;
    &::-webkit-scrollbar {
      width: 5px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--bg-purple-dark);
    }
  }
</style>
<script lang="ts">
import InputText from 'primevue/inputtext'
import imgBackground from '@/assets/img/darkness.webp'
import { useRouter, type Router } from 'vue-router'
import { ref, type Ref } from 'vue'
import type { LoginUser, RegisterUser } from '../interfaces/loginUser'
import Dialog from 'primevue/dialog'

export default {
  components: { InputText },
  data() {
    let showLoading: Ref<boolean> = ref(true)
    const loginObj: Ref<LoginUser> = ref({
      user: '',
      password: ''
    })
    const registerObj: Ref<RegisterUser> = ref({
      name: '',
      user: '',
      password: '',
      confirmPassword: ''
    })
    const mode: Ref<number> = ref(1),
      message: Ref<string> = ref('OK')
    return {
      loginObj,
      registerObj,
      mode,
      showMessage: ref(false),
      message,
      showLoading
    }
  },
  beforeMount: () => {
    const router: Router = useRouter()
    const sessionActive: string = sessionStorage.key(0) || ''
    if (sessionActive != '') {
      router.push({ name: 'home' })
    }
  },
  methods: {
    initSesion(event: Event): void {
      event.preventDefault()
      console.log(this.loginObj.user, this.loginObj.password)
      this.message = this.validateLoginUser()
      if (this.message != 'OK') {
        this.showMessage = true
        return
      }
      const users: string = localStorage.getItem('users') || '[]'
      console.log(users)
      let userSelect: { user: string; password: string } = JSON.parse(users).find(
        (e: { user: string; password: string }) =>
          e.user == this.loginObj.user && e.password == this.loginObj.password
      )
      console.log(userSelect)
      if (userSelect) {
        sessionStorage.setItem(this.loginObj.user, this.generateKey(12))
        this.$router.push('/home')
      } else {
        this.message = 'There is not an active user for data'
        this.showMessage = true
      }
    },
    registerUser(event: Event): void {
      event.preventDefault()
      this.message = this.validateRegisterUser()
      if (this.message != 'OK') {
        this.showMessage = true
        return
      }
      let users: RegisterUser[] = []
      try {
        const localStorageUsers = localStorage.getItem('users')
        if (localStorageUsers) {
          users = JSON.parse(localStorageUsers)
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
        // Handle potential errors gracefully (e.g., set users to an empty array)
        users = []
      }
      users = [...users, this.registerObj]
      localStorage.setItem('users', JSON.stringify(users))
      this.mode = 1
    },
    validateLoginUser(): string {
      let msg: string = 'OK'
      if (this.loginObj.user == '') msg = 'User field is invalid'
      if (this.loginObj.password == '') msg = 'Password field is invalid'
      return msg
    },
    validateRegisterUser(): string {
      let msg: string = 'OK'
      if (this.registerObj.password != this.registerObj.confirmPassword)
        msg = 'Passwords are invalid'
      if (this.registerObj.password == '' || this.registerObj.password == null)
        msg = 'Password is invalid'
      if (this.registerObj.confirmPassword == '' || this.registerObj.confirmPassword == null)
        msg = 'Confirm password is invalid'
      if (this.registerObj.user == '' || this.registerObj.user == null) msg = 'user is invalid'
      if (this.registerObj.name == '' || this.registerObj.name == null) msg = 'name is invalid'
      return msg
    },
    generateKey(length: number): string {
      const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      let password: string = ''

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        password += characters.charAt(randomIndex)
      }

      return password
    }
  }
}
</script>

<template>
  <Dialog
    v-model:visible="showMessage"
    modal
    header="Invalid form"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <p class="m-0">{{ message }}</p>
  </Dialog>
  <div class="main">
    <vue-element-loading :active="showLoading" spinner="bar-fade-scale" />
    <div class="main__login shadow-md max-w-96 rounded-md" v-if="mode == 1">
      <div class="main__login-title m-2">
        <h1 class="font-bold">Login</h1>
      </div>
      <form @submit="initSesion($event)">
        <div class="flex flex-col text-left">
          <label for="username" class="mb-2 text-sm text-start text-grey-900">Username</label>
          <InputText
            class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            id="username"
            v-model="loginObj.user"
          />
          <!-- <small id="username-help">Enter your username to reset your password.</small> -->
        </div>
        <div class="flex flex-col">
          <label for="username" class="mb-2 text-sm text-start text-grey-900">Password</label>
          <InputText
            type="password"
            class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            id="username"
            v-model="loginObj.password"
          />
          <!-- <small id="username-help">Enter your username to reset your password.</small> -->
        </div>
        <div class="mt-3 flex justify-between xs:flex-col sm:flex-col md:flex-row gap-3">
          <input
            class="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-color_blue"
            type="submit"
            value="Log in"
          />
          <input
            @click="mode = 2"
            class="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-color_yellow"
            type="button"
            value="Register user"
          />
        </div>
      </form>
    </div>
    <div class="main__login shadow-md max-w-96" v-if="mode == 2">
      <div class="main__login-title m-2">
        <h1 class="font-bold">Register User</h1>
      </div>
      <form @submit="registerUser($event)">
        <div class="flex flex-col text-left">
          <label for="username">Name</label>
          <InputText
            class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            id="username"
            v-model="registerObj.name"
          />
          <!-- <small id="username-help">Enter your username to reset your password.</small> -->
        </div>
        <div class="flex flex-col text-left">
          <label for="username">Username</label>
          <InputText
            class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            id="username"
            v-model="registerObj.user"
          />
          <!-- <small id="username-help">Enter your username to reset your password.</small> -->
        </div>
        <div class="flex flex-col">
          <label for="username">Password</label>
          <InputText
            type="password"
            class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            id="username"
            v-model="registerObj.password"
          />
        </div>
        <div class="flex flex-col">
          <label for="username">Confirm Pasword</label>
          <InputText
            type="password"
            class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            id="username"
            v-model="registerObj.confirmPassword"
          />
          <!-- <small id="username-help">Enter your username to reset your password.</small> -->
        </div>
        <div class="mt-3 flex justify-between sm:flex-col md:flex-col gap-3">
          <input
            class="w-full px-2 py-5 mb-5 text-md font-bold leading-none text-white transition duration-300 md:w-full rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-color_yellow hover:cursor-pointer"
            type="submit"
            value="Register User"
          />

          <input
            class="w-full py-5 mb-5 text-md font-bold leading-none text-white transition duration-300 md:w-full rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-color_blue"
            type="button"
            value="Log in"
            @click="mode = 1"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__login {
    min-height: 300px;
    max-height: auto;
    background-color: #d6d6d6;
    padding: 20px;
    width: 70%;
    margin: 0 auto;

    &-title {
      border-bottom: 2px solid gray;
      h1 {
        font-size: 2rem;
        text-align: center;
      }
    }
  }
}
</style>

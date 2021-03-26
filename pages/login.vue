<template>
  <Page :name="name" route="/login">
    <Card :name="name" width="400px" :expand="false">
      <template #body>
        <form>
          <ul>
            <li class="p-1">
              <InputControl label="Email">
                <input type="email" name="email" v-model="email" placeholder="user@email.com">
              </InputControl>
            </li>
            <li class="p-1">
              <InputControl label="Password">
                <input type="password" name="password" v-model="password" placeholder="password">
              </InputControl>
            </li>
            <li class="f-cr p-1">
              <Button color="success" @click.prevent="login" async :loading="loggingIn">
                Login
              </Button>
            </li>
          </ul>
        </form>
      </template>
    </Card>
  </Page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',

  data() {
    return {
      name: 'Login',
      email: 'chris.9540@gmail.com',
      password: '9540muffin',
      loggingIn: false
    }
  },
  computed: {
    ...mapState('auth', ['payload']),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('users', ['find']),
    async login() {
      this.loggingIn = true
      const credentials = { email: this.email, password: this.password }
      await this.authenticate({ ...credentials, strategy: 'local' })
      const {data} = await this.find({query:{id: this.payload.userId}})
      const {id, name, token, link} = data[0]
      console.log(data[0])
      if(!name || !token || !link) {
        this.$router.push(`/users/${id}`)
      }
      else{
        this.$router.push('/')
      }
    }
  }
}
</script>

<template>
  <Page name="Edit Race" route="/auth/races/:id">
    <Card name="Edit Race">
      <template #body>
        <ul>
          <li>
            <InputControl label="Name">
              <input type="text" name="name" v-model="race.name" />
            </InputControl>
          </li>
          <li>
            <InputControl label="Index">
              <input type="text" name="index" v-model="race.index" />
            </InputControl>
          </li>
          <li>
            <InputControl label="Description">
              <textarea name="description" v-model="race.description" />
            </InputControl>
          </li>
          <li>
            <InputControl label="D&D Beoynd Link">
              <input type="url" name="link" v-model="race.link" />
            </InputControl>
          </li>
          <li class="mt-1 f-cr">
            <Button color="primary" async :loading="saving" @click.prevent="save">Save</Button>
          </li>
        </ul>
      </template>
    </Card>
  </Page>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    async asyncData({params, store, axios}) {
      return store.dispatch('races/get', params.id)
        .then((race)=>{
          return { race }
        })
    },
    data() {
      return {
        saving: false
      }
    },
    methods: {
      ...mapActions('races', ['patch']),
      async save() {
        this.$nuxt.$loading.start()
        this.saving = true
        const {id, name, index, description, link} = this.race
        await this.patch([id, {name, index, description, link}])
        this.$nextTick(()=>{
          this.$nuxt.$loading.finish()
          this.saving = false
          this.$router.push('/auth/races')
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
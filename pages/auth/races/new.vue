<template>
  <Page name="New Race" route="/auth/races/new">
    <Card name="New Race">
      <template #body>
        <ul>
          <li>
            <InputControl label="Name">
              <input type="text" name="name" v-model="name" placeholder="Name" />
            </InputControl>
          </li>
          <li>
            <InputControl label="Index">
              <input type="text" name="index" v-model="index" placeholder="name"/>
            </InputControl>
          </li>
          <li>
            <InputControl label="Description">
              <textarea name="description" v-model="description" />
            </InputControl>
          </li>
          <li>
            <InputControl label="D&D Beoynd Link">
              <input type="url" name="name" v-model="link" placeholder="https://www.dndbeyond.com/races/name"/>
            </InputControl>
          </li>
          <li class="p-1 f-cr">
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
    name: 'new-race',
    data() {
      return {
        saving: false,
        name: '',
        index: '',
        description: '',
        link: '',
      }
    },
    methods: {
      ...mapActions('races', ['create']),
      async save() {
        this.$nuxt.$loading.start()
        this.saving = true
        const data = {
          name: this.name,
          index: this.index,
          description: this.description,
          link: this.link
        }
        await this.create(data)
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
<template>
  <Page :name="name" route="/auth/campaigns/new">
    <Card :name="name" width="800px">
      <template #body>
        <InputControl label="Name">
          <input type="text" v-model="data.name" name="name">
        </InputControl>
        <InputControl label="Description">
          <textarea ref="textarea" name="description" v-model="data.description"></textarea>
        </InputControl>
        <ul style="width:100%">
          <li v-for="player, key in data.campaignRoles" :key="key" class="p-3 player-wrap">
            <ul>
              <li class="f-cr" v-if="key > 0">
                <Button color="danger" @click="removePlayer" :payload="key">
                  Remove Player {{key}}
                </Button>
              </li>
              <li>
                <InputControl :label="(key > 0) ? 'Player ' + key : 'Dungeon Master'">
                  <select v-model="player.userId" name="player">
                    <option v-for="user in users" :key="user.id" :value="user.id">
                      {{ user.name }}
                    </option>
                  </select>
                </InputControl>
              </li>
              <li v-if="key > 0">
                <InputControl label="Character Sheet">
                  <input type="url" v-model="player.charaterSheet" name="charater_sheet">
                </InputControl>
              </li>
            </ul>
          </li>
          <li class="f-c mt-2">
            <Button color="secondary" @click.prevent="addPlayer">
              Add Player
            </Button>
          </li>
          <li class="f-cr mt-2">
            <Button color="primary" @click.prevent="save" async :loading="saving">
              Save
            </Button>
          </li>
        </ul>
      </template>
    </Card>
  </Page>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'new-campaign',
  asyncData({store}) {
    return store.dispatch('users/find', {query:{$limit:5000}}).then(users=>{
      return { users:  users.data }
    })
  },
  data() {
    return {
      name: 'Create Campaign',
      saving: false,
      data: {
        name: '',
        description: '',
        map: null,
        campaignRoles: [{role: 'dm', userId: ''}]
      }
    }
  },
  computed: {
    ...mapState('auth', ['accessToken', 'payload']),
  },
  methods: {
    ...mapActions('campaigns', ['create']),
    addPlayer() {
      this.data.campaignRoles.push({
        userId: '',
        role: 'player',
        charaterSheet: ''
      })
    },
    removePlayer(e, key) {
      e.preventDefault()
      this.data.campaignRoles.splice(key, 1)
    },
    async save () {
      this.$nuxt.$loading.start()
      this.saving = true
      const data = this.data
      data.owner = this.payload.userId
      await this.create(data)
      this.$nextTick(()=>{
        this.saving = false
        this.$nuxt.$loading.finish()
        this.$toast.success(`Campaign ${this.data.name} created`)
        this.$router.push('/auth/campaigns')
      })
    }
  }
}
</script>

<style lang="scss">
.player-wrap {
  border-bottom: 1px solid $primary;
}
</style>
<template>
  <Page :name="name" route="/campaigns/new">
    <Card :name="name" width="800px">
      <template #body>
        <InputControl label="Name">
          <input type="text" v-model="data.name" name="name">
        </InputControl>
        <InputControl label="Description">
          <textarea ref="textarea" name="description" v-model="data.description"></textarea>
        </InputControl>
        <InputControl label="Dungeon Master">
          <select v-model="data.dungeon_master">
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </InputControl>
        <ul style="width:100%">
          <li v-for="player, key in data.campaigne_roles" :key="key" class="p-3 player-wrap">
            <ul>
              <li class="f-cr">
                <Button color="danger" @click="removePlayer" :payload="key">
                  Remove Player {{key+1}}
                </Button>
              </li>
              <li>
                <InputControl :label="'Player ' + (key+1)">
                  <select v-model="player.userId" name="player">
                    <option v-for="user in users" :key="user.id" :value="user.id">
                      {{ user.name }}
                    </option>
                  </select>
                </InputControl>
              </li>
              <li>
                <InputControl label="Character Sheet">
                  <input type="url" v-model="player.charater_sheet" name="charater_sheet">
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
            <Button color="primary" @click.prevent="save">
              Save
            </Button>
          </li>
        </ul>
      </template>
    </Card>
  </Page>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  asyncData({params, store}) {
    return store.dispatch('users/find', {query:{$limit: 50000}}).then(users=>{
      console.log(users)
      return { users:  users.data }
    })
  },
  data() {
    return {
      name: 'Create Campaign',
      data: {
        name: '',
        description: '',
        dungeon_master: '',
        campaigne_roles: []
      }
    }
  },
  methods: {
    ...mapActions('campaigns', ['create']),
    addPlayer() {
      this.data.campaigne_roles.push({
        userId: '',
        role: 'player',
        charater_sheet: ''
      })
    },
    removePlayer(e, key) {
      e.preventDefault()
      this.data.campaigne_roles.splice(key, 1)
    },
    async save () {
      const {name, description, dungeon_master, campaigne_roles} = this.data
      const serviceData = {
        name,
        description,
        campaigne_roles: campaigne_roles.push({userId: dungeon_master, role: 'dm'})
      }
      const data = await this.create(serviceData)
      console.log(data)

    }
  }
}
</script>

<style lang="scss">
.player-wrap {
  border-bottom: 1px solid $primary;
}
</style>
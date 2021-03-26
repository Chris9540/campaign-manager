<template>
  <Page name="My Profile" route="/users/:id">
    <Card name="Update" width="700px">
      <template #body>
        <form v-if="user !== null" class="profile-form">
          <div class="token-selection ml-1 mr-1 mt-5">
            <div class="token-selected">
              <img v-if="user.token" :src="user.token" height="128px" width="128px">
            </div>
            <div class="f-c mt-2">
              <Button color="primary" @click.prevent="showTokens">
                Select Token
              </Button>
              <SweetModal v-if="hasModal" ref="tokens" overlay-theme="dark" modal-theme="dark" width="800px">
                <div class="token-display">
                  <div v-for="i in 918" :key="i" @click.prevent="selectToken(i)">
                    <img :src="`/img/tokens/player/${i}.webp`" :title="i">
                  </div>
                </div>
              </SweetModal>
            </div>
          </div>
          <ul style="width:100%">
            <li class="p-1">
              <InputControl label="Email">
                <input type="email" name="email" v-model="user.email" placeholder="user@email.com">
              </InputControl>
            </li>
            <li class="p-1">
              <InputControl label="Name">
                <input type="text" name="name" v-model="user.name" placeholder="User Name">
              </InputControl>
            </li>
            <li class="p-1">
              <InputControl label="Role">
                <select v-model="user.role">
                  <option value="player">Player</option>
                  <option value="dm">Dungeon Master</option>
                </select>
              </InputControl>
            </li>
            <li class="p-1">
              <InputControl label="Character Link">
                <input type="url" name="link" v-model="user.link" style="max-width: 100%" placeholder="https://dndbeoyond.com/">
              </InputControl>
            </li>
            <li class="f-cr p1">
              <Button color="success" @click.prevent="save" async :loading="updating">
                Save
              </Button>
            </li>
          </ul>
        </form>
      </template>
    </Card>
  </Page>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  asyncData({params, store}) {
    return store.dispatch('users/get', params.id).then((user)=>{
      return { user }
    })
  },
  data() {
    return {
      updating: false,
      hasModal: false
    }
  },
  methods: {
    ...mapActions('users', ['patch']),
    async save () {
      this.updating = true;
      const { id, name, email, role, link, token } = this.user;
      const patch = await this.patch([id, { email, name, link, role, token }])
      this.$nextTick(()=>{
        this.updating = false
        location.reload()
      })
    },
    showTokens() {
      this.hasModal = true;
      this.$nextTick(()=>{
        this.$refs.tokens.open()
      })
    },
    selectToken(id) {
      this.user.token = `/img/tokens/player/${id}.webp`;
      this.$refs.tokens.close()
      setTimeout(()=>{
        this.$nextTick(()=>{
          this.hasModal = false
        })
      }, 1000)
    }
  },
}
</script>

<style lang="scss">
$box: 64px;
.profile-form {
  display: flex;
  flex-direction: row;
  .token-selection {
    height: 100%;
    width: calc(128px + #{$size-2});
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .token-selected {
      width: calc(128px + #{$size-2});
      height: calc(128px + #{$size-2});
      padding: $size-1;
      background-color: $grey-2;
    }
  }
  .token-display {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    height: 80vh;
    overflow-y: scroll;
    div {
      margin: $size-1;
      height: $box;
      width: $box;
      border-radius: 50%;
      transition: $transition;
      &:hover {
        box-shadow: 0px 0px 10px 0px $primary;
      }
      img {
        border-radius: 50%;
        height: $box;
        width: $box;
      }
    }
  }
}
</style>
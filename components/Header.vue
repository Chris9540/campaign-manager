<template>
  <div class="header-root">
      <NuxtLink to="/" class="header-left">
        <h3>
          <fa icon="robot" class="header-icon" />
          Campaign Manager
        </h3>
    </NuxtLink>
    <div class="header-center">
      <div class="menu">
        <div ref="display" class="display">
          <div class="name">
            <span>
              {{ name }}
            </span>
          </div>
          <div class="menu-icon" :data-spin="(show)? 'up': 'down'" @click="toggle" v-if="isAuthenticated">
            <fa icon="chevron-down" />
          </div>
        </div>
        <div class="dropdown elevation-1" :style="width" :data-show="show" @click="toggle" v-if="isAuthenticated">
          <ul class="dropdown-list">
            <li v-for="(item, key) in menu.left" :key="key" class="list-item">
              <NuxtLink :to="item.link" class="nav-item">
                <fa :icon="item.icon" class="mr-1" />
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
          <div class="seperator">
            <div></div>
          </div>
          <ul class="dropdown-list">
            <li v-for="(item, key) in menu.right" :key="key" class="list-item">
              <NuxtLink :to="item.link" class="nav-item">
                <fa :icon="item.icon" class="m-1" />
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-right">
      <template v-if="!isAuthenticated">
        <Button color="success" class="mr-1" @click.prevent="$router.push('/login')">
          Login
        </Button>
        <Button color="secondary" class="mr-1" @click.prevent="$router.push('/signup')">
          Signup
        </Button>
      </template>
      <template v-else>
        <Button color="primary" icon class="mr-1" @click.prevent="showProfile">
          <fa icon="user" />
        </Button>
        <div class="profile-dropdown elevation-1" :data-show="profile">
          <ul v-if="user">
            <template v-if="user.link && user.name && user.token">
              <li class="f-c p-1">
                <img :src="user.token" height="128px" width="128px">
              </li>
              <li class="f-c p-1">
                <h3 class="text-secondary m-0">
                  {{ user.name }}
                </h3>
                <i style="font-size: 80%;" class="ml-1">[{{ user.role }}]</i>
              </li>
              <li class="f-c p-1">
                <a :href="user.link" target="_blank" @click="close">
                  <Button color="secondary">
                    Character Sheet
                  </Button>
                </a>
              </li>
            </template>
            <template v-else>
              <li class="f-c p-1">
                <h3 class="text-secondary">
                  Finish Profle
                </h3>
              </li>
            </template>
            <li class="f-c p-1">
              <Button color="success" @click.prevent="goToProfile">
                Profile
              </Button>
            </li>
            <li class="f-c p-1">
              <Button color="danger" @click.prevent="exit">
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </template>
    </div>
    <div v-if="show || profile" class="header-overlay" @click="close">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Header',

  computed: {
    ...mapState('auth', ['accessToken', 'payload']),
    isAuthenticated() {
      return this.accessToken;
    },
    name () {
      return this.$store.state.page.name
    },
    menu() {
      return {
        left: [
          {text: 'Campaigns', link: '/auth/campaigns', icon: 'route'}
        ],
        right: [
          {text: 'Maps', link: `/auth/users/${this.payload.userId}`, icon: 'map'}
        ]
      }
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('users', ['get']),
    async exit() {
      const data = await this.logout()
      this.$router.push('/')
    },
    close() {
      this.show = false
      this.profile = false
    },
    toggle () {
      const next = !this.show
      if (next) {
        this.width.width = `${this.$refs.display.clientWidth}px`
      }
      this.show = next
    },
    async showProfile () {
      if (this.user === null) {
        this.user = await this.get(this.payload.userId)
      }
      this.$nextTick(()=>{
        this.profile = !this.profile
      })
    },
    goToProfile () {
      this.close()
      this.$router.push(`/users/${this.payload.userId}`)
    }
  },

  data () {
    return {
      show: false,
      profile: false,
      user: null,
      width: {
        width: ''
      }
    }
  }
}
</script>

<style lang="scss">
.header-root {
  height: 100%;
  width: 100%;
  background-color: $header-bg;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .header-left, .header-center, .header-right {
    height: 100%;
  }
  .header-left {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: $transition;
    color: $primary;
    text-decoration: none;
    cursor: pointer;
    .header-icon {
      margin-left: $size-1;
      margin-right: $size-1;
    }
    &:hover {
      color: white;
    }
  }
  .header-center {
    flex: 2;
    border-left: 1px solid $grey-2;
    border-right: 1px solid $grey-2;
    .menu {
      height: 100%;
      width: 100%;
      border-top: 1px solid $header-bg;
      border-bottom: 1px solid $header-bg;
      border-left: 1px solid $grey-5;
      border-right: 1px solid $grey-5;
      color: white;
      .display {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr $header-height - 2px;
        grid-template-rows: 100%;
        font-weight: bold;
        .name, .menu-icon {
          display: flex;
          align-items: center;
        }
        .name {
          span {
            margin-left: calc(50% + 20px);
            transform: translateX(-50%);
          }
        }
        .menu-icon {
          transition: $transition;
          justify-content: center;
          border-left: 1px solid $grey-5;
          cursor: pointer;
          &:hover {
            color: $primary;
          }
          &[data-spin="up"] {
            svg {
              transition: $transition;
              transform: rotateZ(-180deg) !important;
            }
          }
          &[data-spin="down"] {
            svg {
              transition: $transition;
              transform: rotateZ(-360deg) !important;
            }
          }
        }
      }
      .dropdown {
        position: fixed;
        top: $header-height;
        z-index: 900;
        height: 0;
        background-color: $grey-2;
        transition: all ease-out 0.25s;
        overflow: hidden;
        display: grid;
        grid-template-columns: 1fr 1px 1fr;
        grid-template-rows: 100%;
        &[data-show="true"] {
          height: 200px !important;
        }
        .seperator {
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            width: 1px;
            height: 180px;
            background-color: $grey-5;
          }
        }
        .dropdown-list {
          margin: 0;
          padding: 0;
          list-style: none;
          .list-item {
            height: 50px;
            width: 100%;
            padding: $size-1 $size-2;
            .nav-item {
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              text-decoration: none;
              transition: $transition;
              &:hover {
                color: $primary;
                background-color: $grey-3;
              }
            }
          }
        }
      }
    }
  }
  .header-right {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .profile-dropdown {
      position: fixed;
      display: block;
      overflow: hidden;
      right: $size-1;
      height: 0px;
      width: 200px;
      top: $header-height;
      z-index: 900;
      background-color: $grey-2;
      transition: all ease-out 0.25s;
      &[data-show="true"] {
        height: 350px !important;
      }
    }
  }
  .header-overlay {
    width: 100vw;
    height: calc( 100vh - #{$header-height});
    z-index: 800;
    position: fixed;
    top: $header-height;
    left: 0;
  }
}
</style>


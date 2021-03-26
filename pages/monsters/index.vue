<template>
  <Page name="Monsters" route="/monsters">
    <ul style="width: 800px">
      <li v-for="monster in monsters" :key="monster.index" class="mt-2 mb-2">
        <div class="monster-display">
          <div class="bar">
            <h3 class="text-secondary monster-name">
              {{ monster.name }}
            </h3>
            <a :href="`https://www.dndbeyond.com/monsters/${monster.index}`" target="_blank">
              <Button color="primary" class="mr-1">
                View On DnD Beyond
              </Button>
            </a>
          </div>
          <div class="monster-picture">
            <img v-if="tokens.includes(`${monster.index}.png`)" :src="`/img/tokens/monster/${monster.index}.png`" height="64px" width="64px">
            <div class="monster-picture-unknown" v-else>?</div>
          </div>
        </div>
      </li>
    </ul>
  </Page>
</template>

<script>
const fs = (process.server ? require('fs-extra') : null)
export default {
  async asyncData({$axios}) {
    const apiMonsters = await $axios.$get('https://www.dnd5eapi.co/api/monsters')
    const images = fs.readdirSync('./static/img/tokens/monster').filter(file=>file.endsWith('.png'))
    return { 
      tokens: images,
      monsters: apiMonsters.results
    };
  }
}
</script>

<style lang="scss">
.monster-display {
  display: grid;
  height: 64px;
  width: 100%;
  grid-template-columns: 32px 32px 1fr;
  grid-template-rows: 8px 46px 8px;
  .bar {
    grid-column: 2 / -1;
    grid-row: 2 / 3;
    background-color: $grey-2;
    display: flex;
    align-items: center;
    padding-left: 40px;
    .monster-name {
      flex: 1;
    }
  }
  .monster-picture {
    grid-column: 1 / 3;
    grid-row: 1 / -1;
    background-color: $grey-2;
    border-radius: 50%;
    transition: $transition;
    height: 64px;
    width: 64px;
    .monster-picture-unknown {
      height: 64px;
      width: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      font-weight: bold;
    }
    &:hover {
      box-shadow: 0px 0px 5px 0px $primary;
    }
  }
}
</style>
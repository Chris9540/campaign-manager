<template>
  <Page name="Edit World" route="/auth/campaigns/:campaignId/worlds/:worldId">
    <Card name="Edit World">
      <template #body>
        <ul>
          <li>
            <InputControl label="Name">
              <input type="text" name="name" v-model="world.name" />
            </InputControl>
          </li>
          <li>
            <InputControl label="Description">
              <textarea name="description" v-model="world.description" />
            </InputControl>
          </li>
        </ul>
      </template>
    </Card>
    <ViewKingdoms :campaignId="world.campaign_id" :worldId="world.id" />
  </Page>
</template>

<script>
  export default {
    async asyncData({params, store}) {
      return store.dispatch('worlds/get', params.worldId)
        .then((world)=>{
          return { world }
        })
    },
  }
</script>

<style lang="scss" scoped>

</style>
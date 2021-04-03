<template>
  <Page name="All worlds" route="/auth/campaigns/:campaignId/worlds/">
    <ViewWorlds :campaignId="campaignId" />
  </Page>
</template>

<script>
  export default {
    asyncData({params}) {
      return { campaignId : parseInt(params.campaignId)}
    },
  }
</script>

<style lang="scss" scoped>

</style>
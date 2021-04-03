<template>
  <Card name="Worlds">
    <template #body>
      <ul>
        <li class="p-1 f-cr">
          <Button color="primary" @click.prevent="$router.push(`/campaigns/${campaignId}/worlds/new`)">Add New World</Button>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script>
  export default {
    props: {
      campaignId: {
        type: Number,
        required: true
      }
    },
    mounted () {
      console.log('ID =', this.campaignId);
    },
  }
</script>

<style lang="scss" scoped>

</style>
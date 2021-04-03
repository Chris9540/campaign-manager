<template>
  <Card name="Kingdoms">
    <template #body>
      <li class="f-cr">
        <Button color="primary" @click.prevent="newKingdom">text</Button>
      </li>
    </template>
  </Card>
</template>

<script>
  export default {
    props: {
      campaignId: {
        type: Number,
        required: true
      },
      worldId: {
        type: Number,
        required:true
      }
    },
    methods: {
      newKingdom() {
        this.$router.push(`/auth/campaigns/${this.campaignId}/worlds/${this.worldId}/kingdoms/new`)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
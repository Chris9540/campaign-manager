<template>
  <Card name="Worlds">
    <template #body>
      <ul>
        <li class="p-1 f-cr">
          <Button color="primary" @click.prevent="$router.push(`/auth/campaigns/${campaignId}/worlds/new`)">Add New World</Button>
        </li>
        <template v-if="worlds">
          <li v-for="(world, key) in worlds.data" :key="key" class="p-1 mt-1 mb-1 world-list-item">
            <div class="world-detail">
                <h3 class="text-secondary">
                  {{ world.name }}
                </h3>
                <div class="mt-1">
                  {{ world.description }}
                </div>
            </div>
            <div class="world-buttons">
              <Button color="secondary" @click.prevent="$router.push(`/auth/campaigns/${campaignId}/worlds/${world.id}`)" class="mr-1">Edit</Button>
              <Button color="danger" @click.prevent="$router.push(``)">Delete</Button>
            </div>
          </li>
        </template>
      </ul>
    </template>
  </Card>
</template>

<script>
  export default {
    data() {
      return {
        worlds: null
      }
    },
    props: {
      campaignId: {
        type: Number,
        required: true
      }
    },
    async mounted () {
      const worlds = await this.$store.dispatch('worlds/find', {query: {campaign_id : this.campaignId, $limit: 50}})
      this.worlds = worlds
    },
  }
</script>

<style lang="scss" scoped>
.world-list-item {
  display: flex;
  flex-direction: row;
  background-color: $grey-2;
  border: 1px solid $grey-4;
  .world-detail {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .world-buttons {
    display: flex;
    flex-direction: row;
  }

}
</style>
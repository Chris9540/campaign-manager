<template>
  <Page name="Edit Campaign" route="/campaign/:id">
    <Card name="Edit Campaign">
      <template #body>
        <Layout rowHeight="42px" :layout="layout" :margin="[10, 8]">
          <LayoutItem v-bind="getLayout(0)">
            <InputControl label="Name">
              <input type="text" name="name" v-model="campaign.name" style="max-width: 100%"/>
            </InputControl>
          </LayoutItem>
          <LayoutItem v-bind="getLayout(1)">
            <InputControl label="Description" :bindHeight="false" labelPos="top">
              <textarea ref="textarea" name="description" v-model="campaign.description" class="grid-text-area"></textarea>
            </InputControl>
          </LayoutItem>
          <LayoutItem v-bind="getLayout(2)"/>
          <LayoutItem v-bind="getLayout(3)"/>
          <LayoutItem v-bind="getLayout(4)"/>
        </Layout>
      </template>
    </Card>
  </Page>
</template>

<script>
  export default {
    asyncData({params, store}) {
      return store.dispatch('campaigns/get', params.id).then((campaign)=>{
        return { campaign }
      })
    },

    data() {
      return {
        layout: [
          { x: 0, y: 0, w: 10, h: 1},
          { x: 0, y: 1, w: 6, h: 5 },
          { x: 6, y: 1, w: 4, h: 1 },
          { x: 6, y: 2, w: 4, h: 1 },
          { x: 6, y: 3, w: 4, h: 1 }
        ]
      }
    },
    methods: {
      getLayout(index) {
        const {x,y,w,h} = this.layout[index]
        return {x,y,w,h}
      }
    },
    mounted () {
      console.log(this.campaign);
    },
  }
</script>

<style lang="scss" scoped>
.grid-text-area {
  height: calc(242px - .750rem);
  max-height: calc(242px - .750rem);
  min-height: calc(242px - .750rem);
  max-width: 100%;
}
</style>
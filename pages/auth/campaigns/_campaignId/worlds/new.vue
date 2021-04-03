<template>
  <Page name="New World" route="/auth/campaigns/:campaignId/worlds/new">
    <Card name="New World">
      <template #body>
        <ul>
          <li>
            <InputControl label="Name">
              <input type="text" name="name" v-model="name"/>
            </InputControl>
          </li>
          <li>
            <InputControl label="Description">
              <textarea  name="description" v-model="description"/>
            </InputControl>
          </li>
          <li>
            <InputControl label="Map SVG">
              <FileUpload v-model="mapSVG" name="Map.svg" accept=".svg"/>
            </InputControl>
          </li>
          <li>
            <InputControl label="Burgs">
              <FileUpload text v-model="burgJson" name="Burgs.csv" accept=".csv"/>
            </InputControl>
          </li>
          <li>
            <InputControl label="Markers">
              <FileUpload text v-model="markerJson" name="Markers.geojson" accept=".geojson"/>
            </InputControl>
          </li>
          <li>
            <Button color="primary" @click.prevent="save" async :loading="saving">Save</Button>
          </li>
        </ul>
      </template>
    </Card>
  </Page>
</template>

<script>
import {mapActions} from 'vuex'
import csvToJson from '../../../../../helpers/csvToJson';
export default {
  asyncData({params}) {
    return { campaignId : params.campaignId }
  },
  data() {
    return {
      saving: false,
      name: '',
      description: '',
      mapSVG: {},
      burgJson: {},
      markerJson: {}
    }
  },
  methods: {
    ...mapActions({createUpload: 'uploads/create'}),
    ...mapActions({createWorld: 'worlds/create'}),
    async save() {
      this.$nuxt.$loading.start()
      this.saving = true
      const upload = await this.createUpload({uri : this.mapSVG.uri})
      const data = {
        name: this.name,
        description: this.description,
        map_svg: upload.id,
        burg_json: csvToJson(this.burgJson.uri),
        marker_json: JSON.stringify(JSON.parse(this.markerJson.uri).features),
        campaign_id: this.campaignId
      }
      await this.createWorld(data)
      this.$nextTick(()=>{
        this.$nuxt.$loading.finish()
        this.saving = false
        this.$router.push(`/auth/campaigns/${this.campaignId}`)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
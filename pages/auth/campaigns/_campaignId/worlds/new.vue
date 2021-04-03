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
              <FileUpload v-model="mapSVG"/>
            </InputControl>
          </li>
          <li>
            <InputControl label="Burgs">
              <FileUpload json v-model="burgJson"/>
            </InputControl>
          </li>
          <li>
            <InputControl label="Markers">
              <FileUpload json v-model="markerJson"/>
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
const cstToJson = require('../../../../../helpers/csvToJson')
export default {
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
    ...mapActions('uploads', ['create']),
    async save() {
      
      const uri = this.mapSVG.uri
      const csv = csvToJson(this.burgJson.uri)
      const json = JSON.parse(this.markerJson.uri)
      // const upload = await this.create({uri : this.mapSVG.uri})
      console.log(uri, '\n', csv, '\n', json)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
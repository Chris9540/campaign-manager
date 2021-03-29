<template>
  <Page name="Campaigns" route="/campaigns">
    <div style="width:100%" class="f-cr mb-1">
      <Button color="primary" @click.prevent="$router.push('/campaigns/new')">
        New Campaign
      </Button>
    </div>
    <Card name="All Campaigns" nopad :expand="false">
      <template #body>
        <DataTable :fields="fields" service="campaigns" debug>
          <template v-slot:buttons="{data}">
            <Button color="secondary" @click.prevent="$router.push(`/campaigns/${data.id}`)">
              Edit
            </Button>
          </template>
        </DataTable>
      </template>
    </Card>
    <Card name="All Campaigns">
      <template #body>
          <img :src="require('~/assets/uploads/a6c8f25f8d5dd0a396c4b45786778066c794c00d6b1751bd2b35545a40aafd3c.jpeg')">
        <FileUpload v-model="file"/>
        <Button @click.prevent="log">Log</Button>
      </template>
      
    </Card>
  </Page>
</template>

<script>
import {mapActions} from 'vuex'
import { formatUser } from '../../helpers/format'

export default {
  data() {
    return {
      file: null,
      fields: [
        {label: 'Name', key: 'name', sortable: true},
        {label: 'Description', key: 'description', sortable: false},
        {label: 'Owner', key: 'owner', sortable: false, format: formatUser('campaign_owner')}
      ]
    }
  },
  methods: {
    ...mapActions('uploads', ['create']),
    log(){
      console.log(this.file)
    }
  },
}
</script>

<style>

</style>
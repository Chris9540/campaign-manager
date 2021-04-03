<template>
  <Page name="Campaigns" route="/auth/campaigns">
    <div style="width:100%" class="f-cr mb-1">
      <Button color="primary" @click.prevent="$router.push('/auth/campaigns/new')">
        New Campaign
      </Button>
    </div>
    <Card name="All Campaigns" nopad :expand="false">
      <template #body>
        <DataTable :fields="fields" service="campaigns">
          <template v-slot:buttons="{data}">
            <Button color="secondary" @click.prevent="$router.push(`/auth/campaigns/${data.id}`)">
              Edit
            </Button>
          </template>
        </DataTable>
      </template>
    </Card>
  </Page>
</template>

<script>
import { formatPlayers } from '../../../helpers/format'

export default {
  name: 'campaigns',
  data() {
    return {
      file: null,
      fields: [
        {label: 'Name', key: 'name', sortable: true},
        {label: 'Description', key: 'description', sortable: false},
        {label: 'Players', key: 'players', sortable: false, format: formatPlayers('campaign_players')}
      ]
    }
  },
}
</script>

<style>

</style>
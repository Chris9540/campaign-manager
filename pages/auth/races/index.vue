<template>
  <Page name="Races" route="/auth/races">
    <div style="width:100%" class="f-cr mb-1">
      <Button color="primary" @click.prevent="$router.push('/auth/races/new')">
        New Race
      </Button>
    </div>
    <Card name="Races" nopad>
      <template #body>
        <DataTable :fields="fields" service="races">
          <template v-slot:buttons="{data}">
            <Button color="secondary" @click.prevent="$router.push(`/auth/races/${data.id}`)">Edit</Button>
            <a :href="data.link" target="_blank" class="ml-1">
              <Button color="success">
                View On DnD Beyond
              </Button>
            </a>
          </template>
        </DataTable>
      </template>
    </Card>
  </Page>
</template>

<script>
  export default {
    name: 'races',
    data() {
      return {
        fields: [
          {label: 'Name', key: 'name', sortable: true},
          {label: 'Index', key: 'index', sortable: false},
          {label: 'Desctiption', key: 'description', sortable : false}
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
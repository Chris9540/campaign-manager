<template>
  <Page name="Campaigns" route="/campaigns">
    <div style="width:100%" class="f-cr mb-1">
      <Button color="primary" @click.prevent="$router.push('/campaigns/new')">
        New Campaign
      </Button>
    </div>
    <Card name="All Campaigns">

    </Card>
  </Page>
</template>

<script>
export default {

}
</script>

<style>

</style>
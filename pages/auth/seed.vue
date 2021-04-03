<template>
  <Page name="Seed Data" route="/auth/seed">
    <Card name="Json" nopad>
      <template #body>
        <v-jsoneditor v-model="json" :options="{mode: 'code', mainMenuBar : false}"  :plus="false" height="400px" />
      </template>
    </Card>
  </Page>
</template>

<script>
  
  export default {
    data() {
      return {
        json: {
          table : [
            
          ]
        }
      }
    },
  }
</script>

<style lang="scss">
.jsoneditor {
  border: none !important;
  .ace_gutter {
    background-color: $card-head-bg;
    color: white;
    .ace_gutter-active-line {
      background-color: $card-head-bg;
      color: $secondary;
    }
  }
  .ace_content {
    background-color: $card-body-bg;
    color: white;
    .ace_active-line {
      background-color: lighten($card-body-bg, 5%);
    }
  }
  .ace_text-layer, .ace_variable {
    color: white !important;
  }
  .ace_variable {
    color: $primary !important;
  }
  .ace_string, .ace_numeric {
    color: $secondary !important;
  }
}
</style>
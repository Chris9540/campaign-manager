<template>
  <Page name="New Kingdom" route="/autn/campaigns/:campaignId/worlds/:worldId/kingdoms/new">
    <Card name="New Kingdom">
      <template #body>
        <ul>
          <li>
            <InputControl label="Name">
              <input type="text" name="name" v-model="name" />
            </InputControl>
          </li>
          <li>
            <InputControl label="Description">
              <textarea name="description" v-model="description" />
            </InputControl>
          </li>
          <li>
              <ViewBox ref="map" :fileName="world.map_svg" v-model="view_box"/>
          </li>
          <li class="f-c p-1">
            <h3>
              Link Burgs (Town / City/ Capital)
            </h3>
          </li>
          <li class="p-1">
            <Pill color="secondary" v-for="(b, k) in burgs" :key="k+ '_burg_pill'">{{b.Burg}}</Pill>
          </li>
          <li class="f-c">
            <Button color="secondary" @click.prevent="()=>{showBurgs = !showBurgs}">
              {{ (showBurgs) ? 'Hide ' : 'Show ' }}List
            </Button>
          </li>
          <li class="f-c" v-if="showBurgs">
            <div style="width: 600px">
              <InputControl label="Search">
                <input type="search" name="burg-search" v-model="burgSearch"/>
              </InputControl>
            </div>
          </li>
          <li v-for="(b, k) in world.burg_json" :key="k+'_burg'" class="f-c">
            <template v-if="b.Burg">
              <div :style="shouldDisplayBurg(b.Burg)">
                <InputControl :label="b.Burg">
                  <input type="checkbox" name="burg" style="max-width: 30px" @change="(e)=>{toggleBurg(e.target.checked, b)}"/>
                </InputControl>
              </div>
            </template>
          </li>
          <li class="f-c p-1">
            <h3>Link Markers (Points Of Intrest)</h3>
          </li>
          <li class="p-1">
            <Pill color="secondary" v-for="(m, k) in markers" :key="k+'_marker_pill'">{{m.properties.name}}</Pill>
          </li>
          <li class="f-c">
            <Button color="secondary" @click.prevent="()=>{showMarkers = !showMarkers}">
              {{ (showMarkers) ? 'Hide ' : 'Show ' }}List
            </Button>
          </li>
          <li class="f-c" v-if="showMarkers">
            <div style="width: 600px">
              <InputControl label="Search">
                <input type="search" name="marker-search" v-model="markerSearch" />
              </InputControl>
            </div>
          </li>
          <li v-for="(m, k) in world.marker_json" :key="k+'_marker'">
            <div :style="shouldDisplayMarker(m.properties)">
              <InputControl :label="m.properties.name + ': ' + m.properties.legend + ' [' + m.properties.type.split('_').join(' ') + ']'">
                <input style="max-width: 30px" type="checkbox" name="marker" @change="(e)=>{toggleMarker(e.target.checked, m)}"/>
              </InputControl>
            </div>
          </li>
          <li class="f-cr">
            <Button color="primary" @click.prevent="save">Save</Button>
          </li>
        </ul>
      </template>
    </Card>
  </Page>
</template>

<script>
  export default {
    async asyncData({params, store}) {
      const campaign = await store.dispatch('campaigns/get', params.campaignId)
      const world = await store.dispatch('worlds/get', params.worldId)
      world.burg_json = JSON.parse(world.burg_json)
      world.marker_json = JSON.parse(world.marker_json)
      return {campaign, world}
    },
    name: 'new-kingdom',
    data() {
      return {
        name: '',
        description: '',
        view_box: '',
        burgs: [],
        burgSearch: '',
        showBurgs: false,
        markers: [],
        markerSearch: '',
        showMarkers: false,
      }
    },
    mounted () {
      console.log('campaign', this.campaign, '\nworld', this.world);
    },
    methods: {
        shouldDisplayBurg(burg) {
          const style = {width: '300px'}
          
          if(this.burgSearch.length > 2 || this.showBurgs === false) {
            if(!burg.toLowerCase().includes(this.burgSearch.toLowerCase()) || this.showBurgs === false) {
              style.display = 'none'
            }
          }
          return style
        },
        toggleBurg(checked, burg) {
          const circle = this.$refs.map.$el.querySelector('#burg'+ burg.Id)
          if(checked) {
            this.burgs.push(burg)
            circle.style.fill = 'red'
            circle.setAttribute('r', '2')
            console.log(circle)
          }
          else {
            this.burgs = this.burgs.slice(0).filter(item=>{
              return item.Id !== burg.Id
            })
            circle.style.fill = ''
            circle.setAttribute('r', '0.5')
          }
        },
        shouldDisplayMarker(marker) {
          const style = {}
          if(this.markerSearch.length > 2 || this.showMarkers === false) {
            const {name, type, legend} = marker
            const search = [name | '', type | '', legend | ''].join(' ').split('_').join(' ').toLowerCase()
            if(search.includes(this.markerSearch.toLowerCase()) || this.showMarkers === false ) {
              style.display = 'none'
            }
          }
          return style
        },
        toggleMarker(checked, marker) {
          if(checked) {
            this.markers.push(marker)
          }
          else {
            this.markers = this.markers.slice(0).filter(item=>{
              return item.properties.id !== marker.properties.id
            })
          }
        },
        save() {
          const data = {
            name: this.name,
            description: this.description,
            view_box: this.view_box,
            burgs: [],
            markers: [],
          }
          this.burgs.forEach(burg => {
            data.burgs.push({
              name: burg.Burg,
              capital: (burg.Capital === 'capital'),
              port: (burg.Port === 'port'),
              citadel: (burg.Citadel === 'citadel'),
              walls: (burg.Walls === 'walls'),
              plaza: (burg.Plaza === 'plaza'),
              temple: (burg.Temple === 'temple'),
              shanty_town: (burg['Shanty Town'] === 'shanty town'),
              population: parseInt(burg.Population),
              burg_id: `burg${burg.Id}`
            })
          });
          this.markers.forEach(marker => {
            const {name, id, legend} = marker.properties
            data.markers.push({
              name,
              marker_id: id,
              description: leg,
            })
          })
          console.log('data', data)
        }
    },
  }
</script>

<style lang="scss" scoped>

</style>
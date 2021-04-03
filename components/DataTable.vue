<template>
  <div class="data-table-root">
    <div class="data-table-filter">

    </div>
    <table v-if="!updating" cellspacing="0" width="100%" class="data-table" ref="table">
      <thead>
        <tr class="data-table-header-row">
          <th v-for="field in fields" :key="field.key" class="data-table-header-cell">
            <div class="data-table-header-sort" v-if="field.sortable">
              <div @click.prevent="sortColumn(field.key, 1)">
                <fa icon="sort-up" :class="(activeSort.key === field.key && activeSort.dir === 1) ? 'active-sort': ''"/>
              </div>
              <div 
              :class="(activeSort.key === field.key && activeSort.dir === -1) ? 'data-table-sort-down active-sort': 'data-table-sort-down'"
              @click.prevent="sortColumn(field.key, -1)">
                <fa icon="sort-down" />
              </div>
            </div>
            {{ field.label }}
          </th>
          <th v-if="hasSlot('buttons')">
          </th>
        </tr>
      </thead>
      <tbody ref="tbody" class="data-table-body">
            <tr v-for="row in data" :key="row.id" class="data-table-row">
              <td v-for="field in fields" :key="field.key" class="data-table-cell" v-html="displayField(row, field)"/>
              <td v-if="hasSlot('buttons')" class="f-cr data-table-cell">
                <slot name="buttons" :data="row" />
              </td>
            </tr>
      </tbody>
    </table>
    <div v-if="!data || data.length === 0 " class="f-c p-1">
      <h3>
        Sorry theres no data hear yet
      </h3>
    </div>
    <div v-if="updating" class="data-table-updating f-c p-1">
      <fa icon="circle-notch" class="fa-spin mb-1"/>
      Loading...
    </div>
    <div class="data-table-pagination p-1">
      <div class="data-table-fetch-limit">
        <label>
          size
        </label>
          <select v-model="limit" class="ml-1">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
          </select>
          <div class="ml-2">
            {{ skip+1 }} to {{ Math.min(skip+limit,total) }} of {{ total }}
          </div>
      </div>
      <div class="data-table-pagination-options f-cr">
        <Button v-if="skip > 0" color="default" @click.prevent="current--">
          Previous
        </Button>
        <div class="ml-1 mr-1">
          <label>
            page
          </label>
          <select v-model="current">
            <option v-for="page in pages" :value="page-1" :key="page">{{page}}</option>
          </select>
        </div>
        <Button v-if="current+1 < pages" color="default" @click.prevent="current++">
          Next
        </Button>
        <div v-else style="width:100px" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData() {
      await this.getData()
    },
    props: {
      service: {
        type: String,
        required: true
      },
      fields: {
        type: Array,
        default: [{
          label: 'Id',
          key: 'id'
        }]
      },
      debug: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        minLoad: 500,
        updating: false,
        total: null,
        limit: 20,
        skip: 0,
        pages: 0,
        data: null,
        current: 0,
        sort: null,
        activeSort: {
          key: null,
          dir: null,
        }
      }
    },
    mounted () {
      if (!this.data) {
        this.getData();
      }
    },
    watch:{
      limit(newValue, oldValue) {
        if(newValue !== oldValue) {
          this.getData()
        }
      },
      skip(newValue, oldValue) {
        if(newValue !== oldValue) {
          this.getData()
        }
      },
      current(newValue, oldValue) {
        if(newValue !== oldValue) {
          this.skip = parseInt(newValue) * this.limit
        }
      }
    },
    methods: {
      hasSlot (name = 'default') {
        return !!this.$slots[ name ] || !!this.$scopedSlots[ name ];
      },
      sortColumn(key, dir) {
        let sort = {}
        sort[key] = dir
        this.sort = sort
        this.activeSort = {key, dir}
        this.$nextTick(()=>{
          this.getData()
        })
      },
      displayField (row, { key, format }) {
        const data = row[key]
        if (format && typeof format === 'function') {
          return format(data, key, row);
        }
        return data;
      },
      async getData() {
        const start = this.$moment({})
        this.$nuxt.$loading.start()
        this.updating = true
        let sort = {}
        if(!this.sort) {
          const key = this.fields[0].key
          sort[key] = 1
          this.sort = sort
          this.activeSort = {key, dir:1}
        }
        else{
          sort = this.sort
        }
        const {total, limit, skip, data} = await this.$store.dispatch(`${this.service}/find`, {query:{
          $limit: this.limit,
          $skip: this.skip,
          $sort: sort,
        }})
        this.total = total
        this.limit = limit
        this.skip = skip
        this.data = data
        this.pages = Math.ceil(total/limit);
        if(this.debug) {
          console.log('total', total, '\nlimit', limit, '\nskip', skip, '\ndata', data, '\npages', this.pages, '\nsort', sort);
        }
        this.$nextTick(()=>{
          const diff = this.$moment({}).diff(start, 'milliseconds')
          if (diff < this.minLoad) {
            setTimeout(() => {
              this.$nuxt.$loading.finish()
              this.updating = false
            }, this.minLoad - diff);
          }
          else {
            this.$nuxt.$loading.finish()
            this.updating = false
          }
        })
      },
    },
  }
</script>

<style lang="scss">
.data-table-root{
  width: 100%;
  .data-table-filter{
    width: 100%;
  }
  .data-table {
    border-collapse: collapse;
    transition: $transition;
    .data-table-header-row {
      background-color: $grey-2;
      .data-table-header-cell {
        .data-table-header-sort {
          float: left;
          height: 22px;
          width: 16px;
          padding-left: -$size-1;
          margin: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .active-sort {
            color: $secondary !important;
          }
          .data-table-sort-down {
              svg{
                position: relative;
                top: -9px;
              }
          }
          div {
            font-size: 18px;
            line-height: 18px;
            overflow: hidden;
            height: 11px;
            color: white;
            cursor: pointer;
            transition: $transition;
            :hover {
              color: $primary;
            }
            svg {
              transition: $transition;
              vertical-align: 0;
            }
          }
        }
        font-weight: bold;
        text-align: left;
        padding: $size-1;
        color: $secondary;
        font-size: 106%;
      }
    }
    .data-table-body {
      transition: $transition;
      tr:first-child {
        border-top-color: $primary !important;
      }
      tr:last-child {
        border-bottom: 1px solid $primary !important;
      }
      .data-table-row {
        .data-table-cell {
          padding: $size-1;
        }
        &:nth-of-type(odd) {
          border-bottom: 1px solid $grey-5;
          border-top: 1px solid $grey-5;
          background-color: $grey-4;
        }
        &:nth-of-type(even) {
          background-color: $grey-3;
        }
      }
    }
  }
  .data-table-updating {
    width: 100%;
    height: 100px;
    flex-direction: column;
  }
  .data-table-pagination{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .data-table-fetch-limit {
      flex: 1;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
    }
    .data-table-pagination-options {
      flex: 3;

    }
  }
}
</style>
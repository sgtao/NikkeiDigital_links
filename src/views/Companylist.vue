<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>上場企業一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='Companylist' color="primary" app lighten  class="company_table">
          // v-slot内でatagを入れる
          // refer : https://ssrv.net/tech/vue-vuetify-v-data-table-link/
          <!-- <template v-slot:items="props"> -->
          <template v-slot:[`item.seisiki_name`]="{item}" >
            <td class="text-xs-left"><a :href="item.company_url" target="_blank">  {{item.seisiki_name }}</a></td>
          </template>
          <template v-slot:[`item.name`]="{item}">
            <td class="text-xs-left"><a :href="'https://www.nikkei.com/nkd/company/gaiyo/?scode=' + item.code" target="_blank">  {{"日経「" + item.name +"」"}}</a></td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style lang="scss">
  // table styling along with refer material color pallet
  // refer : https://vuetifyjs.com/ja/styles/colors/
  $color-pack: false;
  .company_table {
    width: 90%;
    margin: 0 auto;
    background-color: white;
    table {
      thead tr {
        background-color: #8C9EFF;
        th {
          border: 1px solid white;
        }
      }
      tbody {
        tr {
          border-radius: 25px;
          border: 0;
          &:nth-child(2n){
            background-color: #C8E6C9;
          }
          &:hover {
            background-color: #536DFE;
          }
        }
      }
    }
  }
  .company_table .v-table tbody tr:not(:last-child) {
    border-bottom: none;
  }
</style>
<script>
import loadfile from '../assets/NikkeiDIGITAL_list.json';
export default {
  // commented out for build
  // created () {
  //   console.dir(loadfile.list);
  // },
  data () {
    return {
      headers: [
        { text: 'コード', value: 'code' },
        { text: '会社名', value: 'seisiki_name' },
        { text: 'カテゴリ', value: 'category' },
        { text: '上場市場', value: 'stock_market' },
        { text: '本社所在地', value: 'head_prefecture' },
        { text: '会社概要', value: 'name' },
        // { text: '会社サイト', value: 'company_url' },
      ],
      Companylist: loadfile.list
    }
  }
}
</script>

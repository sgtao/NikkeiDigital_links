<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>日経DIGITALリンク(絞込み)</h1>
        <div>会社名キーワード：<input type="text" v-model="search"></div>
      </v-flex>
      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='search_list' color="primary" app lighten  class="company_table">
          <!-- <template v-slot:items="props"> -->
          <template v-slot:[`item.seisiki_name`]="{item}" >
            <td class="text-xs-left"><a :href="item.company_url" target="_blank">  {{item.seisiki_name }}</a></td>
          </template>
          <template v-slot:[`item.name`]="{item}">
            <td class="text-xs-left">
              <a :href="'https://www.nikkei.com/nkd/company/gaiyo/?scode=' + item.code" target="_blank">  {{"概要"}}</a>、
              <a :href="'https://www.nikkei.com/nkd/company/news/?scode=' + item.code" target="_blank">  {{"news"}}</a>、
              <a :href="'https://www.nikkei.com/nkd/company/kessan/?scode=' + item.code" target="_blank">  {{"業績"}}</a>、
              <a :href="'https://www.nikkei.com/nkd/company/kigyo/?scode=' + item.code" target="_blank">  {{"企業発信"}}</a>
            </td>
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
  input {
    width:30%;
    padding:.5em 1em;
    border: 1px solid gray;
    border-radius: 5px;
    margin-bottom: 1em;;
  }
</style>
<script>
import loadfile from '../assets/NikkeiDIGITAL_list.json';
const Companylist = loadfile.list;
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
        { text: '東証分類', value: 'tosyo_category' },
        { text: 'カテゴリ', value: 'category' },
        { text: '本社所在地', value: 'head_prefecture' },
        { text: '日経DIGITAL', value: 'name' },
      ],
      Companylist: Companylist,
      search:'',
    }
  },
  computed: {
    search_list(){
      let searchWord = this.search.trim();
      if (searchWord === '') return this.Companylist;
      return this.Companylist.filter(item => {
          return item.seisiki_name.includes(searchWord)
          // return item.seisiki_name.includes(searchWord) ||
          // item.category.includes(searchWord) ||
          // item.head_prefecture.includes(searchWord)
      })
    }
  },
}
</script>

<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>日経DIGITALリンク(絞込み)</h1>
        <div class="filter_conditions">
          <div>会社名（入力）：<input type="text" v-model="search"></div>
          <div>東証分類（選択）：
            <span class="select_field">
              <select v-model="select_category">
                <option disabled value="">選択して下さい</option>
                <option v-for="category in tosyo_categories" :value="category.name" :key="category.id" >
                  {{category.name}}
                </option>
              </select>
              <button @click="clear_category">×(clear)</button>
            </span>
          </div>
        </div>
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
  .filter_conditions {
    width: 90%;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid gray;
    background-color: #C8E6C9;
    input {
      width:50%;
      background-color: white;
      padding:.5em 1em;
      border: 1px solid gray;
      border-radius: 5px;
      margin-bottom: 1em;;
    }
    select {
      // position: absolute;
      width:40%;
      background-color: white;
      padding:.5em 1em;
      border: 1px solid gray;
      border-radius: 5px;
      margin-bottom: 1em;;
    }
    button {
      // position: absolute;
      width:10%;
      text-align: right;
    }
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
        { text: '日経カテゴリ', value: 'category' },
        { text: '本社所在地', value: 'head_prefecture' },
        { text: '日経DIGITAL', value: 'name' },
      ],
      Companylist: Companylist,
      search:'',
      // tosyo_categories: [],
      select_category: '',
      tosyo_categories: [
{ id:   50, name :'水産・農林業'},
{ id: 1050, name :'鉱業'},
{ id: 2050, name :'建設業'},
{ id: 3050, name :'食料品'},
{ id: 3100, name :'繊維製品'},
{ id: 3150, name :'パルプ・紙'},
{ id: 3200, name :'化学'},
{ id: 3250, name :'医薬品'},
{ id: 3300, name :'石油・石炭製品'},
{ id: 3350, name :'ゴム製品'},
{ id: 3400, name :'ガラス・土石製品'},
{ id: 3450, name :'鉄鋼'},
{ id: 3500, name :'非鉄金属'},
{ id: 3550, name :'金属製品'},
{ id: 3600, name :'機械'},
{ id: 3650, name :'電気機器'},
{ id: 3700, name :'輸送用機器'},
{ id: 3750, name :'精密機器'},
{ id: 3800, name :'その他製品'},
{ id: 4050, name :'電気・ガス業'},
{ id: 5050, name :'陸運業'},
{ id: 5100, name :'海運業'},
{ id: 5150, name :'空運業'},
{ id: 5200, name :'倉庫・運輸関連業'},
{ id: 5250, name :'情報・通信業'},
{ id: 6050, name :'卸売業'},
{ id: 6100, name :'小売業'},
{ id: 7050, name :'銀行業'},
{ id: 7100, name :'証券、商品先物取引業'},
{ id: 7150, name :'保険業'},
{ id: 7200, name :'その他金融業'},
{ id: 8050, name :'不動産業'},
{ id: 9050, name :'サービス業'},
{ id: 9999, name :'--'},
      ],
    }
  },
  methods: {
      clear_category: function () {
          this.select_category = '';
      }
  },
  computed: {
    search_list(){
      // search from keyword
      let selectCategory = this.select_category.trim();
      let searchWord = this.search.trim();
      if (selectCategory === '' && searchWord === '') return this.Companylist;

      if (selectCategory === '') {
        return this.Companylist.filter(item => {
            return item.seisiki_name.includes(searchWord);
        });
      } else {
        if (searchWord === '') {
          return this.Companylist.filter(item => {
            return item.tosyo_category.includes(selectCategory)
            });
        } else {
          return this.Companylist.filter(item => {
            return (item.tosyo_category.includes(selectCategory) && 
            item.seisiki_name.includes(searchWord));
          });
        }
      }
    }
  },
}
</script>

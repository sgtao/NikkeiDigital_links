<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>上場企業一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='Companylist'>
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.seisiki_name }}</td>
            <td class="text-xs-left">{{ props.item.category }}</td>
            <td class="text-xs-left">{{ props.item.stock_market }}</td>
            <td class="text-xs-left">{{ props.item.head_prefecture }}</td>
            <td class="text-xs-left">{{ props.item.company_url }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import loadfile from '../assets/NikkeiDIGITAL_list.json';
export default {
  created () {
    // console.dir(loadfile.Companylist);
  },
  data () {
    return {
      headers: [
        { text: '名前', value: 'seisiki_name' },
        { text: 'カテゴリ', value: 'category' },
        { text: '上場市場', value: 'stock_market' },
        { text: '本社所在地', value: 'head_prefecture' },
        { text: 'ウェブサイト', value: 'company_url' }
      ],
      Companylist: loadfile.Companylist.list
    }
  }
}
</script>

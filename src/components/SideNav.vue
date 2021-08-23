<template>
  <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>メニュー</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      // icon の参照情報は、"https://pictogrammers.github.io/@mdi/font/2.0.46/"を参照して選択
      items: [
        { title: 'ホーム', icon: 'mdi-home', link: { name: 'home'} },
        { title: '企業一覧', icon: 'mdi-menu', link: { name: 'addresses' } },
        { title: 'about', icon: 'mdi-information', link: { name: 'about'} },
      ]
    }
  }
}
</script>

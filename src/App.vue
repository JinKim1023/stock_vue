<template>
  <v-app>
    <v-app-bar
      app
      color="grey darken-4"
      dark
      elevation="0"
    >
    <v-app-bar-nav-icon @click="drawer = !drawer" />
      <div class="d-flex align-center">
        <v-img
          alt="003.png"
          src="@/assets/003.png"
          width="140"
        />
      </div>
    </v-app-bar>
    <v-navigation-drawer
      
      app
      color="grey darken-4"
      dark
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-btn
              text
              @click="$router.push('/')"
            >
              Text Trade Analytics
            </v-btn>
          </v-list-item-title>
          <v-list-item-subtitle
          style="text-align: center;">
            증권사
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Navigation Items -->
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer : false,
    items: [
      { title: '홈', icon: 'mdi-home', to: '/' },
      { title: '업황지수', icon: 'mdi-view-dashboard', to: '/grid-system' },
      { title: '테스트', icon: 'mdi-account', to: '/research' },
    ],
    right: null,
  }),
};
</script>

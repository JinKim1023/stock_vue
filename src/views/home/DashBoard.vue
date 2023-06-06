<template>
  <v-layout wrap>
    <!-- 코스피 카드 -->
    <v-flex xs6 sm3 md3 lg3>
      <v-card height="250px">
        코스피 내용
      </v-card>
    </v-flex>

    <!-- 코스닥 카드 -->
    <v-flex xs6 sm3 md3 lg3>
      <v-card height="250px">
        코스닥 내용
      </v-card>
    </v-flex>

    <!-- 업종 내용과 업종 시세 카드 -->
    <v-flex xs6 sm3 md3 lg3>
      <v-carousel hide-delimiters height="500px">
        <v-carousel-item v-for="item in 5" :key="item">
          <v-layout wrap>
          <v-card height="250px" width="50%">
            업종 내용
          </v-card>
          <v-card height="250px" width="50%">
            업종 시세 내용
          </v-card>
          </v-layout>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>
</template>



<script>
export default {

}
</script>

<style>

</style>
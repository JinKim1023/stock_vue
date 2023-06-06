<template>
    <v-card>
        <!-- 메뉴 -->
        <v-row no-gutters>
            <v-col v-for="(menu, index) in menus" :key="index" cols="3">
                <v-card @click="selectMenu(index)">
                    <v-card-text>{{ menu.name }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- 선택한 메뉴 정보 -->
        <v-card v-if="selectedMenu">
            <v-card-title>{{ selectedMenu.name }}</v-card-title>
            <v-card-text>{{ selectedMenu.description }}</v-card-text>
        </v-card>

        <!-- 메뉴 1에 대한 추가 선택 메뉴 -->
        <v-card v-if="selectedMenu && selectedMenu.name === '증권사별 추천종목'">
            <RecommendedStockByCompany />
        </v-card>
    </v-card>
</template>
  
<script>
import RecommendedStockByCompany from './RecommendedStockByCompany.vue';

export default {
    data() {
        return {
            menus: [
                { name: "증권사별 추천종목", description: "" },
                { name: "리포트", description: "메뉴2에 대한 설명" },
                { name: "메뉴3", description: "메뉴3에 대한 설명" },
                { name: "메뉴4", description: "메뉴4에 대한 설명" },
            ],
            selectedMenu: null,
        };
    },
    methods: {
        selectMenu(index) {
            this.selectedMenu = this.menus[index];
        },
    },
    components: { RecommendedStockByCompany }
};
</script>
  
<style scoped>
.g-selectBox {
    position: relative;
    width: 20%;
}

.g-selectBox .v-select .v-select__slot {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px 10px;
}

.g-selectBox .v-select .v-select__selections {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    max-height: 150px;
    overflow-y: auto;
}

.g-selectBox .v-select .v-select__selections ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.g-selectBox .v-select .v-select__selections li {
    padding: 5px 10px;
    cursor: pointer;
}

.excel-data table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccc;
}

.excel-data th,
.excel-data td {
    border: 1px solid #ccc;
    padding: 5px;
}
</style>
  
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
      <v-card-text>
        <div class="g-selectBox">
          <v-select
            v-model="selectedSubmenu"
            item-value="firstx"
            :items="submenuOptions"
            label=""
            @input="selectSubmenu(selectedSubmenu)"
            :append-outer-icon="selectedSubmenu === '전체' ? 'mdi-chevron-up' : ''"
          ></v-select>
        </div>
      </v-card-text>
    </v-card>

    <!-- 선택한 추가 메뉴 정보 -->
    <v-card v-if="selectedSubmenu && selectedSubmenu !== '전체'">
      <v-card-title>{{ selectedSubmenu }}</v-card-title>
      <v-card-text>
        <div class="excel-data">
          <v-data-table 
          :headers="headers"
          :items="recommendedStocks"
          search="selectedSubmenu">
            <!-- <tr class="text-left">
              <th>증권사</th>
              <th>종목명</th>
              <th>종목 코드</th>
              <th>시장 구분</th>
              <th>추천일</th>
              <th>추천가</th>
              <th>전일종가</th>
              <th>수익률</th>
              <th>참고</th>
            </tr>
            <tr v-for="data in submenuDataToShow" :key="data.id">
                <td>{{ data.stock_company }}</td>
                <td>{{ data.stock_item }}</td>
                <td>{{ data.code }}</td>
                <td>{{ data.market }}</td>
                <td>{{ data.recommended_date }}</td>
                <td>{{ data.recommended_price }}</td>
                <td>{{ data.prev_close }}</td>
                <td>{{ data.dividend_rate }}</td>
                <td>{{ data.reference }}</td>
            </tr> -->
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: '증권사별 추천종목', description: '' },
        { name: '리포트', description: '메뉴2에 대한 설명' },
        { name: '메뉴3', description: '메뉴3에 대한 설명' },
        { name: '메뉴4', description: '메뉴4에 대한 설명' },
      ],
      headers: [
              {text: '증권사', value: 'stock_company'},
              {text: '종목명', value: 'stock_item'},
              {text: '종목 코드', value: 'code'},
              {text: '시장 구분', value: 'market'},
              {text: '추천일', value: 'recommended_date'},
              {text: '추천가', value: 'recommended_price'},
              {text: '전일종가', value: 'prev_close'},
              {text: '수익률', value: 'dividend_rate'},
              {text: '참고', value: 'reference'}],
      selectedMenu: null,
      submenuOptions: [
        {text: '전체', value: ''},
        {text: '신한투자증권', value: '신한투자증권'},
        {text: '한국투자증권', value: '한국투자'},
        {text: 'KB증권', value: 'KB'},
        {text: '유안타증권', value: '유안타'},
        {text: '삼성증권', value: '삼성'},
        {text: '키움증권', value: '키움'},
        {text: '하나증권', value: '하나증권'},
      ],
      recommendedStocks: [
      {
            "id": 1,
            "stock_company": "유안타",
            "stock_item": "LG에너지솔루션",
            "code": "373220",
            "market": "KOSPI 종합",
            "recommended_date": "2023.5.31",
            "recommended_price": "580,000",
            "prev_close": "599,000",
            "dividend_rate": "3.28%",
            "reference": "대형주"
          },
          {
            "id": 2,
            "stock_company": "유안타",
            "stock_item": "두산",
            "code": "000150",
            "market": "KOSPI 종합",
            "recommended_date": "2023.5.31",
            "recommended_price": "98,000",
            "prev_close": "97,300",
            "dividend_rate": "-0.71%",
            "reference": "대형주"
          },
          {
            "id": 3,
            "stock_company": "유안타",
            "stock_item": "제이시스메디칼",
            "code": "287410",
            "market": "KOSDAQ 종합",
            "recommended_date": "2023.5.31",
            "recommended_price": "8,840",
            "prev_close": "9,100",
            "dividend_rate": "2.94%",
            "reference": "중소형주"
          },
          {
            "id": 4,
            "stock_company": "유안타",
            "stock_item": "현대리바트",
            "code": "079430",
            "market": "KOSPI 종합",
            "recommended_date": "2023.5.31",
            "recommended_price": "7,870",
            "prev_close": "8,110",
            "dividend_rate": "3.05%",
            "reference": "중소형주"
          }
      ],
      selectedSubmenu: '전체',
      submenuData: {
        '전체': [
          { column1: '전체 데이터 1', column2: '전체 데이터 2', column3: '전체 데이터 3' },
          { column1: '전체 데이터 4', column2: '전체 데이터 5', column3: '전체 데이터 6' },
          { column1: '전체 데이터 7', column2: '전체 데이터 8', column3: '전체 데이터 9' },
        ],
        '신한투자증권': [
          { column1: '신한투자증권 데이터 1', column2: '신한투자증권 데이터 2', column3: '신한투자증권 데이터 3' },
          { column1: '신한투자증권 데이터 4', column2: '신한투자증권 데이터 5', column3: '신한투자증권 데이터 6' },
          { column1: '신한투자증권 데이터 7', column2: '신한투자증권 데이터 8', column3: '신한투자증권 데이터 9' },
        ],
        '한국투자증권': [
          { column1: '한국투자증권 데이터 1', column2: '한국투자증권 데이터 2', column3: '한국투자증권 데이터 3' },
          { column1: '한국투자증권 데이터 4', column2: '한국투자증권 데이터 5', column3: '한국투자증권 데이터 6' },
          { column1: '한국투자증권 데이터 7', column2: '한국투자증권 데이터 8', column3: '한국투자증권 데이터 9' },
        ],
        'KB증권': [
          { column1: 'KB증권 데이터 1', column2: 'KB증권 데이터 2', column3: 'KB증권 데이터 3' },
          { column1: 'KB증권 데이터 4', column2: 'KB증권 데이터 5', column3: 'KB증권 데이터 6' },
          { column1: 'KB증권 데이터 7', column2: 'KB증권 데이터 8', column3: 'KB증권 데이터 9' },
        ],
        '유안타증권': [
          {
            "id": 1,
            "stock_company": "유안타",
            "stock_item": "LG에너지솔루션",
            "code": "373220",
            "market": "KOSPI 종합",
            "recommended_date": "2023.5.31",
            "recommended_price": "580,000",
            "prev_close": "599,000",
            "dividend_rate": "3.28%",
            "reference": "대형주"
          },
          {
            "id": 2,
            "stock_company": "유안타",
            "stock_item": "두산",
            "code": "000150",
            "market": "KOSPI 종합",
            "recommended_date": "2023.5.31",
            "recommended_price": "98,000",
            "prev_close": "97,300",
            "dividend_rate": "-0.71%",
            "reference": "대형주"
          },
          {
            "id": 3,
            "stock_company": "유안타",
            "stock_item": "제이시스메디칼",
            "code": "287410",
            "market": "KOSDAQ 종합",
            "recommended_date": "2023.5.31",
            "recommended_price": "8,840",
            "prev_close": "9,100",
            "dividend_rate": "2.94%",
            "reference": "중소형주"
          },
          {
            "id": 4,
            "stock_company": "유안타",
            "stock_item": "현대리바트",
            "code": "079430",
            "market": "KOSPI 종합",
            "recommended_date": "2023.5.31",
            "recommended_price": "7,870",
            "prev_close": "8,110",
            "dividend_rate": "3.05%",
            "reference": "중소형주"
          }
        ],
        '삼성증권': [
          { column1: '삼성증권 데이터 1', column2: '삼성증권 데이터 2', column3: '삼성증권 데이터 3' },
          { column1: '삼성증권 데이터 4', column2: '삼성증권 데이터 5', column3: '삼성증권 데이터 6' },
          { column1: '삼성증권 데이터 7', column2: '삼성증권 데이터 8', column3: '삼성증권 데이터 9' },
        ],
        '키움증권': [
          { column1: '키움증권 데이터 1', column2: '키움증권 데이터 2', column3: '키움증권 데이터 3' },
          { column1: '키움증권 데이터 4', column2: '키움증권 데이터 5', column3: '키움증권 데이터 6' },
          { column1: '키움증권 데이터 7', column2: '키움증권 데이터 8', column3: '키움증권 데이터 9' },
        ],
        '하나증권': [
          { column1: '하나증권 데이터 1', column2: '하나증권 데이터 2', column3: '하나증권 데이터 3' },
          { column1: '하나증권 데이터 4', column2: '하나증권 데이터 5', column3: '하나증권 데이터 6' },
          { column1: '하나증권 데이터 7', column2: '하나증권 데이터 8', column3: '하나증권 데이터 9' },
        ],
      },
    };
  },
  methods: {
    selectMenu(index) {
      this.selectedMenu = this.menus[index];
      this.selectedSubmenu = '전체';
    },
    selectSubmenu(submenu) {
      this.selectedSubmenu = submenu;
    },
  },
  computed: {
    submenuDataToShow() {
      return this.submenuData[this.selectedSubmenu];
    },
  },
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

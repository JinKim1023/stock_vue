
    <!-- 메뉴 1에 대한 추가 선택 메뉴 -->
<template>
  <v-card>
    <v-card-text>
      <div class="g-selectBox">
        <v-select v-model="selectedSubmenu" item-value="first" :items="submenuOptions" label="" @change="selectSubmenu"
          :append-outer-icon="selectedSubmenu === submenuOptions[0] ? 'mdi-chevron-up' : ''"></v-select>
      </div>
    </v-card-text>

    <!-- 선택한 추가 메뉴 정보 -->
    <v-card>
      <v-card-title>{{ selectedSubmenu.value }}</v-card-title>
      <v-card-text>
        <div class="excel-data">
          <v-data-table :headers="headers" :items="polishedData()" :search="searchKeyword" :custom-filter="customSearch">
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    const submenuOptions = [
      '전체',
      '신한투자증권',
      '한국투자증권',
      'KB증권',
      '유안타증권',
      '삼성증권',
      '키움증권',
      '하나증권',
    ];

    const recommendedStocks = [
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "LG에너지솔루션",
        "code": "373220",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.31",
        "recommended_price": 580000,
        "prev_close": 599000,
        "dividend_rate": "3.28",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "두산",
        "code": "000150",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.31",
        "recommended_price": 98000,
        "prev_close": 97300,
        "dividend_rate": "-0.71",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "제이시스메디칼",
        "code": "287410",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.31",
        "recommended_price": 8840,
        "prev_close": 9100,
        "dividend_rate": "2.94",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "현대리바트",
        "code": "079430",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.31",
        "recommended_price": 7870,
        "prev_close": 8110,
        "dividend_rate": "3.05",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "대동",
        "code": "000490",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.31",
        "recommended_price": 11690,
        "prev_close": 11750,
        "dividend_rate": "0.51",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "삼성" },
        "stock_item_name": "SK하이닉스",
        "code": "000660",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 109200,
        "prev_close": 108600,
        "dividend_rate": "-0.55",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 70300,
        "prev_close": 71400,
        "dividend_rate": "1.56",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "LG에너지솔루션",
        "code": "373220",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 578000,
        "prev_close": 599000,
        "dividend_rate": "3.63",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "기아",
        "code": "000270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 87400,
        "prev_close": 85900,
        "dividend_rate": "-1.72",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "SK이노베이션",
        "code": "096770",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 182800,
        "prev_close": 189100,
        "dividend_rate": "3.45",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "한국전력",
        "code": "015760",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 18470,
        "prev_close": 19080,
        "dividend_rate": "3.30",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "SK텔레콤",
        "code": "017670",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 49600,
        "prev_close": 49700,
        "dividend_rate": "0.20",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "LG이노텍",
        "code": "011070",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 289000,
        "prev_close": 307000,
        "dividend_rate": "6.23",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "유한양행",
        "code": "000100",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 59500,
        "prev_close": 59300,
        "dividend_rate": "-0.34",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "LX하우시스",
        "code": "108670",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 43950,
        "prev_close": 43000,
        "dividend_rate": "-2.16",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "브이원텍",
        "code": "251630",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 11500,
        "prev_close": 12300,
        "dividend_rate": "6.96",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "포스코퓨처엠",
        "code": "003670",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": 324000,
        "prev_close": 350000,
        "dividend_rate": "8.02",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "키움" },
        "stock_item_name": "SK아이이테크놀로지",
        "code": "361610",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 89700,
        "prev_close": 88600,
        "dividend_rate": "-1.23",
        "reference": "대형주 포트폴리오"
      },
      {
        "stock_company": { "name": "키움" },
        "stock_item_name": "씨에스윈드",
        "code": "112610",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 78600,
        "prev_close": 79000,
        "dividend_rate": "0.51",
        "reference": "대형주 포트폴리오"
      },
      {
        "stock_company": { "name": "키움" },
        "stock_item_name": "효성첨단소재",
        "code": "298050",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 451000,
        "prev_close": 446500,
        "dividend_rate": "-1.00",
        "reference": "대형주 포트폴리오"
      },
      {
        "stock_company": { "name": "키움" },
        "stock_item_name": "솔브레인",
        "code": "357780",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 235500,
        "prev_close": 230500,
        "dividend_rate": "-2.12",
        "reference": "대형주 포트폴리오"
      },
      {
        "stock_company": { "name": "키움" },
        "stock_item_name": "네오위즈",
        "code": "095660",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 45700,
        "prev_close": 49950,
        "dividend_rate": "9.30",
        "reference": "대형주 포트폴리오"
      },
      {
        "stock_company": { "name": "키움" },
        "stock_item_name": "바이오니아",
        "code": "064550",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 51700,
        "prev_close": 53500,
        "dividend_rate": "3.48",
        "reference": "중소형주 포트폴리오"
      },
      {
        "stock_company": { "name": "키움" },
        "stock_item_name": "비에이치",
        "code": "090460",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 24500,
        "prev_close": 25100,
        "dividend_rate": "2.45",
        "reference": "중소형주 포트폴리오"
      },
      {
        "stock_company": { "name": "키움" },
        "stock_item_name": "펌텍코리아",
        "code": "251970",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 20600,
        "prev_close": 21150,
        "dividend_rate": "2.67",
        "reference": "중소형주 포트폴리오"
      },
      {
        "stock_company": { "name": "키움" },
        "stock_item_name": "삼영",
        "code": "003720",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 4805,
        "prev_close": 4760,
        "dividend_rate": "-0.94",
        "reference": "중소형주 포트폴리오"
      },
      {
        "stock_company": { "name": "키움" },
        "stock_item_name": "코스텍시스",
        "code": "355150",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 3485,
        "prev_close": 3340,
        "dividend_rate": "-4.16",
        "reference": "중소형주 포트폴리오"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "엠로",
        "code": "058970",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 52000,
        "prev_close": 54800,
        "dividend_rate": "5.38",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "플리토",
        "code": "300080",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 31600,
        "prev_close": 33200,
        "dividend_rate": "5.06",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "엘앤씨바이오",
        "code": "290650",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 33950,
        "prev_close": 34200,
        "dividend_rate": "0.74",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "메디톡스",
        "code": "086900",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": 230500,
        "prev_close": 246000,
        "dividend_rate": "6.72",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "현대차",
        "code": "005380",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.23",
        "recommended_price": 207500,
        "prev_close": 200000,
        "dividend_rate": "-3.61",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "삼성" },
        "stock_item_name": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": 68400,
        "prev_close": 71400,
        "dividend_rate": "4.39",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "삼성" },
        "stock_item_name": "이수페타시스",
        "code": "007660",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": 10340,
        "prev_close": 14630,
        "dividend_rate": "41.49",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "효성첨단소재",
        "code": "298050",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": 433500,
        "prev_close": 446500,
        "dividend_rate": "3.00",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "유진기업",
        "code": "023410",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": 3500,
        "prev_close": 3575,
        "dividend_rate": "2.14",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "한국투자" },
        "stock_item_name": "풍산",
        "code": "103140",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": 40900,
        "prev_close": 39200,
        "dividend_rate": "-4.16",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "LG디스플레이",
        "code": "034220",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": 16350,
        "prev_close": 15720,
        "dividend_rate": "-3.85",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "한전KPS",
        "code": "051600",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.17",
        "recommended_price": 36850,
        "prev_close": 34000,
        "dividend_rate": "-7.73",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "원익QnC",
        "code": "074600",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.17",
        "recommended_price": 24400,
        "prev_close": 26050,
        "dividend_rate": "6.76",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "빙그레",
        "code": "005180",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.16",
        "recommended_price": 45900,
        "prev_close": 48500,
        "dividend_rate": "5.66",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "삼성" },
        "stock_item_name": "NAVER",
        "code": "035420",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.15",
        "recommended_price": 213500,
        "prev_close": 199500,
        "dividend_rate": "-6.56",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "삼성" },
        "stock_item_name": "LG이노텍",
        "code": "011070",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.15",
        "recommended_price": 281000,
        "prev_close": 307000,
        "dividend_rate": "9.25",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "셀트리온",
        "code": "068270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.15",
        "recommended_price": 166600,
        "prev_close": 171300,
        "dividend_rate": "2.82",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "한국투자" },
        "stock_item_name": "LG이노텍",
        "code": "011070",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.15",
        "recommended_price": 281000,
        "prev_close": 307000,
        "dividend_rate": "9.25",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "에이프로",
        "code": "262260",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.11",
        "recommended_price": 15490,
        "prev_close": 16990,
        "dividend_rate": "9.68",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "조이시티",
        "code": "067000",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.10",
        "recommended_price": 4180,
        "prev_close": 4175,
        "dividend_rate": "-0.12",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "코스텍시스",
        "code": "355150",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.9",
        "recommended_price": 3325,
        "prev_close": 3340,
        "dividend_rate": "0.45",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "솔루엠",
        "code": "248070",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.9",
        "recommended_price": 25650,
        "prev_close": 25300,
        "dividend_rate": "-1.36",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "삼성" },
        "stock_item_name": "셀트리온헬스케어",
        "code": "091990",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.8",
        "recommended_price": 70700,
        "prev_close": 74000,
        "dividend_rate": "4.67",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "한국투자" },
        "stock_item_name": "지아이이노베이션",
        "code": "358570",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.8",
        "recommended_price": 22000,
        "prev_close": 22900,
        "dividend_rate": "4.09",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "한국투자" },
        "stock_item_name": "KB금융",
        "code": "105560",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.2",
        "recommended_price": 49500,
        "prev_close": 48000,
        "dividend_rate": "-3.03",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "삼성화재",
        "code": "000810",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.2",
        "recommended_price": 225000,
        "prev_close": 225500,
        "dividend_rate": "0.22",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "삼성" },
        "stock_item_name": "하이브",
        "code": "352820",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.2",
        "recommended_price": 270000,
        "prev_close": 274000,
        "dividend_rate": "1.48",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "삼성" },
        "stock_item_name": "클래시스",
        "code": "214150",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.2",
        "recommended_price": 23700,
        "prev_close": 26100,
        "dividend_rate": "10.13",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "한국전자금융",
        "code": "063570",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.25",
        "recommended_price": 5270,
        "prev_close": 5820,
        "dividend_rate": "10.44",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "셀트리온",
        "code": "068270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.25",
        "recommended_price": 166500,
        "prev_close": 171300,
        "dividend_rate": "2.88",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "기아",
        "code": "000270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.25",
        "recommended_price": 84700,
        "prev_close": 85900,
        "dividend_rate": "1.42",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "엘오티베큠",
        "code": "083310",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.25",
        "recommended_price": 14200,
        "prev_close": 16720,
        "dividend_rate": "17.75",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "KB금융",
        "code": "105560",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.24",
        "recommended_price": 50100,
        "prev_close": 48000,
        "dividend_rate": "-4.19",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "케이피에스",
        "code": "256940",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.24",
        "recommended_price": 10350,
        "prev_close": 10210,
        "dividend_rate": "-1.35",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "감성코퍼레이션",
        "code": "036620",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.21",
        "recommended_price": 2985,
        "prev_close": 3360,
        "dividend_rate": "12.56",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "켄코아에어로스페이스",
        "code": "274090",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.19",
        "recommended_price": 18040,
        "prev_close": 14760,
        "dividend_rate": "-18.18",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "한국투자" },
        "stock_item_name": "콘텐트리중앙",
        "code": "036420",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.17",
        "recommended_price": 22850,
        "prev_close": 22450,
        "dividend_rate": "-1.75",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "HD현대인프라코어",
        "code": "042670",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.14",
        "recommended_price": 9060,
        "prev_close": 9530,
        "dividend_rate": "5.19",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "데브시스터즈",
        "code": "194480",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.14",
        "recommended_price": 56800,
        "prev_close": 49400,
        "dividend_rate": "-13.03",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.10",
        "recommended_price": 65000,
        "prev_close": 71400,
        "dividend_rate": "9.85",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "한국투자" },
        "stock_item_name": "기아",
        "code": "000270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.10",
        "recommended_price": 80100,
        "prev_close": 85900,
        "dividend_rate": "7.24",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "삼성" },
        "stock_item_name": "기아",
        "code": "000270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": 81000,
        "prev_close": 85900,
        "dividend_rate": "6.05",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "한국투자" },
        "stock_item_name": "한솔케미칼",
        "code": "014680",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": 239500,
        "prev_close": 231500,
        "dividend_rate": "-3.34",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "레이",
        "code": "228670",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": 33950,
        "prev_close": 36250,
        "dividend_rate": "6.77",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "켐트로닉스",
        "code": "089010",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": 23500,
        "prev_close": 24900,
        "dividend_rate": "5.96",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "기아",
        "code": "000270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": 81000,
        "prev_close": 85900,
        "dividend_rate": "6.05",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "LG전자",
        "code": "066570",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": 115300,
        "prev_close": 122800,
        "dividend_rate": "6.50",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "하나증권" },
        "stock_item_name": "POSCO홀딩스",
        "code": "005490",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": 368000,
        "prev_close": 360000,
        "dividend_rate": "-2.17",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "하이비젼시스템",
        "code": "126700",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.27",
        "recommended_price": 18220,
        "prev_close": 20450,
        "dividend_rate": "12.24",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "넷마블",
        "code": "251270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": 62400,
        "prev_close": 55900,
        "dividend_rate": "-10.42",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "유한양행",
        "code": "000100",
        "market": "KOSPI 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": 51400,
        "prev_close": 59300,
        "dividend_rate": "15.37",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "엠씨넥스",
        "code": "097520",
        "market": "KOSPI 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": 29300,
        "prev_close": 32550,
        "dividend_rate": "11.09",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "루닛",
        "code": "328130",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": 42750,
        "prev_close": 83800,
        "dividend_rate": "96.02",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "인터로조",
        "code": "119610",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": 29250,
        "prev_close": 34700,
        "dividend_rate": "18.63",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "웅진씽크빅",
        "code": "095720",
        "market": "KOSPI 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": 2920,
        "prev_close": 3020,
        "dividend_rate": "3.42",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "자화전자",
        "code": "033240",
        "market": "KOSPI 종합",
        "recommended_date": "2023.3.17",
        "recommended_price": 27850,
        "prev_close": 34400,
        "dividend_rate": "23.52",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "KH바텍",
        "code": "060720",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.17",
        "recommended_price": 16530,
        "prev_close": 20800,
        "dividend_rate": "25.83",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "KT서브마린",
        "code": "060370",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.15",
        "recommended_price": 6150,
        "prev_close": 7090,
        "dividend_rate": "15.28",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "하나기술",
        "code": "299030",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.7",
        "recommended_price": 64300,
        "prev_close": 65200,
        "dividend_rate": "1.40",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "한국투자" },
        "stock_item_name": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2023.2.27",
        "recommended_price": 61300,
        "prev_close": 71400,
        "dividend_rate": "16.48",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "넥스틴",
        "code": "348210",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.2.16",
        "recommended_price": 56100,
        "prev_close": 75000,
        "dividend_rate": "33.69",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "NAVER",
        "code": "035420",
        "market": "KOSPI 종합",
        "recommended_date": "2023.2.13",
        "recommended_price": 230000,
        "prev_close": 199500,
        "dividend_rate": "-13.26",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "신한투자증권" },
        "stock_item_name": "씨앤씨인터내셔널",
        "code": "352480",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.2.10",
        "recommended_price": 30800,
        "prev_close": 45350,
        "dividend_rate": "47.24",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "롯데정보통신",
        "code": "286940",
        "market": "KOSPI 종합",
        "recommended_date": "2023.2.6",
        "recommended_price": 26750,
        "prev_close": 28250,
        "dividend_rate": "5.61",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "롯데정보통신",
        "code": "286940",
        "market": "KOSPI 종합",
        "recommended_date": "2023.2.2",
        "recommended_price": 25850,
        "prev_close": 28250,
        "dividend_rate": "9.28",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "KH바텍",
        "code": "060720",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.1.30",
        "recommended_price": 14730,
        "prev_close": 20800,
        "dividend_rate": "41.21",
        "reference": "중소형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "NAVER",
        "code": "035420",
        "market": "KOSPI 종합",
        "recommended_date": "2023.1.25",
        "recommended_price": 196000,
        "prev_close": 199500,
        "dividend_rate": "1.79",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "한국투자" },
        "stock_item_name": "NAVER",
        "code": "035420",
        "market": "KOSPI 종합",
        "recommended_date": "2023.1.16",
        "recommended_price": 195000,
        "prev_close": 199500,
        "dividend_rate": "2.31",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2023.1.10",
        "recommended_price": 60700,
        "prev_close": 71400,
        "dividend_rate": "17.63",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "SK하이닉스",
        "code": "000660",
        "market": "KOSPI 종합",
        "recommended_date": "2023.1.10",
        "recommended_price": 86000,
        "prev_close": 108600,
        "dividend_rate": "26.28",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "삼성" },
        "stock_item_name": "LG전자",
        "code": "066570",
        "market": "KOSPI 종합",
        "recommended_date": "2023.1.2",
        "recommended_price": 86500,
        "prev_close": 122800,
        "dividend_rate": "41.97",
        "reference": "추천종목"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "POSCO홀딩스",
        "code": "005490",
        "market": "KOSPI 종합",
        "recommended_date": "2022.12.21",
        "recommended_price": 281000,
        "prev_close": 360000,
        "dividend_rate": "28.11",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "삼성엔지니어링",
        "code": "028050",
        "market": "KOSPI 종합",
        "recommended_date": "2022.10.25",
        "recommended_price": 23550,
        "prev_close": 28300,
        "dividend_rate": "20.17",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "현대모비스",
        "code": "012330",
        "market": "KOSPI 종합",
        "recommended_date": "2022.9.26",
        "recommended_price": 206500,
        "prev_close": 223000,
        "dividend_rate": "7.99",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "유안타" },
        "stock_item_name": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2022.9.22",
        "recommended_price": 55300,
        "prev_close": 71400,
        "dividend_rate": "29.11",
        "reference": "대형주"
      },
      {
        "stock_company": { "name": "KB" },
        "stock_item_name": "삼성SDI",
        "code": "006400",
        "market": "KOSPI 종합",
        "recommended_date": "2022.5.9",
        "recommended_price": 617000,
        "prev_close": 718000,
        "dividend_rate": "16.37",
        "reference": "대형주"
      }

    ];

    const searchKeywordBySelectedSubmenu = {
      '전체': '',
      '신한투자증권': '신한투자증권',
      '한국투자증권': '한국투자',
      'KB증권': 'KB',
      '유안타증권': '유안타',
      '삼성증권': '삼성',
      '키움증권': '키움',
      '하나증권': '하나증권',
    };
    return {
      menus: [
        { name: '증권사별 추천종목', description: '' },
        { name: '리포트', description: '메뉴2에 대한 설명' },
        { name: '메뉴3', description: '메뉴3에 대한 설명' },
        { name: '메뉴4', description: '메뉴4에 대한 설명' },
      ],
      headers: [
        { text: '증권사', value: 'stock_company' },
        { text: '종목명', value: 'stock_item_name' },
        { text: '종목 코드', value: 'code' },
        { text: '시장 구분', value: 'market' },
        { text: '추천일', value: 'recommended_date' },
        { text: '추천가(₩)', value: 'recommended_price' },
        { text: '전일종가(₩)', value: 'prev_close' },
        { text: '수익률(%)', value: 'dividend_rate' },
        { text: '참고', value: 'reference' }],
      selectedMenu: null,
      submenuOptions: submenuOptions,
      recommendedStocks: recommendedStocks,
      selectedSubmenu: submenuOptions[0],
      searchKeyword: '',
      searchKeywordBySelectedSubmenu: searchKeywordBySelectedSubmenu,
    };
  },
  created: function () {
    this.getRecommendedStocks();
  },
  methods: {
    selectMenu(index) {
      this.selectedMenu = this.menus[index];
    },
    selectSubmenu(submenu) {
      console.log(submenu);
      this.selectedSubmenu = submenu;
      this.searchKeyword = this.searchKeywordBySelectedSubmenu[submenu];
    },
    customSearch(value, search, item) {
      return value != null &&
        search != null && item.stock_company === search;
    },
    polishedData() {
      return this.recommendedStocks.map(recommendedStock => {
        return {
          ...recommendedStock,
          "stock_company": recommendedStock.stock_company.name,
          "dividend_rate": Number(recommendedStock.dividend_rate),
        }
      });
    },
    toPriceString(price) {
      return price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
    },
    getRecommendedStocks() {
      this.error = this.recommendedStocks = null;
      this.loading = true;
      const url = "http://localhost:8000/api/v1/recommended_stocks";
      axios
        .get(url)
        .then((result) => {
          this.recommendedStocks = result.data;
        });
    }
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

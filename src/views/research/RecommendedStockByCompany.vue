
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
          <v-data-table :headers="headers" :items="recommendedStocks" :search="searchKeyword"
            :custom-filter="customSearch">
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
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
        "stock_company": "유안타",
        "stock_item": "현대리바트",
        "code": "079430",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.31",
        "recommended_price": "7,870",
        "prev_close": "8,110",
        "dividend_rate": "3.05%",
        "reference": "중소형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "대동",
        "code": "000490",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.31",
        "recommended_price": "11,690",
        "prev_close": "11,750",
        "dividend_rate": "0.51%",
        "reference": "중소형주"
      },
      {
        "stock_company": "삼성",
        "stock_item": "SK하이닉스",
        "code": "000660",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "109,200",
        "prev_close": "108,600",
        "dividend_rate": "-0.55%",
        "reference": "추천종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "70,300",
        "prev_close": "71,400",
        "dividend_rate": "1.56%",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "LG에너지솔루션",
        "code": "373220",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "578,000",
        "prev_close": "599,000",
        "dividend_rate": "3.63%",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "기아",
        "code": "000270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "87,400",
        "prev_close": "85,900",
        "dividend_rate": "-1.72%",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "SK이노베이션",
        "code": "096770",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "182,800",
        "prev_close": "189,100",
        "dividend_rate": "3.45%",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "한국전력",
        "code": "015760",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "18,470",
        "prev_close": "19,080",
        "dividend_rate": "3.30%",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "SK텔레콤",
        "code": "017670",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "49,600",
        "prev_close": "49,700",
        "dividend_rate": "0.20%",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "LG이노텍",
        "code": "011070",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "289,000",
        "prev_close": "307,000",
        "dividend_rate": "6.23%",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "유한양행",
        "code": "000100",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "59,500",
        "prev_close": "59,300",
        "dividend_rate": "-0.34%",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "LX하우시스",
        "code": "108670",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "43,950",
        "prev_close": "43,000",
        "dividend_rate": "-2.16%",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "브이원텍",
        "code": "251630",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "11,500",
        "prev_close": "12,300",
        "dividend_rate": "6.96%",
        "reference": "단기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "포스코퓨처엠",
        "code": "003670",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.30",
        "recommended_price": "324,000",
        "prev_close": "350,000",
        "dividend_rate": "8.02%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "키움",
        "stock_item": "SK아이이테크놀로지",
        "code": "361610",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "89,700",
        "prev_close": "88,600",
        "dividend_rate": "-1.23%",
        "reference": "대형주 포트폴리오"
      },
      {
        "stock_company": "키움",
        "stock_item": "씨에스윈드",
        "code": "112610",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "78,600",
        "prev_close": "79,000",
        "dividend_rate": "0.51%",
        "reference": "대형주 포트폴리오"
      },
      {
        "stock_company": "키움",
        "stock_item": "효성첨단소재",
        "code": "298050",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "451,000",
        "prev_close": "446,500",
        "dividend_rate": "-1.00%",
        "reference": "대형주 포트폴리오"
      },
      {
        "stock_company": "키움",
        "stock_item": "솔브레인",
        "code": "357780",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "235,500",
        "prev_close": "230,500",
        "dividend_rate": "-2.12%",
        "reference": "대형주 포트폴리오"
      },
      {
        "stock_company": "키움",
        "stock_item": "네오위즈",
        "code": "095660",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "45,700",
        "prev_close": "49,950",
        "dividend_rate": "9.30%",
        "reference": "대형주 포트폴리오"
      },
      {
        "stock_company": "키움",
        "stock_item": "바이오니아",
        "code": "064550",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "51,700",
        "prev_close": "53,500",
        "dividend_rate": "3.48%",
        "reference": "중소형주 포트폴리오"
      },
      {
        "stock_company": "키움",
        "stock_item": "비에이치",
        "code": "090460",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "24,500",
        "prev_close": "25,100",
        "dividend_rate": "2.45%",
        "reference": "중소형주 포트폴리오"
      },
      {
        "stock_company": "키움",
        "stock_item": "펌텍코리아",
        "code": "251970",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "20,600",
        "prev_close": "21,150",
        "dividend_rate": "2.67%",
        "reference": "중소형주 포트폴리오"
      },
      {
        "stock_company": "키움",
        "stock_item": "삼영",
        "code": "003720",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "4,805",
        "prev_close": "4,760",
        "dividend_rate": "-0.94%",
        "reference": "중소형주 포트폴리오"
      },
      {
        "stock_company": "키움",
        "stock_item": "코스텍시스",
        "code": "355150",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "3,485",
        "prev_close": "3,340",
        "dividend_rate": "-4.16%",
        "reference": "중소형주 포트폴리오"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "엠로",
        "code": "058970",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "52,000",
        "prev_close": "54,800",
        "dividend_rate": "5.38%",
        "reference": "중소형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "플리토",
        "code": "300080",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "31,600",
        "prev_close": "33,200",
        "dividend_rate": "5.06%",
        "reference": "중소형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "엘앤씨바이오",
        "code": "290650",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "33,950",
        "prev_close": "34,200",
        "dividend_rate": "0.74%",
        "reference": "중소형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "메디톡스",
        "code": "086900",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.26",
        "recommended_price": "230,500",
        "prev_close": "246,000",
        "dividend_rate": "6.72%",
        "reference": "중소형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "현대차",
        "code": "005380",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.23",
        "recommended_price": "207,500",
        "prev_close": "200,000",
        "dividend_rate": "-3.61%",
        "reference": "대형주"
      },
      {
        "stock_company": "삼성",
        "stock_item": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": "68,400",
        "prev_close": "71,400",
        "dividend_rate": "4.39%",
        "reference": "추천종목"
      },
      {
        "stock_company": "삼성",
        "stock_item": "이수페타시스",
        "code": "007660",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": "10,340",
        "prev_close": "14,630",
        "dividend_rate": "41.49%",
        "reference": "추천종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "효성첨단소재",
        "code": "298050",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": "433,500",
        "prev_close": "446,500",
        "dividend_rate": "3.00%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "유진기업",
        "code": "023410",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": "3,500",
        "prev_close": "3,575",
        "dividend_rate": "2.14%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "한국투자",
        "stock_item": "풍산",
        "code": "103140",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": "40,900",
        "prev_close": "39,200",
        "dividend_rate": "-4.16%",
        "reference": "추천종목"
      },
      {
        "stock_company": "KB",
        "stock_item": "LG디스플레이",
        "code": "034220",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.22",
        "recommended_price": "16,350",
        "prev_close": "15,720",
        "dividend_rate": "-3.85%",
        "reference": "대형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "한전KPS",
        "code": "051600",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.17",
        "recommended_price": "36,850",
        "prev_close": "34,000",
        "dividend_rate": "-7.73%",
        "reference": "중소형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "원익QnC",
        "code": "074600",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.17",
        "recommended_price": "24,400",
        "prev_close": "26,050",
        "dividend_rate": "6.76%",
        "reference": "중소형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "빙그레",
        "code": "005180",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.16",
        "recommended_price": "45,900",
        "prev_close": "48,500",
        "dividend_rate": "5.66%",
        "reference": "중소형주"
      },
      {
        "stock_company": "삼성",
        "stock_item": "NAVER",
        "code": "035420",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.15",
        "recommended_price": "213,500",
        "prev_close": "199,500",
        "dividend_rate": "-6.56%",
        "reference": "추천종목"
      },
      {
        "stock_company": "삼성",
        "stock_item": "LG이노텍",
        "code": "011070",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.15",
        "recommended_price": "281,000",
        "prev_close": "307,000",
        "dividend_rate": "9.25%",
        "reference": "추천종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "셀트리온",
        "code": "068270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.15",
        "recommended_price": "166,600",
        "prev_close": "171,300",
        "dividend_rate": "2.82%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "한국투자",
        "stock_item": "LG이노텍",
        "code": "011070",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.15",
        "recommended_price": "281,000",
        "prev_close": "307,000",
        "dividend_rate": "9.25%",
        "reference": "추천종목"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "에이프로",
        "code": "262260",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.11",
        "recommended_price": "15,490",
        "prev_close": "16,990",
        "dividend_rate": "9.68%",
        "reference": "중소형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "조이시티",
        "code": "067000",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.10",
        "recommended_price": "4,180",
        "prev_close": "4,175",
        "dividend_rate": "-0.12%",
        "reference": "중소형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "코스텍시스",
        "code": "355150",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.9",
        "recommended_price": "3,325",
        "prev_close": "3,340",
        "dividend_rate": "0.45%",
        "reference": "중소형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "솔루엠",
        "code": "248070",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.9",
        "recommended_price": "25,650",
        "prev_close": "25,300",
        "dividend_rate": "-1.36%",
        "reference": "중소형주"
      },
      {
        "stock_company": "삼성",
        "stock_item": "셀트리온헬스케어",
        "code": "091990",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.8",
        "recommended_price": "70,700",
        "prev_close": "74,000",
        "dividend_rate": "4.67%",
        "reference": "추천종목"
      },
      {
        "stock_company": "한국투자",
        "stock_item": "지아이이노베이션",
        "code": "358570",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.8",
        "recommended_price": "22,000",
        "prev_close": "22,900",
        "dividend_rate": "4.09%",
        "reference": "추천종목"
      },
      {
        "stock_company": "한국투자",
        "stock_item": "KB금융",
        "code": "105560",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.2",
        "recommended_price": "49,500",
        "prev_close": "48,000",
        "dividend_rate": "-3.03%",
        "reference": "추천종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "삼성화재",
        "code": "000810",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.2",
        "recommended_price": "225,000",
        "prev_close": "225,500",
        "dividend_rate": "0.22%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "삼성",
        "stock_item": "하이브",
        "code": "352820",
        "market": "KOSPI 종합",
        "recommended_date": "2023.5.2",
        "recommended_price": "270,000",
        "prev_close": "274,000",
        "dividend_rate": "1.48%",
        "reference": "추천종목"
      },
      {
        "stock_company": "삼성",
        "stock_item": "클래시스",
        "code": "214150",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.5.2",
        "recommended_price": "23,700",
        "prev_close": "26,100",
        "dividend_rate": "10.13%",
        "reference": "추천종목"
      },
      {
        "stock_company": "KB",
        "stock_item": "한국전자금융",
        "code": "063570",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.25",
        "recommended_price": "5,270",
        "prev_close": "5,820",
        "dividend_rate": "10.44%",
        "reference": "중소형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "셀트리온",
        "code": "068270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.25",
        "recommended_price": "166,500",
        "prev_close": "171,300",
        "dividend_rate": "2.88%",
        "reference": "대형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "기아",
        "code": "000270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.25",
        "recommended_price": "84,700",
        "prev_close": "85,900",
        "dividend_rate": "1.42%",
        "reference": "대형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "엘오티베큠",
        "code": "083310",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.25",
        "recommended_price": "14,200",
        "prev_close": "16,720",
        "dividend_rate": "17.75%",
        "reference": "중소형주"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "KB금융",
        "code": "105560",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.24",
        "recommended_price": "50,100",
        "prev_close": "48,000",
        "dividend_rate": "-4.19%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "케이피에스",
        "code": "256940",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.24",
        "recommended_price": "10,350",
        "prev_close": "10,210",
        "dividend_rate": "-1.35%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "감성코퍼레이션",
        "code": "036620",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.21",
        "recommended_price": "2,985",
        "prev_close": "3,360",
        "dividend_rate": "12.56%",
        "reference": "중소형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "켄코아에어로스페이스",
        "code": "274090",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.19",
        "recommended_price": "18,040",
        "prev_close": "14,760",
        "dividend_rate": "-18.18%",
        "reference": "중소형주"
      },
      {
        "stock_company": "한국투자",
        "stock_item": "콘텐트리중앙",
        "code": "036420",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.17",
        "recommended_price": "22,850",
        "prev_close": "22,450",
        "dividend_rate": "-1.75%",
        "reference": "추천종목"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "HD현대인프라코어",
        "code": "042670",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.14",
        "recommended_price": "9,060",
        "prev_close": "9,530",
        "dividend_rate": "5.19%",
        "reference": "중소형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "데브시스터즈",
        "code": "194480",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.14",
        "recommended_price": "56,800",
        "prev_close": "49,400",
        "dividend_rate": "-13.03%",
        "reference": "중소형주"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.10",
        "recommended_price": "65,000",
        "prev_close": "71,400",
        "dividend_rate": "9.85%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "한국투자",
        "stock_item": "기아",
        "code": "000270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.10",
        "recommended_price": "80,100",
        "prev_close": "85,900",
        "dividend_rate": "7.24%",
        "reference": "추천종목"
      },
      {
        "stock_company": "삼성",
        "stock_item": "기아",
        "code": "000270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": "81,000",
        "prev_close": "85,900",
        "dividend_rate": "6.05%",
        "reference": "추천종목"
      },
      {
        "stock_company": "한국투자",
        "stock_item": "한솔케미칼",
        "code": "014680",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": "239,500",
        "prev_close": "231,500",
        "dividend_rate": "-3.34%",
        "reference": "추천종목"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "레이",
        "code": "228670",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": "33,950",
        "prev_close": "36,250",
        "dividend_rate": "6.77%",
        "reference": "중소형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "켐트로닉스",
        "code": "089010",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": "23,500",
        "prev_close": "24,900",
        "dividend_rate": "5.96%",
        "reference": "중소형주"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "기아",
        "code": "000270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": "81,000",
        "prev_close": "85,900",
        "dividend_rate": "6.05%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "LG전자",
        "code": "066570",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": "115,300",
        "prev_close": "122,800",
        "dividend_rate": "6.50%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "하나증권",
        "stock_item": "POSCO홀딩스",
        "code": "005490",
        "market": "KOSPI 종합",
        "recommended_date": "2023.4.3",
        "recommended_price": "368,000",
        "prev_close": "360,000",
        "dividend_rate": "-2.17%",
        "reference": "중장기 투자유망종목"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "하이비젼시스템",
        "code": "126700",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.27",
        "recommended_price": "18,220",
        "prev_close": "20,450",
        "dividend_rate": "12.24%",
        "reference": "중소형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "넷마블",
        "code": "251270",
        "market": "KOSPI 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": "62,400",
        "prev_close": "55,900",
        "dividend_rate": "-10.42%",
        "reference": "대형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "유한양행",
        "code": "000100",
        "market": "KOSPI 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": "51,400",
        "prev_close": "59,300",
        "dividend_rate": "15.37%",
        "reference": "대형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "엠씨넥스",
        "code": "097520",
        "market": "KOSPI 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": "29,300",
        "prev_close": "32,550",
        "dividend_rate": "11.09%",
        "reference": "중소형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "루닛",
        "code": "328130",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": "42,750",
        "prev_close": "83,800",
        "dividend_rate": "96.02%",
        "reference": "중소형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "인터로조",
        "code": "119610",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": "29,250",
        "prev_close": "34,700",
        "dividend_rate": "18.63%",
        "reference": "중소형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "웅진씽크빅",
        "code": "095720",
        "market": "KOSPI 종합",
        "recommended_date": "2023.3.22",
        "recommended_price": "2,920",
        "prev_close": "3,020",
        "dividend_rate": "3.42%",
        "reference": "중소형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "자화전자",
        "code": "033240",
        "market": "KOSPI 종합",
        "recommended_date": "2023.3.17",
        "recommended_price": "27,850",
        "prev_close": "34,400",
        "dividend_rate": "23.52%",
        "reference": "중소형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "KH바텍",
        "code": "060720",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.17",
        "recommended_price": "16,530",
        "prev_close": "20,800",
        "dividend_rate": "25.83%",
        "reference": "중소형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "KT서브마린",
        "code": "060370",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.15",
        "recommended_price": "6,150",
        "prev_close": "7,090",
        "dividend_rate": "15.28%",
        "reference": "중소형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "하나기술",
        "code": "299030",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.3.7",
        "recommended_price": "64,300",
        "prev_close": "65,200",
        "dividend_rate": "1.40%",
        "reference": "중소형주"
      },
      {
        "stock_company": "한국투자",
        "stock_item": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2023.2.27",
        "recommended_price": "61,300",
        "prev_close": "71,400",
        "dividend_rate": "16.48%",
        "reference": "추천종목"
      },
      {
        "stock_company": "KB",
        "stock_item": "넥스틴",
        "code": "348210",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.2.16",
        "recommended_price": "56,100",
        "prev_close": "75,000",
        "dividend_rate": "33.69%",
        "reference": "중소형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "NAVER",
        "code": "035420",
        "market": "KOSPI 종합",
        "recommended_date": "2023.2.13",
        "recommended_price": "230,000",
        "prev_close": "199,500",
        "dividend_rate": "-13.26%",
        "reference": "대형주"
      },
      {
        "stock_company": "신한투자증권",
        "stock_item": "씨앤씨인터내셔널",
        "code": "352480",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.2.10",
        "recommended_price": "30,800",
        "prev_close": "45,350",
        "dividend_rate": "47.24%",
        "reference": "중소형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "롯데정보통신",
        "code": "286940",
        "market": "KOSPI 종합",
        "recommended_date": "2023.2.6",
        "recommended_price": "26,750",
        "prev_close": "28,250",
        "dividend_rate": "5.61%",
        "reference": "중소형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "롯데정보통신",
        "code": "286940",
        "market": "KOSPI 종합",
        "recommended_date": "2023.2.2",
        "recommended_price": "25,850",
        "prev_close": "28,250",
        "dividend_rate": "9.28%",
        "reference": "중소형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "KH바텍",
        "code": "060720",
        "market": "KOSDAQ 종합",
        "recommended_date": "2023.1.30",
        "recommended_price": "14,730",
        "prev_close": "20,800",
        "dividend_rate": "41.21%",
        "reference": "중소형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "NAVER",
        "code": "035420",
        "market": "KOSPI 종합",
        "recommended_date": "2023.1.25",
        "recommended_price": "196,000",
        "prev_close": "199,500",
        "dividend_rate": "1.79%",
        "reference": "대형주"
      },
      {
        "stock_company": "한국투자",
        "stock_item": "NAVER",
        "code": "035420",
        "market": "KOSPI 종합",
        "recommended_date": "2023.1.16",
        "recommended_price": "195,000",
        "prev_close": "199,500",
        "dividend_rate": "2.31%",
        "reference": "추천종목"
      },
      {
        "stock_company": "KB",
        "stock_item": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2023.1.10",
        "recommended_price": "60,700",
        "prev_close": "71,400",
        "dividend_rate": "17.63%",
        "reference": "대형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "SK하이닉스",
        "code": "000660",
        "market": "KOSPI 종합",
        "recommended_date": "2023.1.10",
        "recommended_price": "86,000",
        "prev_close": "108,600",
        "dividend_rate": "26.28%",
        "reference": "대형주"
      },
      {
        "stock_company": "삼성",
        "stock_item": "LG전자",
        "code": "066570",
        "market": "KOSPI 종합",
        "recommended_date": "2023.1.2",
        "recommended_price": "86,500",
        "prev_close": "122,800",
        "dividend_rate": "41.97%",
        "reference": "추천종목"
      },
      {
        "stock_company": "유안타",
        "stock_item": "POSCO홀딩스",
        "code": "005490",
        "market": "KOSPI 종합",
        "recommended_date": "2022.12.21",
        "recommended_price": "281,000",
        "prev_close": "360,000",
        "dividend_rate": "28.11%",
        "reference": "대형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "삼성엔지니어링",
        "code": "028050",
        "market": "KOSPI 종합",
        "recommended_date": "2022.10.25",
        "recommended_price": "23,550",
        "prev_close": "28,300",
        "dividend_rate": "20.17%",
        "reference": "대형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "현대모비스",
        "code": "012330",
        "market": "KOSPI 종합",
        "recommended_date": "2022.9.26",
        "recommended_price": "206,500",
        "prev_close": "223,000",
        "dividend_rate": "7.99%",
        "reference": "대형주"
      },
      {
        "stock_company": "유안타",
        "stock_item": "삼성전자",
        "code": "005930",
        "market": "KOSPI 종합",
        "recommended_date": "2022.9.22",
        "recommended_price": "55,300",
        "prev_close": "71,400",
        "dividend_rate": "29.11%",
        "reference": "대형주"
      },
      {
        "stock_company": "KB",
        "stock_item": "삼성SDI",
        "code": "006400",
        "market": "KOSPI 종합",
        "recommended_date": "2022.5.9",
        "recommended_price": "617,000",
        "prev_close": "718,000",
        "dividend_rate": "16.37%",
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
        { text: '종목명', value: 'stock_item' },
        { text: '종목 코드', value: 'code' },
        { text: '시장 구분', value: 'market' },
        { text: '추천일', value: 'recommended_date' },
        { text: '추천가', value: 'recommended_price' },
        { text: '전일종가', value: 'prev_close' },
        { text: '수익률', value: 'dividend_rate' },
        { text: '참고', value: 'reference' }],
      selectedMenu: null,
      submenuOptions: submenuOptions,
      recommendedStocks: recommendedStocks,
      selectedSubmenu: submenuOptions[0],
      searchKeyword: '',
      searchKeywordBySelectedSubmenu: searchKeywordBySelectedSubmenu,
    };
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

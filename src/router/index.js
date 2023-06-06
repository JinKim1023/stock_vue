import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '@/views/home/DashBoard'
import GridSystem from '@/views/businessindex/GridSystem'
import ResearchPage from '@/views/research/ResearchPage.vue';



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'DashBoard',
        component: DashBoard
    },
    {
        path: '/grid-system',
        name: 'GridSystem',
        component: GridSystem
    },
    {
        path: '/research',
        name: 'ResearchPage',
        component: ResearchPage
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
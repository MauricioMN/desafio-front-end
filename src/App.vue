<template>
  <div id="app">
    <Header ref="header"/>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/sass/global.scss'
import Vue from "vue" 
import VueMask from "v-mask";

Vue.use(VueMask);


export default {
  components: {
    Header,
    Footer,

  },
  created() {
    //recebe a funcao itemsCount e infos. do comp filho. para evento "somar" a quantidade de itens no carrinho
    this.$on('productAdded', () => {
      console.log(this.$refs.header.itemsCount())

    })
  }
}
</script>

<style lang="scss">

</style>

<template>
  <div class="card">
    <div class="card-img"><img :src="data.imageUrl" alt="" /></div>
    <div class="card-info">
      <span>{{ data.category }}</span>
      <h2>{{ data.name }}</h2>
      <p>{{ data.description }}</p>
      <strong>{{ data.price | toCurrency }}</strong>
    </div>
    <div class="card-btn">
      <button @click="emitProduct">ADICIONAR CARRINHO</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

//Filtro para formatar o preco para BRL
Vue.filter('toCurrency', function (value) {
  if (typeof value !== 'number') {
    return value
  }
  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  return formatter.format(value)
})

export default {
  name: 'Cards',
  props: {
    data: { type: Object },
  },
  methods: {
      emitProduct() {
        this.$parent.$emit('product', this.data);
        
      }
  }
}
</script>

<style lang="scss" scoped>
@import '.././assets/sass/variables.scss';

.card {
  display: flex;
  flex-direction: column;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 3px 5px,
    rgba(17, 17, 26, 0.05) 0px 8px 15px;

  .card-img {
    height: 250px;
    /* background-color: $gray-font; */
    display: flex;
    justify-content: center;

    img {
      height: 100%;
      /* width: 100%; */
    }
  }

  .card-info {
    padding: 30px;
    border-bottom: 1px solid $gray-font;

    span {
      color: $purple;
      font-weight: 600;
      font-size: 14px;
    }
    h2 {
      color: $gray-textBold;
      font-weight: 600;
      font-size: 18px;
      margin-top: 10px;
    }
    p {
      color: $gray-text;
      font-weight: 400;
      font-size: 14px;
      margin-top: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* number of lines to show */
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    strong {
      color: $gray-textBold;
      font-weight: 600;
      font-size: 28px;
    }
  }
  .card-btn {
    button {
      width: 100%;
      box-shadow: none;
      outline: none;
      border: none;
      background: white;
      padding: 15px 0;
      color: $purple;
      font-weight: 900;
      font-size: 20px;
      transition: 0.3s all ease;

      &:hover {
        background: $purple;
        color: white;
      }
    }
  }
}
</style>

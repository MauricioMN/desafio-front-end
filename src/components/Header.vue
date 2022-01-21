<template>
  <header>
    <div class="container">
      <nav>
        <router-link to="/">
          <img src="../../public/imgs/MktPlaceLogo.jpg" class="logo" />
        </router-link>
        <div>
          <div class="navRight">
            <div>
              <router-link to="/">Produtos</router-link>
            </div>
            <div>
              <router-link to="/carrinho">
                <CartItem ref="cartItem" />
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import CartItem from './CartItem.vue'
export default {
  name: 'Header',
  components: {
    CartItem,
  },
  methods: {
    itemsCount() {
      //recebe a funcao itemsCount e infos. do comp filho. para evento "somar" a quantidade de itens no carrinho
      this.$refs.cartItem.itemsCount()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '.././assets/sass/variables.scss';

header {
  background-color: white;
  padding: 25px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 20px -20px;

  nav {
    display: flex;
    justify-content: space-between;

    a {
      text-decoration: none;
      color: $gray-font;
    }
    .navRight {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>

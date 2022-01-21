<template>
  <div class="cart">
    <div class="container">
      <div class="main">
        <div class="headRow">
          <h3>PRODUTOS</h3>
          <h3>QUANTIDADE</h3>
          <h3>VALOR UNITARIO</h3>
          <h3>TOTAL</h3>
        </div>

        <div
          class="col-12 divCells"
          v-for="(product, index) in products"
          :key="index"
        >
          <div class="garbageCells">
            <img
              @click="removeItem(index)"
              src="../../public/icons/garbage.svg"
            />
          </div>
          <div class="col-3">
            <div class="info">
              <span class="category">{{ product.info.category }}</span>
              <span class="name">{{ product.info.name }}</span>
            </div>
          </div>
          <div class="col-3">
            <div class="qtde">
              <div class="divMenos" @click="subtractItem(index)">-</div>
              <span
                ><strong>{{ product.qtde }}</strong></span
              >
              <div class="divMais" @click="addItem(index)">+</div>
            </div>
          </div>
          <div class="col-3">
            <div class="prices">
              <span
                ><strong>{{ product.info.price | toCurrency }}</strong> à
                vista</span
              ><br />
              <span>ou 10x {{ (product.info.price / 10) | toCurrency }}</span>
            </div>
          </div>
          <div class="pricesTotal">
            <span
              ><strong>{{
                (product.qtde * product.info.price) | toCurrency
              }}</strong>
              à vista </span
            ><br />
            <span
              >ou 10x
              {{
                ((product.qtde * product.info.price) / 10) | toCurrency
              }}</span
            >
          </div>
        </div>
        <div class="finalPrices">
          <div class="firstFinalPrice">
            <div>TOTAL À VISTA</div>
            <strong>{{ calcPrice | toCurrency }}</strong>
          </div>
          <div class="secondFinalPrice">
            <div class="div1">TOTAL PARCELADO</div>
            <div>
              <div class="div2">
                em até <strong>10x {{ (calcPrice / 10) | toCurrency }}</strong>
              </div>
              <div class="div3">(Total {{ calcPrice | toCurrency }})</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="col-6 clearCart">
            <div @click="clearCart">
              <img
                class="garbage"
                src="../../public/icons/garbage.svg"
                alt=""
              />
              <span>Limpar Carrinho</span>
            </div>
          </div>
          <div class="col-6 btn">
            <router-link to="/">
              <button class="btnContinuar">Continuar Comprando</button>
            </router-link>
            <router-link to="/checkout">
              <button class="btnConcluir">Concluir Compra</button>
            </router-link>
          </div>
        </div>
      </div>
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
  name: 'Cart',
  data() {
    return {
      products: [],
    }
  },
  computed: {
    //Funcao para multp. preco pela quantidade (qtde * preco) dos produtos no localstorage
    calcPrice() {
      var parsedObj = JSON.parse(JSON.stringify(this.products))
      var price = 0
      Object.keys(parsedObj).forEach(function (k) {
        price = price + parsedObj[k].qtde * parsedObj[k].info.price
      })
      return price
    },
    price: {
      get() {
        return this.price || 0
      },
      set(price) {
        this.$emit('update:price', { ...this.price, price })
      },
    },
  },
  mounted() {},
  methods: {
    //funcao do botao "+"  para adicionar a quantidade do produto
    //atualizar a informacao para o comp. pai - Produtos 
    //e atualizar o comp. filho CartItem para evento do icone carrinho no header
    addItem(index) {
      this.products[index].qtde++
      localStorage.setItem('products', JSON.stringify(this.products))
      this.$parent.$emit('productAdded')
    },
    //funcao do botao "-"  para subtrair a quantidade do produto
    //atualizar a informacao para o comp. pai - Produtos 
    //e atualizar o comp. filho CartItem para evento do icone carrinho no header
    subtractItem(index) {
      if (this.products[index].qtde > 1) {
        this.products[index].qtde--
        localStorage.setItem('products', JSON.stringify(this.products))
      }
      this.$parent.$emit('productAdded')
    },
    removeItem(index) {
      //funcao do icone garbage das cells para remover o produto do carrinho
      //atualizar a informacao para o comp. pai - Produtos 
      // atualizar o comp. filho CartItem para evento do icone carrinho no header
      this.$delete(this.products, index)
      this.$parent.$emit('productAdded')
    },
    clearCart() {
      //funcao da div Limpar Carrinho
      //atualizar a informacao para o comp. pai - Produtos 
      //atualizar o comp. filho CartItem para evento do icone carrinho no header
      this.products = {}
      localStorage.removeItem('products')
      this.$parent.$emit('productAdded')
    },

    getLocalStorage() {
      console.log(this.products)
    },
  },
  created() {
    this.products = JSON.parse(localStorage.getItem('products')) || []
  },
  watch: {
    products(newProducts) {
      localStorage.setItem('products', JSON.stringify(newProducts))
      this.$parent.$emit('productAdded')
    },
  },
}
</script>

<style lang="scss">
@import '.././assets/sass/variables.scss';

.main {
  display: flex;
  flex-direction: column;
  padding: 30px;

  strong {
    color: $gray-textBold;
  }

  .headRow {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d6c7c7;
    padding: 0 55px 20px 55px;
    margin: 50px 0 0 0;

    h3 {
      color: $gray-textBold;
      font-weight: 600;
      font-size: 18px;
    }
  }
  .divCells {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d6c7c7;

    .garbageCells {
      img {
        width: 15px;
        cursor: pointer;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      max-width: 180px;

      .category {
        margin-top: 20px;
        color: $purple;
        font-weight: 600;
        font-size: 14px;
      }
      .name {
        color: $gray-textBold;
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
    .qtde {
      display: flex;
      align-items: center;
      color: $gray-textBold;
      font-weight: 600;

      .divMenos {
        border: 1px solid $gray-footer;
        padding: 5px;
        border-radius: 3px 0 0 3px;
        cursor: pointer;
      }
      span {
        border-top: 1px solid $gray-footer;
        border-bottom: 1px solid $gray-footer;
        padding: 5px 15px 5px 15px;
      }
      .divMais {
        border: 1px solid $gray-footer;
        padding: 5px;
        border-radius: 0 3px 3px 0;
        cursor: pointer;
      }
    }
  }
  .finalPrices {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-bottom: 1px solid $gray-font;
    padding: 20px 0 20px 0;

    .firstFinalPrice {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $gray-text;
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 25px;
      div {
        margin-right: 50px;
      }
      strong {
        margin-right: 13px;
        color: $purple;
        font-weight: 600;
        font-size: 25px;
      }
    }
    .secondFinalPrice {
      display: flex;
      justify-content: center;
      color: $gray-text;
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 25px;

      .div1 {
        margin-right: 45px;
      }
      .div2 {
        font-weight: 400;
        font-size: 15px;
        strong {
          font-weight: 600;
        }
      }
      .div3 {
        font-size: 15px;
        font-weight: 400;
      }
    }
  }

  .footer {
    display: flex;
    padding: 40px 0 40px 0;
    .clearCart {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      div {
        cursor: pointer;
        .garbage {
          width: 15px;
        }
        span {
          margin-left: 10px;
        }
      }
    }
    .btn {
      display: flex;
      justify-content: flex-end;

      .btnContinuar {
        height: 50px;
        width: 250px;
        border: none;
        margin-left: 15px;
        background-color: $gray-button;
        border-radius: 3px;
        color: $gray-text;
        font-weight: 600;
      }
      .btnConcluir {
        height: 50px;
        width: 250px;
        border: none;
        margin-left: 15px;
        background-color: $purple;
        border-radius: 3px;
        color: white;
      }
    }
  }
}
@media (max-width: 991.98px) {
  .main {
    padding: 0;
    .headRow {
      padding: 0 22px 15px 22px;
    }
    .divCells {
      margin-left: 10px;
      .garbageCells {
        img {
          margin: -20px;
        }
      }
      .info {
        max-width: 100px;

        .category {
          font-size: 12px;
        }
        .name {
          font-size: 14px;
        }
      }
      .prices {
        font-size: 14px;
      }
      .pricesTotal {
        font-size: 14px;
      }
    }

    .finalPrices {
      .firstFinalPrice {
        font-size: 17px;
      }
      .secondFinalPrice {
        font-size: 17px;
      }
    }

    .footer {
      .btn {
        margin-left: 15px;
        .btnContinuar {
          width: 150px;
        }
        .btnConcluir {
          width: 150px;
        }
      }
    }
  }
}

@media (max-width: 767.98px) {
  .main {
    padding: 0;
    .headRow {
      padding: 0 12px 10px 12px;
      h3 {
        font-size: 14px;
      }
    }
    .divCells {
      .garbageCells {
        img {
          margin: -25px;
        }
      }
      .info {
        max-width: 100px;

        .category {
          font-size: 10px;
        }
        .name {
          font-size: 12px;
        }
      }
      .prices {
        font-size: 12px;
      }
      .pricesTotal {
        font-size: 12px;
      }
    }

    .finalPrices {
      .firstFinalPrice {
        font-size: 14px;
        strong {
          font-size: 20px;
        }
      }
      .secondFinalPrice {
        font-size: 14px;
        .div1 {
          margin-right: 33px;
        }
        .div2 {
          font-size: 14px;
        }
        .div3 {
          font-size: 14px;
        }
      }
    }

    .footer {
      .btn {
        margin-left: 15px;
        .btnContinuar {
          width: 150px;
        }
        .btnConcluir {
          width: 150px;
        }
      }
    }
  }
}

@media (max-width: 575.98px) {
  .main {
    /* padding: 0 0px 0 25px; */
    /* overflow-x: scroll; */
    .divCells {

      .garbageCells {
        margin-left: 5px;
      }
      .info {
        max-width: 100px;
        margin-left: -15px;
        .category {
          font-size: 10px;
        }
        .name {
          font-size: 12px;
        }
      }
      .prices {
        margin-left: -25px;
        font-size: 12px;
        max-width: 50%;
      }
      .pricesTotal {
        font-size: 12px;
        max-width: 60px;
      }
      .qtde {
        margin-left: -25px;
        .divMenos {
          padding: 5px;

        }
        span {
          padding: 5px;
        }
      }
    }

    .finalPrices {
      padding: 25px 0 25px 0;

      .firstFinalPrice {
        font-size: 14px;
        margin-bottom: 25px;
        strong {
          margin-right: 13px;
          font-size: 18px;
        }
      }
      .secondFinalPrice {
        font-size: 14px;

        .div1 {
          margin-right: 35px;
        }
        .div2 {
          font-weight: 400;
          font-size: 13px;
        }
        .div3 {
          font-size: 13px;
        }
      }
    }

    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      .btn {
        flex-direction: column;
        .btnContinuar {
          width: 100%;
          height: 50px;
          font-size: 15px;
          margin-bottom: 15px;
        }
        .btnConcluir {
          width: 100%;
          height: 50px;
          font-size: 15px;
        }
      }
    }
  }
}
</style>

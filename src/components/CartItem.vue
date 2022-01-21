<template>
  <div class="container">
    <img src="../../public/icons/shopping-cart.svg" class="carrinho" />

    <div class="ellipseDiv">
      <img src="../../public/imgs/Ellipse.png" class="ellipse" />
      <div class="textEllipse">{{ itemsAdded }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartItem',
  data() {
    return {
      itemsAdded: 0,
    }
  },
  computed: {},
  methods: {
    itemsCount() {
      //funcao para fazer a contagem dos itens adicionados/removidos no icone Carrinho no header. 
      let parsedObj = JSON.parse(localStorage.getItem('products'))
      let qtdeItems = 0
      Object.keys(parsedObj).forEach(function (k) {
        qtdeItems = qtdeItems + parsedObj[k].qtde
      })
      this.itemsAdded = qtdeItems
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  .carrinho {
    width: 30px;
  }

  .ellipseDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    .ellipse {
      margin-top: 5px;
      margin-left: -1px;
      width: 25px;
    }
    .textEllipse {
      font-weight: 700;
      position: absolute;
      color: white;
    }
  }
}

@media (max-width: 575.98px) {
  .container {
    .carrinho {
      width: 20px;
    }

    .ellipseDiv {
      .ellipse {
        width: 20px;
      }
    }
  }
}
</style>

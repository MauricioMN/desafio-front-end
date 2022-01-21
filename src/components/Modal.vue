<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-body">
      <span class="close-button" @click="toggleModal"><img class="close-button-x" src="../../public/icons/x.svg" alt=""></span>
      <img class="concluirCard" src="../../public/imgs/ConcluirCad.png" alt="" />
      <p>Seu cadastro foi solicitado com sucesso!</p>
      <br />
      <div>
        <router-link to="/">
          <img class="arrowLeft" src="../../public/icons/left-arrow.svg" alt="" />
          <a href="">VOLTAR PARA HOME</a>
        </router-link>
      </div>
    </div>
    <div @click="toggleModal" class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen
    },
  },
  mounted() {
    //recebe a info vindo do comp. pai - Produtos
    this.$parent.$on('toggleModal', this.toggleModal)
  },
}
</script>

<style lang="scss" scoped>
@import '.././assets/sass/variables.scss';

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;

  .modal-body {
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #fff;
    padding: 2rem 2rem;
    position: relative;
    max-width: 28%;
    min-height: 35%;
    z-index: 2;

    @media (max-width: 860px) {
      max-width: 80%;
      padding: 2rem 1rem;
    }

    .close-button {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 88%;
      left: 93%;
      width: 35px;
      height: 35px;
      font-weight: 600;

      &:hover {
        cursor: pointer;
      }
    }

    .concluirCard {
      width: 130px;
      margin-top: 15px;
    }
    .close-button-x {
      width: 15px;
    }
    .arrowLeft {
      width: 22px;
      margin-right: 10px;
    }
    a {
      text-decoration: none;
      color: $purple;
      font-size: 17px;
    }

    p {
      margin: 0;
      color: #5e5c5c;
      font-size: 25px;
      text-align: center;
    }
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>

<template>
  <div class="checkout">
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-sm-6">
            <div class="form">
              <label for="">Nome*</label>
              <input v-model="name" required />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form">
              <label for="">CEP*</label>
              <input
                v-mask="'#####-###'"
                v-model="cep"
                @blur="searchCep()"
                required
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <div class="form">
              <label for="">E-mail*</label>
              <input type="email" v-model="email" required />
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form">
              <label for="">Endereço*</label>
              <input v-model="adress" required />
            </div>
          </div>
          <div class="col-sm-2">
            <div class="form">
              <label for="">Número*</label>
              <input v-model="number" required />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <div class="form">
              <label for="">CPF*</label>
              <input v-mask="'###.###.###-##'" v-model="cpf" required />
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form">
              <label for="">Complemento*</label>
              <input v-model="complement" required />
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form">
              <label for="">Bairro*</label>
              <input v-model="district" required />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-3">
            <div class="form">
              <label for="">Data de Nascimento*</label>
              <input
                v-mask="'##/##/####'"
                v-model="birthDay"
                placeholder="dd/mm/yyyy"
                required
              />
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form">
              <label for="">Telefone*</label>
              <input v-mask="maskTel()" v-model="phone" required />
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form">
              <label for="">Cidade*</label>
              <input v-model="city" required />
            </div>
          </div>
          <div class="col-sm-2">
            <div class="form">
              <label for="">Estado*</label>
              <input v-model="state" required />
            </div>
          </div>
        </div>
        <div class="btnConcluir">
          <button type="submit">Concluir Compra</button>
          <Modal />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'

export default {
  components: {
    Modal,
  },

  data: () => ({
    name: '',
    cep: '',
    email: '',
    adress: '',
    number: '',
    cpf: '',
    complement: '',
    district: '',
    birthDay: '',
    phone: '', // funciona para fixo ou celular 9 digitos
    city: '',
    state: '',
    dataCep: {},
  }),
  methods: {
    //metodo p capturar dados do form
    handleSubmit() {
      const data = {
        name: this.name,
        cep: this.cep,
        email: this.email,
        adress: this.adress,
        number: this.number,
        cpf: this.cpf,
        complement: this.complement,
        district: this.district,
        birthday: this.birthDay,
        phone: this.phone,
        city: this.city,
        state: this.city,
      }
      if (data) {
        this.toggleModal()
      }
    },
    //evento abrir/fechar modal
    toggleModal() {
      this.$emit('toggleModal')
    },
    //funcao para formatar a mask do campo telefone
    maskTel() {
      if (this.phone) {
        return this.phone.length == 15 ? '(##) #####-####' : '(##) ####-#####'
      } else {
        return '(##) #####-####'
      }
    },
    //metodo consumir api ViaCEP
    async searchCep() {
      try {
        let response = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`)
        this.dataCep = await response.json()
      } catch (error) {
        console.log(error)
      }

      this.adress = this.dataCep.logradouro
      this.complement = this.dataCep.complemento
      this.district = this.dataCep.bairro
      this.city = this.dataCep.localidade
      this.state = this.dataCep.uf
    },
  },
  created() {
    this.searchCep()
  },
}
</script>

<style lang="scss">
@import '.././assets/sass/global.scss';
@import '.././assets/sass/variables.scss';

.checkout {
  padding: 70px;

  .btnConcluir {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;

    button {
      height: 50px;
      width: 350px;
      border: none;
      background-color: $purple;
      border-radius: 4px;
      color: white;
    }
  }
}

@media (max-width: 991.98px) {
  .checkout {
    padding: 0;
    font-size: 12px;
    .btnConcluir {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      button {
        width: 50%;
        height: 50px;
        font-size: 15px;
      }
    }
  }
}

@media (max-width: 657.98px) {
  .checkout {
    padding: 0;
    font-size: 10px;
    .btnConcluir {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      button {
        width: 50%;
        height: 50px;
        font-size: 15px;
      }
    }
  }
}
@media (max-width: 587.98px) {
  .checkout {
    padding: 0;
    font-size: 9px;
    .btnConcluir {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;

      button {
        width: 50%;
        height: 50px;
        font-size: 15px;
      }
    }
  }
}
</style>

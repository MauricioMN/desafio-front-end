<template>
  <div class="main-slider">
    <div class="slider">
      <div class="imgs_slides">
        <input
          type="radio"
          name="radio-btn"
          id="radio1"
          value="1"
          :checked="checkedValue == 1"
        />

        <input
          type="radio"
          name="radio-btn"
          id="radio2"
          value="2"
          :checked="checkedValue == 2"
        />

        <div class="first slide">
          <img src="../../public/imgs/HeaderNB.png" />
        </div>
        <div class="slide">
          <img src="../../public/imgs/HeaderSP.png" />
        </div>
      </div>
    </div>
    <div class="navigation">
      <label
        for="radio1"
        class="navigation-btn"
        value="1"
        :checked="checkedValue == 1"
      >
      </label>
      <label
        for="radio2"
        class="navigation-btn"
        value="2"
        :checked="checkedValue == 2"
      >
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data: () => ({
    checkedValue: '',
  }),
  mounted() {
    this.checkedValue = '1'
  },
}
</script>

<style lang="scss">
.main-slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .slider {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 440px;
    overflow: hidden;

    .imgs_slides {
      width: 500%;
      height: 500px;
      display: flex;

      .slide {
        width: 20%;
        transition: 2s;
      }

      .slide img {
        width: 100%;
        height: 500px;
      }
    }
  }
  .navigation {
    display: block;
    justify-content: center;
    margin-top: 10px;

    .navigation-btn {
      border: 2px solid purple;
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;
      transition: 1s;

      &:hover {
        background: purple;
      }
    }
  }

  .navigation-btn:not(:last-child) {
    margin-right: 40px;
  }

  #radio1:checked ~ .first {
    margin-left: 0;
  }

  #radio2:checked ~ .first {
    margin-left: -20%;
  }
}

.imgs_slides input {
  display: none;
}

@media (max-width: 991.98px) {
  .main-slider {
    .slider {
      height: 350px;
      .imgs_slides {
        .slide img {
          width: 100%;
          height: 350px;
        }
      }
    }
  }
}

@media (max-width: 767.98px) {
  .main-slider {
    .slider {
      height: 250px;
      .imgs_slides {
        .slide img {
          width: 100%;
          height: 250px;
        }
      }
    }
  }
}

@media (max-width: 575.98px) {
  .main-slider {
    .slider {
      height: 200px;
      .imgs_slides {
        .slide img {
          width: 100%;
          height: 200px;
        }
      }
    }
  }
}
</style>

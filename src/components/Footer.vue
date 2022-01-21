<template>
  <footer>
    <div class="container">
      <nav>
        <p>MktPlace</p>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>

@import '.././assets/sass/variables.scss';

footer {
  background-color: $gray-footer;

nav {
    display: flex;
    justify-content: center;

    p {
        margin-top: 15px;
        color: $gray-text;
        font-size: 33px;
    }
}

}
</style>

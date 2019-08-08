<template web>
  <div class="w-page">
    <nav>
      <ul class="w-navbar">
        <li class="w-title" :text="navbarTitle">{{navbarTitle}}</li>
      </ul>
    </nav>
    <div class="w-container">
      <router-link tag="button" class="w-button" id="homeButton" to="/">Home</router-link>
      <!-- alternate way to route manually and use the same method as native -->
      <button class="w-button" id="aboutButton" v-on:click="goToAboutPage">About</button>
      <router-view/>
    </div>
  </div>
</template>
<template native>
  <Page>
    <ActionBar :title="navbarTitle"/>
    <GridLayout rows="auto, auto">
      <Button text="Home" @tap="goToHomePage" row="0"/>
      <Button text="About" @tap="goToAboutPage" row="1"/>
    </GridLayout>
  </Page>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  const { VUE_APP_MODE } = process.env;

  @Component({
    name: 'home',
  })
  export default class App extends Vue {
    private navbarTitle: string = `App.vue`;


    public goToHomePage() {
      this.goTo('home');
    }

    public goToAboutPage() {
      this.goTo('about');
    }

    public goTo(route) {
      VUE_APP_MODE === 'web' ? this.$router.push(route) : Vue.prototype.$navigator.navigate(route);
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style web lang="scss">
  @import '~styles/style-one';

  .w-page {
    height: 100%;
    width: 100%;
  }

</style>
<style native lang="scss">
  @import '~styles/style-one';

  .w-page {
    height: 100%;
    width: 100%;
  }

</style>

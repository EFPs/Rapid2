<template>
  <v-container fluid>
    <v-parallax src="/static/tim-gouw-68319-unsplash.jpg">
    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5>
        <h1 style="background-color: rgba(0,0,0,0.7)">Welcome to Skyer</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3 style="background-color: rgba(0,0,0,0.4)">
        <blockquote class="blockquote text-xs-center">
          We offer an early course pre-registration for MUIC students <br>
          Students can also plan courses ahead, with no need to<br> worry about sky-war.<br>
        </blockquote>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3 class="text-xs-center" mt-5>
        <v-btn color="primary" to="/signup">Sign Up</v-btn>
        <v-btn to="/signin">Sign In</v-btn>
      </v-flex>
    </v-layout>
  </v-parallax>
  </v-container>
</template>

<script>
export default {}
</script>

<template>
  <div id="app">
      <!-- <router-link to="/b1">去b1</router-link>
      <router-link to="/b2">去b2</router-link>
      <router-link to="/foo/1">去foo1</router-link>
      <router-link to="/foo/2">去foo2</router-link> -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

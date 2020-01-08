<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/about/b/1" tag="button">去b1页</router-link>
    <router-link :to="{name:'bb',params:{id:'2'}}" tag="button">去b2页</router-link>
    <!-- <router-link to="/about/b/2" tag="button">去b2页</router-link> -->
    <router-view />
  </div>
</template>

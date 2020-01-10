<template>
<el-row class="tac">
    <el-col :span="12">
    <el-menu
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-openeds="['1','2','3']"
    >
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
            </template>
            <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>


        <el-submenu index="2">
            <template slot="title">
            <i class="el-icon-menu"></i>
            <span>导航一</span>
            </template>
            <el-menu-item-group>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
            <template slot="title">
            <i class="el-icon-menu"></i>
            <span>导航一</span>
            </template>
            <el-menu-item-group>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
  </el-col>
</el-row>
</template>

<script>
export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.el-col-12{
    width:100%;
}

</style>
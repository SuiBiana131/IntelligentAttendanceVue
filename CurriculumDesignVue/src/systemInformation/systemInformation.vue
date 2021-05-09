<template>
    <div id="a">
        <el-container>
            <el-aside width="200px">
                <el-menu  class="ha"  router>
                  <el-menu-item index="/systemInformation/aflowSetting" v-if="this.$store.state.user.role.length==3">
                  <i class="el-icon-setting"></i>表单管理</el-menu-item>
                  <el-submenu index="1" v-if="this.$store.state.user.role.length==3">
                    <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span><el-badge value="new" class="item">表单审批</el-badge></span>
                    </template>
                    <el-menu-item index="/systemInformation/basicInformation"><el-badge value="new" class="item">待审批</el-badge></el-menu-item>
                    <el-menu-item index="/systemInformation/attendance">已审批</el-menu-item> 
                  </el-submenu> 
                  <el-menu-item index="/systemInformation/processDisplay" ><i class="el-icon-document-checked"></i>我的申请</el-menu-item>  
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
    
    
</template>
<style>
    #a{
        background:;
    }
</style>
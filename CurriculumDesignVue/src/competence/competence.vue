<template>
    <div id="a">
        <el-container>
            <el-aside width="200px">
                <el-menu  class="ha"  router>
                  <el-menu-item index="/competence/describe"><i class="el-icon-setting"></i>考勤组管理</el-menu-item>
                  <el-menu-item index="/competence/updateCompetence"><i class="el-icon-setting"></i>班次管理</el-menu-item>
                  <el-menu-item index="/competence/workOvertime"><i class="el-icon-setting"></i>加班管理</el-menu-item>
                  <el-menu-item index="/competence/hoilday"><i class="el-icon-setting"></i>假期管理</el-menu-item>
                  <!-- <el-menu-item index="/competence/design"><i class="el-icon-edit"></i>设计</el-menu-item> -->
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
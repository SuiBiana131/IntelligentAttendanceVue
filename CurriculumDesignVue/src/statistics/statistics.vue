<template>
    <div id="a">
        <el-container>
            <el-aside width="200px">
                <el-menu  class="ha"  router>   
                  <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-search"></i>
                    <span>信息查询</span>
                    </template>
                    <el-menu-item index="/statistics/salary">员工信息</el-menu-item> 
                    <el-menu-item index="/statistics/attendanceResult">月度明细</el-menu-item>
                    <el-menu-item index="/statistics/sign">每日统计</el-menu-item>
                    <el-menu-item index="/statistics/staff">打卡时间</el-menu-item>
                  </el-submenu>
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
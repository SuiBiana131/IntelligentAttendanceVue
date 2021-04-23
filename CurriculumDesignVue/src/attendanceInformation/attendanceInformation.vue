<template>
    <div id="a">
        <el-container>
            <el-aside width="200px">
                <el-menu  class="ha"  router>  
                  <el-menu-item index="/attendanceInformation/myattendance"><i class="el-icon-s-custom"></i>我的考勤记录</el-menu-item>  
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
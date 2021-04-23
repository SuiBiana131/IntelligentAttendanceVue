<template>
<el-form class="Register-container">
    <h2 class="title">用户注册</h2>
   <el-form-item label="">
     <el-input type="text" v-model="username" placeholder="用户账号" ></el-input>
   </el-form-item>
   <el-form-item label="">
     <el-input type="password" v-model="password" placeholder="用户密码" ></el-input>
   </el-form-item>
   <el-form-item label="">
     <el-input type="surepassword" v-model="surepassword" placeholder="用户密码" ></el-input>
   </el-form-item>
   <el-form-item>
     <el-button  @click="doLogin()" style="width: 30%;">登录</el-button>
     <el-button type="primary" style="width: 30%;" @click="gotoRegister()">注册</el-button>
   </el-form-item>
 </el-form>
 </template>
 <style>
    .Register-container{
         margin-left:35%;
         width:30%;
    }
 </style>
 <script>
  export default {
    data() {
      return {
          username:'',
          password:'',
          surepassword:'',
      }
    },methods: {
      gotoRegister(){
        if(this.password===this.surepassword)
        {
            this.$axios.post('http://localhost:8080/User/resgin',this.$qs.stringify(
          {
            name:this.username,
            password:this.password
          }
        )).then(res => {
                 if(res.data=="注册成功！")
                    alert("注册成功！")
                 else
                    alert(res.data)
                 console.log(res);
                 }).catch(res => {
                     console.log(res)
                 });
        }
        else
            alert("注册失败！检查两次密码！")
      },
      doLogin(){
          this.$router.push('/')
      }
    },
  mounted() {
      
  } 
  }
</script>
<template>
  <div id="app">
    <div class="page">
      <div class="portal-header">
        <div class="header">
          <div class="logo">
            <div class="logo-img"><el-image  :src="require('../image/logo.png')" ></el-image></div>
            <div class="tab">      
              <el-menu  class="el-menu-demo" mode="horizontal" router >
                <el-menu-item index="/userInformation"><i class="el-icon-user-solid"></i>用户信息</el-menu-item> 
                <el-menu-item index="/competence" v-if="$store.state.user.role.length==3"><i class="el-icon-s-check"></i>考勤信息管理</el-menu-item> 
                <el-menu-item index="/systemInformation"><i class="el-icon-document-copy"></i>表单管理</el-menu-item>  
                <el-menu-item index="/statistics" v-if="$store.state.user.role.length==3"><i class="el-icon-s-data"></i>综合统计</el-menu-item>
                <el-menu-item index="/attendanceInformation"><i class="el-icon-s-promotion"></i>我的考勤</el-menu-item>
              </el-menu>
            </div>
          </div>
          <div class="login1"><el-link icon="el-icon-s-home">首页</el-link><el-link icon="el-icon-close" @click="exit()">退出</el-link></div>
        </div>
      </div>
      <div class="page-view">
        <div class="content">
          <div class="main">
            <transition :name="transitionName" >
              <router-view/>
            </transition>
          </div>
        </div>
        <div class="footer">
          <div class="footer-content">
            <div id="footerLeft"> 
              <el-link icon="el-icon-s-home">首页</el-link>
              <el-link icon="el-icon-close" @click="exit()">退出</el-link>
            </div>
            <div class="block">
              <el-date-picker
                v-model="date1"
                type="datetime"
                format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div>
              <el-button type="primary" @click="sign">签到</el-button>
              <el-button type="primary" @click="ispublish=true">发布</el-button>
            </div>
            <div id= "footerRight">
              <span>用户昵称：{{this.$store.state.user.username}}</span>
              <span>当前时间：{{time}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  <el-dialog title="修改信息" :visible.sync="ispublish" width="18%" center>
          <el-date-picker v-model="date2" type="date" format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd" placeholder="选择日期" >
      </el-date-picker>
          <div slot="footer" class="dialog-footer">
            <el-button @click="ispublish = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">发布签到</el-button>
          </div>
  </el-dialog>  
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      time: '',
      transitionName: '',
      ispublish:false,
      date1:'',
      date2:'',
      path:true,
      user:{
        userid:this.$store.state.id,
        username:this.$store.state.name,
        usertime:'2020.8.11'
      },
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slideLeft'
      } else {
        this.transitionName = 'slideRight'
      }
      this.isLogin();
    }
  },
  methods:{
    currentTime(){
      setInterval(this.getTime,1000)
    },
    sign(){
        if(this.date1=='')
          alert("日期为空！");
        else{
        this.$axios.post('http://localhost:8080/StaffAttend/sign',this.$qs.stringify(
        {
          userid:this.$store.state.id,
          date:this.date1
        }
      )).then(res => {
         console.log(res);
         alert(res.data);
      }).catch(res => {
      console.log(res)
      });}
    },
    exit(){
      this.$router.push('/login')
      this.$axios.post('http://localhost:8080/logout').then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
    },
    publish(){
      this.$axios.post('http://localhost:8080/StaffAttend/insertStaff',this.$qs.stringify(
        {
          date:this.date2
        }
      )).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
    },
    onSubmit()
    {
      this.ispublish=false;
      this.publish();
    },
    getTime(){
      var date=new Date();
      let yy = date.getFullYear();
      let mm = date.getMonth()+1;
      let dd = date.getDate();
      let hh = date.getHours();
      let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
      let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
      this.time= yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
    },
    getUser(){
      console.log(this.$store.state.changableNum)
      this.$axios.get('http://localhost:8080/User/select').then(res => {
        if(res!=null)
          {
            this.user.userid=this.user.userid+res.data.id;
            this.user.username=res.data.name;
            this.$store.dispatch('getNewNum',res.data.id);
          }
      console.log(this.$store.state.changableNum);
      console.log(res);
      }).catch(res => {
      console.log(res)
      });
    },
    isLogin(){
      if(this.$route.path=='/'||this.$route.path=='/login'||this.$route.path=='/register')
        {this.path=false;}
      else
        this.path=true;
    }
  },
  mounted() {
    this.currentTime(); 
    this.isLogin();
    console.log(this.$store.state.user.role.length);
  },
  created(){
    //在页面加载时读取localStorage里的状态信息
    //localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
    
    //在页面刷新时将vuex里的信息保存到localStorage里
    //window.addEventListener("beforeunload",()=>{
    //    localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
    //})
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
}
.page{
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 1224px;
  overflow: visible;
}
.portal-header{
    width: 100%;
    height: 70px;
    box-shadow: 0 1px 0 0 #dfdfdf;
    background: #fff;
}
.header{
    width: 1224px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.logo{
  display: flex;
}
.logo-img{
    width: 128px;
    margin-right: 48px;
    cursor: pointer;
}
.page-view{
  overflow-y: auto;
}
.content{
    main-top:10px;
    width: 100%;
    font-family: PingFangSC,PingFangSC-Regular;
    min-width: 1224px;
    overflow-x: hidden;
    min-height:600px;
}
.main{
  width: 1224px;
  margin: 0 auto;
}
.footer{
  width: 100%;
}
.footer-content{
  width: 1224px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.el-menu-item
{
  //min-width:20%;
  text-align:center;
}


  .slideLeft-enter-active,
  .slideRight-enter-active{
    transition: 0.2s ;
    transition-delay: 0.2s ;
  }
  .slideLeft-leave-active,
  .slideRight-leave-active{
    transition: 0.2s ;

  }
  .slideLeft-enter{
    transform:translateX(120%);
  }
  .slideLeft-enter-to{
    transform:translateX(0);
  }
  .slideRight-enter{
    transform:translateX(-120%);
  }
  .slideRight-enter-to{
    transform:translateX(0);
  }
  .slideLeft-leave{
    transform:translateX(0);
  }
  .slideLeft-leave-to{
    transform:translateX(-100%);
  }
  .slideRight-leave{
    transform:translateX(0);
  }
  .slideRight-leave-to{
    transform:translateX(100%);
  }
</style>

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
              <el-button type="primary" @click="getAttendanceType">签到</el-button>
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
    <el-dialog title="发布考勤" :visible.sync="ispublish" width="18%" center>
            <el-date-picker v-model="date2" type="date" format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd" placeholder="选择日期" >
        </el-date-picker>
            <div slot="footer" class="dialog-footer">
              <el-button @click="ispublish = false">取 消</el-button>
              <el-button type="primary" @click="onSubmit">发布签到</el-button>
            </div>
    </el-dialog>  
    <el-dialog title="考勤" :visible.sync="dialogAttendance" width="50%" center>
      <div class="dialog-center">
        <el-tabs v-model="activeName" @tab-click="tabclick">
          <el-tab-pane label="定位考勤" name="定位考勤" :disabled = "attendanceType[0]!=='1'">
            <div id="container"></div>
          </el-tab-pane>
          <el-tab-pane label="人脸考勤" name="人脸考勤" :disabled = "attendanceType[1]!=='2'">人脸考勤</el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAttendance = false">取 消</el-button>
        <el-button type="primary" @click="preSign">考勤</el-button>
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
      dialogAttendance:false,
      competencegroup:{},
      attendanceType:[], //考勤方式
      activeName:"未选择" ,//考勤tab
      Mappoints:[],//考勤地点
      //地图数据
      options:{timeout: 10000},
      lat: 39.984120,
      lng: 116.307484,
      map:{},
      markerLayer:{},
      circle:{},
      center:'',
      radius:1500,
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
          username:this.$store.state.user.username,
          date:this.date1
        }
      )).then(res => {
         console.log(res);
         alert(res.data);
      }).catch(res => {
      console.log(res)
      });}
    },
    preSign(){
      console.log(this.activeName);
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
    },
    getAttendanceType(){
      this.$axios.post('http://localhost:8080/StaffAttend/getType',this.$qs.stringify(
        {
          username:this.$store.state.user.username,
        }
      )).then(res => {
        console.log(res.data);
        this.competencegroup =  res.data;
        this.attendanceType =  res.data.type.split("");
        this.getMappoint(res.data.id)
        this.dialogAttendance = true;
      }).catch(res => {
      console.log(res)
      });
    },
    tabclick(tab, event) {
        console.log(tab.name);
        if(tab.name=="定位考勤"&&!this.map.id)
            this.getAddress();
    },
    //地图方法
    getAddress(){         
          const opt = {
            // 高精确度： true / false
            enableHighAccuracy: true,
            // 等待响应的最长时间 单位：毫秒
            timeout: 10 * 1000,
            // 应用程序愿意接受的缓存位置的最大年限
            maximumAge: 0
          };
          let that=this;
          let showPosition = function ( position ) {
            that.lat = position.coords.latitude;
            that.lng = position.coords.longitude;
            console.log(position);
            that.loadScript();
          }
          let showErr = function (err) {
            console.log(err);
          }
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition,showErr, opt);
          } else {
            alert('Geolocation is not supported in your browser')
          }         
    },
    loadScript() {
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://map.qq.com/api/gljs?v=1.exp&key=B3GBZ-M6EC6-3GES4-M2P2N-L6BY3-2IB6T&callback=init";
          script.onload = script.onreadystatechange = () => {
              if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                  this.initMap();
                  script.onload = script.onreadystatechange = null;
              }
          };
          document.body.appendChild(script);
    },
    initMap() {
          //定义地图中心点坐标
          this.center = new TMap.LatLng(this.lat, this.lng)
          console.log(this.lat+'-'+this.lng+'-'+this.map);
          //定义map变量，调用 TMap.Map() 构造函数创建地图
          this.map = new TMap.Map(document.getElementById('container'), {
              center: this.center,//设置地图中心点坐标
              zoom: 13,   //设置地图缩放级别
              //pitch: 43.5,  //设置俯仰角
              //rotation: 45    //设置地图旋转角度
          });
          let attmaps = [];
          this.Mappoints.forEach((Mappoint)=>{
            let attmap={id:0,styleId: 'circle',center: this.center,radius: 1500,}
            attmap.id=Mappoint.id;attmap.radius=parseInt(Mappoint.radius);
            //console.log(parseFloat(attmap.lat).toFixed(6));
            attmap.center=new TMap.LatLng(parseFloat(Mappoint.lat),parseFloat(Mappoint.lng));
            attmaps.push(attmap);
          })
          this.circle = new TMap.MultiCircle({ 
            map:this.map,
            styles: { // 设置圆形样式
            'circle': new TMap.CircleStyle({
              'color': 'rgba(41,91,255,0.16)',
              'showBorder': true,
              'borderColor': 'rgba(41,91,255,1)',
              'borderWidth': 2,
            }),
            },
            geometries: attmaps,
          });
          this.markerLayer = new TMap.MultiMarker({
            map: this.map,  //指定地图容器
            //样式定义
            styles: {
                //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
                myStyle: new TMap.MarkerStyle({ 
                    "width": 25,  // 点标记样式宽度（像素）
                    "height": 35, // 点标记样式高度（像素）
                    //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                    "anchor": { x: 16, y: 32 }  
                }) 
            },
            //点标记数据数组
            geometries: [{
                "id": "1",   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
                "styleId": 'myStyle',  //指定样式id
                "position": this.center,  //点标记坐标位置
                "properties": {//自定义属性
                    "title": "marker1"
                }}]
          });
    },
    getMappoint(gid){
        this.$axios.get('http://localhost:8080/Mappoint/selectBygid',{params:{id:gid}}).then(res => {
          this.Mappoints=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
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
.dialog-center{
  height:350px;

}
#container{
    /*地图(容器)显示大小*/
    width:100%;
    height:300px;
    margin-bottom:40px;
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

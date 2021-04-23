<template>
<div class="loginfater">
 <div class="login">
  <div class="login-image"></div>
  <el-form class="login-container">
   <h2 class="title" style="text-align: center;">用户登陆</h2>
   <el-form-item label="">
     <el-col :span="4">账号登陆</el-col><el-col :span="4">人脸登陆</el-col>
   </el-form-item>
   <el-form-item label="">
     <el-input type="text" v-model="username" placeholder="用户账号" autocomplete="off" prefix-icon="el-icon-user"></el-input>
   </el-form-item>
   <el-form-item label="">
     <el-input type="password" v-model="password" placeholder="用户密码" autocomplete="off" prefix-icon="el-icon-key"></el-input>
   </el-form-item>
   <el-form-item>
     <el-col :span="12"><el-button type="" @click="login()" icon="el-icon-s-order" style="width: 100%;">登录</el-button></el-col>
     <el-col :span="12"><el-button  @click="onTake"  icon="el-icon-camera" style="width: 100%;">人脸登陆</el-button></el-col>
     <!-- <el-button style="width: 48%;" @click="gotoRegister()">注册</el-button> -->
   </el-form-item>
    <el-row style="text-align: center;">
      <el-link @click="gotoRegister()">用户注册</el-link>
      <el-link >忘记密码</el-link>
    </el-row>
    <el-form-item  v-for="list in lists" :key="list.id" >
      <!-- <lzr-item  :list="list" @get-information="list.title='32'"></lzr-item>
      <el-button  @click="text" >测试</el-button>
      <lzr-information ref="lzr" v-bind.sync="list" @addItem="addItem(list)" 
      @deleteItem="deleteItem(list,$event)" @updateitem="updateitem(list,$event)"></lzr-information>-->
    </el-form-item>
  </el-form>
 </div>
  <!--拍照模态框-->
    <el-dialog
      title="拍照上传"
      :visible.sync="visible"
      @close="onCancel"
      width="1065px">
      <div class="box">
        <video id="videoCamera" class="canvas" :width="videoWidth" :height="videoHeight" autoPlay></video>
        <canvas id="canvasCamera" class="canvas" :width="videoWidth" :height="videoHeight"></canvas>
      </div>
      <div slot="footer">
        <el-button
          @click="drawImage"
          icon="el-icon-camera"
          size="small">
          拍照
        </el-button>
        <el-button
          v-if="os"
          @click="getCompetence"
          icon="el-icon-video-camera"
          size="small">
          打开摄像头
        </el-button>
        <el-button
          v-else
          @click="stopNavigator"
          icon="el-icon-switch-button"
          size="small">
          关闭摄像头
        </el-button>
        <el-button
          @click="resetCanvas"
          icon="el-icon-refresh"
          size="small">
          重置
        </el-button>
        <el-button
          @click="up"
          icon="el-icon-circle-close"
          size="small">
          完成
        </el-button>
      </div>
    </el-dialog>
 </div>
 </template>
 <style>
    .loginfater{
      position: relative;
      height:100vh;
    }
    .login{
      overflow:hidden;
      height:600px;
      width:800px;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .h2{
      
    }
    .login-container{
        float:left;
        width:400px;
        //margin-left:20px;
        height:600px;
    }
    .login-image{
        float:left;
        width:390px;
        height:100%;
        margin-right:10px;
        background-image:url(../image/login.png);
        background-repeat:no-repeat;
        background-size:contain;
    }
 </style>
  <script>
  import LzrItem from "../components/LzrItem"
  import LzrInformation from "../components/LzrInformation"
  export default {
    components:{
      LzrItem,
      LzrInformation
    },
    data() {
      return {
          username:'',
          password:'',
          visible: false,//弹窗
          loading: false,//上传按钮加载
          os: false,//控制摄像头开关
          thisVideo: null,
          thisContext: null,
          thisCancas: null,
          videoWidth: 500,
          videoHeight: 400,

          lists:[{
            title:'原因',
            type:'4',
            tips:'',
            unit:'',
            select:'',
            dateType:'',
            startDate:'',
            endDate:'',
            id:1,
            oaId:-1,
        }],
      }
    },methods: {
      login(){
        this.$axios.post('http://localhost:8080/userlogin',this.$qs.stringify(
          {
            username:this.username,
            password:this.password
          }
        )).then(res => {
         if(res.data.code!=1){
            alert("错误编号："+res.data.code+"错误原因："+res.data.msg);
            }
         else{           
            
            sessionStorage.clear();
            sessionStorage.setItem('user',JSON.stringify(res.data))
            console.log(this.$store.state)
            console.log(sessionStorage.getItem('user'));
            this.$store.dispatch('getNewUser',res.data);
            this.$router.push('/userInformation')
            alert("登陆成功");
         }
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      gotoRegister(){
        //this.$router.push('/register');
        this.$axios.post('http://localhost:8080/aiLogin',this.$qs.stringify(
          {
            username:this.username,
            ailogin:'345'
          }
        )).then(res => {
         console.log(res);
      }).catch(res => {
         console.log(res)
      });
      },
      /*调用摄像头拍照开始*/
      onTake() {
        this.visible = true;
        this.getCompetence();
      },
      onCancel() {
        this.visible = false;
        this.stopNavigator();

      },
      // 调用摄像头权限
      getCompetence() {
        //必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
        this.$nextTick(() => {
          const _this = this;
          this.os = false;//切换成关闭摄像头
          this.thisCancas = document.getElementById('canvasCamera');
          this.thisContext = this.thisCancas.getContext('2d');
          this.thisVideo = document.getElementById('videoCamera');
          // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
          if (navigator.mediaDevices === undefined) {
            navigator.menavigatordiaDevices = {}
          }
          // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
          // 使用getUserMedia，因为它会覆盖现有的属性。
          // 这里，如果缺少getUserMedia属性，就添加它。
          if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
              // 首先获取现存的getUserMedia(如果存在)
              let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
              // 有些浏览器不支持，会返回错误信息
              // 保持接口一致
              if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
              }
              // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
              return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject)
              })
            }
          }
          const constraints = {
            audio: false,
            video: {width: _this.videoWidth, height: _this.videoHeight, transform: 'scaleX(-1)'}
          };
          navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ('srcObject' in _this.thisVideo) {
              _this.thisVideo.srcObject = stream
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream)
            }
            _this.thisVideo.onloadedmetadata = function (e) {
              _this.thisVideo.play()
            }
          }).catch(err => {
            this.$notify({
              title: '警告',
              message: '没有开启摄像头权限或浏览器版本不兼容.',
              type: 'warning'
            });
          });
        });
      },
      //绘制图片
      drawImage() {
        // 点击，canvas画图
        this.thisContext.drawImage(this.thisVideo, 0, 0, this.videoWidth, this.videoHeight);
        // 获取图片base64链接
        this.imgSrc = this.thisCancas.toDataURL('image/png');
        /*const imgSrc=this.imgSrc;*/
      },
      //清空画布
      clearCanvas(id) {
        let c = document.getElementById(id);
        let cxt = c.getContext("2d");
        cxt.clearRect(0, 0, c.width, c.height);
      },
      //重置画布
      resetCanvas() {
        this.imgSrc = "";
        this.clearCanvas('canvasCamera');
      },
      //关闭摄像头
      stopNavigator() {
        if (this.thisVideo && this.thisVideo !== null) {
          this.thisVideo.srcObject.getTracks()[0].stop();
          this.os = true;//切换成打开摄像头
        }
      },
      /*调用摄像头拍照结束*/
      up(){
        this.onCancel();
        /*this.$axios.post('http://localhost:8080/Information/FaceSearch',this.$qs.stringify({image:this.imgSrc})).then(res => {
         console.log(res); 
      }).catch(res => {
      console.log(res)
      });*/
        this.$axios.post('http://localhost:8080/aiLogin',this.$qs.stringify(
          {
            username:this.username,
            ailogin:this.imgSrc
          }
        )).then(res => {
         console.log(res);
      }).catch(res => {
         console.log(res)
      });
      },
      addItem(list){
        list.select="";
        var item={num:0,value:'选项'};
        if(this.$refs.lzr[0].select1.length!=0)
          item.num=this.$refs.lzr[0].select1[this.$refs.lzr[0].select1.length-1].num+1;
        this.$refs.lzr[0].select1.push(item);
        this.$refs.lzr[0].select1.forEach(function(sel){
          list.select=list.select+sel.value+"-";
        })
        list.select = list.select.slice(0,list.select.length-1);
        console.log(this.$refs.lzr[0]._data);
      },
      deleteItem(list,value){
        list.select="";
        for(var i=0;i<this.$refs.lzr[0].select1.length;i++){
          if(this.$refs.lzr[0].select1[i].num==value.num){
            this.$refs.lzr[0].select1.splice(i,1);
            list.select=list.select+this.$refs.lzr[0].select1[i].value+"-";
            continue;
          }
          list.select=list.select+this.$refs.lzr[0].select1[i].value+"-";
        }
        list.select = list.select.slice(0,list.select.length-1);
        console.log(value);
      },
      updateitem(list,item){
        console.log(item.value);
        list.select="";
        this.$refs.lzr[0].select1.forEach(function(sel){
          if(sel.num==item.num)
            sel.value=item.value;
          list.select=list.select+sel.value+"-";
        })
        list.select = list.select.slice(0,list.select.length-1);
      },
      text(){
        console.log(this.lists);
      }
    },
  mounted() { 
  } 
  }
</script>
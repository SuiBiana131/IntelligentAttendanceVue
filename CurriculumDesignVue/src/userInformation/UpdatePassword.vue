<!-- 密码更新 -->
<template>
    <div id="a">
        <div id="top">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/Information/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <el-image style="width: 100px; height: 100px" v-if="userData.headshow" :src="userData.headshow"></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <h3>{{this.$store.state.user.username}}</h3>
        </div>
        <el-divider></el-divider>
        <el-divider></el-divider>
        <div id="bottom">
          <div class="bottom-child">
            <div class="child-top" ><H6>基本信息</H6></div>
            <el-divider></el-divider>
            <div class="child-left">
              <el-row >
              <el-col :span="4"><span>编号:</span></el-col>
              <el-col :span="7">
                <span >{{userData.userid}}</span>
              </el-col>
              <el-col :span="4" :offset="2"><span>昵称：</span></el-col>
              <el-col :span="7" ><el-input v-model="userData.nickname" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView">{{userData.nickname}}</span>
              </el-col>
              </el-row>
              <el-row >
              <el-col :span="4"><span>民族:</span></el-col>
              <el-col :span="7"><el-input v-model="userData.nation" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView">{{userData.nation}}</span>
              </el-col>
              <el-col :span="4" :offset="2"><span>居住地:</span></el-col>
              <el-col :span="7" ><el-input v-model="userData.address" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView">{{userData.address}}</span>
              </el-col>
              </el-row>
              <el-row >
              <el-col :span="4"><span>户籍地:</span></el-col>
              <el-col :span="7"><el-input v-model="userData.presentaddress" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView">{{userData.presentaddress}}</span>
              </el-col>
              <el-col :span="4" :offset="2"><span>电话:</span></el-col>
              <el-col :span="7" ><el-input v-model="userData.phone" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView">{{userData.phone}}</span>
              </el-col>
              </el-row>
              <el-row >
              <el-col :span="4"><span>性别:</span></el-col>
              <el-col :span="7"><el-input v-model="userData.sex" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView&&userData.sex==0">男</span>
                <span v-show="dataView&&userData.sex==1">女</span>
              </el-col>
              <el-col :span="4" :offset="2"><span>身份证号:</span></el-col>
              <el-col :span="7" ><el-input v-model="userData.identitynum" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView">{{userData.identitynum}}</span>
              </el-col>
              </el-row>
              <el-row >
              <el-col :span="4"><span>婚姻状况:</span></el-col>
              <el-col :span="7"><el-input v-model="userData.marriage" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView&&userData.marriage==1">已婚</span>
                <span v-show="dataView&&userData.marriage==0">未婚</span>
              </el-col>
              <el-col :span="4" :offset="2"><span>学历:</span></el-col>
              <el-col :span="7" ><el-input v-model="userData.education" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView">{{userData.education}}</span>
              </el-col>
              </el-row>
              <el-row >
              <el-col :span="4"><span>银行卡号:</span></el-col>
              <el-col :span="7" ><el-input v-model="userData.bankcard" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView">{{userData.bankcard}}</span>
              </el-col>
              <el-col :span="4" :offset="2"><span>银行名称:</span></el-col>
              <el-col :span="7" ><el-input v-model="userData.backname" placeholder="请输入内容" v-show="dataInput" size="mini"></el-input>
                <span v-show="dataView">{{userData.backname}}</span>
              </el-col>
              </el-row>
              <el-row >
              <el-col :span="4">
                <el-button   v-show="dataInput"  @click="updateInformation()">确认修改</el-button>
              </el-col>
              </el-row>
            </div>
            <div class="child-right">
                <el-button size="mini"  v-show="dataInput"  @click="shfit(1)">返回</el-button>
                <el-button size="mini"  v-show="dataView" @click="shfit(2)">修改</el-button>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="bottom-child">
            <div class="child-top" ><H6>人脸登陆</H6></div>
            <el-divider></el-divider>
            <div class="child-left">
              <el-switch
                v-model="userData.isailogin"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/Information/aiLoginShow"
                :show-file-list="false"
                :on-success="onSubmit"
                v-show="userData.isailogin==1">
                <img style="width: 100px; height: 100px" v-if="userData.ailogin" :src="userData.ailogin" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button size="mini"   @click="onTake" v-show="userData.isailogin==1">拍照上传</el-button>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="bottom-child">
            <div class="child-top" ><H6>密码</H6></div>
            <el-divider></el-divider>
            <div class="child-left">
              <el-row >
              <el-col :span="4"><span>当前密码：</span></el-col>
              <el-col :span="3"><el-input  placeholder="请输入内容" v-show="isPassword" size="mini"></el-input>
                <span v-show="!isPassword">***********</span>
              </el-col>
              </el-row>
              <el-row >
              <el-col :span="4"><span  v-show="isPassword">新密码：</span></el-col>
              <el-col :span="7"><el-input  placeholder="请输入内容" v-show="isPassword" size="mini"></el-input>
              </el-col>
              </el-row>
              <el-row >
              <el-col :span="4">
                <el-button size="mini"  v-show="isPassword"  @click="changePassWord()">确认</el-button>
              </el-col>
              </el-row>
            </div>
            <div class="child-right">
                <el-button size="mini" round v-show="isPassword"  @click="changePassWord()">小型按钮</el-button>
                <el-button size="mini" round v-show="!isPassword" @click="changePassWord()">小型按钮</el-button>
            </div>
          </div>
        </div>
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
            <el-button  @click="drawImage"  icon="el-icon-camera"  size="small">
              拍照
            </el-button>
            <el-button  v-if="os"  @click="getCompetence"  icon="el-icon-video-camera"  size="small">
              打开摄像头
            </el-button>
            <el-button  v-else  @click="stopNavigator"  icon="el-icon-switch-button"  size="small">
              关闭摄像头
            </el-button>
            <el-button  @click="resetCanvas"  icon="el-icon-refresh"  size="small">
              重置
            </el-button>
            <el-button  @click="up"  icon="el-icon-circle-close"  size="small">
              完成
            </el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        oldPassword: '',
        newPassword:'',
        surePassword: '',
        form:{},
        dataInput:false,
        dataView:true,
        userData:[],
        isPassword:false,
        //摄像头数据
        visible: false,//弹窗
        loading: false,//上传按钮加载
        os: false,//控制摄像头开关
        thisVideo: null,
        thisContext: null,
        thisCancas: null,
        videoWidth: 500,
        videoHeight: 400,
        imgSrc:'',
      }
    },methods: {
      shfit(str)
      {
        if(str==1)
        {
          this.dataInput=false;
          this.dataView=true;
        }else {
          this.dataInput=true;
          this.dataView=false;
        }
      },
      goBack() {
        console.log('go back');
      },
      onSubmit(response, file, fileList) {
        this.userData.ailogin='http://localhost:8080/aiLogin/'+file.name;
        this.updateInformation();
        /*this.$axios.post('http://localhost:8080/Information/aiAdd',this.$qs.stringify({str:'32'}
          )).then(res => {
          console.log(res);
      }).catch(res => {
      console.log(res)
      });*/
      },
      changePassWord(){
        this.isPassword=!this.isPassword;
      },
      updatePassword(){
        if(this.newPassword==this.surePassword){
        this.$axios.post('http://localhost:8080/User/update',this.$qs.stringify(
          {
            id: this.$store.state.id,
            oldPassword: this.oldPassword,
            newPassword:this.newPassword,
          }
        )).then(res => {
          alert("修改成功！");
          this.oldPassword='';
          this.newPassword='';
          this.surePassword='';
          console.log(res);
      }).catch(res => {
      console.log(res)
      });}
      else
        alert("请比较两次新密码！")
      },
      getuserInformation(){
        this.$axios.post('http://localhost:8080/Information/selectName',this.$qs.stringify({username:this.$store.state.user.username}
          )).then(res => {
          this.userData=res.data;
          console.log(res.data);
      }).catch(res => {
      console.log(res)
      });
      },
      updateInformation(){
        this.$axios.post('http://localhost:8080/Information/update',this.$qs.stringify(this.userData
          )).then(res => {
          console.log(res);
          this.dataInput=false;
          this.dataView=true;
      }).catch(res => {
      console.log(res)
      });
      },
      handleAvatarSuccess(response, file, fileList){
        this.userData.headshow='http://localhost:8080/upload/'+file.name;
        this.updateInformation();
        alert(file.name);
    },
      beforeAvatarUpload(){

    },
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
        this.$axios.post('http://localhost:8080/Information/photograph',this.$qs.stringify({imageUrl:this.imgSrc,
        name:this.$store.state.user.username+'.jpg'}
        )).then(res => {
        this.userData.ailogin='http://localhost:8080/aiLogin/'+this.$store.state.user.username+'.jpg';
        this.updateInformation();
        console.log(res);
      }).catch(res => {
         console.log(res)
      });
      },  
  },
     mounted() {
       this.getuserInformation();
  }
  }
</script>
<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.el-col
{
  height:40px;
}
.child-left{
  float:left;
  width:85%;
  margin-right:2%;
}
.child-right{
  float:right;
  width:13%;
}
.bottom-child::after{
  content: "";
  display: block;
  clear: both;
}
#top{
  margin:1%;
}
#bottom{
  
  margin:1%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader {

    margin-top:10px;
  }
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>
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
              <el-col :span="4" :offset="2"><span>姓名：</span></el-col>
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
                active-value="1"
                inactive-value="0">
              </el-switch>
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/Information/aiAdd"
                :show-file-list="false"
                :on-success="onSubmit"
                v-show="userData.isailogin==1">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button size="mini"  v-show="dataView" @click="onSubmit">修改</el-button>
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
        imageUrl:'',
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
      onSubmit() {
        this.$axios.post('http://localhost:8080/Information/aiAdd',this.$qs.stringify({str:'32'}
          )).then(res => {
          console.log(res);
      }).catch(res => {
      console.log(res)
      });
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
        this.$axios.post('http://localhost:8080/Information/select',this.$qs.stringify({id:1}
          )).then(res => {
            this.userData=res.data;
          console.log(res);
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

      }
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
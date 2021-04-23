<template>
    <div id="a">
        <div id="top">
            <div class="topLeft">
              <b>新增表单</b>
            </div>
            <div class="topRight">
            </div>
        </div>
        <div id="bottom3"> 
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item >
                    <b>基础设置</b>
                </el-form-item>
                <el-form-item label="审批名称">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="审批说明">
                    <el-input v-model="formLabelAlign.text"></el-input>
                </el-form-item>
                <el-form-item >
                    <b>表单设计</b>
                </el-form-item>
                <el-form-item >
                    <span>默认表单</span> <el-link type="primary">预览</el-link> <el-link type="primary">修改表单</el-link>
                </el-form-item>
                <el-form-item >
                    <b>流程设计</b>
                </el-form-item>
                <el-form-item >
                    <el-steps :active="1">
                      <el-step title="申请" icon="el-icon-edit"></el-step>
                      <el-step title="审批" icon="el-icon-chat-line-round"></el-step>
                      <el-step title="结果" icon="el-icon-message"></el-step>
                    </el-steps>
                </el-form-item>
                <el-form-item >
                    <el-button @click="updateSheet()">确认</el-button>
                    <el-button type="primary">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style>
#top{
  margin:1%;
}
#bottom3{
  
  margin:1%;
  width:60%;  
  margin-left:20%;
}
#top::after{
  content: "";
  display: block;
  clear: both;
}
.topLeft{
  float:left;
  margin-left:10%;
}
.topRight{
  float:right;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
  export default {
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        imageUrl:'',
      }
    },methods: {
      handleClick(row) {
        alert("ads");
        this.$router.push('/competence/competenceGroup');
      },
      init(){
        this.formLabelAlign=this.$route.query.row;
      },
      updateSheet(){
        this.$axios.post('http://localhost:8080/Sheet/update',this.$qs.stringify(this.formLabelAlign)).then(res => {
         console.log(res);
         this.$router.push({path:'/competence/aflowSetting'});
      }).catch(res => {
      console.log(res)
      });
      },
    },mounted() {
    this.init();   
   }
    
  }
</script>
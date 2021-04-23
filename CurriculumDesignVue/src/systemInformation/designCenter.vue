<template>
    <div id="a">
        <div id="top">
            <div class="topLeft">
              <b>表单信息设计</b>
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
                    <span>默认表单</span> 
                    <el-button type="text" @click="preview">预览</el-button>
                    <router-link :to="{path:'design',query:{oaId:this.$route.query.row.id}}">
                      <el-button type="text"  v-show="this.lists.length>0">修改</el-button>
                    </router-link>
                    <el-button type="text"  @click="addDesign" v-show="this.lists.length==0">添加</el-button>                    
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
        <el-dialog
          title="添加打卡地址"
          :visible.sync="dialogFrom"
          width="50%">
          <el-form :label-position="'top'" label-width="80px" >
                <el-form-item  v-for="list in lists" :key="list.id" >                 
                  <el-col :span='3'><span>{{list.title}}</span></el-col>
                  <el-col :span='18' v-show="list.type=='1'"><el-input  v-model="list.content"></el-input></el-col>
                  <el-col :span='18' v-show="list.type=='2'"><el-input-number  :step="2" v-model="list.content"></el-input-number>{{}}</el-col>
                  <el-col :span='18' v-show="list.type=='3'">
                    <el-select   v-model="list.content" placeholder="请选择" >
                        <el-option
                            v-for="(item,num) in list.select.split('-')"
                            :key="num"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span='18' v-show="list.type=='4'" >
                    <el-date-picker type="datetime" placeholder="选择日期时间" v-model="list.statrtTime"></el-date-picker>
                  </el-col>
                  <el-col :span='18' v-show="list.type=='5'">
                    <el-input type="textarea" autosize placeholder="请输入内容" v-model="list.content"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button @click.prevent="dialogFrom = false">确认</el-button>
                  <el-button @click.prevent="dialogFrom = false">返回</el-button>
                </el-form-item>
            </el-form>  
        </el-dialog>
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
        dialogFrom:false,
        lists:[],
      }
    },methods: {
      handleClick(row) {
        alert("ads");
        this.$router.push('/competence/competenceGroup');
      },
      init(){
        this.formLabelAlign=this.$route.query.row;
        this.getDesign();
      },
      updateSheet(){
        this.$axios.post('http://localhost:8080/Sheet/update',this.$qs.stringify(this.formLabelAlign)).then(res => {
         console.log(res);
         this.$router.push({path:'/systemInformation/aflowSetting'});
      }).catch(res => {
      console.log(res)
      });
      },
      getDesign(){
        this.$axios.post('http://localhost:8080/Design/selectByOid',this.$qs.stringify({oaId:this.$route.query.row.id})).then(res => {
          this.lists=res.data;
          console.log(res);        
      }).catch(res => {
      console.log(res)
      });
      },
      addDesign(){

      },
      preview(){
        this.dialogFrom=true;
      }
    },mounted() {
    this.init();   
   }
    
  }
</script>
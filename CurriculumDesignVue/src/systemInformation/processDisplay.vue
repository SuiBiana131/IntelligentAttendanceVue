<template>
    <div id="a">
        <div id="top">
            <el-page-header @back="goBack" content="假期申请"></el-page-header>
        </div>
        <div id="prbottom"> 
          <el-col :span="8">
            <el-select v-model="type" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col >
          <el-col :span="12">
            <el-button type="danger"  @click="handleadd()">申请</el-button>
          </el-col >
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="序号"
              prop="id"
              width="50">
            </el-table-column>
            <el-table-column
              label="名称"
              prop="name"
              width="180">
            </el-table-column>
            <el-table-column
              label="申请人"
              prop="username"
              width="80">
            </el-table-column>
            <el-table-column
              label="申请时间"
              prop="applytime"
              width="120">
            </el-table-column>
            <el-table-column
              label="审批时间"
              prop="examinetime" width="120">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status">
            </el-table-column>
            <el-table-column
              align="right" >
              <template slot-scope="scope">
                <el-button  size="mini"  @click="handleDelete(scope.row)">删除</el-button>
                <el-button  size="mini"  @click="onSubmit(scope.row)" v-show="scope.row.status=='未完善'">完善</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
    </div>
    
    
</template>
<style>
#top{
  margin:1%;
}
#prbottom{
  
  margin:1%;
  width:80%;  
  margin-left:10%;
}
</style>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [],
        search: '',
        tab:{applytime: "2021.02.20",
            isDelete: 0,
            name: "刘泽榕的请假申请",
            status: "未完善",
            type: "请假",
            userid: 1,
            username: "刘泽榕"},
        options: [],
        type: 1
      }
    },
    methods: {
      goBack() {
        console.log('go back');
      },
      onSubmit(row) {
        this.$router.push({path:'/systemInformation/resultSet',query:{row}});
      },
      handleDelete(row) {
        row.isDelete=1;
        this.$axios.post('http://localhost:8080/Formapply/update',this.$qs.stringify(row)).then(res => {
         console.log(res);
         this.getFormapply();
        }).catch(res => {
        console.log(res)
      });
      },
      handleadd(){
        console.log(this.type)
        let addForm = {applytime: "",isDelete: 0,name: "",status: "未完善",type: "",username: "",userid:0}
        let date = new Date();
        addForm.username = this.$store.state.user.username;
        addForm.type = this.type;
        addForm.name = addForm.username + "的"; 
        for(let i=0;i<this.options.length;i++){
          if(this.type==this.options[i].id){
            addForm.name = addForm.name + this.options[i].name + "申请"
          }
        } 
        addForm.applytime = date.getFullYear()+"-" + (date.getMonth() + 1)+ "-" +date.getDate() 
        this.$axios.post('http://localhost:8080/Formapply/insert',this.$qs.stringify(addForm)).then(res => {
          console.log(res);
          this.getFormapply();
          }).catch(res => {
          console.log(res)
        });
      },
      getFormapply(){
        this.$axios.post('http://localhost:8080/Formapply/selectAlldelete',this.$qs.stringify({username:this.$store.state.user.username})).then(res => {
          this.tableData=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      getSheet(){
        this.$axios.post('http://localhost:8080/Sheet/selectAllByUse').then(res => {
            console.log(res);
            this.options=res.data;
        }).catch(res => {
        console.log(res)
        });
      }
    },mounted() {
    this.getFormapply();   
    this.getSheet();
   } 
  }
</script>
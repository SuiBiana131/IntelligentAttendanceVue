<!-- 基本信息 -->
<template>
    <div id="a">
      <div id="top">
          <el-page-header @back="goBack" content="基本信息"></el-page-header>
      </div>
      <div id="Formapplybottom"> 
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
            align="right"
            width="300">
            <template slot="header" slot-scope="scope">
              <el-button
                size="mini"
                @click="updateAllFormapply(1)">全部批准</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="updateAllFormapply(0)">全部不批准</el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="onSubmit(scope.row.id)">查看</el-button>
              <el-button
                size="mini"
                @click="updateFormapply(1, scope.row)">批准</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="updateFormapply(0, scope.row)">不批准</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="申请内容" :visible.sync="dialogVisible" width="30%">
        <el-row v-for="(content,num) in formContent" :key="num">
          <el-col :span="4">{{content.name}}</el-col>
          <el-col :span="20">{{content.content}}</el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>    
    </div>  
</template>
<style>
#top{
  margin:1%;
}
#Formapplybottom{
  
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
        formContent:[],
        dialogVisible:false,
      }
    },
    methods: {
      goBack() {
        console.log('go back');
      },
      onSubmit(formid) {
        this.$axios.post('http://localhost:8080/Formcontent/selectByOid',this.$qs.stringify({formid:formid})).then(res => {
          this.formContent=res.data;
          console.log(res);
          this.dialogVisible=true;
        }).catch(res => {
          console.log(res)
        });
      },
      updateAllFormapply(index) {
        this.tableData.forEach(row => {
          this.updateFormapply(index,row);
          })
      },
      getFormapply(){
        this.$axios.post('http://localhost:8080/Formapply/selectAllOk').then(res => {
          this.tableData=res.data;
          console.log(res);
        }).catch(res => {
          console.log(res)
        });
      },
      updateFormapply(index,row){
        row.status=index==1?"批准":"不批准";
        this.$axios.post('http://localhost:8080/Formapply/update',this.$qs.stringify(row)).then(res => {
         console.log(res);
         this.getFormapply();
      }).catch(res => {
      console.log(res)
      });
      },
    },mounted() {
    this.getFormapply();   
   } 
  }
</script>
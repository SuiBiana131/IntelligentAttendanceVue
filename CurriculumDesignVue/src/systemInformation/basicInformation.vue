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
                  @click="onSubmit()">查看</el-button>
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
        search: ''
      }
    },
    methods: {
      goBack() {
        console.log('go back');
      },
      onSubmit() {
        console.log('submit!');
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
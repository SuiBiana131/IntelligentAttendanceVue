<template>
    <div id="a">
        <div id="top">
            <el-page-header @back="goBack" content="基本信息"></el-page-header>
        </div>
        <div id="attbottom"> 
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
              prop="examinetime">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status">
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header" slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">打印</el-button>
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
#attbottom{
  
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
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getFormapply(){
        this.$axios.post('http://localhost:8080/Formapply/selectAllNo').then(res => {
          this.tableData=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
    },mounted() {
    this.getFormapply();   
   } 
  }
</script>
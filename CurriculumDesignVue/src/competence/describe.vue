<!-- 权限描述 -->
<template>
    <div id="a">
        <div id="top">
            <div class="topLeft">
              <el-button @click="insertCompetencegroup()">新增班次</el-button>
            </div>
            <div class="topRight">
              <el-input  placeholder="班次名称">
                <el-button  slot="append" icon="el-icon-search" ></el-button>
              </el-input>
            </div>
        </div>
        <div id="bottom2"> 
            <el-table :data="tabledata"  style="width: 100%" >
                <el-table-column prop="id" label="班次编号">
                </el-table-column>
                <el-table-column prop="name" label="班次名称">
                </el-table-column>
                <el-table-column  label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                    <el-button  type="text" size="small">删除</el-button>
                 </template>
                </el-table-column>
            </el-table>
            <el-pagination
            :page-size="3"
            :pager-count="5"
            layout="prev, pager, next"
            :total="20">
            </el-pagination>
        </div>
    </div>
</template>
<style>
#top{
  margin:1%;
}
#bottom{
  
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
}
.topRight{
  float:right;
}
</style>
<script>
  export default {
    data() {
      return {
        tabledata: [
          {
            id:1,
            time:1231,
          }
        ],
        num:{id:-1},
        basic:{
          freeWorkday: "",
          name: "默认",
          isDelivery: "1",
          stytle: "12",
          type: "1"},
      }
    },methods: {
      handleClick(row) {
        this.$router.push({path:'/competence/competenceGroup',query:{row}});
      },
      getCompetencegroup(){
        this.$axios.post('http://localhost:8080/Competencegroup/selectAll').then(res => {
          if(!res.data.code)
            this.tabledata=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      insertCompetencegroup(){
        this.centerDialogVisible = false;
        this.$axios.post('http://localhost:8080/Competencegroup/insert',this.$qs.stringify(this.basic)).then(res => {
         console.log(res);
         this.getCompetencegroup();  
      }).catch(res => {
      console.log(res)
      });
      },
    },mounted() {
    this.getCompetencegroup();   
  } 
  }
</script>
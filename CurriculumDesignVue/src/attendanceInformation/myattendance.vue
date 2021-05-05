<!-- 我的考勤记录 -->
<template>
    <div id="a">
        <div id="top">
            <el-page-header @back="goBack" content="我的考勤记录"></el-page-header>
        </div>
        <div id="bottom"> 
             <div id="top-right">
              <el-date-picker v-model="date" type="date" format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd" placeholder="选择日期" >
              </el-date-picker>
              <el-select placeholder="请选择状态"  v-model="state"  class="el">
                    <el-option label="早退" value="早退">早退</el-option>
                    <el-option label="迟到" value="迟到">迟到</el-option>
                    <el-option label="缺席" value="缺席">缺席</el-option>
                    <el-option label="请假" value="请假">请假</el-option>
                    <el-option label="正常" value="正常">正常</el-option>
                    <el-option label="迟到早退" value="迟到早退">迟到早退</el-option>
              </el-select>
              <el-button type="primary" @click="selectStaff" class="el" >查询</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="userid" label="序号" width="180">
                </el-table-column>
                <el-table-column prop="state" label="状态">
                </el-table-column>
                <el-table-column prop="start" label="上班时间" width="180">
                </el-table-column>
                <el-table-column prop="end" label="下班时间" width="180">
                </el-table-column>
                <el-table-column prop="date" label="日期">
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
#top-right{
  width:100%;  
  display: flex;
  align-items:center;
  overflow:auto;
}
.el{
  margin:4%;
}
</style>
<script>
  export default {
    data() {
      return {
        date:'',
        state:'',
        userid:'',
        tableData: []
      }
    },methods: {
      goBack() {
        console.log('go back');
      },
      onSubmit() {
        console.log('submit!');
      },
      getStaff(){
        this.userid=this.$store.state.id;
        this.selectStaff();
      },
      selectStaff(){
        alert(this.date);
        this.$axios.post('http://localhost:8080/StaffAttend/selectCondition',this.$qs.stringify(
          {
            userid:1,
            state:this.state,
            date:this.date
          }
        )).then(res => {
          this.tableData=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      }
      },mounted() {
    this.getStaff();   
  } 
      
  }
</script>
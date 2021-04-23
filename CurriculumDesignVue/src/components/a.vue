<!-- 工资详情 -->
<template>
    <div id="a">
        <div id="top">
            <el-page-header @back="goBack" content="工资详情"></el-page-header>
        </div>
        <div id="bottom"> 
             <div id="top-right">
             <div id="date">
              <el-date-picker v-model="date" type="date" format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd" placeholder="选择日期" >
              </el-date-picker>
            </div>
            <el-select placeholder="请选择状态"  v-model="state" style="width:20%" class="el">
                  <el-option label="0" value="0">已发</el-option>
                  <el-option label="1" value="1">未发</el-option>
                  <el-option label="2" value="2">延迟</el-option>
                  <el-option label="" value="">取消</el-option>
            </el-select>
            <el-input class="el" style="width:20%"  v-model="userid" placeholder="请输入名字"></el-input><el-button type="primary" @click="selectSalary" class="el" style="width:20%">查询</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="userid" label="id" width="180">
                </el-table-column>
                <el-table-column prop="commendation" label="岗位">
                </el-table-column>
                <el-table-column prop="attendancebonus" label="迟到额" width="180">
                </el-table-column>
                <el-table-column prop="basic" label="基本工资">
                </el-table-column>
                <el-table-column prop="accommodation" label="住宿费" width="180">
                </el-table-column>
                <el-table-column prop="commission" label="嘉奖" width="180">
                </el-table-column>
                <el-table-column prop="tax" label="提成" width="180">
                </el-table-column>
                <el-table-column prop="state" label="状态">
                </el-table-column>
                <el-table-column prop="state" label="应发">
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
}
.el{
  margin:4%;
}
#date{
  margin:30px;
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
      getSalary(){
        this.$axios.post('http://localhost:8080/MyMoney/selectAll').then(res => {
          this.tableData=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      selectSalary(){
        alert(this.date);
        this.$axios.post('http://localhost:8080/MyMoney/selectCondition',this.$qs.stringify(
          {
            userid:this.userid,
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
      },
  mounted() {
    this.getSalary();   
  } 
  }
</script>
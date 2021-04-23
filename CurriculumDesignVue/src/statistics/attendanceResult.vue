<!-- 考勤结果 -->
<template>
    <div id="a">
        <div id="top">
            <el-page-header @back="goBack" content="考勤结果"></el-page-header>
        </div>
        <div id="bottom"> 
            <el-row>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange()">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange(checkedCities)">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </el-row>
            <el-row><el-col :span="4">日期选择:</el-col>
              <el-col :span="4">
                <el-date-picker
                  size="mini"
                  v-model="dateValue"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="dateChange"
                  :default-time="['00:00:00', '00:00:00']">
                </el-date-picker></el-col>
                <el-col><el-button size="small" type="success" icon="el-icon-download" @click="exportData">导出数据</el-button></el-col>
              </el-row>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="序号" >
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="groupname" label="考勤组" width="180">
                </el-table-column>
                <el-table-column v-for="(item,index) in checkedCities":key="item.value" :prop=item :label=item width="180">
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
.el-row{
  margin-bottom:20px;
}
</style>
<script>
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: ['出勤天数', '休息天数'],
        cities:  ['出勤天数', '休息天数', '工作时长/分', '迟到天数',
        '迟到时长/分', '早退天数', '早退时长/分', '上班缺卡次数','下班缺卡次数', 
        '缺勤天数',  '加班时长(全部)/分','加班时长(转加班费)/分','加班时长(转调休)/分',
        '加班时长(工作日)/分','加班时长(休息日)/分','加班时长(节假日)/分',],
        isIndeterminate: true,
        dateValue:[],
        tableData: [{
          id: '05-02',
          name: '32',
          state: '34',
          start:'78',
          end:'31',
          date:'67'
        }, {
         id: '05-02',
          name: '32',
          state: '34',
          start:'78',
          end:'31',
          date:'67'
        }, {
         id: '05-02',
          name: '32',
          state: '34',
          start:'78',
          end:'31',
          date:'67'
        }, {
         id: '05-02',
          name: '32',
          state: '34',
          start:'78',
          end:'31',
          date:'67'
        }]
      }
    },methods: {
      goBack() {
        console.log('go back');
      },
      onSubmit() {
        console.log('submit!');
      },
      handleCheckAllChange() {
        this.checkedCities = this.checkedCities.length<this.cities.length ? this.cities : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      dateChange(){
        let date1 = new Date(this.dateValue[0]);
        let date2 = new Date(this.dateValue[1]);
        alert(this.dateValue[0]+this.dateValue[1]);
        let num=(date2.getTime()-date1.getTime())/(24 * 60 * 60 * 1000);
        if(num>30){
          alert("请保持日期间隔不超过31天！");
          this.dateValue=[];
          return
        }
        this.getStatistics();
      },
      getStatistics(){
         this.$axios.post('http://localhost:8080/StaffAttend/getStatistics',this.$qs.stringify({
            start:this.dateValue[0],
            end:this.dateValue[1]
      })).then(res => {
          this.tableData=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      exportData() {
	    // 去请求后端接口进行导出数据
        var url = "http://localhost:8080/StaffAttend/export?start=' + this.dateValue[0] + '&end=' + this.dateValue[1]";
	      window.open("http://localhost:8080/StaffAttend/export?start="+this.dateValue[0]+"&end="+this.dateValue[1],'_self');
      }
    },mounted() {
      //alert(this.dateValue[0]+this.dateValue[1]);
      this.getStatistics();   
    },created(){
      var data =  new Date(Date.now() - 7*24*60*60*1000);
      this.dateValue.push(data.getFullYear() + "-" + (data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1) + "-" + (data.getDate() <= 9 ? "0" + data.getDate() : data.getDate()));
      data = new Date();
      this.dateValue.push(data.getFullYear() + "-" + (data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1) + "-" + (data.getDate() <= 9 ? "0" + data.getDate() : data.getDate()));
    }
  }
</script>
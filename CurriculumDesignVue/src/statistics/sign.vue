<!-- 打卡记录 -->
<template>
    <div id="a">
        <div id="top">
            <el-page-header @back="goBack" content="打卡记录"></el-page-header>
        </div>
        <div id="bottom"> 
            <div id="top-right">
              <el-col :span="12">
              <el-date-picker v-model="date" type="date" format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd" placeholder="选择日期" @change="change()">
              </el-date-picker></el-col>
              <el-col :span="6"><el-button size="small" type="success" icon="el-icon-download" @click="exportData">导出数据</el-button></el-col>
              <el-col :span="6"><el-button size="small" type="success" icon="" @click="statisClick">导出数据</el-button></el-col>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="userid" label="id" >
                </el-table-column>
                <el-table-column prop="name" label="名字" >
                </el-table-column>
                <el-table-column prop="groupname" label="考勤组">
                </el-table-column>
                <el-table-column prop="date" label="日期" >
                </el-table-column>
                <el-table-column prop="start" label="上班时间">
                </el-table-column>
                <el-table-column prop="end" label="下班时间">
                </el-table-column>
                <el-table-column prop="state" label="考勤结果">
                </el-table-column>
                <el-table-column prop="加班时长" label="加班时长">
                </el-table-column>
            </el-table>
            <el-pagination
            :page-size="3"
            :pager-count="5"
            layout="prev, pager, next"
            :total="20">
            </el-pagination>
        </div>
        <el-dialog class="dialogpie" title="每日考勤图" :visible.sync="echartsDialogVisible" width="50%" center>
          <div id="mycharts"></div>
        </el-dialog>
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
  margin-bottom:20px;
}
.el{
  margin:4%;
}
.el-date-picker{
  margin-bottom:20px;
}
#mycharts {
  
  width: 100%;
  height: 600px;

}
</style>
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {
        date:'',
        state:'',
        userid:'',
        tableData: [],
        echartsDialogVisible:false,
        piedate:[{value: 1048, name: '搜索引擎'},
                        {value: 735, name: '直接访问'},
                        {value: 580, name: '邮件营销'},
                        {value: 484, name: '联盟广告'},
                        {value: 300, name: '视频广告'},
                        {value: 233, name: '手机推送'}]
      }
    },methods: {
      goBack() {
        console.log('go back');
      },
      onSubmit() {
        console.log('submit!');
      },
      change(){
        alert("asf");
        this.selectBydate();
      },
      selectBydate(){
        alert(this.date);
        this.$axios.post('http://localhost:8080/StaffAttend/selectBydate',this.$qs.stringify({
            str:this.date
          }
        )).then(res => {
          this.tableData=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      exportData() {
	    // 去请求后端接口进行导出数据
	      window.open("http://localhost:8080/StaffAttend/DateExcel?date="+this.date,'_self');
      },
      statisClick(){
        this.echartsDialogVisible = true;
        let map = new Map();
        let ress = [];
        this.tableData.forEach(function(item){
        　　if(map.has(item.state))
              map.set(item.state,map.get(item.state)+1);
            else
              map.set(item.state,1);
        })
        for (let [key, value] of map) {
          ress.push({value:value,name:key});
        }
        if(ress.length>0)
          this.piedate=ress;
        this.$nextTick(() => {
          this.getPie();
          
        })
      },
      getPie() {
        var myChart = echarts.init(document.getElementById('mycharts'))
        var option = {
            title: {
                text: '每日考勤状况',
                subtext: '刘泽榕',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '50%',
                    data: this.piedate,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        myChart.setOption(option)
      }
    },mounted() {
        this.selectBydate();   
    },created(){
      var data = new Date();
      this.date=(data.getFullYear() + "-" + (data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1) + "-" + (data.getDate() <= 9 ? "0" + data.getDate() : data.getDate()));
    } 
      
  }
</script>
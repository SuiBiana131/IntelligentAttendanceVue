<!-- 信息修改 -->
<template>
    <div id="a">
        <div id="bottom1"> 
          
          <el-table :data="tableDataPage" style="width: 100%">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column prop="id" label="编号" >
            </el-table-column>
            <el-table-column prop="nickname" label="姓名" >
            </el-table-column>
            <el-table-column prop="phone" label="联系方式">
            </el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope" >
                <el-col :span="16"><el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input></el-col>
                <el-col :span="8" ><el-button type="text">共{{tableData.length}}人</el-button></el-col>
              </template>
              <template slot-scope="scope">
                <el-col :span="8" :offset="8"><el-button type="text" @click="handleClick(scope.row)"><i class="el-icon-user"></i>详细信息</el-button></el-col>
                <el-col :span="8" :offset="0"><el-button type="text" @click="statisClick(scope.row)"><i class="el-icon-s-data"></i>统计</el-button></el-col>               
              </template>
            </el-table-column>
          </el-table>
          <el-row :gutter="20">
             <el-pagination   @current-change="handleCurrentChange" :current-page="1" :page-sizes="[5]"
              :page-size="5"  layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </el-row>
        </div>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="50%" center>
          <el-form ref="form" :model="form" label-width="35%">
            <el-form-item label="姓名">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.nickname" disabled></el-input></el-col>               
            </el-form-item>
            <el-form-item label="民族" >
                <el-col :span="10"></el-col>
                <el-col :span="14">
                  <el-radio-group v-model="form.nation" disabled>
                    <el-radio :label="1">汉族</el-radio>
                    <el-radio :label="0">其他民族</el-radio>
                  </el-radio-group>
                </el-col>   
            </el-form-item>
            <el-form-item label="居住地">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.address" disabled></el-input></el-col>                   
            </el-form-item>
            <el-form-item label="户籍地">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.presentaddress" disabled></el-input></el-col>       
            </el-form-item>
            <el-form-item label="电话">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.phone" disabled></el-input></el-col>       
            </el-form-item>
            <el-form-item label="性别">
                <el-col :span="10"></el-col>
                <el-col :span="14">
                  <el-radio-group v-model="form.sex" disabled>
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                </el-col>       
            </el-form-item>
            <el-form-item label="身份证号" >
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.identitynum" disabled></el-input></el-col>       
            </el-form-item>
            <el-form-item label="学历">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.education" disabled></el-input></el-col>       
            </el-form-item>
            <el-form-item label="婚姻状况">
                <el-col :span="10"></el-col>
                <el-col :span="14">
                  <el-radio-group v-model="form.marriage" disabled>
                    <el-radio :label="1">已婚</el-radio>
                    <el-radio :label="0">未婚</el-radio>
                    <el-radio :label="2">离异</el-radio>
                  </el-radio-group></el-col>       
            </el-form-item>
            <el-form-item label="银行卡号">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.bankcard" disabled></el-input></el-col>       
            </el-form-item>
            <el-form-item label="银行名称">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.backname" disabled></el-input></el-col>       
            </el-form-item>
            <el-form-item label="备注">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input type="textarea" v-model="form.remarks" disabled></el-input></el-col>       
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">返回</el-button>
          </div>
        </el-dialog>
        <el-dialog class="dialogpie" title="提示" :visible.sync="echartsDialogVisible" width="50%" center>
          <div id="mycharts"></div>
        </el-dialog>
    </div>
    
    
</template>
<style>
#top{
  margin:1%;
}
#bottom1{
  
  margin:1%;
  width:80%;  
  margin-left:10%;
}
.el-row{
  margin:4%;
}
.dialogpie{

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
        centerDialogVisible:false,
        echartsDialogVisible:false,
        id:this.$store.state.id,
        form: {
        },
        tableDataPage:[],
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          piedate:[{value: 1048, name: '搜索引擎'},
                        {value: 735, name: '直接访问'},
                        {value: 580, name: '邮件营销'},
                        {value: 484, name: '联盟广告'},
                        {value: 300, name: '视频广告'},
                        {value: 233, name: '手机推送'}]
      }
    },
    methods: {
      handleClick(row){
        this.centerDialogVisible = true;
        this.form=row;
      },
      handleCurrentChange(val){
        this.tableDataPage=this.tableData.slice(5*(val-1),5*val);
      },
      statisClick(row){
        this.echartsDialogVisible = true;
        this.$nextTick(() => {
          this.getPie();
          
        })
      },
      goBack() {
        console.log('go back');
        
      },
      onSubmit() {
        console.log('submit!');
        this.centerDialogVisible = false;
      },
      getUserInformation(){
        this.$axios.get('http://localhost:8080/Information/selectAll').then(res => {
        if(res!=null)
          {
             this.tableData=res.data;
             this.tableDataPage=res.data.slice(0,5);
          }
      console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      updateUserInformation(){
        this.centerDialogVisible = false;
        this.$axios.post('http://localhost:8080/Information/update',this.$qs.stringify(this.form)).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      getPie() {
        var myChart = echarts.init(document.getElementById('mycharts'))
        var option = {
            title: {
                text: '用户最近一个月的考勤状况',
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
    },
  mounted() {
    this.getUserInformation();  
  }
  }
</script>
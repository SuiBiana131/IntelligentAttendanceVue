<!-- 员工信息 -->
<template>
    <div id="a">
        <div id="top">
            <el-page-header @back="goBack" content="员工信息"></el-page-header>
        </div>
        <div id="bottom"> 
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
                <el-table-column prop="uid" label="序号">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="groupname" label="考勤组">
                </el-table-column>
                <el-table-column v-for="(item,index) in tableData[0].list" :key="index" :label="item.date" >
                  <template slot-scope="scope">
                    {{scope.row.list[index].start}}-{{scope.row.list[index].end}}
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
        <el-dialog title="详细信息" :visible.sync="centerDialogVisible" width="50%" center>
          <el-row :gutter="20">
            <el-col :span="4"><span>姓名：</span></el-col>
            <el-col :span="8"><span>{{form.nickname}}</span></el-col>
            <el-col :span="4"><span>民族：</span></el-col>
            <el-col :span="8"><span>{{form.nation}}</span></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4"><span>地址：</span></el-col>
            <el-col :span="8"><span>{{form.address}}</span></el-col>
            <el-col :span="4"><span>现居住地址：</span></el-col>
            <el-col :span="8"><span>{{form.presentaddress}}</span></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4"><span>性别：</span></el-col>
            <el-col :span="8"><span>{{form.sex}}</span></el-col>
            <el-col :span="4"><span>身份证：</span></el-col>
            <el-col :span="8"><span>{{form.identitynum}}</span></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4"><span>学历：</span></el-col>
            <el-col :span="8"><span>{{form.education}}</span></el-col>
            <el-col :span="4"><span>婚姻状况：</span></el-col>
            <el-col :span="8"><span>{{form.marriage}}</span></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4"><span>银行卡号：</span></el-col>
            <el-col :span="8"><span>{{form.bankcard}}</span></el-col>
            <el-col :span="4"><span>银行名称：</span></el-col>
            <el-col :span="8"><span>{{form.backname}}</span></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4"><span>电话：</span></span></el-col>
            <el-col :span="20"><span>{{form.phone}}</span></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4"><span>备注：</span></span></el-col>
            <el-col :span="20"><span>{{form.remarks}}</span></el-col>
          </el-row>
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
  width:100%;  
  display: flex;
}
.el{
  margin:4%;
}
.el-row{
  margin:4%;
}
</style>
<script>
  export default {
    data() {
      return {
        name:'',
        centerDialogVisible:false,
        form: {
        },
        tableData: [{nickname:'ds',nation:'d',address:'da',presentaddress:[{name:'11',time:'12:43:32'},{name:'12',time:'18:43:32'}]}],
        dateValue:[],
      }
    },
     methods: {
      handleClick(row) {
        console.log(row);
        this.form=row;
        this.centerDialogVisible = true;
      },
        onSubmit() {
        console.log('submit!');
        this.centerDialogVisible = false;
      },
      goBack() {
        console.log('go back');
      },
      selectByEveryday(){
        this.$axios.post('http://localhost:8080/StaffAttend/selectByEveryday',this.$qs.stringify({
            start:this.dateValue[0],
            end:this.dateValue[1]
      })).then(res => {
          this.tableData=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      dateChange(){
        let date1 = new Date(this.dateValue[0]);
        let date2 = new Date(this.dateValue[1]);
        let num=(date2.getTime()-date1.getTime())/(24 * 60 * 60 * 1000);
        if(num>30){
          alert("请保持日期间隔不超过31天！");
          this.dateValue=[];
        }

      },
      exportData() {
	    // 去请求后端接口进行导出数据
	      window.open("http://localhost:8080/StaffAttend/EveryDateExcel?start="+this.dateValue[0]+"&end="+this.dateValue[1],'_self');
      }
    },
    mounted() {
    this.selectByEveryday();   
   },created(){
      var data =  new Date(Date.now() - 7*24*60*60*1000);
      this.dateValue.push(data.getFullYear() + "-" + (data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1) + "-" + (data.getDate() <= 9 ? "0" + data.getDate() : data.getDate()));
      data = new Date();
      this.dateValue.push(data.getFullYear() + "-" + (data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1) + "-" + (data.getDate() <= 9 ? "0" + data.getDate() : data.getDate()));
    }
  }
</script>
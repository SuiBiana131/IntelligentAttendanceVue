<template>
    <div id="a">
        <div id="top">
            <div class="topLeft">
              <el-button @click="addHoilday()">添加假期</el-button>
            </div>
            <div class="topRight">
              <el-input  placeholder="班次名称">
                <el-button  slot="append" icon="el-icon-search" ></el-button>
              </el-input>
            </div>
        </div>
        <div id="bottom2"> 
            <el-table :data="tabledata"  style="width: 100%" >
                <el-table-column prop="name" label="假期名称">
                </el-table-column>
                <el-table-column prop="unit" label="请假单位">
                </el-table-column>
                <el-table-column prop="compute" label="计算方式">
                </el-table-column>
                <el-table-column prop="range" label="适用范围">
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
        <el-drawer
        title="新增假期"
        :visible.sync="drawer"
        :direction="direction"
        size="40%"
        >
        <el-form :model="form" label-width="100px" :label-position="'left'" class="hoildayForm">
            <el-form-item label="假期名称" >
              <el-col :span="8">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="适用范围" >
              <el-col :span="8">
                <span>全公司（暂时默认）</span>
              </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="8" :pull="6" :offset="1">
                <b>请假时长计算规则</b>
              </el-col>
            </el-form-item>
            <el-form-item label="最小请假单位" >
              <el-col :span="8">
                <el-select v-model="form.unit" placeholder="请选择">
                    <el-option v-for="item in units"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item v-show="form.unit=='天'">
              <el-col :span="16">
                <span>员工以1天为最小单位选择时间，考勤报表按天统计</span>
              </el-col>
            </el-form-item>
            <el-form-item v-show="form.unit=='小时'">
              <el-col :span="18">
                <span>员工以1分钟为最小单位选择时间，考勤报表按小时统计</span>
              </el-col>
            </el-form-item>
            <el-form-item label="请假时长核算" >
              <el-col :span="8">
                <el-select v-model="form.compute" placeholder="请选择">
                    <el-option v-for="item in computes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item v-show="form.compute=='工作日计算'">
              <el-col :span="21">
                <span>请假时段中不包含员工的休息日，例如未排班的双休日、法定节假日</span>
              </el-col>
            </el-form-item>
            <el-form-item v-show="form.compute=='自然日计算'">
              <el-col :span="14">
                <span>请假时段中包含的休息日，也会计入请假天数</span>
              </el-col>
            </el-form-item>
            <el-button @click="drawer = false">取 消</el-button>
            <el-button type="primary" @click="updateHoilday()">确 定</el-button>
        </el-form>
        </el-drawer>
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
.hoildayForm
{
    margin-left:20px;
}
</style>
<script>
  export default {
    data() {
      return {
        tabledata: [
          {
            name:'事假',
            unit:'按小时请假',
            compute:'按工作日计算',
            range:'全公司范围'
          }
        ],
        num:{},
        form:{
          compute: "工作日计算",
          name: "事假111",
          range: "全公司",
          unit: "小时"
        },
        drawer: false,
        direction: 'rtl',
        units: [{
          value: '天',
          label: '按天请假'
        }, {
          value: '小时',
          label: '按小时请假'
        }],
        computes: [{
          value: '工作日计算',
          label: '按工作日计算请假时长'
        }, {
          value: '自然日计算',
          label: '按自然日计算请假时长'
        }],
      }
    },methods: {
      handleClick(row) {
        this.drawer=true;
        this.form=row;
      },
      getCompetencegroup(){
        this.$axios.post('http://localhost:8080/Hoilday/selectAll').then(res => {
          console.log(res);
          this.tabledata=res.data;
         
      }).catch(res => {
      console.log(res)
      });
      },
      addHoilday(){
        this.$axios.post('http://localhost:8080/Hoilday/insert',this.$qs.stringify(this.form)).then(res => {
         console.log(res);
         this.drawer = false;
      }).catch(res => {
      console.log(res)
      });
      },
      updateHoilday(){
        this.$axios.post('http://localhost:8080/Hoilday/update',this.$qs.stringify(this.form)).then(res => {
         console.log(res);
         this.drawer = false;
      }).catch(res => {
      console.log(res)
      });
      },
    },mounted() {
    this.getCompetencegroup();   
   }
  }
</script>
<!-- 权限管理 -->
<template>
    <div id="a">
        <div id="top">
            <div class="topLeft">
              <el-button @click="addClassmanage()">新增班次</el-button>
            </div>
            <div class="topRight">
              <el-input v-model="name" placeholder="班次名称">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
        </div>
        <div id="bottom2"> 
            <el-table :data="tabledata"  style="width: 100%" >
                <el-table-column prop="name" label="班次名称">
                </el-table-column>
                <el-table-column prop="start" label="考勤时间">
                  <template slot-scope="scope">
                    {{scope.row.start}}-{{scope.row.end}}
                  </template>
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
          title="编辑班次"
          :visible.sync="centerDialogVisible"
          :direction="direction"
          size="40%">
          <el-form :model="form">
            <el-form-item class="ad"label="班级名称" >
              <el-col :span="8">
                <el-input v-model="form.name"></el-input>
              </el-col>
              <el-col :span="12">
                <span class="font">名称为不超过10个字符的字符串！</span>
              </el-col>
            </el-form-item>
            <H6>打卡时段</H6>
            <el-form-item  >
              <el-col :span="3">
                <span>时间</span>
              </el-col>
              <el-time-picker
                is-range
                v-model="form.rangeDate"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>

            <el-form-item  >
              <el-col :span="3">
                <el-checkbox v-model="form.isRest" true-label="是" false-label="否">休息</el-checkbox>
              </el-col>
              <el-time-picker
                is-range
                v-model="form.resRangeDate"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>

            <H6>弹性打卡</H6>
            <el-form-item >
              <el-row>
                <el-col :span="20">
                  <el-checkbox v-model="form.isSerious" true-label="是" false-label="否" border>晚到、早走几分钟不记为异常</el-checkbox>
                  <el-tooltip content="晚到15分钟内不算迟到，早走15分钟内不算早退。" placement="top"><i class="el-icon-info"></i></el-tooltip>
                </el-col>
              </el-row>
            </el-form-item>
            <H6>其他设置</H6>
            <el-form-item >
              <el-row>
                <span>严重迟到分钟数</span><el-input-number v-model="form.seriouslylate" controls-position="right"  :min="1" :max="30"></el-input-number>
              </el-row>
              <el-row>
                <span>旷工迟到分钟数</span><el-input-number v-model="form.neglectWork" controls-position="right"  :min="1" :max="30"></el-input-number>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateClassmanage" >修改</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
    </div>
</template>
<style>
#top{
  margin-bottom:10px;
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

.el{
  margin:4%;
}
.el-row{
  margin:4%;
}
.font{
  font-size: 10px;
}
.el-form{
  margin-left:15px;
}
</style>
<script>
  export default {
      data() {
        return {
          centerDialogVisible:false,
          direction:'rtl',
          form: {
                rangeDate:[],
                resRangeDate:[],
                },
          tabledata:[
            {
              userid:"123",
              time:"3123"
            }
          ],
          name:'',
          start:new Date(),
          end:new Date(),
          restStart:new Date(),
          restEnd:new Date(),
        }
      },
     methods: {
      handleClick(row) {
        console.log(row);
        this.form=Object.assign({},this.form,row);
        let starts=this.form.start.split(':');
        let ends=this.form.end.split(':');
        let restStarts=this.form.restStart.split(':');
        let restEnds=this.form.restEnd.split(':');
        this.start.setHours(starts[0]);this.start.setMinutes(starts[1]);this.start.setSeconds(starts[2]);
        this.end.setHours(ends[0]);this.end.setMinutes(ends[1]);this.end.setSeconds(ends[2]);
        this.restStart.setHours(restStarts[0]);this.restStart.setMinutes(restStarts[1]);this.restStart.setSeconds(restStarts[2]);
        this.restEnd.setHours(restEnds[0]);this.restEnd.setMinutes(restEnds[1]);this.restEnd.setSeconds(restEnds[2]);
        this.form.start=this.start;this.form.end=this.end;this.form.restStart=this.restStart;this.form.restEnd=this.restEnd;
        this.form.rangeDate.push(this.start);this.form.rangeDate.push(this.end);
        this.form.resRangeDate.push(this.restStart);this.form.resRangeDate.push(this.restEnd);
        this.centerDialogVisible = true;
      },
        onSubmit() {
        console.log('submit!');
        this.updateJurUser();
        this.centerDialogVisible = false;
      },
      goBack() {
        console.log('go back');
      },
      selectClassmanage(){
         console.log(this.$store.state.changableNum);
        this.$axios.post('http://localhost:8080/Classmanage/selectAll').then(res => {
          this.tabledata=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      addClassmanage(){
        this.$axios.post('http://localhost:8080/Classmanage/insert',this.$qs.stringify(this.form)).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      updateClassmanage(){
        //this.form.start=this.form.start==null?new Date():this.form.start;   
        //this.form.end=this.form.end==null?new Date():this.form.end;  
        //this.form.restStart=this.form.restStart==null?new Date():this.form.restStart;  
        //this.form.restEnd=this.form.restEnd==null?new Date():this.form.restEnd;       
        let s=this.form.rangeDate[0].getHours()+":"+this.form.rangeDate[0].getMinutes()+":"+this.form.rangeDate[0].getSeconds();
        let e=this.form.rangeDate[1].getHours()+":"+this.form.rangeDate[1].getMinutes()+":"+this.form.rangeDate[1].getSeconds();
        let rs=this.form.resRangeDate[0].getHours()+":"+this.form.resRangeDate[0].getMinutes()+":"+this.form.resRangeDate[0].getSeconds();
        let re=this.form.resRangeDate[1].getHours()+":"+this.form.resRangeDate[1].getMinutes()+":"+this.form.resRangeDate[1].getSeconds();
        this.form.start = s;this.form.end =e ;this.form.restStart =rs ;this.form.restEnd =re;
        console.log(this.form);
        this.$axios.post('http://localhost:8080/Classmanage/update',this.$qs.stringify(this.form)).then(res => {
         console.log(res);
         this.centerDialogVisible = false;
         this.selectClassmanage(); 
      }).catch(res => {
      console.log(res)
      });
      this.form.resRangeDate=[];this.form.rangeDate=[];
      }
    },
    mounted() {
    this.selectClassmanage();   
  }
  }
</script>
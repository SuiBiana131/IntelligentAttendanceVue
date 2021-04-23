<template>
    <div id="a">
        <div id="top">
            <div class="topLeft">
              <el-button @click="addCompetencegroup()">新增加班规则</el-button>
            </div>
        </div>
        <div id="bottom2"> 
            <el-table :data="tabledata"  style="width: 100%" >
                <el-table-column prop="name" label="加班规则名称">
                </el-table-column>
                <el-table-column  label="规则内容(是否允许加班)">
                    <el-table-column prop="isWorkDay" label="工作日">
                    </el-table-column>
                    <el-table-column prop="isRestDay" label="休息日">
                    </el-table-column>
                    <el-table-column prop="isHoilday" label="节假日">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="range" label="应用范围">
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
        <el-dialog
        title="修改加班规则信息"
        :visible.sync="isDialog"
        width="50%">
          <el-form ref="form" :model="rows" label-width="160px">
            <el-form-item label="规则名称：">
              <el-col :span="6">
                <el-input v-model="rows.name"></el-input>
              </el-col>
              <el-col :span="12">
                <span>最多10个中文或英文字符</span>
              </el-col>
            </el-form-item>
            <el-form-item label="应用范围：">
              <el-col >
                <span>全公司（当前默认为全公司，无法修改!）</span>
              </el-col>
            </el-form-item>
            <el-form-item label="风险预警：">
              <el-col :span="6">
                <el-select v-model="rows.time" placeholder="请选择" size="small">
                  <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <span> 加班不得超过   </span>
              </el-col>  
              <el-col :span="6">
                <el-input-number v-model="rows.howLong" controls-position="right"  :min="1" :max="60" size="small"></el-input-number>
              </el-col>
              <el-col :span="6">
                <span>小时</span>
              </el-col>   
            </el-form-item>
          </el-form>
          <el-tabs v-model="activeName" >
            <el-tab-pane label="工作日" name="workday">
                <el-form ref="form1" :model="rows" label-width="160px">
                    <el-form-item label="允许加班：">
                     <el-col :span="2">
                      <el-switch
                        v-model="rows.isWorkDay"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="是"
                        inactive-value="否">
                      </el-switch>
                     </el-col>
                    </el-form-item>
                    <el-form-item label="计算方式：" v-show="rows.isWorkDay=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.workDayCompute" label="打卡">按打卡时长计算</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isWorkDay=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.workDayCompute" label="审批">按审批时长计算</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item label="计算调休或加班费：" v-show="rows.isWorkDay=='是'">
                     <el-col :span="2">
                      <el-switch
                        v-model="rows.isMoneyWorkDay"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="是"
                        inactive-value="否">
                      </el-switch>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyWorkDay=='是'&&rows.isWorkDay=='是'">
                     <el-col :span="7">
                      <el-radio v-model="rows.moneyWorkDay" label="1">按照比例1:</el-radio>
                     </el-col>
                     <el-col :span="5">
                      <el-input v-model="rows.ratioWorkDay" placeholder="请输入比例"></el-input>
                     </el-col>
                     <el-col :span="7" :offset="1">
                      <span>记为调休时长</span>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyWorkDay=='是'&&rows.isWorkDay=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.moneyWorkDay" label="2">记为加班费</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyWorkDay=='是'&&rows.isWorkDay=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.moneyWorkDay" label="3">用户可在上面两种方式中自由选择</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyWorkDay=='是'&&rows.isWorkDay=='是'">
                     <el-col :span="9">
                      <span>其中调休时长按比例1:</span>
                     </el-col>
                     <el-col :span="5">
                      <el-input v-model="rows.ratiotimeWorkDay" placeholder="请输入比例"></el-input>
                     </el-col>
                     <el-col :span="2" :offset="1">
                      <span> 计算</span>
                     </el-col>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="休息日" name="restday"><el-form ref="form1" :model="rows" label-width="160px">
                    <el-form-item label="允许加班：">
                     <el-col :span="2">
                      <el-switch
                        v-model="rows.isRestDay"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="是"
                        inactive-value="否">
                      </el-switch>
                     </el-col>
                    </el-form-item>
                    <el-form-item label="计算方式：" v-show="rows.isRestDay=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.restDayCompute" label="打卡">按打卡时长计算</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isRestDay=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.restDayCompute" label="审批">按审批时长计算</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item label="计算调休或加班费：" v-show="rows.isRestDay=='是'">
                     <el-col :span="2">
                      <el-switch
                        v-model="rows.isMoneyRestDay"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="是"
                        inactive-value="否">
                      </el-switch>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyRestDay=='是'&&rows.isRestDay=='是'">
                     <el-col :span="7">
                      <el-radio v-model="rows.moneyRestDay" label="1">按照比例1:</el-radio>
                     </el-col>
                     <el-col :span="5">
                      <el-input v-model="rows.ratioRestDay" placeholder="请输入比例"></el-input>
                     </el-col>
                     <el-col :span="7" :offset="1">
                      <span>记为调休时长</span>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyRestDay=='是'&&rows.isRestDay=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.moneyRestDay" label="2">记为加班费</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyRestDay=='是'&&rows.isRestDay=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.moneyRestDay" label="3">用户可在上面两种方式中自由选择</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyRestDay=='是'&&rows.isRestDay=='是'">
                     <el-col :span="9">
                      <span>其中调休时长按比例1:</span>
                     </el-col>
                     <el-col :span="5">
                      <el-input v-model="rows.ratiotimeRestDay" placeholder="请输入比例"></el-input>
                     </el-col>
                     <el-col :span="2" :offset="1">
                      <span> 计算</span>
                     </el-col>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="节假日" name="holiday"><el-form ref="form1" :model="rows" label-width="160px">
                    <el-form-item label="允许加班：">
                     <el-col :span="2">
                      <el-switch
                        v-model="rows.isHoilday"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="是"
                        inactive-value="否">
                      </el-switch>
                     </el-col>
                    </el-form-item>
                    <el-form-item label="计算方式：" v-show="rows.isHoilday=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.hoildayCompute" label="打卡">按打卡时长计算</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isHoilday=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.hoildayCompute" label="审批">按审批时长计算</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item label="计算调休或加班费：" v-show="rows.isHoilday=='是'">
                     <el-col :span="2">
                      <el-switch
                        v-model="rows.isMoneyHoilday"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="是"
                        inactive-value="否">
                      </el-switch>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyHoilday=='是'&&rows.isHoilday=='是'">
                     <el-col :span="7">
                      <el-radio v-model="rows.moneyRestDay" label="1">按照比例1:</el-radio>
                     </el-col>
                     <el-col :span="5">
                      <el-input v-model="rows.ratioHoilday" placeholder="请输入比例"></el-input>
                     </el-col>
                     <el-col :span="7" :offset="1">
                      <span>记为调休时长</span>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyHoilday=='是'&&rows.isHoilday=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.moneyRestDay" label="2">记为加班费</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyHoilday=='是'&&rows.isHoilday=='是'">
                     <el-col :span="3">
                      <el-radio v-model="rows.moneyRestDay" label="3">用户可在上面两种方式中自由选择</el-radio>
                     </el-col>
                    </el-form-item>
                    <el-form-item  v-show="rows.isMoneyHoilday=='是'&&rows.isHoilday=='是'">
                     <el-col :span="9">
                      <span>其中调休时长按比例1:</span>
                     </el-col>
                     <el-col :span="5">
                      <el-input v-model="rows.ratiotimeHoilday" placeholder="请输入比例"></el-input>
                     </el-col>
                     <el-col :span="2" :offset="1">
                      <span> 计算</span>
                     </el-col>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
          </el-tabs>
            <span slot="footer" class="dialog-footer">
            <el-button @click="isDialog = false">取 消</el-button>
            <el-button type="primary" @click="updateOvretime()">确 定</el-button>
            </span>
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
            name:'默认规则',
            workday:'加班必须审批，加班时长以审批单为准',
            restday:'加班必须审批，加班时长以审批单为准',
            holiday:'加班必须审批，加班时长以审批单为准',
            range:'全公司',
          }
        ],
        activeName:'workday',
        rule:{name:'',
        range:'',
        time:'',
        howLong:'',
        workday:{isOvertime:true,method:'1',iscompute:true,computeMethod:'1',ratio1:1,ratio2:1},
        restday:{isOvertime:true,method:1,iscompute:true,computeMethod:1,ratio1:1,ratio2:1},
        holiday:{isOvertime:true,method:1,iscompute:true,computeMethod:1,ratio1:1,ratio2:1}
        },
        num:{},
        isDialog:false,
        options:['每月','每周','每日'],
        rows:{
          hoildayCompute: "打卡",
          howLong: "56",
          isHoilday: "是",
          isMoneyHoilday: "是",
          isMoneyRestDay: "是",
          isMoneyWorkDay: "是",
          isRestDay: "是",
          isWorkDay: "是",
          moneyHoilday: "他吧",
          moneyRestDay: "1",
          moneyWorkDay: "1",
          name: "刘泽榕",
          range: "全公司",
          ratioHoilday: "3",
          ratioRestDay: "2",
          ratioWorkDay: "1",
          ratiotimeHoilday: "1",
          ratiotimeRestDay: "1",
          ratiotimeWorkDay: "1",
          restDayCompute: "审批",
          unit: "元",
          workDayCompute: "打卡",
        },
      }
    },methods: {
      handleClick(row) {
        console.log(row);
        this.rows=row;
        this.isDialog=true;
      },
      getCompetencegroup(){
        this.$axios.post('http://localhost:8080/Ovretime/selectAll').then(res => {
          this.tabledata=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      addCompetencegroup(){
        this.$axios.post('http://localhost:8080/Ovretime/insert',this.$qs.stringify(this.rows)).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      updateOvretime(){
        this.$axios.post('http://localhost:8080/Ovretime/update',this.$qs.stringify(this.rows)).then(res => {
         console.log(res);
         this.isDialog = false;
      }).catch(res => {
      console.log(res)
      });
      },
    },mounted() {
    this.getCompetencegroup();   
   } 
  }
</script>
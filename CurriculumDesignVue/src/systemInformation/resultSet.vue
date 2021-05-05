<!-- 结算设置 -->
<template>
    <div id="a">
        <div id="top">
            <el-page-header @back="goBack" content="结算设置"></el-page-header>
        </div>
        <div id="bottom"> 
          <el-form :label-position="'top'" label-width="80px" >
                <el-form-item  v-for="(list,num) in forms" :key="num" >                 
                  <el-col :span='3'><span>{{lists[num].title}}</span></el-col>
                  <el-col :span='18' v-show="lists[num].type=='单行输入框'"><el-input  v-model="list.content"></el-input></el-col>
                  <el-col :span='18' v-show="lists[num].type=='数字输入框'"><el-input-number  :step="2" v-model="list.statrtTime"></el-input-number>{{}}</el-col>
                  <el-col :span='18' v-show="lists[num].type=='选择框'">
                    <el-select   v-model="list.content" placeholder="请选择" >
                        <el-option
                            v-for="item in lists[num].select.split('-')"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span='18' v-show="lists[num].type=='日期'" >
                    <el-date-picker type="datetime" placeholder="选择日期时间" v-model="list.content"></el-date-picker>
                  </el-col>
                  <el-col :span='18' v-show="lists[num].type=='日期区间'" >
                    <el-date-picker type="datetimerange"  range-separator="至"  start-placeholder="开始日期"  end-placeholder="结束日期"
                    v-model="list.dateList" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </el-col>
                  <el-col :span='18' v-show="lists[num].type=='单选框'" >
                    <el-radio-group v-model="list.content">
                      <el-radio v-for="(item,num) in lists[num].select.split('-')" :label="item" :key="num">{{item}}</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :span='18' v-show="lists[num].type=='多选框'" >
                    <el-checkbox-group v-model="list.checkList">
                      <el-checkbox v-for="(item,num) in lists[num].select.split('-')" :label="item" :key="num"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                  <el-col :span='18' v-show="lists[num].type=='多行输入框'">
                    <el-input type="textarea" autosize placeholder="请输入内容" v-model="list.content"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button @click.prevent="updateDesign()">确认</el-button>
                  <el-button @click.prevent="">返回</el-button>
                </el-form-item>
            </el-form>
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
</style>
<script>
  export default {
    data() {
      return {
        oaId:1,
        forms:[],
        form: {
          formid:0,
          name: '',
          content: '',
          statrtTime: '',
          endTime: '',
          optime: '',
          checkList:[],
          dateList:[],
        },
        lists:[],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        fromApply:{}
      }
    },
    methods: {
      goBack() {
        console.log('go back');
      },
      onSubmit() {
        console.log('submit!');
        
      },init(){
        this.getDesign();
      },
      getDesign(){
        this.$axios.post('http://localhost:8080/Design/selectByOid',this.$qs.stringify({oaId:this.fromApply.type})).then(res => {
          this.lists=res.data ;
          this.form.formid=this.fromApply.id;
          this.lists.forEach(list => {
           this.form.name=list.title;
           this.forms.push(Object.assign({},this.form));
          })
          console.log(res);        
      }).catch(res => {
      console.log(res)
      });
      },
      updateFormapply() {
        this.fromApply.status="未审批";
        this.$axios.post('http://localhost:8080/Formapply/update',this.$qs.stringify(this.fromApply)).then(res => {
         console.log(res);
         this.$router.push({path:'/systemInformation/processDisplay'});
        }).catch(res => {
        console.log(res)
      });
      },
      updateDesign(){
        this.forms.forEach(form => {
          if(form.dateList.length>0)
            form.content=form.dateList.join("到");
          if(form.checkList.length>0)
            form.content=form.checkList.join(",");
        })
        console.log(this.forms);
        this.$axios({
        url: 'http://localhost:8080/Formcontent/insert',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(this.forms),
        headers: {
            'Content-Type': 'application/json',
        },
      }).then(res => {
         console.log(res);
         this.updateFormapply();
      }).catch(res => {
      console.log(res)
      });
      },
    },mounted() {
      this.fromApply = this.$route.query.row;
        this.getDesign();
    }
  }
</script>
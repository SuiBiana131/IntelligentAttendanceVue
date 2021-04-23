<!-- 结算设置 -->
<template>
    <div id="a">
        <div id="top">
            <el-page-header @back="goBack" content="结算设置"></el-page-header>
        </div>
        <div id="bottom"> 
          <el-form :label-position="'top'" label-width="80px" >
                <el-form-item  v-for="list in lists" :key="list.id" >                 
                  <el-col :span='3'><span>{{list.title}}</span></el-col>
                  <el-col :span='18' v-show="list.type=='1'"><el-input  v-model="list.content"></el-input></el-col>
                  <el-col :span='18' v-show="list.type=='2'"><el-input-number  :step="2" v-model="list.content"></el-input-number>{{}}</el-col>
                  <el-col :span='18' v-show="list.type=='3'">
                    <el-select   v-model="list.content" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span='18' v-show="list.type=='4'" >
                    <el-date-picker type="datetime" placeholder="选择日期时间" v-model="list.statrtTime"></el-date-picker>
                  </el-col>
                  <el-col :span='18' v-show="list.type=='5'">
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
        },lists:[{
            title:'原因',
            type:'4',
            tips:'',
            unit:'',
            select:'',
            dateType:'',
            startDate:'',
            endDate:'',
            id:1,
            oaId:-1,
        }],options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
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
        this.lists.forEach(list => {
            this.$set(list,'content','')
            this.$set(list,'statrtTime','')
            this.$set(list,'endTime','')
            this.$set(list,'optime','')
            console.log( this.lists);
          })  
      },
      getDesign(){
        this.$axios.post('http://localhost:8080/Design/selectByOid',this.$qs.stringify({oaId:this.oaId})).then(res => {
          this.lists=res.data;
          console.log(res);        
      }).catch(res => {
      console.log(res)
      });
      },
      updateDesign(){
         this.lists.forEach(list => {
           this.form.name=list.title;
           this.form.content=list.content;
           this.form.statrtTime=list.statrtTime;
           this.form.endTime=list.endTime;
           this.form.optime=list.optime;
           this.forms.push(this.form);
          })
           console.log( this.forms);
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
      }).catch(res => {
      console.log(res)
      });
      },
    },mounted() {
        this.init();
    }
  }
</script>
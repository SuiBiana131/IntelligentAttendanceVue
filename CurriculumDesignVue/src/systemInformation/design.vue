<template>
    <div id="designMain">
        <div class="designLeft">
            <b>基础组件</b>
            <el-row :gutter="20">
                <el-button class="designBasic" icon="el-icon-edit" @click="onSubmit('1')">单行输入框</el-button>
                <el-button class="designBasic" icon="el-icon-tickets" @click="onSubmit('5')">多行输入框</el-button>
            </el-row>
            <el-row :gutter="20">
                <el-button class="designBasic" icon="el-icon-s-data" @click="onSubmit('2')">数字输入框</el-button>
                <el-button class="designBasic" icon="el-icon-check" @click="onSubmit('3')">单选框</el-button>
            </el-row>
            <el-row :gutter="20">
                <el-button class="designBasic" icon="el-icon-circle-check" @click="onSubmit('3')">多选框</el-button>
                <el-button class="designBasic" icon="el-icon-date" @click="onSubmit('4')">日期</el-button>
            </el-row>
            <el-row :gutter="20">
                <el-button class="designBasic" icon="el-icon-s-claim" @click="onSubmit('4')">日期区间</el-button>
                <el-button class="designBasic" icon="el-icon-mobile-phone" @click="onSubmit('1')">电话</el-button>
            </el-row>
        </div>
        <div class="designCenter">
            <el-form :label-position="'top'" label-width="80px" >
                <el-form-item  v-for="list in lists" :key="list.id" >
                  
                  <!--   <label slot="label"  @click="show(list)">{{list.title}}</label>
                  <el-col :span='18'>
                    <el-input readonly v-show="list.type=='1'"></el-input>
                    <el-input-number  :step="2" disabled v-show="list.type=='2'"></el-input-number>
                    <el-select   v-model="value" placeholder="请选择" disabled v-show="list.type=='3'">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker type="datetime" placeholder="选择日期时间" readonly v-show="list.type=='4'"></el-date-picker>
                    <el-input type="textarea" autosize placeholder="请输入内容" readonly v-show="list.type=='5'"></el-input>
                  </el-col>-->
                  <el-col >
                    <lzr-item  :list="list" @get-information="show(list)" @deleteList="remove(list)"></lzr-item>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button @click.prevent="updateDesign()">确认</el-button>
                  <el-button @click.prevent="">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="designRight">
          <b>详细属性</b> 
          <lzr-information ref="lzr" v-bind.sync="rightData" @addItem="addItem(rightData)" 
          @deleteItem="deleteItem(rightData,$event)" @updateitem="updateitem(rightData,$event)"></lzr-information>
          <!-- <el-form ref="form" :model="rightData" label-width="80px" :label-position="'top'" v-show="rightData.type!=''">
            <el-form-item label="标题" >
              <el-input v-model="rightData.title"></el-input>
            </el-form-item>
            <el-form-item label="提示文字">
              <el-input v-model="rightData.tips"></el-input>
            </el-form-item>
            <el-form-item label="单位" v-show="rightData.type=='2'">
              <el-input v-model="rightData.unit"></el-input>
            </el-form-item>
            <el-form-item label="选项" v-show="rightData.type=='3'">
              <el-input  v-for="item in select1" :key="item.num" v-model="item.value">
                <el-button slot="append" icon="el-icon-delete" @click="deleteItem(item,select1)"></el-button>
              </el-input>
              <el-button type="text" @click="addItem(select1)">添加选项</el-button>
            </el-form-item>
            <el-form-item label="日期类型" v-show="rightData.type=='4'">
              <el-select v-model="rightData.dateType" placeholder="请选择">
                <el-option
                  v-for="item in dateTypes"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题一" v-show="rightData.type=='4'">
              <el-input v-model="rightData.startDate"></el-input>
            </el-form-item>
            <el-form-item label="标题二" v-show="rightData.type=='4'">
              <el-input v-model="rightData.endDate"></el-input>
            </el-form-item>
          </el-form> -->
        </div>
    </div>
</template>
<style>
  #designMain{
      margin-left:5%;
      margin-right:5%;
  }
  #designMain::after{
    content: "";
    display: block;
    clear: both;
  }
  .designLeft{
      width:30%;
      float:left;
  }
  .designCenter{
      width:38%;
      float:left;
      margin-right:2%;
  }
  .designRight{
      width:30%;
      float:right;
  }
  .designBasic{
      width:40%;
      font-size:25%;
  }
  .el-row{
      margin-top:4%;
  }
</style>
<script>
  import LzrItem from "../components/LzrItem"
  import LzrInformation from "../components/LzrInformation"
  export default {
    components:{
      LzrItem,
      LzrInformation
    },
    data() {
      return {
           options: [{
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
        lists:[{
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
        }],
        rightData:{title:'',type:'',tips:'',unit:'',select:'',dateType:'',startDate:'',endDate:'',id:0,oaId:-1},
        dateTypes:{mydate:'年-月-日',mydateTime:'年-月-日-时-分'},
        value: '',
        oaId:1,
        id:-1,
        select1:[],
      }
    },methods: {
      onSubmit(type) {
          var newNum={title:'默认名称',
            type:'0',
            tips:'',
            unit:'',
            select:'',
            dateType:'',
            startDate:'',
            endDate:'',
            id:1,
            oaId:-1};
          newNum.id=this.id;
          newNum.oaId=this.oaId;
          newNum.type=type;
          this.lists.push(newNum);
          console.log(newNum);
          this.id=this.id-1;
      },
      remove(item){
        var index = this.lists.indexOf(item)
        if (index !== -1) 
          this.lists.splice(index, 1)
      },
      show(list){
        console.log(list);
        this.rightData=list;
      },
      addItem(list){
        console.log(this.$refs.lzr);
        list.select="";
        var item={num:0,value:'选项'};
        if(this.$refs.lzr.select1.length!=0)
          item.num=this.$refs.lzr.select1[this.$refs.lzr.select1.length-1].num+1;
        this.$refs.lzr.select1.push(item);
        this.$refs.lzr.select1.forEach(function(sel){
          list.select=list.select+sel.value+"-";
        })
        list.select = list.select.slice(0,list.select.length-1);
        console.log(this.$refs.lzr._data);
      },
      deleteItem(list,value){
        list.select="";
        for(var i=0;i<this.$refs.lzr.select1.length;i++){
          if(this.$refs.lzr.select1[i].num==value.num){
            this.$refs.lzr.select1.splice(i,1);
            list.select=list.select+this.$refs.lzr.select1[i].value+"-";
            continue;
          }
          list.select=list.select+this.$refs.lzr.select1[i].value+"-";
        }
        list.select = list.select.slice(0,list.select.length-1);
        console.log(value);
      },
      updateitem(list,item){
        console.log(item.value);
        let res="";
        this.$refs.lzr.select1.forEach(function(sel){
          if(sel.num==item.num)
            sel.value=item.value;
          res=res+sel.value+"-";
        })
        list.select = res.slice(0,res.length-1);
        console.log(list.select);
      },
      getDesign(){
        this.$axios.post('http://localhost:8080/Design/selectByOid',this.$qs.stringify({oaId:this.$route.query.oaId})).then(res => {
          if(res.data.length>0)
            this.lists=res.data;
          this.rightData = this.lists[0];
          console.log(res);        
      }).catch(res => {
      console.log(res)
      });
      },
      updateDesign(){
        this.$axios({
        url: 'http://localhost:8080/Design/update',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(this.lists),
        headers: {
            'Content-Type': 'application/json',
        },
      }).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      init(){
        this.getDesign();
      }
    },mounted() {
    this.init();
   }
  }
</script>
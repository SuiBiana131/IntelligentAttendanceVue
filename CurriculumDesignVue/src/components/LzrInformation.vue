<template>
  <div class="LzrInformation" >
    <el-row>
        <el-col :span="24"><h4 class="h4">标题</h4></el-col>
        <el-col :span="20"><el-input  v-bind:value="title" v-on:input="$emit('update:title', $event)" ></el-input></el-col>
    </el-row>
    <el-row>
        <el-col :span="24"><h4 class="h4">提示文字</h4></el-col>
        <el-col :span="20"><el-input v-bind:value="tips" v-on:input="$emit('update:tips', $event)" ></el-input></el-col>
    </el-row>
    <el-row>
        <el-col :span="24"><h4 class="h4">单位</h4></el-col>
        <el-col :span="20"><el-input v-bind:value="unit" v-on:input="$emit('update:unit', $event)" ></el-input></el-col>
    </el-row>
    <el-row>
        <el-col :span="24"><h4 class="h4">选项</h4></el-col>
        <el-col :span="24" v-for="item in select1" :key="item.num">
        <el-input    v-model="item.value" v-on:input="$emit('updateitem', item)">
            <el-button slot="append" icon="el-icon-delete" v-on:click="$emit('deleteItem',item)"></el-button>
        </el-input></el-col>
        <el-col :span="4"><el-button type="text" v-on:click="$emit('addItem')">添加选项</el-button></el-col>
    </el-row>
    <el-row>
        <el-col :span="24"><h4 class="h4">日期类型</h4></el-col>
        <el-col :span="20">
            <el-select v-bind:value="dateType" v-on:change="$emit('update:dateType', $event)">
                <el-option
                  v-for="item in dateTypes"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
            </el-select>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24"><h4 class="h4">标题一</h4></el-col>
        <el-col :span="20"><el-input v-bind:value="startDate" v-on:input="$emit('update:startDate', $event)" ></el-input></el-col>
    </el-row>
    <el-row>
        <el-col :span="24"><h4 class="h4">标题二</h4></el-col>
        <el-col :span="20"><el-input v-bind:value="endDate" v-on:input="$emit('update:endDate', $event)" ></el-input></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LzrInformation', //自定义请假表单详细信息组件
  props: {
        title:String,
        type:String,
        tips:String,
        unit:String,
        select:String,
        dateType:String,
        startDate:String,
        endDate:String,
        id:Number,
        oaId:Number,
  },
  data () {
    return {
        select1:[],
        dateTypes:{mydate:'年-月-日',mydateTime:'年-月-日-时-分'},
    }
  },
  watch: {
      'select': function (val) {//监听props中的属性
      this.select1 = [];
      let num = 0;
      let list = val.split("-");
      list.forEach((item)=>{
      this.select1.push({num:num++,value:item})
        })
    }
      
  }
  

}
</script>
<style>
   .LzrInformation{
     overflow:hidden;
   } 
   .h4{
     margin-top:10px;
     margin-bottom:10px;
     font-weight:normal;
   }
</style>
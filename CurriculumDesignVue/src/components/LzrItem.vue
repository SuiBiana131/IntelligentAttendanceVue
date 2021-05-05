<template>
  <div class="LzrItem" v-on:click="$emit('get-information')">
    <el-col :span="24"><h3>{{list.title}}</h3></el-col>
    <el-col :span="16">
      <el-input readonly v-show="list.type=='单行输入框'"></el-input>
      <el-input-number  :step="2" disabled v-show="list.type=='数字输入框'"></el-input-number>
      <el-select class="Lzrselect" v-model="value" placeholder="请选择" disabled v-show="list.type=='单选框'||list.type=='多选框'||list.type=='选择框'">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker class="Lzrdate" type="datetime" placeholder="选择日期时间" readonly v-show="list.type=='日期'"></el-date-picker>
      <el-date-picker type="datetimerange"  range-separator="至"  start-placeholder="开始日期"  end-placeholder="结束日期"
      readonly v-show="list.type=='日期区间'" style="width:100%"></el-date-picker>
      <el-input type="textarea" autosize placeholder="请输入内容" readonly v-show="list.type=='多行输入框'"></el-input>
    </el-col>
    <el-col :span="6" :offset="2"><el-button v-on:click="$emit('deleteList')">删除</el-button></el-col>
  </div>
</template>

<script>
export default {
  name: 'LzrItem', //自定义请假表单设计组件
  props: ['list'],
  data () {
    return {
      options: [{
          value: '选项1',
          label: '选项1'
        }, {
          value: '选项2',
          label: '选项2'
        }],
        value: ''
    }
  }
}
</script>
<style>
   .LzrItem{
     overflow:hidden;
   } 
   .Lzrdate{
     display:block;
   }
   .Lzrselect{
     display:block;
   }
</style>
<template>
  <div class="LzrItem" v-on:click="$emit('get-information')">
    <el-col :span="24"><h3>{{list.title}}</h3></el-col>
    <el-col :span="24">
      <el-input readonly v-show="list.type=='1'"></el-input>
      <el-input-number  :step="2" disabled v-show="list.type=='2'"></el-input-number>
      <el-select v-model="value" placeholder="请选择" disabled v-show="list.type=='3'">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker type="datetime" placeholder="选择日期时间" readonly v-show="list.type=='4'"></el-date-picker>
      <el-input type="textarea" autosize placeholder="请输入内容" readonly v-show="list.type=='5'"></el-input>
    </el-col>
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
</style>
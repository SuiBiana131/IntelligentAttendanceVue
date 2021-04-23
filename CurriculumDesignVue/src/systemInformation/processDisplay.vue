<template>
    <div id="a">
        <div id="top">
            <el-page-header @back="goBack" content="假期申请"></el-page-header>
        </div>
        <div id="prbottom"> 
          <el-col :span="8">
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col >
          <el-col :span="12">
            <el-button type="danger"  @click="handleadd()">申请</el-button>
          </el-col >
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="序号"
              prop="id"
              width="50">
            </el-table-column>
            <el-table-column
              label="名称"
              prop="name"
              width="180">
            </el-table-column>
            <el-table-column
              label="申请人"
              prop="username"
              width="80">
            </el-table-column>
            <el-table-column
              label="申请时间"
              prop="applytime"
              width="120">
            </el-table-column>
            <el-table-column
              label="审批时间"
              prop="examinetime">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status">
            </el-table-column>
            <el-table-column
              align="right" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
    </div>
    
    
</template>
<style>
#top{
  margin:1%;
}
#prbottom{
  
  margin:1%;
  width:80%;  
  margin-left:10%;
}
</style>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [],
        search: '',
        tab:{applytime: "2021.02.20",
            isDelete: 0,
            name: "刘泽榕的请假申请",
            status: "未完善",
            type: "请假",
            userid: 1,
            username: "刘泽榕"},
        options: [{
          id:1,
          value: '事假11111111',
          label: '黄金糕'
        }, {
          id:2,
          value: '病假',
          label: '双皮奶'
        }, {
          id:3,
          value: '加班',
          label: '蚵仔煎'
        }, {
          id:4,
          value: '出差',
          label: '龙须面'
        }, {
          id:5,
          value: '事假',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
      goBack() {
        console.log('go back');
      },
      onSubmit() {
        console.log('submit!');
      },
      handleDelete(row) {
        row.isDelete=1;
        this.$axios.post('http://localhost:8080/Formapply/update',this.$qs.stringify(row)).then(res => {
         console.log(res);
         this.getFormapply();
        }).catch(res => {
        console.log(res)
      });
      },
      handleadd(){
        
      },
      getFormapply(){
        this.$axios.post('http://localhost:8080/Formapply/selectAlldelete',this.$qs.stringify({userid:1})).then(res => {
          this.tableData=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
    },mounted() {
    this.getFormapply();   
   } 
  }
</script>
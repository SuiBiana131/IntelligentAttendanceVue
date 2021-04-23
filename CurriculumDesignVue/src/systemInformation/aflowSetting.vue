<template>
    <div id="a">
        <div id="top">
            <div class="topLeft">
              <b>表单管理</b>
            </div>
            <div class="topRight">
                <el-button  @click="addSheet()" icon="el-icon-plus" >创建新表单</el-button>
            </div>
        </div>
        <div id="bottom2"> 
            <el-table :data="tabledata"  style="width: 100%" >
              <el-table-column label="已启用">
                <el-table-column prop="name" label="表单名称">
                </el-table-column>
                <el-table-column  label="可用范围">
                全公司
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                </el-table-column>
                <el-table-column  label="移动" width="130">
                  <template slot-scope="scope">
                   <el-button-group>
                    <el-button  @click="moveTop(scope.$index,scope.row)"  icon="el-icon-top" size="mini"></el-button>
                    <el-button  @click="moveBottom(scope.$index,scope.row)"  size="mini"><i class="el-icon-bottom"></i></el-button>
                   </el-button-group>
                  </template>
                </el-table-column>
                <el-table-column  label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                    <el-button  type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-pagination
            :page-size="3"
            :pager-count="5"
            layout="prev, pager, next"
            :total="20">
            </el-pagination>
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
            name:'事假',
            updatetime:'2020-13-16',
            range:'全公司范围'
          },
          {
            name:'加班',
            updatetime:'2020-13-16',
            range:'全公司范围'
          },
          {
            name:'初差',
            updatetime:'2020-13-16',
            range:'全公司范围'
          }
          ,
          {
            name:'调休',
            updatetime:'2020-13-16',
            range:'全公司范围'
          }
        ],
        num:{},
        range:'全公司范围',
        form:{
          icon: "地址一",
          isUse: 1,
          name: "事假",
          text: "这是事假假期",
          updateTime: "2020.08.12",
        },
        drawer: false,
        direction: 'rtl',
        units: [{
          value: 'day',
          label: '按天请假'
        }, {
          value: 'hour',
          label: '按小时请假'
        }],
        computes: [{
          value: 'Workday',
          label: '按工作日计算请假时长'
        }, {
          value: 'notWorkday',
          label: '按自然日计算请假时长'
        }],
      }
    },methods: {
      handleClick(row) {
        this.$router.push({path:'/systemInformation/designCenter',query:{row}});
      },
      moveTop(index, row) {
      if (index === 0) {
        this.$message({
          message: '已经是列表中第一行!',
          type: 'warning'
        })
      } else {
        const temp = this.tabledata[index - 1]
        this.$set(this.tabledata, index - 1, this.tabledata[index])
        this.$set(this.tabledata, index, temp)
      }
    },
      moveBottom(index, row) {
      if (index === (this.tabledata.length - 1)) {
        this.$message({
          message: '已经是列表中最后一行!',
          type: 'warning'
        })
      } else {
        const i = this.tabledata[index + 1]
        this.$set(this.tabledata, index + 1, this.tabledata[index])
        this.$set(this.tabledata, index, i)
      }
    },
    getSheet(){
        this.$axios.post('http://localhost:8080/Sheet/selectAll').then(res => {
          console.log(res);
          this.tabledata=res.data;
         
      }).catch(res => {
      console.log(res)
      });
      },
      addSheet(){
        this.$axios.post('http://localhost:8080/Sheet/insert',this.$qs.stringify(this.form)).then(res => {
         console.log(res);
         this.drawer = false;
      }).catch(res => {
      console.log(res)
      });
      },
      updateSheet(){
        this.$axios.post('http://localhost:8080/Sheet/update',this.$qs.stringify(this.form)).then(res => {
         console.log(res);
         this.drawer = false;
      }).catch(res => {
      console.log(res)
      });
      },
    },mounted() {
    this.getSheet();   
   }
  }
</script>
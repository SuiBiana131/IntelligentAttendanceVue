<!-- 住宿信息 -->
<template>
    <div id="a">
        <div id="top">
            <el-page-header  content="住宿信息"></el-page-header>
        </div>
        <div id="bottom"> 
            <div id="top-right">
            <el-input class="el"  placeholder="请输入名字" v-model="name"></el-input><el-button type="primary" @click="selectAccommodation" class="el" >查询</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="编号" width="180">
                </el-table-column>
                <el-table-column prop="name" label="宿舍名">
                </el-table-column>
                <el-table-column prop="accommodationaddress" label="宿舍位置" width="180">
                </el-table-column>
                <el-table-column prop="cost" label="宿舍费" width="180">
                </el-table-column>
                <el-table-column  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                 </template>
                </el-table-column>
                <el-table-column  label="详细人员" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClickpeople(scope.row)" type="text" size="small">查看</el-button>
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
        <el-dialog title="修改信息" :visible.sync="centerDialogVisible" width="50%" center>
          <el-form ref="form" :model="form" label-width="35%">
            <el-form-item label="宿舍名：">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.name"></el-input></el-col>               
            </el-form-item>
            <el-form-item label="宿舍地址：">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.accommodationaddress"></el-input></el-col>               
            </el-form-item>
            <el-form-item label="宿舍费：">
                <el-col :span="10"></el-col>
                <el-col :span="14"><el-input v-model="form.cost"></el-input></el-col>               
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确认修改</el-button>
          </div>
        </el-dialog>
        <el-dialog title="宿舍人员" :visible.sync="people" width="50%" center>
          <el-card class="box-card">
            <div v-for="o in nums" :key="o.nickname" class="text item">
              {{ o.nickname }}
            </div>
          </el-card>
          <div slot="footer" class="dialog-footer">
            <el-button @click="people = false">取 消</el-button>
          </div>
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
#top-right{
  width:100%;  
  display: flex;
}
.el{
  margin:4%;
}
.el-row{
  margin:4%;
}
.text{
  float:left;
  padding: 18px 20px;
  font-size: 14px;
}
</style>
<script>
  export default {
     methods: {
      handleClick(row) {
        console.log(row);
        this.form=row;
        this.centerDialogVisible = true;
      },
      handleClickpeople(row) {
        console.log(row);
        this.form=row;
        this.selectPeople(row.id)
        this.people = true;
      },
        onSubmit() {
        console.log('submit!');
        this.centerDialogVisible = false;
        this.updateAccommodation();
      },getAccommodation(){
        this.$axios.post('http://localhost:8080/Accommodation/selectAll').then(res => {
         this.tableData=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      selectAccommodation(){
        this.$axios.post('http://localhost:8080/Accommodation/selectCondition',this.$qs.stringify(
          {name:this.name}
        )).then(res => {
          this.tableData=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      selectPeople(id){
        alert(id);
        this.$axios.post('http://localhost:8080/UserAccommodation/selectAccommodation',this.$qs.stringify({
          id: id
        })).then(res => {
          this.nums=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      updateAccommodation(){
        this.$axios.post('http://localhost:8080/Accommodation/update',this.$qs.stringify(this.form)).then(res => {
         
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      }
    },
    data() {
      return {
        centerDialogVisible:false,
        people:false,
        name:'',
        nums:[],
        form: {
          
        },
        tableData: []
      }
    },
  mounted() {
    this.getAccommodation();   
  }
  }
</script>
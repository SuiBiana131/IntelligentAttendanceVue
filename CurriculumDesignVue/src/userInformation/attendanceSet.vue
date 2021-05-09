<!-- 考勤设置 -->
<template>
    <div id="a">
        <div id="top">
          <div class="top-left">
            <el-page-header @back="goBack" content="分组设置"></el-page-header>
          </div>
          <div class="top-right">
            <el-button style="float: right; padding: 0px 10px" type="text" @click="getGroup()">考勤组分配</el-button>
            <el-button style="float: right; padding: 0px 10px" type="text" @click="addDialogVisible=true">增加小组</el-button>
            <el-button :disabled="isopen" style="float: right; padding: 0px 10px" type="text" @click="upadateUsergroup()">确认移动</el-button>
          </div>
        </div>
        <div id="bottom">
          <el-card class="box-card" v-for="(drop,numdrop) in drops" :key="numdrop" shadow="always" body-style="padding-top: 0px;overflow:auto;">
            <div slot="header" v-bind:class="{clearfix:isGreen}" 
            @dragenter="handleDragEnter($event, drop)" 
            @dragover.prevent="handleDragOver($event)"
            @drop="handleDrop()">
              <span>{{drop.name}}</span>
              <el-button type="text" icon="el-icon-arrow-down" v-if="drop.isOpen" @click="open(drop)"></el-button>
              <el-button type="text" icon="el-icon-arrow-up" v-else @click="open(drop)"></el-button>
              <el-button type="text" icon="el-icon-delete" v-show="isGreen" style="margin-left:30%">请拖至此处进行移动</el-button>
              <el-button style="float: right;" type="text" @click="deleteUsergroup(drop.Usergroup,numdrop)">删除</el-button>
            </div>
            <el-col :span="8" v-for="(o,j) in drop.Usergroup" :key="j" v-show="drop.isOpen"> 
            <div  class="text item" draggable="true"
              @dragstart="handleDragStart($event, o,drop,j)"
              @dragend="handleDragEnd(drop.Usergroup,j)"
            >
              {{'列表内容 ' + o.username }}
            </div>
            </el-col>
          </el-card>
          <el-dialog title="修改" :visible.sync="centerDialogVisible" width="50%" center>
            <el-row :gutter="20" v-for="(cg,index) in competenceGroup" :key="index">
              <el-col :span="24" :offset="3"><span>{{cg.name}}:</span></el-col>
              <el-col :span="24" :offset="3">
                <el-select v-model="cg.classname" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select></el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="upadateGroup()">确认修改</el-button>
            </div>
          </el-dialog>
          <el-dialog title="添加" :visible.sync="addDialogVisible" width="30%" center>
            <el-input placeholder="请输入内容" v-model="addname">
              <template slot="prepend">名称</template>
            </el-input>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addUsergroup()">确认</el-button>
            </div>
          </el-dialog>
        </div>
        
    </div>
    
    
</template>
<style>
#top{
  margin:1%;
  overflow:hidden;
}
.el-page-header{
}
.top-left{
  width:35%;
  float:left;
}
.top-right{
  margin-right:160px;
  float:right;
}
#bottom{
  
  margin:1%;
  width:60%;  
  margin-left:20%;
}
.box-card{
  margin-top:10px;
  margin-bottom:10px;
}
.el-row{
  margin:4%;
}
.el-col{
  margin-top:2%;
}
.clearfix{
   opacity: 0.5;
}

</style>
<script>
  export default {
    data() {
      return {
        centerDialogVisible:false,
        addDialogVisible:false,
        addname:"默认名称",
        linkshow:false,
        form: {
          name: '22324',
          region: '',
          date1: '12:20:00',
          date2: '12:20:00',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        drops:[[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],[{
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]],
        step:{},
        num:{},
        attendance:{},
        isGreen:false,
        isopen:true,
        UserGroup:[],
        competenceGroup:[{name:'事业组',calss:'考勤组5'}],
        options:[{
          value: '考勤组1',
          label: '黄金糕'
        }, {
          value: '考勤组2',
          label: '双皮奶'
        }, {
          value: '考勤组3',
          label: '蚵仔煎'
        }, {
          value: '考勤组4',
          label: '龙须面'
        }, {
          value: '考勤组5',
          label: '北京烤鸭'
        }],
      }
    },
    methods: {
      goBack() {
        console.log('go back');
      },
      onSubmit() {
        console.log(this.competenceGroup);
        this.centerDialogVisible = false;
      },
      handleDragStart(e, item,items) {
            this.step=items;
            this.num=item;
            //items.splice(j,1); 
        },
      handleDragEnd(items,j) {
            if(JSON.stringify(items)==JSON.stringify(this.step.Usergroup))
              return;
            items.splice(j,1); 
            this.step.Usergroup.push(this.num);
            this.isGreen=false;
            this.isopen=false;
            var set=new Set(this.UserGroup);
            this.num.groupname=this.step.name;
            if(!set.has(this.num))
              this.UserGroup.push(this.num);
        },
        // 首先把div变成可以放置的元素，即重写dragenter/dragover
      handleDragOver(e) {
            e.dataTransfer.effectAllowed= 'move';// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
        },
      handleDragEnter(e, item) {
            e.dataTransfer.dropEffect = 'move';
            this.isGreen=true;
            console.log(item);
            this.step=item;
        },
      handleDrop(){
        console.log(1);
        this.isGreen=false;
      },
      isShow(item){
        return this.shows[item];
      },
      open(drop){
        console.log(1);
        drop.isOpen=!drop.isOpen;
      },
      getUsergroup(){
        this.$axios.post('http://localhost:8080/Usergroup/selectByGroupname').then(res => {
          this.drops=res.data;
          console.log(res);        
      }).catch(res => {
      console.log(res)
      });
      },
      upadateUsergroup(){
        this.isopen=true;
        this.$axios({
        url: 'http://localhost:8080/Usergroup/update',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(this.UserGroup),
        headers: {
            'Content-Type': 'application/json',
        },
      }).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
        console.log(this.UserGroup);
        this.UserGroup=[];
      },
      addUsergroup(){
        this.addDialogVisible=false;
        if(this.drops.length>=6){
          alert("不能超过6个组！")
          return
        }
        var addusergroup={name:this.addname,isOpen:true,Usergroup:[]};
        this.drops.push(addusergroup);
      },
      deleteUsergroup(item,i){
        alert("删除一个组会将该组人员全部分配到待分配人员(如没有该组会自动创建)组中！")
        if(item.length>0){
          this.$axios.post('http://localhost:8080/Group/delete',this.$qs.stringify({name:item[0].groupname})).then(res => {
            console.log(res);        
          }).catch(res => {
            console.log(res)
          });
        }
        for(var i=0;i<item.length;i++)
          item[i].groupname="待分配人员";
        this.$axios({
        url: 'http://localhost:8080/Usergroup/update',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
        },
      }).then(res => {
         console.log(res);
         this.getUsergroup();
      }).catch(res => {
      console.log(res)
      });    
      },
      getGroup(){
        this.centerDialogVisible = true;
        this.$axios.post('http://localhost:8080/Group/selectAll').then(res => {
          this.competenceGroup=res.data;
          console.log(res);        
      }).catch(res => {
      console.log(res)
      });
      },
      upadateGroup(){
        this.$axios({
        url: 'http://localhost:8080/Group/update',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(this.competenceGroup),
        headers: {
            'Content-Type': 'application/json',
        },
      }).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      this.centerDialogVisible = false;
    }
    },
     mounted() {
       this.getUsergroup();
  }
  }
</script>
<template>
<div>
<el-form class="form3" ref="form" :model="form" label-width="150px">
  <el-form-item label="考勤组名称" >
   <el-col :span="8">
    <el-input v-model="form.basic.name"></el-input>
   </el-col >
  </el-form-item>
  <el-form-item label="靠勤类型">
   <el-col :span="5">
    <el-radio v-model="form.basic.stytle" label="1">固定打卡</el-radio>
    <el-radio v-model="form.basic.stytle" label="2">自由打卡</el-radio>
   </el-col >
  </el-form-item>
  <el-form-item label="工作日设置" v-show="form.basic.stytle==='1'">
   <el-col :span="5">
    <el-select v-model="form.timevalue" placeholder="请选择考勤班次">
      <el-option
        v-for="item in form.timeoptions"
        :key="item.name"
        :label="item.time"
        :value="item.time">
      </el-option>
    </el-select>
   </el-col>
  </el-form-item>
  <el-form-item  v-show="form.basic.stytle==='1'">
   <el-col :span="18">
    <el-table ref="multipleTable" :data="form.datatime"  size="mini" style="width: 80%" @selection-change="handleSelectionChange1">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column prop="date" label="工作日">
        </el-table-column>
        <el-table-column prop="times" label="时间段">
        </el-table-column>
        <el-table-column  label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            </template>
        </el-table-column>
    </el-table>
   </el-col>
  </el-form-item>
  <el-form-item label="工作日设置" v-show="form.basic.stytle==='2'">
   <el-col :span="15">
    <el-checkbox-group v-model="form.checkList">
        <el-checkbox label="1">星期一</el-checkbox>
        <el-checkbox label="2">星期二</el-checkbox>
        <el-checkbox label="3">星期三</el-checkbox>
        <el-checkbox label="4">星期四</el-checkbox>
        <el-checkbox label="5">星期五</el-checkbox>
        <el-checkbox label="6">星期六</el-checkbox>
        <el-checkbox label="7">星期日</el-checkbox>
    </el-checkbox-group>
   </el-col>
  </el-form-item>
  <el-form-item label="特殊日期">
   <el-col >
    <span>添加一些必须打卡或无须打卡的日期！</span>
   </el-col >
   <el-col >
    <span> &nbsp</span>
   </el-col >
   <el-row>
   <el-col >
    <el-button @click="dialogMustClock=true">添加</el-button><span>&nbsp&nbsp必须打卡的日期</span>
   </el-col >
   </el-row>
   <el-row>
   <el-col :span="20">
    <el-table ref="mustClockTable" :data="form.mustClock" v-show="form.mustClock.length!=0" size="mini" style="width: 100%" >
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column prop="times" label="时间段">
        </el-table-column>
        <el-table-column  label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="mustupdate(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="mustdelete(scope.$index)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
   </el-col >
  </el-row>  
  <el-row>
   <el-col >
    <el-button @click="dialogNotClock=true">添加</el-button><span>&nbsp&nbsp无须打卡的日期</span>
   </el-col >
  </el-row> 
  <el-row>
   <el-col :span="20">
    <el-table ref="notClockTable" :data="form.notClock" v-show="form.notClock.length!=0" size="mini" style="width: 100%" >
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column  label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="notupdate(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="notdelete(scope.$index)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
   </el-col >
  </el-row> 
  </el-form-item>
  <el-form-item label="考勤方式">
   <el-col :span="5">
    <el-checkbox-group v-model="form.checktype">
      <el-checkbox label="1" name="type">地点打卡</el-checkbox>
      <el-checkbox label="2" name="type">人脸打卡</el-checkbox>
    </el-checkbox-group>
   </el-col > 
  </el-form-item>
  <el-form-item label="地点" v-show="isPick()">
   <el-col >
    <el-button @click="handleClick()" type="text">添加</el-button>
   </el-col >
   <el-row>
   <el-col :span="20">
    <el-table ref="mapTable" :data="form.map" v-show="form.map.length!=0" size="mini" style="width: 100%" >
        <el-table-column  label="位置">
          <template slot-scope="scope">
            <span style="margin-left: 10px">({{ scope.row.lat }},{{ scope.row.lng }})</span>
          </template>
        </el-table-column>
        <el-table-column prop="radius" label="范围">
        </el-table-column>
        <el-table-column  label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="mapupdate(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="mapdelete(scope.$index)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
   </el-col >
  </el-row>
  </el-form-item>
  <el-form-item label="其他设置">
   <el-col :span="4">
    <el-radio v-model="form.basic.isDelivery" label="1">上班后4小时后才可开始打卡</el-radio>
   </el-col >
  </el-form-item>
  <el-form-item>
   <el-col :span="16">
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
   </el-col >
  </el-form-item>
</el-form>
<el-dialog
  title="无须打卡日期"
  :visible.sync="dialogNotClock"
  width="30%">
  <el-date-picker
      v-model="notdate"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd">
  </el-date-picker>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogNotClock = false">取 消</el-button>
    <el-button type="primary" @click="addNot">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="必须打卡日期"
  :visible.sync="dialogMustClock"
  width="30%">
  <span>日期&nbsp</span>
  <el-date-picker
      v-model="mustdate"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd">
  </el-date-picker>
  <el-table ref="currentTable" :data="form.timeoptions" highlight-current-row
    @current-change="handleCurrentChange" style="width: 100%" >
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="time" label="时间段">
        </el-table-column>
  </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogMustClock = false">取 消</el-button>
    <el-button type="primary" @click="addMust">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="添加打卡地址"
  :visible.sync="dialogMap"
  width="50%">
  <el-row :gutter="20">
    <el-col :span="4"><el-button type="text" @click="">经度:{{this.lat.toFixed(6)}}</el-button></el-col>
    <el-col :span="4"><el-button type="text" @click="">纬度:{{this.lng.toFixed(6)}}</el-button></el-col>
    <el-col :span="10"><el-input v-model="radius" placeholder="请输入考勤范围" @input="input"><template slot="prepend">考勤范围:</template><template slot="append">米</template></el-input></el-col>
    <el-col :span="4"><el-button type="primary" @click="addAddress">确认</el-button></el-col>
  </el-row>    
  <div id="container"></div>
</el-dialog>
</div>
</template>
<style>
  .form3{
  }
  .el-row{
      margin-top:20px;
  }
  #container{
    /*地图(容器)显示大小*/
    width:100%;
    height:400px;
    margin-top:20px;
  }
</style>
<script>
  export default {
    data() {
      return {
        form: {
          region: '',
          date1: '',
          date2: '',
          checktype: ['1','2'],
          resource: '',
          desc: '',
          radio:'1',
          checkList:['星期一'],
          timeoptions:[{name:'班次一',time:'09:00-17:00'},
          {name:'班次二',time:'08:00-19:00'},
          {name:'班次三',time:'09:00-16:00'}],
          timevalue:'',
          datatime:[
            {date:'星期一',
            times:'休息',
            id:0,
            groupId:-1},
            {date:'星期二',
            times:'8:00-17:00',
            id:0,
            groupId:-1},
            {date:'星期三',
            times:'休息',
            id:0,
            groupId:-1},
            {date:'星期四',
            times:'8:00-17:00',
            id:0,
            groupId:-1},
            {date:'星期五',
            times:'休息',
            id:0,
            groupId:-1},
            {date:'星期六',
            times:'休息',
            id:0,
            groupId:-1},
            {date:'星期日',
            times:'休息',
            id:0,
            groupId:-1}],
        hdate:1,
        mustClock:[],
        notClock:[],
        map:[{lat:27.090,lng:123.546,radius:1500}],
        basic:{
          freeWorkday: "1234567",
          id: -1,
          name: "",
          isDelivery: "",
          stytle: "",
          type: "12"},
        },
        dialogMustClock:false,
        dialogNotClock:false,
        dialogMap:false,
        mustdate:'',
        notdate:'',
        currentRow:null,
        addMustDate:{date:'',times:'',groupId:0,id:0},
        addNotDate:{date:'',groupId:0,id:0},
        addMap:{lat:27.090,lng:123.546,radius:1500,groupId:0,id:0},
        hashSet:[],
        //地图数据
        options:{timeout: 10000},
        lat: 39.984120,
        lng: 116.307484,
        map:{},
        markerLayer:{},
        circle:{},
        center:'',
        radius:1500,
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form.checkList);
        this.form.basic.type="";
        this.form.basic.freeWorkday="";
        let hashType = new Set(this.form.checktype);
        let hashFree = new Set(this.form.checkList);
        for(let i=1;i<8;i++){
          if(hashFree.has(""+i))
            this.form.basic.freeWorkday=this.form.basic.freeWorkday+i;
          else
            this.form.basic.freeWorkday=this.form.basic.freeWorkday+0;
        }
        for(let i=1;i<3;i++){
          if(hashType.has(""+i))
            this.form.basic.type=this.form.basic.type+i;
          else
            this.form.basic.type=this.form.basic.type+0;
        }
        console.log(this.form.mustClock);
        this.updateCompetencegroup();
        this.updateFixedworkday();
        this.updateMustworkday();
        this.updateNotworkday();
        this.updateMappoint();
        this.$router.push('/competence/describe')
      },
      isPick(){
        let hashset = new Set(this.form.checktype)
        return hashset.has("1");
      },
      handleClick(row){
          this.dialogMap=true;
          console.log(this.map.id);
          if(!this.map.id)
            this.getAddress();
          
      },
      addNot(){
        let hashset = new Set(this.hashSet)
        if(hashset.has(this.mustdate))
        { console.log("该日期可能已设为必须打卡或无须打卡！");
          return ;
        }
        if(this.notdate=='')
        { console.log("你的日期或班次未选择！");
          return ;
        }
        this.addNotDate.date=this.notdate;
        this.addNotDate.id=0;
        this.addNotDate.groupId=this.form.basic.id;
        this.hashSet.push(this.notdate);
        this.form.notClock.push(this.addNotDate);
        this.notdate='';
        this.dialogNotClock=false;
      },
      notdelete(num){
        this.form.notClock.splice(num,1);
        
      },
      notupdate(row){

      },
      addMust(){
        let hashset = new Set(this.hashSet)
        if(hashset.has(this.mustdate))
        { console.log("该日期可能已设为必须打卡或无须打卡！");
          return ;
        }
        if(this.mustdate==''||this.currentRow==null)
        { console.log("你的日期或班次未选择！");
          return ;
        }  
        this.addMustDate.date=this.mustdate;
        this.addMustDate.times=this.currentRow.time;
        this.addMustDate.id=0;
        this.addMustDate.groupId=this.form.basic.id;
        this.hashSet.push(this.mustdate);
        this.form.mustClock.push(this.addMustDate);
        this.mustdate='';
        this.currentRow=null;
        this.dialogMustClock=false;
      },
      mustdelete(num){
        this.form.mustClock.splice(num,1);
        
      },
      mustupdate(row){

      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleSelectionChange1(rows)
      {
        if(this.form.hdate<8)
          return
        let rowtimes=this.form.timevalue==''?this.form.timeoptions[0].time:this.form.timevalue;
          if(!rows)
            return;
          let hset= new Set(rows);
          console.log("dasd");
          this.form.datatime.forEach(row => {
            if(!hset.has(row))
              row.times='休息';
            else if(row.times=='休息')
              row.times=rowtimes;
            this.$set(this.form.datatime,row.time,row)
          })     
      },
      getFixedworkday(){
         
        this.$axios.get('http://localhost:8080/Fixedworkday/selectBygid',{params:{id:this.$route.query.row.id}}).then(res => {
        if(res.data.length>0)
          this.form.datatime=res.data;
        console.log(res);
        this.checkDatetime(this.form.datatime);   
        
      }).catch(res => {
      console.log(res)
      });
      },
      getMappoint(){
        this.$axios.get('http://localhost:8080/Mappoint/selectBygid',{params:{id:this.$route.query.row.id}}).then(res => {
          this.form.map=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      getMustworkday(){
        
        this.$axios.get('http://localhost:8080/Mustworkday/selectBygid',{params:{id:this.$route.query.row.id}}).then(res => {
          this.form.mustClock=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      getNotworkday(){
        this.$axios.get('http://localhost:8080/Notworkday/selectBygid',{params:{id:this.$route.query.row.id}}).then(res => {
          this.form.notClock=res.data;
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      checkDatetime(datatime){
        this.$nextTick(function() {
          console.log(this.form.hdate);
          console.log(datatime);
          datatime.forEach(row => {
            this.form.hdate++;
            row.groupId=this.form.basic.id;
            console.log(row.times);
            if(row.times!='休息')
                {this.$refs.multipleTable.toggleRowSelection(row,true);console.log(1);}
          })
        });
      },
      updateCompetencegroup(){
        this.centerDialogVisible = false;
        this.$axios.post('http://localhost:8080/Competencegroup/update',this.$qs.stringify(this.form.basic)).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      updateNotworkday(){
        this.centerDialogVisible = false;
        this.$axios({
        url: 'http://localhost:8080/Notworkday/update',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(this.form.notClock),
        headers: {
            'Content-Type': 'application/json',
        },
      }).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      updateMustworkday(){
        console.log(this.form.mustClock);
        this.centerDialogVisible = false;
        this.$axios({
        url: 'http://localhost:8080/Mustworkday/update',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(this.form.mustClock),
        headers: {
            'Content-Type': 'application/json',
        },
      }).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      updateMappoint(){
        this.centerDialogVisible = false;
        this.$axios({
        url: 'http://localhost:8080/Mappoint/update',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(this.form.map),
        headers: {
            'Content-Type': 'application/json',
        },
      }).then(res => {
         console.log(res);
      }).catch(res => {
      console.log(res)
      });
      },
      updateFixedworkday(){
        
        this.centerDialogVisible = false;
        this.$axios({
        url: 'http://localhost:8080/Fixedworkday/update',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(this.form.datatime),
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
        console.log(this.$route.query.row);
        if(this.$route.query.row!=undefined&&this.$route.query.row.id!=-1){
        this.form.basic=this.$route.query.row;
        this.form.checktype=this.form.basic.type.split('');
        this.form.checkList=this.form.basic.freeWorkday.split('');
        this.getFixedworkday();
        this.getMappoint();
        this.getMustworkday();
        this.getNotworkday();
        }
      },
      //地图方法
      initMap() {
          //定义地图中心点坐标
          this.center = new TMap.LatLng(this.lat, this.lng)
          console.log(this.lat+'-'+this.lng+'-'+this.map);
          //定义map变量，调用 TMap.Map() 构造函数创建地图
          this.map = new TMap.Map(document.getElementById('container'), {
              center: this.center,//设置地图中心点坐标
              zoom: 13,   //设置地图缩放级别
              //pitch: 43.5,  //设置俯仰角
              //rotation: 45    //设置地图旋转角度
          });
          this.map.on("click",this.mapClick);
          this.circle = new TMap.MultiCircle({ 
            map:this.map,
            styles: { // 设置圆形样式
            'circle': new TMap.CircleStyle({
              'color': 'rgba(41,91,255,0.16)',
              'showBorder': true,
              'borderColor': 'rgba(41,91,255,1)',
              'borderWidth': 2,
            }),
            },
            geometries: [{
            id:1,
            styleId: 'circle',
            center: this.center, //圆形中心点坐标 
            radius: this.radius,	//半径（单位：米）
            }],
          });
          this.markerLayer = new TMap.MultiMarker({
            map: this.map,  //指定地图容器
            //样式定义
            styles: {
                //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
                myStyle: new TMap.MarkerStyle({ 
                    "width": 25,  // 点标记样式宽度（像素）
                    "height": 35, // 点标记样式高度（像素）
                    //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                    "anchor": { x: 16, y: 32 }  
                }) 
            },
            //点标记数据数组
            geometries: [{
                "id": "1",   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
                "styleId": 'myStyle',  //指定样式id
                "position": this.center,  //点标记坐标位置
                "properties": {//自定义属性
                    "title": "marker1"
                }}]
          });
        },
        loadScript() {
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://map.qq.com/api/gljs?v=1.exp&key=B3GBZ-M6EC6-3GES4-M2P2N-L6BY3-2IB6T&callback=init";
          script.onload = script.onreadystatechange = () => {
              if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                  this.initMap();
                  script.onload = script.onreadystatechange = null;
              }
          };
          document.body.appendChild(script);
          },
        mapClick(event) {
            this.lat=event.latLng.getLat();
            this.lng=event.latLng.getLng();
            let cen = new TMap.LatLng(event.latLng.getLat(), event.latLng.getLng());
            this.markerLayer.updateGeometries([{
                "styleId":'myStyle',
                "id": "1",
                "position": cen,
                }]);
            this.circle.updateGeometries([{
                id:1,
                styleId: 'circle',
                center: cen, //圆形中心点坐标 
                radius: Number(this.radius),	//半径（单位：米）
                }]);
        },
        input(value){
          let cen = new TMap.LatLng(this.lat,this.lng);
          this.circle.updateGeometries([{
                id:1,
                styleId: 'circle',
                center: cen, //圆形中心点坐标 
                radius: Number(value),	//半径（单位：米）
                }]);
        },
        getAddress(){         
          const opt = {
            // 高精确度： true / false
            enableHighAccuracy: true,
            // 等待响应的最长时间 单位：毫秒
            timeout: 10 * 1000,
            // 应用程序愿意接受的缓存位置的最大年限
            maximumAge: 0
          };
          let that=this;
          let showPosition = function ( position ) {
            that.lat = position.coords.latitude;
            that.lng = position.coords.longitude;
            console.log(position);
            that.loadScript();
          }
          let showErr = function (err) {
            console.log(err);
          }
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition,showErr, opt);
          } else {
            alert('Geolocation is not supported in your browser')
          }         
        },
        addAddress(){
          this.addMap.lat=this.lat;
          this.addMap.lng=this.lng;
          this.addMap.radius=this.radius;
          this.addMap.groupId = this.form.basic.id;
          this.form.map.push(this.addMap);
          this.dialogMap=false;
        },
        mapdelete(num){
          this.form.map.splice(num,1);
        },
        mapupdate(row){

        }
    },mounted() {
        this.init();
        
    }
  }
</script>
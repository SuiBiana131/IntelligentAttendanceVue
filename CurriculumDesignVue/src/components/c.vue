<template >
  <div >
    <el-row :gutter="20">
      <el-col :span="4"><el-button type="text" @click="">经度:{{this.lat.toFixed(6)}}</el-button></el-col>
      <el-col :span="4"><el-button type="text" @click="">纬度:{{this.lng.toFixed(6)}}</el-button></el-col>
      <el-col :span="12"><el-input v-model="radius" placeholder="请输入考勤范围" @input="input"><template slot="prepend">考勤范围:</template><template slot="append">米</template></el-input></el-col>
      <el-col :span="4"><el-button type="primary" @click="">查询</el-button></el-col>
    </el-row>    
    <div id="container"></div>
  </div>
</template>
 
<style scoped>
  #container{
    /*地图(容器)显示大小*/
    width:1200px;
    height:400px;
    margin-top:20px;
  }
</style>

<script>
export default {
  name: 'tencentmap',
  data () {
    return {
      options:{timeout: 10000},
      lat: 39.984120,
      lng: 116.307484,
      map:{},
      tmapCircle:{map:{},styles:{'circle':{}},geometries:[{styleId: 'circle',center: '',radius: 1500}]},
      tmapMarker:{map:{},styles:{"myStyle":{}},geometries:[{"id": "1","styleId": 'myStyle',"position":''}]},
      markerLayer:{},
      circle:{},
      center:'',
      radius:1500,
    }
  },
    methods: {
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
                radius: this.radius,	//半径（单位：米）
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
        test(){         
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
        }
    },
    mounted() {
        //this.loadScript();
        //this.getArdess();
        this.test();
    },
    created() {
    }
}
</script>

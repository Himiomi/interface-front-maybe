import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SensorValueDao} from "@interface-front/storage";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";
import {dataSeries} from "./dataSeries";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'interface-front-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartsComponent {
  public series: ApexAxisChartSeries=[];
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;
  public listSensorId:number[]=[]
  arrayOfValues: Array<number>=[];

  constructor(route:ActivatedRoute,sensorValueDao:SensorValueDao) {

    route.queryParams.subscribe( params => {
      console.log(params['listSensorId'])
      const myArray = route.snapshot.queryParamMap.get('myArray');

      // If the value is null, create a new array and store it
      // Else parse the JSON string we sent into an array
      if (myArray === null) {
        this.arrayOfValues = new Array<number>();
        this.listSensorId=this.arrayOfValues;
      } else {
        this.arrayOfValues = JSON.parse(myArray);
        this.listSensorId=this.arrayOfValues;
      }
      console.log(this.arrayOfValues)
        this.series = []

        for (const num of this.listSensorId) {
          this.series.push({name: "sensor " + num, data: sensorValueDao.returnArrayOfSensor(num)})
        }
      }
    )

    this.chart = {
      type: "line",
      height: 650,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom",
        tools:{
          download:true,
          selection:true,
          zoom:true,
          zoomin:true,
          zoomout:true,
          pan:true,
          reset:true
        },
        export:{
          csv:{
            filename:"data_in_csv"
          },
          svg:{
            filename:"data_in_svg"
          },
          png:{
            filename:"data_in_png"
          }
        }
      },
      animations:{
        enabled:true,
        easing:"linear",
        speed:2,

      },
      id:"super id"
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 1
    };
    this.title = {
      text: "Graphique des données",
      align: "left"
    };

    this.fill = {
    };

    this.yaxis = {
      labels: {
        formatter: function(val) {
          return (val).toFixed(0);
        },
      },
      title: {
        text: "relevé"
      },
      tooltip:{
        enabled:true
      }
    };
    this.xaxis = {
      type: "datetime"
    };
    this.tooltip = {
      shared: false,
      x:{
        formatter: function(val) {
          return new Date(val).toString() ;
        }
      },
      y: [
        {
          title: {
            formatter: function(val) {
              return val + " (mins)";
            }
          }
        },
        {
          title: {
            formatter: function(val) {
              return val + " per session";
            }
          }
        }
      ],
      marker: {
        show: true
      }
    };
  }
}

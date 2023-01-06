import { Component, OnInit , NgZone} from '@angular/core';
import *as am4core from "@amcharts/amcharts4/core";
import *as am4charts from "@amcharts/amcharts4/charts"; 
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FileServiceService } from 'src/app/services/File-Service/file-service.service';
import { ChartService } from 'src/app/services/Record-charts/chart.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-arm-charts-record',
  templateUrl: './arm-charts-record.component.html',
  styleUrls: ['./arm-charts-record.component.css']
})
export class ArmChartsRecordComponent implements OnInit {

  private chart!: am4charts.XYChart;
  private data: object[] =[];

  constructor( private zone:NgZone ,private fileService: FileServiceService, private charService:ChartService) { }

  ngOnInit(): void {
    // let data =this.fileService.getRecord('ppt')  ;
      
  
  }
  
   ngAfterViewInit(){
        this.zone.runOutsideAngular(()=>{
           let chart = am4core.create("line-chart", am4charts.XYChart);
           let title = chart.titles.create();
           
           title.text= "Material Uploads by Months-2022";
           
          //  chart.paddingRight=20;

            this.charService.getData().subscribe(
              data=> this.data=data
            );

           chart.data = this.data;

           let CategoryMonthAxis = chart.xAxes.push(new am4charts.CategoryAxis());
           CategoryMonthAxis.title.text= "Months";
           CategoryMonthAxis.dataFields.category = "month";

           let valueAxisY= chart.yAxes.push(new am4charts.ValueAxis());
           valueAxisY.title.text ="Uplods";
           valueAxisY.renderer.minWidth=20;


           let seriesNames=["PPTs" , "Videos"];

           for(let i=0; i<2; i++){
             let series = chart.series.push(new am4charts.LineSeries());
             series.dataFields.categoryX = "month";
             series.dataFields.valueY = seriesNames[i];
             series.name = seriesNames[i];

             let bullet = series.bullets.push(new am4charts.CircleBullet());
             bullet.circle.strokeWidth = 2;
             bullet.circle.radius = 4;
             bullet.tooltipText = "Month: {categoryX} \n Uploads: {valueY} {name}";
           }

           chart.legend = new am4charts.Legend();
           this.chart = chart;
        })
   }

   ngOnDestroy(){
       this.zone.runOutsideAngular(()=>{
         if(this.chart){
          this.chart.dispose();
         }
       })
   }

}

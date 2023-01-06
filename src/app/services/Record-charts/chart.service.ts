import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
      providedIn: 'root' 
})

export class ChartService{
   
     private months= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    private Data=   [
            { "month": "Aug" , "PPTs":20, "Videos":10},
            { "month": "Sep" , "PPTs":30, "Videos":15},
            { "month": "Oct" , "PPTs":10, "Videos":30},
            { "month": "Nov" , "PPTs":25, "Videos":29},
            { "month": "Dec" , "PPTs":22, "Videos":25},
           ];
    
 
     constructor(){}

     getData(): Observable<object[]> {
           return of(this.Data);
     }
}
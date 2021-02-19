import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getRandomInt(max: number){
    return Math.floor(Math.random() * Math.floor(max));
  }

  spin(){
    let result: Number;
    result = this.getRandomInt(6);
    console.log(result);
    return result;
  }

  mapResult(map: number){
    if(map == 0){
      console.log("Factory");
      return "Factory";
    }
    else if(map == 1){
      console.log("Customs");
      return "Customs";
    }
    else if(map == 2){
      console.log("Woods");
      return "Woods";
    }
    else if(map == 3){
      console.log("Interchange");
      return "Interchange";
    }
    else if(map == 4){
      console.log("Labs");
      return "Labs";
    }
    else if(map == 5){
      console.log("Reserve");
      return "Reserve";
    }
    else{
      console.log("error");
      return "error";
    }
  }

}

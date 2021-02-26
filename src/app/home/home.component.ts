import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myInterval = 100;

  answer: String | undefined;
  filepath: String | undefined;
  isShow = false;
  showTemp = true;
  showStopButton = false;

  constructor() { }

  ngOnInit(): void {
  }

  enableStopButton(){
    this.showStopButton = true;
  }

  disableTempImg(){
    this.showTemp = false;
  }

  toggleDisplay(){
    this.isShow = !this.isShow;
  }

  getRandomInt(max: number){
    return Math.floor(Math.random() * Math.floor(max));
  }

  spin(){
    let result: number;
    result = this.getRandomInt(7);
    this.answer = this.mapResult(result);
    console.log(this.answer);

    // Timeout to allow animation to play
    setTimeout(() => this.toggleDisplay(), 4500);
  }

  mapResult(map: number){
    if(map == 0){
      this.filepath = "assets/images/Factory-Day_Banner.png"
      console.log(this.filepath);
      return "Factory";
    }
    else if(map == 1){
      this.filepath = "assets/images/Customs_Banner.png"
      console.log(this.filepath);
      return "Customs";
    }
    else if(map == 2){
      this.filepath = "assets/images/Banner_woods.png"
      console.log(this.filepath);
      return "Woods";
    }
    else if(map == 3){
      this.filepath = "assets/images/Banner_interchange.png"
      console.log(this.filepath);
      return "Interchange";
    }
    else if(map == 4){
      this.filepath = "assets/images/TheLabBanner.png"
      console.log(this.filepath);
      return "Labs";
    }
    else if(map == 5){
      this.filepath = "assets/images/Reserve.png"
      console.log(this.filepath);
      return "Reserve";
    }
    else if(map == 6){
      this.filepath = "assets/images/Banner_shoreline.png"
      console.log(this.filepath);
      return "Shoreline";
    }
    else{
      console.log("error");
      return "error";
    }
  }

}

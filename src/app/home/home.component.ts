import { SplitInterpolation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  answer: String | undefined;
  filepath: String | undefined;
  isShow = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDisplay(){
    console.log("Yikes");
    this.isShow = !this.isShow;
  }

  getRandomInt(max: number){
    return Math.floor(Math.random() * Math.floor(max));
  }

  spin(){
    let result: number;
    result = this.getRandomInt(6);
    console.log(result);
    console.log(this.mapResult(result));
    this.answer = this.mapResult(result);
    console.log(this.answer);
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
    else{
      console.log("error");
      return "error";
    }
  }

}

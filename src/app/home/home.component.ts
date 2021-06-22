import { AuthService } from './../auth.service';
import { TokenStorageService } from './../token-storage.service';

import { Component, OnInit, NgModule, enableProdMode } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myInterval = 100;

  result: any;

  currentUser: any;
  username: any;
  favArray: any[] = [];

  answer: String | undefined;
  filepath: String | undefined;
  isShow = false;
  showTemp = true;
  showStopButton = false;

  constructor(private token:TokenStorageService, private auth: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.username = this.currentUser.username;
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
    //let result: number;
    let randoSelection = 7;
    let mapSelection: string;
    let randoResult: number;
    let mapArray = ["Factory", "Woods", "Customs", "Interchange", "Reserve", "Shoreline", "Labs"];

    if(this.token.getToken() != null){
      this.auth.getInfo(this.username).subscribe(data => {
        randoSelection += data.favorites.length * 2;
        for (var i = 0; i < data.favorites.length; i++){
          mapArray.push(data.favorites[i]);
          mapArray.push(data.favorites[i]);
        }
      })
    }

    randoResult = this.getRandomInt(randoSelection) - 1;
    mapSelection = mapArray[randoResult];
    if(mapSelection == "Factory"){
      this.result = 0;
    }
    if(mapSelection == "Woods"){
      this.result = 2;
    }
    if(mapSelection == "Customs"){
      this.result = 1;
    }
    if(mapSelection == "Interchange"){
      this.result = 3;
    }
    if(mapSelection == "Reserve"){
      this.result = 5;
    }
    if(mapSelection == "Shoreline"){
      this.result = 6;
    }
    if(mapSelection == "Labs"){
      this.result = 4;
    }

    console.log(this.result);
    this.answer = this.mapResult(this.result);
    console.log(this.answer);
    if(this.token.getToken() != null){
      this.auth.updateSpins(this.username).subscribe();
    }

    // Timeout to allow animation to play
    setTimeout(() => this.toggleDisplay(), 4400);
  }

  mapResult(map: number){
    if(map == 0){
      this.filepath = "assets/images/Factory-Day_Banner.png"
      console.log(this.filepath);
      if(this.token.getToken != null){
        this.auth.updateFactory(this.username).subscribe();
      }
      return "Factory";
    }
    else if(map == 1){
      this.filepath = "assets/images/Customs_Banner.png"
      console.log(this.filepath);
      if(this.token.getToken() != null){
        this.auth.updateCustoms(this.username).subscribe();
      }
      return "Customs";
    }
    else if(map == 2){
      this.filepath = "assets/images/Banner_woods.png"
      console.log(this.filepath);
      if(this.token.getToken() != null){
        this.auth.updateWoods(this.username).subscribe();
      }
      return "Woods";
    }
    else if(map == 3){
      this.filepath = "assets/images/Banner_interchange.png"
      console.log(this.filepath);
      if(this.token.getToken() != null){
        this.auth.updateInterchange(this.username).subscribe();
      }
      return "Interchange";
    }
    else if(map == 4){
      this.filepath = "assets/images/TheLabBanner.png"
      console.log(this.filepath);
      if(this.token.getToken() != null) {
        this.auth.updateLab(this.username).subscribe();
      }
      return "Labs";
    }
    else if(map == 5){
      this.filepath = "assets/images/Reserve.png"
      console.log(this.filepath);
      if(this.token.getToken() != null){
        this.auth.updateReserve(this.username).subscribe();
      }
      return "Reserve";
    }
    else if(map == 6){
      this.filepath = "assets/images/Banner_shoreline.png"
      console.log(this.filepath);
      if(this.token.getToken() != null){
        this.auth.updateShoreline(this.username).subscribe();
      }
      return "Shoreline";
    }
    else{
      console.log("error");
      return "error";
    }
  }

  addFactory(){
    
    alert("Factory was added to your favorites!");
    this.auth.addFavorite(this.username, "Factory").subscribe();
  }

  addWoods(){
    alert("Woods was added to your favorites!");
    this.auth.addFavorite(this.username, "Woods").subscribe();
  }

  addCustoms(){
    alert("Customs was added to your favorites!");
    this.auth.addFavorite(this.username, "Customs").subscribe();
  }

  addInterchange(){
    alert("Interchange was added to your favorites!");
    this.auth.addFavorite(this.username, "Interchange").subscribe();
  }

  addReserve(){
    alert("Reserve was added to your favorites!");
    this.auth.addFavorite(this.username, "Reserve").subscribe();
  }

  addShoreline(){
    alert("Shoreline was added to your favorites!");
    this.auth.addFavorite(this.username, "Shoreline").subscribe();
  }

  addLabs(){
    alert("Labs was added to your favorites!");
    this.auth.addFavorite(this.username, "Labs").subscribe();
  }

}

import { TokenStorageService } from './../token-storage.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  hasNoFavorites = true;
  showFactory = false;
  showWoods = false;
  showCustoms = false;
  showInterchange = false;
  showReserve = false;
  showShoreline = false;
  showLab = false;

  currentUser: any;
  username: any;

  constructor(private auth: AuthService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.username = this.currentUser.username;
    console.log(this.username);
    this.auth.getInfo(this.username).subscribe(data => {
      this.hasNoFavorites = false;
      for(var i = 0; i < data.favorites.length; i++){
        if(data.favorites[i] == "Factory"){
          this.showFactory = true;
        }
        if(data.favorites[i] == "Woods"){
         this.showWoods = true;
        }
        if(data.favorites[i] == "Customs"){
         this.showCustoms = true;
        }
        if(data.favorites[i] == "Interchange"){
         this.showInterchange = true;
        }
        if(data.favorites[i] == "Reserve"){
         this.showReserve = true;
        }
        if(data.favorites[i] == "Shoreline"){
         this.showShoreline = true;
        }
        if(data.favorites[i] == "Labs"){
         this.showLab = true;
        }
      }
    })
  }

  removeFactory(){
    this.showFactory = false;
    this.auth.removeFavorite(this.username, "Factory").subscribe();
  }

  removeWoods(){
    this.showWoods = false;
    this.auth.removeFavorite(this.username, "Woods").subscribe();
  }

  removeCustoms(){
    this.showCustoms = false;
    this.auth.removeFavorite(this.username, "Customs").subscribe();
  }

  removeInterchange(){
    this.showInterchange = false;
    this.auth.removeFavorite(this.username, "Interchange").subscribe();
  }

  removeReserve(){
    this.showReserve = false;
    this.auth.removeFavorite(this.username, "Reserve").subscribe();
  }

  removeShoreline(){
    this.showShoreline = false;
    this.auth.removeFavorite(this.username, "Shoreline").subscribe();
  }

  removeLabs(){
    this.showLab = false;
    this.auth.removeFavorite(this.username, "Lab").subscribe();
  }

}

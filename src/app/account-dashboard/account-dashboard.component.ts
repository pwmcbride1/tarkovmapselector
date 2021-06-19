import { AuthService } from './../auth.service';
import { TokenStorageService } from './../token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss']
})
export class AccountDashboardComponent implements OnInit {

  currentUser: any;

  Username: any;
  Email = "Currently Unavailable";
  showUsernameUpdate = false;
  showEmailUpdate = false;
  nUsername: any;
  nEmail: any;

  numberOfSpins: any;
  numberOfFactory: any;
  numberOfWoods: any;
  numberOfCustoms: any;
  numberOfInterchange: any;
  numberOfReserve: any;
  numberOfShoreline: any;
  numberOfLab: any;


  //booleans for showing the map array is to store response from backend
  showFactory = false;
  showCustoms = false;
  showWoods = false;
  showReserve = false;
  showShoreline = false;
  showInterchange = false;
  showLabs = false;


  constructor(private token: TokenStorageService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    if(this.token.getToken() != null){
    this.currentUser = this.token.getUser();
    this.Username = this.currentUser.username;
    this.auth.getInfo(this.Username).subscribe(data=> {
      this.Email = data.email,
      this.numberOfSpins = data.numOfSpins;
      this.numberOfFactory = data.numOfFactory;
      this.numberOfWoods = data.numOfWoods;
      this.numberOfCustoms = data.numOfCustoms;
      this.numberOfInterchange = data.numOfInterchange;
      this.numberOfReserve = data.numOfReserve;
      this.numberOfShoreline = data.numOfShoreline;
      this.numberOfLab = data.numOfLab;
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
          this.showLabs = true;
         }
      }
    });
  }
  }

  toggleUsernameEdit(){
    this.showUsernameUpdate = !this.showUsernameUpdate;
  }

  toggleEmailEdit(){
    this.showEmailUpdate = !this.showEmailUpdate;
  }

  submitUpdateUsername(event: any){
    const target = event.target;
    const updateusername = target.querySelector('#nUsername').value;
    this.auth.updateUsername(this.Username, updateusername).subscribe(data => {
      if(data.message == "Username Updates Successfully")
      alert(data.message + '. ' + 'Please Log back in');
    });
    this.token.signOut()
    this.router.navigate(['/login']).then(() => window.location.reload());
  }

  submitUpdateEmail(event: any){
    const target = event.target;
    const updateemail = target.querySelector('#nEmail').value;
    this.auth.updateEmail(this.Username, updateemail).subscribe();
    alert("Email successfully changed");
    window.location.reload();
  }

  removeFactory(){
    this.showFactory = false;
    this.auth.removeFavorite(this.Username, "Factory").subscribe();
  }

  removeWoods(){
    this.showWoods = false;
    this.auth.removeFavorite(this.Username, "Woods").subscribe();
  }

  removeCustoms(){
    this.showCustoms = false;
    this.auth.removeFavorite(this.Username, "Customs").subscribe();
  }

  removeInterchange(){
    this.showInterchange = false;
    this.auth.removeFavorite(this.Username, "Interchange").subscribe();
  }

  removeReserve(){
    this.showReserve = false;
    this.auth.removeFavorite(this.Username, "Reserve").subscribe();
  }

  removeShoreline(){
    this.showShoreline = false;
    this.auth.removeFavorite(this.Username, "Shoreline").subscribe();
  }

  removeLabs(){
    this.showLabs = false;
    this.auth.removeFavorite(this.Username, "Lab").subscribe();
  }


}

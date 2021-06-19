import { Router } from '@angular/router';
import { TokenStorageService } from './../token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  username?: string;

  isLoggedIn = false;

  constructor(private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if(this.isLoggedIn){
      const user = this.token.getUser()
      this.username = user.username;
    }
  }

  logout(): void {
    this.token.signOut();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    })
    //window.location.reload();
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { MyServiceService } from "../../shared/my-service.service";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  uid = "";
  userData = {
    blockName: "",
    email: "",
    fullName: "",
    loginId: "",
    mobile: "",
    password: "",
    schoolName: "",
    talukaName: "",
    udise: "",
    uid: "",
  };
  save: boolean = true;
  constructor(
    private router: Router,
    public auth: AngularFireAuth,
    private service : MyServiceService
  ) {}

  ngOnInit() {
       this.auth.user.subscribe((user) => {
         this.uid = user.uid;
         this.service.getProfile(this.uid).subscribe((res) => {
           this.userData = res;
         });
       });
  }

  toggleSave() {
    this.save = !this.save
  }
}

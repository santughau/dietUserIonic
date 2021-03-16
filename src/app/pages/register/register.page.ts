import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { MyServiceService } from "../../shared/my-service.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController } from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  registerData = {
    fullName: "",
    mobile: "",
    email: "",
    tal: "",
    block: "",
    school: "",
    password: "",
    uid: "",
  };
  taluka = [];
  blocks = [];
  talukaId = "";
  blockId = "";
  schoolList = [];
  constructor(
    private service: MyServiceService,
    public loadingController: LoadingController,
    public auth: AngularFireAuth,
    public alertController: AlertController,
    private router: Router,
    private network: Network
  ) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log("network was disconnected :-(");
      this.presentAlertConfirm();
    });
    disconnectSubscription.unsubscribe();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "इंटरनेट बंद ",
      message: "कृपया  आपले इंटरनेट चालू  करावे ",
      mode: "ios",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "अँप बंद करा ",
          handler: () => {
            console.log("Confirm Okay");
            navigator["app"].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
    this.presentLoading().then(() => {
      this.service.getAllTaluka().subscribe((res) => {
        this.taluka = res;
        this.loadingController.dismiss();
      });
    });
  }

  async presentAlert(title, message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: title,
      message: message,
      buttons: ["OK"],
      mode: "ios",
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
  }

  OnTalukaChange(event) {
    this.blocks = [];
    this.talukaId = event.target.value;

    this.presentLoading().then(() => {
      this.service.getBlock(this.talukaId).subscribe((data) => {
        this.blocks = data;
        this.loadingController.dismiss();
      });
    });
  }

  OnBlockChange(ev) {
    this.blockId = ev.target.value;
    this.presentLoading().then(() => {
      this.service.getSchoolList(this.blockId).subscribe((data) => {
        this.schoolList = data;
        this.loadingController.dismiss();
      });
    });
  }
  goToLogin() {
    this.router.navigate(["/login"]);
  }

  saveTeacher(registration): void {
    const data = {
      email: this.registerData.email,
      password: this.registerData.password,
    };

    this.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        this.registerData.uid = user.user.uid;
        this.service.saveLogin(this.registerData).subscribe((res) => {
          this.router.navigate(["/home"]);
        });
      })
      .catch((err) => {
        var msg = "";
        if (err.code == "auth/email-already-in-use") {
          msg =
            "कृपया हा ई-मेल अगोदर वापरलेला  आहे , नवीन ई-मेल वापरा  किंवा पासवर्ड  रीसेट करण्याकरिता ८४२१३३३४१७ या मोबाईल क्रमांक वर फोन करा  . ";
        } else if (err.code == "auth/weak-password") {
          msg =
            "आपला पासवर्ड चांगला लिहा . कॅपिटल , स्मॉल  लेटर्स व अंक  यांचा  वापर करा . ";
        }
        this.presentAlert("Alert", msg);
      });
  }
}

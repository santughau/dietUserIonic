import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  slideOpts = {
    speed: 400,
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };
  constructor(
    public alertController: AlertController,
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

  ngOnInit() {}
}

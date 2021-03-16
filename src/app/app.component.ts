import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  OnDestroy,
} from "@angular/core";
import { Platform, IonRouterOutlet, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { MyServiceService } from "./shared/my-service.service";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  public selectedIndex = 0;
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home",
    },

    {
      title: "Notices",
      url: "/notices",
      icon: "create",
    },
    {
      title: "Download",
      url: "/download",
      icon: "download",
    },

    {
      title: "Videos",
      url: "/video",
      icon: "videocam",
    },
    {
      title: "Profile",
      url: "/profile",
      icon: "person",
    },

    {
      title: "Contact Us",
      url: "/contact-us",
      icon: "mail",
    },
  ];
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
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public auth: AngularFireAuth,
    public service: MyServiceService,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.backButtonEvent();
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    this.backButtonSubscription = this.platform.backButton.subscribe(
      async () => {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (outlet && outlet.canGoBack()) {
            outlet.pop();
          } else if (this.router.url === "/home") {
            this.presentAlertConfirm();
          }
        });
      }
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Confirm to Exit App !!!",
      mode:"ios",
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
          text: "Exit",
          handler: () => {
            console.log("Confirm Okay");
            navigator["app"].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.uid = user.uid;
      this.service.getProfile(this.uid).subscribe((res) => {
        this.userData = res;
    
        
      });
    });
  }
}

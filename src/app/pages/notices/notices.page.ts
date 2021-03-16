import { Component, OnInit } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { MyServiceService } from "src/app/shared/my-service.service";

@Component({
  selector: "app-notices",
  templateUrl: "./notices.page.html",
  styleUrls: ["./notices.page.scss"],
})
export class NoticesPage implements OnInit {
  data = [];
  pageno = 1;
  pagesize = 10;
  term;
  constructor(
    public service: MyServiceService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getData(null);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "All Download Completed ",
      duration: 2000,
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
  }

  getData(ev) {
    if (ev == null) {
      this.pageno = 1;
      this.pagesize = 10;
      this.presentLoading().then(() => {
        this.service
          .getAllNotices(this.pageno, this.pagesize)
          .subscribe((data) => {
            this.data = data.document.records;
            this.loadingController.dismiss();
          });
      });
    } else {
      this.pageno++;
      this.presentLoading().then(() => {
        this.service
          .getAllNotices(this.pageno, this.pagesize)
          .subscribe((data) => {
            
            
            this.data = this.data.concat(data.document.records);
            this.loadingController.dismiss();
            if (data.document.records.length <= 10) {
              ev.target.disabled = true;
              this.presentToast();
            }
          });
        ev.target.complete();
      });
    }
  }
  

  viewDetails(id) {
     this._router.navigate(["/notice-details", id]);
  }
}

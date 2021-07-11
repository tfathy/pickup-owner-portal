import { SelectionModel } from '@angular/cdk/collections';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { BuildingTypeModel } from './building-type.model';
import { BuildingTypeService } from './building-type.service';
import { BuildingTypeComponent } from './components/building-type/building-type.component';

const ELEMENT_DATA: BuildingTypeModel[] = [];

@Component({
  selector: 'app-building-type',
  templateUrl: './building-type.page.html',
  styleUrls: ['./building-type.page.scss'],
})
export class BuildingTypePage implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  empName: string;
  authToken: authToken;
  displayedColumns: string[] = ['id', 'descEn', 'descAr', 'activeFlag', 'edit'];
  dataSource = new MatTableDataSource<BuildingTypeModel>(ELEMENT_DATA);
  selection = new SelectionModel<BuildingTypeModel>(false, []);
  constructor(
    private modalCtrl: ModalController,
    private service: BuildingTypeService,
    private loadingCtrl: LoadingController,
    private toast: ToastController

  ) {}

  async ngOnInit() {
    this.loadingCtrl
      .create({
        message: 'featching data',
      })
      .then(async (loadingElmnt) => {
        loadingElmnt.present();
        this.authToken = await readStorage('authData');
        this.empName = this.authToken.fullnameEn;
        this.service.findAll('Bearer ' + this.authToken.token).subscribe((data) => {
          console.log(data);
          this.dataSource.data = data;
          loadingElmnt.dismiss();
        },error=>{
          loadingElmnt.dismiss();
          console.log(error);
        });
      });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
  editRow(body: BuildingTypeModel) {
    this.modalCtrl.create({
      component: BuildingTypeComponent,
      componentProps:{model: body,recordStatus: 'update'},
      cssClass: 'modal-class'
    }).then(modalElement=>{
      modalElement.present();
      modalElement.onDidDismiss().then(dismissedData=>{
        if(dismissedData.data.saved){
          this.showToast('Transaction Saved');
          this.doRefresh();
        }
      });
    });
  }
  async doRefresh() {
    this.authToken = await readStorage('authData');
    this.service.findAll('Bearer ' + this.authToken.token).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data as BuildingTypeModel[];
    });
  }
  create(){
    const body = new BuildingTypeModel();
    body.activeFlag = 'Y';
    this.modalCtrl.create({
      component: BuildingTypeComponent,
      componentProps:{model: body,recordStatus: 'insert'},
      cssClass: 'modal-class'
    }).then(modalElement=>{
      modalElement.present();
      modalElement.onDidDismiss().then(dismissedData=>{
        if(dismissedData.data.saved){
          this.showToast('Transaction Saved');
          this.doRefresh();
        }
      });
    });
  }

  public  showToast(msg: string) {
    this.toast
      .create({
        message: msg,
        position: 'middle',
        duration: 1000,
      })
      .then((toastCtrl) => {
        toastCtrl.present();
      });
  }
}

import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingController, ModalController } from '@ionic/angular';
import { authResponse, readStorage } from 'src/app/shared/shared-util';
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
  authToken: authResponse;
  displayedColumns: string[] = ['id', 'descEn', 'descAr', 'activeFlag', 'edit'];
  dataSource = new MatTableDataSource<BuildingTypeModel>(ELEMENT_DATA);
  selection = new SelectionModel<BuildingTypeModel>(false, []);
  constructor(
    private modalCtrl: ModalController,
    private service: BuildingTypeService,
    private loadingCtrl: LoadingController
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
  editRow(model) {}
  async doRefresh(event) {
    this.authToken = await readStorage('authData');
    this.service.findAll('Bearer ' + this.authToken.token).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data as BuildingTypeModel[];
      event.target.complete();
    });
  }
  create(){
    this.modalCtrl.create({
      component: BuildingTypeComponent,
      componentProps:{}
    }).then(mdalElmnt=>{
      mdalElmnt.present();
    });
  }
}

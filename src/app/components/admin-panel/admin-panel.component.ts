import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Municipality, RestaurantRequestModel } from 'src/app/models/restaurant-model';
import {AdminPanelService} from '../../services/admin-panel.service'

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  restaurants: any;

  updateRestaurant :any;

  restaurantId: string;

  isEditMode: boolean = false;

  modalRef: BsModalRef;

  municipalityList = [Municipality.karpos, Municipality.centar, Municipality.aerodrom, Municipality.kiselaVoda];



  requestForm = new FormGroup({

        name: new FormControl('', Validators.required),

        address: new FormControl(''),

        municipality: new FormControl('')
    })



    filterForm = new FormGroup({
        
      name: new FormControl(''),
      address: new FormControl(''),
    })

    

    municipalityFilterForm = new FormGroup({
      municipality: new FormControl('')
    })

  

  constructor(private adminService: AdminPanelService, 
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllRestaurants()
  }

  addRestaurant(){
    
    let requestModel = new RestaurantRequestModel();

    requestModel.name = this.requestForm.value.name
    requestModel.address = this.requestForm.value.address
    requestModel.municipality = parseInt(this.requestForm.value.municipality)

    console.log(requestModel)

    this.adminService.addRestaurant(requestModel).subscribe({
      error: err=> console.warn(err.error),
      complete: ()=> {
        this.closeModal()
        this.getAllRestaurants()
      }
    })


  }

  getAllRestaurants(){

    let filter = {
      name: this.filterForm.value.name,
      address: this.filterForm.value.address,
      municipality: this.municipalityFilterForm.value.municipality
    }

   

    this.adminService.getAllRestaurants(filter).subscribe({
      next: res => {
        this.restaurants = res
        console.log(this.restaurants)
      }

    })
  }

  deleteRestaurant(id: string){
    this.adminService.deleteRestaurant(id).subscribe({
      error: err => console.warn(err.message),
      complete: () => this.getAllRestaurants()
    })
  }

  updateRetaurant(){
    let body = Object.assign(this.requestForm.value, {id : this.restaurantId})
    body.municipality = parseInt(body.municipality)
    console.log(body)

    this.adminService.updateRestaurant(body).subscribe({
      error: err => console.warn(err.message), 
      complete: () => {
        this.getAllRestaurants()
        this.closeModal()
      }
    })

  }


  openModal(template: TemplateRef<any>, restaurant?:any) {

    console.log(restaurant)
    this.modalRef = this.modalService.show(template);
    
    if(!restaurant){
      this.requestForm.get("municipality").setValue(Municipality.aerodrom)
    }

    if(!!restaurant){
      this.updateRestaurant = restaurant;
      this.isEditMode = true;
      const {id, menu, ...rest} = restaurant;
      this.restaurantId = id;

      this.requestForm.setValue(rest);

    }

  }

  closeModal(){

    this.modalService.hide()
    this.modalService._hideBackdrop()
    this.requestForm.reset()
    this.isEditMode = false;
    
  }

}

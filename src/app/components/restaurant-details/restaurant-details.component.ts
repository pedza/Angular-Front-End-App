import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MealType } from 'src/app/models/restaurant-model';
import { AdminPanelService } from 'src/app/services/admin-panel.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  menuItems: any;

  restaurantMenuItem: any;

  menuItemId: string;
 
  isEditMode: boolean = false;

  modalRef: BsModalRef;

  restaurantId: string;

 

  filterForm = new FormGroup({
    name: new FormControl('')
  })

  menuItemForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    calories: new FormControl(''),
    isVege: new FormControl(''),
    mealType: new FormControl('')
  })

  mealTypesList = [MealType.Starters, MealType.Salads, MealType.MainDish, MealType.Deserts, MealType.Drinks];

  constructor(private activatedRoute: ActivatedRoute, 
            private adminService: AdminPanelService, 
            private modalService: BsModalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.restaurantId = params.id
    })
    this.getRestaurantMenu();
  }

  addMenuItem(){
    let requestModel: any = {
      id: this.restaurantId,
      menuItem: {
        name: this.menuItemForm.value.name,
        price: this.menuItemForm.value.price,
        calories: this.menuItemForm.value.calories,
        isVege: Boolean(this.menuItemForm.value.isVege),
        mealType: parseInt(this.menuItemForm.value.mealType) 
      }
    }

    if(this.isEditMode){
      requestModel.menuItem.id = this.menuItemId
    }

    this.adminService.updateRestaurantMenu(requestModel).subscribe({
      error: err => console.warn(err.error),
      complete: () => {
        this.closeModal();
        this.getRestaurantMenu();
      }
    })
  }

  getRestaurantMenu(){
    let name = this.filterForm.value.name
    

    this.adminService.getRestaurantMenu(this.restaurantId, name).subscribe({
        next: res => this.restaurantMenuItem = res,
        error: err => console.warn(err.error),
        
    })
    
  }

  

  deleteMenuItem(menuItemId:string){
    this.adminService.deleteMenuItem(this.restaurantId, menuItemId).subscribe({
      error:err => console.warn(err.error),
      complete: () => this.getRestaurantMenu()
    })
      this.getRestaurantMenu();
  }

  openModal(template: TemplateRef<any>, menuItem?: any){
    this.modalRef = this.modalService.show(template);
    //add
    if(!menuItem){
      console.log("menuItem false")
      this.menuItemForm.get("mealType").setValue(MealType.Starters)
    }

    //edit
    if(!!menuItem){
      
      this.isEditMode = true;
      const {id, ...rest} = menuItem;
      console.log(rest)
      this.menuItemForm.setValue(rest)
      console.log(this.menuItemForm)
      this.menuItemId = id;
    }
  }

  closeModal(){

    this.modalService.hide()
    this.modalService._hideBackdrop()
    this.menuItemForm.reset()
    this.isEditMode = false;
    
  }

}

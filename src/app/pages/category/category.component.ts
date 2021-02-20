import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/_services/global.service';
import { ResponseStructure } from 'src/app/_models/respose';
import Swal from 'sweetalert2';
import { CatStatesService } from 'src/app/_services/cat-states.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  categories = [];
  subCategories: any[] = [];
  topics = [];
  subCategoryForm: FormGroup;
  IsHidden = true;
  catName: any;
  catSlug: any;
  constructor(
    private _category: CatStatesService,
    private _global: GlobalService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.initAddSubcategory();
  }

  manage() {
    var x = document.getElementById('manage').innerText;
    console.log(x);
    if (x === 'Manage') {
      document.getElementById('manage').innerText = 'Back';
    } else {
      document.getElementById('manage').innerText = 'Manage';
    }

    this.IsHidden = !this.IsHidden;
  }

  initAddSubcategory() {
    this.subCategoryForm = this.fb.group({
      name: ['', Validators.required],
      coins: ['', Validators.required],
    });
  }

  add() {
    (async () => {
      const { value: text } = await Swal.fire({
        title: 'Add a category',
        input: 'text',
        inputPlaceholder: 'Enter Category Name',
        showCloseButton: true,
        confirmButtonText: 'Add',
        allowOutsideClick: false,
        inputValidator: (value: any) => {
          if (value === '') {
            return 'Oops.. Please enter a category name.';
          }
        },
      });
      if (text) {
        const payload = { name: text };
        this.sub.add(
          this._category.createCategory(payload).subscribe({
            next: (res: ResponseStructure) => {
              console.log(res);
              this.categories.push(res.responseResult);
              this._global.globalSuccessHandler(res);
            },
          })
        );
      }
    })();
  }

  getAllCategories() {
    this._global.showSpinner();
    this.sub.add(
      this._category.getAllCategories().subscribe({
        next: (res) => {
          console.log(res);
          const categories = res['responseResult'];
          this.categories = categories;
          this._global.hideSpinner();
        },
      })
    );
  }

  getAllSubCategories(slug, catName) {
    this._global.showSpinner();
    this.sub.add(
      this._category.getAllSubCategories(slug).subscribe({
        next: (res: ResponseStructure) => {
          this._global.hideSpinner();
          this.catName = catName;
          this.subCategories = res.responseResult;
          this.catSlug = slug;

          console.log(res);
          console.log(this.subCategories);
        },
      })
    );
  }

  addSubCategory() {
    const payload = this.subCategoryForm.value;
    console.log(payload);
    this.sub.add(
      this._category.createSubCategory(payload, this.catSlug).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this.subCategories.push(res.responseResult);
          this._global.globalSuccessHandler(res);
        },
      })
    );
  }

  deleteCategory(slug) {
    this._global.showSpinner();
    this.sub.add(
      this._category.deleteCategory(slug).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this._global.globalSuccessHandler(res);
        },
      })
    );
  }
  deleteSubCategory(slug) {
    this._global.showSpinner();
    this.sub.add(
      this._category.deleteSubCategory(slug).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this._global.globalSuccessHandler(res);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

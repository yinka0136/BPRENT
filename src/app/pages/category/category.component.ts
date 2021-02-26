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
  subCategoryEditForm: FormGroup;
  IsHidden = true;
  selectedSubCategory: { slug: any; index: any };
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
    this.initEditSubcategory();
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
  initEditSubcategory() {
    this.subCategoryEditForm = this.fb.group({
      name: [''],
      coins: [''],
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
  edit(slug, i) {
    (async () => {
      const { value: text } = await Swal.fire({
        title: 'Edit category',
        input: 'text',
        inputPlaceholder: 'Enter Category Name',
        showCloseButton: true,
        confirmButtonText: 'Update',
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
          this._category.updateCategory(payload, slug).subscribe({
            next: (res: ResponseStructure) => {
              console.log(res);
              this.categories[i] = res['responseResult'];
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
  setSubCategory(slug, index) {
    this.selectedSubCategory = { slug: slug, index: index };
  }
  editSubCategory() {
    const payload = this.subCategoryEditForm.value;
    console.log(payload);
    this.sub.add(
      this._category
        .updateSubCategory(payload, this.selectedSubCategory.slug)
        .subscribe({
          next: (res: ResponseStructure) => {
            console.log(res);
            this.subCategories[this.selectedSubCategory.index] =
              res['responseResult'];
            this._global.globalSuccessHandler(res);
          },
        })
    );
  }

  deleteCategory(slug) {
    console.log(slug);
    this._global.showSpinner();
    this.sub.add(
      this._category.deleteCategory(slug).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this._global.globalSuccessHandler(res);
          this.categories = this.categories.filter((c) => c.slug !== slug);
        },
      })
    );
  }
  deleteSubCategory(slug) {
    console.log(slug);
    this._global.showSpinner();
    this.sub.add(
      this._category.deleteSubCategory(slug).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this._global.globalSuccessHandler(res);
          this.subCategories = this.subCategories.filter(
            (s) => s.slug !== slug
          );
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

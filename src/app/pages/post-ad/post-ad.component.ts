import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/_services/global.service';
import { AdServiceService } from 'src/app/_services/ad-service.service';
import { ActivatedRoute } from '@angular/router';
import { CatStatesService } from 'src/app/_services/cat-states.service';
import { ResponseStructure } from 'src/app/_models/respose';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.scss'],
})
export class PostAdComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  adForm: FormGroup;
  images: any[] = [];
  image: any;
  categories: any[] = [];
  subCategories: any[] = [];
  states: any[] = [];
  subCategory;
  regions: any[] = [];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '12rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private _global: GlobalService,
    private _adService: AdServiceService,
    private route: ActivatedRoute,
    private _catService: CatStatesService
  ) {}

  ngOnInit(): void {
    this.initAdForm();
    console.log(this.adForm.value);
    this.route.data.subscribe((res) => {
      this.categories = res['resolvedData'].categories['responseResult'];
      this.states = res['resolvedData'].states['responseResult'];
      console.log(res);
    });
  }
  initAdForm() {
    this.adForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      regionId: [''],
      dailyPrice: ['', Validators.required],
      weeklyPrice: ['', Validators.required],
      boosted: [false],
      negotiable: [false],
      numberOfDays: [0],
    });
  }

  async boostAd() {
    const { value: noOfDays } = await Swal.fire({
      title: 'Boost Ad?',
      input: 'number',
      inputPlaceholder: 'No of days',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to specify the number of days!';
        }
      },
      text: 'this will cost you ' + this.subCategory.coins + ' coins per day',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#2196F3',
      cancelButtonColor: '#D32F2F',
      confirmButtonText: 'Boost!',
    });
    if (noOfDays) {
      this.adForm.get('boosted').patchValue(true);
      this.adForm.get('numberOfDays').patchValue(noOfDays);
      Swal.fire('Boosted!', 'Your ad has been boosted.', 'success');
    }
  }
  unboostAd() {
    Swal.fire({
      title: 'Unboost Ad?',
      text: 'This ad will be unboosted',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2196F3',
      cancelButtonColor: '#D32F2F',
      confirmButtonText: 'Unboost!',
    }).then((result) => {
      if (result.value) {
        this.adForm.get('boosted').patchValue(false);

        Swal.fire('Unboosted!', 'Your ad has been Un boosted.', 'success');
      }
    });
  }

  addFile(images) {
    console.log(images);
    this.images.push(images[0]);
  }
  removeImage(image) {
    this.images = this.images.filter((i) => i != image);
  }
  postAd() {
    this._global.showSpinner();
    const payload = this.adForm.value;
    const adJson = JSON.stringify(payload);
    const formData = new FormData();
    this.images.forEach((i) => {
      formData.append('images', i);
    });
    formData.append('adJson', adJson);

    this.sub.add(
      this._adService.createAd(formData).subscribe({
        next: (res: ResponseStructure) => {
          this.adForm.reset();
          this._global.hideSpinner();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          this.adForm.reset();
          Toast.fire({
            icon: 'success',
            title: 'Ad posted successfully',
          });
        },
      })
    );
  }

  getAllSubCategories(slug) {
    this.sub.add(
      this._catService.getAllSubCategories(slug).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this.subCategories = res.responseResult;
        },
      })
    );
  }
  getSubcategory(id) {
    console.log(id)
    const subCategory = this.subCategories.find((s) => s.id == id);
    this.subCategory = subCategory;
  }
  getRegions(code) {
    this.sub.add(
      this._catService.fetchAllRegions(code).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this.regions = res.responseResult;
        },
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { GlobalService } from 'src/app/_services/global.service';
import { AdServiceService } from 'src/app/_services/ad-service.service';
import { ActivatedRoute } from '@angular/router';
import { CatStatesService } from 'src/app/_services/cat-states.service';
import Swal from 'sweetalert2';
import { ResponseStructure } from 'src/app/_models/respose';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss'],
})
export class EditAdComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  adForm: FormGroup;
  images: any[] = [];
  ad;
  image: any;
  categories: any[] = [];
  subCategories: any[] = [];
  states: any[] = [];
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
    this.route.data.subscribe((res) => {
      console.log(res);
      this.categories = res['resolvedData'].categories['responseResult'];
      this.states = res['resolvedData'].states['responseResult'];
      this.ad = res['resolvedData'].ad['responseResult'].ad;
    });
    this.initAdForm();
  }
  initAdForm() {
    this.adForm = this.fb.group({
      title: [this.ad.title, Validators.required],
      description: [this.ad.description, Validators.required],
      subCategoryId: ['', Validators.required],
      regionId: [''],
      price: [this.ad.price, Validators.required],
      boosted: [this.ad.boosted],
      negotiable: [this.ad.negotiable],
    });
  }

  boostAd() {
    Swal.fire({
      title: 'Boost Ad?',
      text: 'this will cost you',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2196F3',
      cancelButtonColor: '#D32F2F',
      confirmButtonText: 'Boost!',
    }).then((result) => {
      if (result.value) {
        this.adForm.get('boosted').patchValue(true);
        Swal.fire('Boosted!', 'Your ad has been boosted.', 'success');
      }
    });
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

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
import { DomSanitizer } from '@angular/platform-browser';

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
  subCategory;
  image: any;
  addedImagesToView: any[] = [];
  addedImagesToSend: any[] = [];
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
      this.addImagesToArray();
    });
    this.initAdForm();
  }

  addImagesToArray() {
    this.ad.adImages.forEach((adImage) => {
      this.images.push(adImage);
    });
  }
  initAdForm() {
    this.adForm = this.fb.group({
      title: [this.ad.title],
      description: [this.ad.description],
      subCategoryId: [this.ad.subCategory.id],
      regionId: [this.ad.region.id],
      weeklyPrice: [this.ad.weeklyPrice],
      dailyPrice: [this.ad.dailyPrice],
      boosted: [],
      negotiable: [this.ad.negotiable],
      numberOfDays: [''],
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
      text: 'this will cost you ' + this.subCategory.coins + ' coins',
      icon: 'info',
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
    this.addedImagesToSend.push(images[0]);
    var reader = new FileReader();
    reader.readAsDataURL(images[0]);
    reader.onloadend = () => {
      this.addedImagesToView.push({ imageUrl: reader.result });
    };
  }

  removeImage(id) {
    this.sub.add(
      this._adService.deleteAdImage(id).subscribe({
        next: (res) => {
          this.images = this.images.filter((i) => i.id != id);
          console.log(res);
        },
      })
    );
  }
  removeaddedImage(image) {
    this.addedImagesToView = this.addedImagesToView.filter((i) => i != image);
    this.addedImagesToSend = this.addedImagesToSend.pop();
  }
  editAd() {
    console.log(this.addedImagesToSend);
    this._global.showSpinner();

    const payload = this.adForm.value;
    const adJson = JSON.stringify(payload);
    console.log(payload, adJson);
    const formData = new FormData();
    this.addedImagesToSend.forEach((i) => {
      formData.append('images', i);
    });
    formData.append('adJson', adJson);

    this.sub.add(
      this._adService.updateAd(formData, this.ad.slug).subscribe({
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
            title: 'Ad updated successfully',
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

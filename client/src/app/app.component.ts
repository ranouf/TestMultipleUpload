import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { FamilyService, ParentDto } from './services/api.services';
import { EditComponent } from './common/base/edit.component';
import { FamilyServiceExtensions } from './services/api.services.extensions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends EditComponent<ParentDto> {

  constructor(
    private fb: FormBuilder,
    public familyService: FamilyServiceExtensions,
    protected cd: ChangeDetectorRef,
  ) {
    super(cd);
  }

  protected getDefaultValue(): ParentDto {
    return <ParentDto>{}
  }

  protected updateForm(data: ParentDto) {
    this.form.patchValue({ children: undefined });
    this.form.patchValue({ name: data.name });
  }

  protected edit(dataToSave: ParentDto): Observable<ParentDto> {
    return this.familyService.post(dataToSave);
  }

  public filesDropped(files: File[]) {
    let childrenForm = this.form.get('children');
    if (files == undefined) {
      childrenForm.reset();
    } else {
      childrenForm.patchValue(files);
    }
    this.cd.detectChanges();
  }

  protected toFormGroup(data: ParentDto): FormGroup {
    const formGroup = this.fb.group({
      name: [data.name, Validators.required],
      files: [data.files],
    });

    return formGroup;
  }
}

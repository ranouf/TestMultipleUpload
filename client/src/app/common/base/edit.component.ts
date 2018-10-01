import { OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';

export abstract class EditComponent<T> implements OnInit {
  public initialState: T;
  private data: T;
  public dataAsync = new BehaviorSubject<T>(this.getDefaultValue());
  public form: FormGroup;
  public isValid: boolean = false;

  constructor(
    protected cd: ChangeDetectorRef,
  ) {
  }

  // _.mergeWith customizer to avoid merging primitive arrays, and only
  // merge object arrays
  protected mergeCustomizer = (objValue, srcValue) => {
    if (_.isArray(objValue)) {
      if (objValue && srcValue && (_.isPlainObject(objValue[0]) || _.isPlainObject(srcValue[0]))) {
        return srcValue.map((src, index) => {
          const obj = _.find(objValue, {}, index);
          return _.mergeWith(obj || {}, src, this.mergeCustomizer);
        });
      }
      return srcValue;
    }
  }

  private initializeData() {
    this.initialState = this.dataAsync.getValue();
    console.log("Initialize data", this.initialState);
    this.data = _.cloneDeep(this.initialState);
    this.form = this.toFormGroup(this.data);
  }

  public onCancel(): void {
    this.data = this.initialState;
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      console.error('Parent Form invalid, preventing submission');
    }
    const updatedParentData = _.mergeWith(this.data,
      this.form.value,
      this.mergeCustomizer);

    this.save(updatedParentData);
    console.log('Original parentData', this.initialState);
    console.log('Updated parentData', updatedParentData);
  }

  public save(dataToSave: T): void {
    this.edit(dataToSave)
      .subscribe(result => {
        console.log("Save succeeded", result);
      }, error => {
        console.error("Save failed", error);
      });
  }
  
  protected abstract edit(dataToSave: T): Observable<T>;
  protected abstract getDefaultValue(): T;
  protected abstract updateForm(data: T);
  protected abstract toFormGroup(data: T): FormGroup;

  ngOnInit() {
    this.initializeData();

    this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        console.log('Parent Form changed', value, this.form.valid);
        this.data = _.mergeWith(this.data, value, this.mergeCustomizer);
        this.isValid = this.form.valid
      }
    );

  }
}

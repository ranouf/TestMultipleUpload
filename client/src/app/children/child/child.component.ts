import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ChildDto } from '../../services/api.services';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() children: FormArray;
  @Input() child: ChildDto;

  public childForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    console.log('Initializing child form', this.child);
    this.childForm = this.toFormGroup(this.child);
    this.children.push(this.childForm);
  }

  protected toFormGroup(data: ChildDto): FormGroup {
    const formGroup = this.fb.group({
      name: [data.name, Validators.required],
      files: [data.files]
    });

    return formGroup;
  }

  public filesDropped(files: File[]) {
    let filesForm = this.childForm.get('files');
    if (files == undefined) {
      filesForm.reset();
    } else {
      filesForm.patchValue(files);
    }
    this.cd.detectChanges();
  }
}

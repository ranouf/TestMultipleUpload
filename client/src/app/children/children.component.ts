import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ChildDto } from '../services/api.services';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {
  @Input() children: ChildDto[];
  @Input() childrenForm: FormGroup;

  constructor(
    protected cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    console.log('Initializing child list', this.children);
    this.childrenForm.addControl('children', new FormArray([]));
  }

  addItem() {
    let child = <ChildDto>{
      name: undefined,
      files: undefined,
    };

    if (!this.children) {
      this.children = <ChildDto[]>[]
    }

    this.children.push(child);
    this.cd.detectChanges();
  }

  removeItem(index: number) {
    this.children.splice(index, 1);
    (<FormArray>this.childrenForm.get('children')).removeAt(index);
  }

}

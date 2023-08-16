import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  clickCounter: number = 0;
  name: string='';
  constructor() { }

  ngOnInit(): void {
  }
  countClick() {
    this.clickCounter += 1;
  }
  setClasses(){
    let myclasses={
      active: this.clickCounter > 4,
      notActive: this.clickCounter <=4
    };
    return myclasses;
  }
}

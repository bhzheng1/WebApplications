import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero-list/hero-list.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/service/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero:Hero;

  //hero 属性必须是一个带有 @Input() 装饰器的输入属性
  //因为外部的 HeroesComponent 组件将会绑定到它
  //@Input() hero:Hero;

  constructor(
    private route:ActivatedRoute,
    private heroService:HeroService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero=>this.hero=hero)
  }

  goBack():void{
    this.location.back();
  }

}

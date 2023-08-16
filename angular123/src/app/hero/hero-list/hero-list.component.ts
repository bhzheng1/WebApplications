import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/service/hero.service';

export interface Hero{
  id:number;
  name:string;
}

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  heroes:Hero[];

  selectedHero:Hero;
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(){
    //synchronous signature, This will not work in a real app
    //this.heroes = this.heroService.getHeroes();

    //HeroService.getHeroes() must have an asynchronous signature
    this.heroService.getHeroes().subscribe(heroes=>this.heroes = heroes);
  }

  onSelect(hero:Hero){
    this.selectedHero = hero;
  }
}

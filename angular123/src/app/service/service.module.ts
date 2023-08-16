import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { ConfigService } from './config.service';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { InMemoryHeroService } from './in-memory-hero.service';

export {
  CartService,
  ConfigService,
  HeroService,
  MessageService,
  InMemoryHeroService,
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[]
})
export class ServiceModule {
  static forRoot():ModuleWithProviders<ServiceModule>{
    return{
      ngModule: ServiceModule,
      providers:[
        CartService,
        ConfigService,
        HeroService,
        MessageService,
        InMemoryHeroService,
      ]
    };
  }
}

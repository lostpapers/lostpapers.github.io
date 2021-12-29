import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
  ) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  ngOnInit(): void {
    this.getHeroes();
  }
  add(name:string)
  {
    name = name.trim();
    if(name)
    {
      this.heroService.addHero({name}as Hero)
      .subscribe(hero =>{this.heroes.push(hero);})
    }
  }

  delete(hero:Hero){
    this.heroes = this.heroes.filter(h=>h!==hero);
    /* If you neglect to subscribe(), the service will not send the delete request to the server. 
       As a rule, an Observable does nothing until something subscribes.
    */
    this.heroService.deleteHero(hero.id).subscribe();
  }
}

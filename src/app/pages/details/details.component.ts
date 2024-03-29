import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public isLoading:boolean = false;
  public pokemon: any;
  public isError: boolean = false;
 
  constructor( 
    
    private activeRouter: ActivatedRoute, 
    private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
  this.getpokemon;
  }


get getpokemon() {
  const id = this.activeRouter.snapshot.params['id'];
  const pokemon = this.pokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`);
  const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);
  
  
  return forkJoin([pokemon, name]).subscribe(
    res => {
        this.pokemon = res;
        this.isLoading = true;
       }, error => {
          this.isError = true;
           
       }
       
  );
}
}

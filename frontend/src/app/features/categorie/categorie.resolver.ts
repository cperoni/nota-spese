import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CategorieService, Categoria } from '../../service/categorie.service';

@Injectable({
  providedIn: 'root',
})
export class CategorieResolver implements Resolve<Categoria[]> {
  constructor(private cs: CategorieService) {}

  async resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<Categoria[]> {
    const res = await this.cs.getCategorie();
    return res.error ? [] : ((res.data as Categoria[]) || []);
  }
}

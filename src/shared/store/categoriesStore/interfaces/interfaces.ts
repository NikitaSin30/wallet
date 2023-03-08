export interface ICategorie {
  categorie: string;
  id?: string;
  spentMoney: number;
}
export interface ICategories {
  categories: Array<ICategorie>;
  setCatigorie(categorie: ICategorie): void;
  removeCategorie(id: string): void;
}

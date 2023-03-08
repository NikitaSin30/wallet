import { action, makeObservable, observable } from 'mobx';
import { ICategories,ICategorie } from './interfaces/interfaces';




class Categories implements ICategories {
    categories: Array<ICategorie> = [];
    constructor() {
        makeObservable(this, {
            categories      : observable,
            setCatigorie    : action,
            removeCategorie : action,
        });
    }
    setCatigorie(categorie: ICategorie): void {
        this.categories.push(categorie);
    }
    removeCategorie(id: string): void {
        console.log(id);
        this.categories = this.categories.filter((categorie) => categorie.id !== id);
        console.log(this.categories);

    }

    setNewSpandingInCategorie(newSpending: ICategorie): void {
        this.categories = this.categories.map((categorie) =>
            categorie.id === newSpending.id
                ? {
                    ...categorie,
                    spentMoney : newSpending.spentMoney + categorie.spentMoney,
                }
                : categorie,
        );
    }
}
export const CategoriesStore = new Categories();

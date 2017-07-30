import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'underscore';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'recipes',
    templateUrl: 'recipes.html'
})
export class Recipes implements OnInit {
    tags: any = [];
    recipes: any = [];
    filters: any = {
        cook_time__lte: 20,
        ingredients_length__lte: 8,
        tags: [],
        contains_ingredients: [],
        search: '',
        energy: 800,
        protein_relative: 0.3,
        carbs_relative: 0.4,
        fat_relative: 0.3,
        page_size: 18,
    };

    macroCalculator: any = {
        protein_in: 0,
        protein_goal: 200,
        carbs_in: 0,
        carbs_goal: 400,
        fat_in: 0,
        fat_goal: 120,
    };

    resultSet: any = {};
    loading = false;

    calcgoal = true;

    ingredientCtrl: FormControl;
    filteredIngredients: any;
    selectedIngredients: any = [];

    constructor(public http: Http, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
        this.ingredientCtrl = new FormControl();
        this.ingredientCtrl.valueChanges
        .subscribe(val => {
            if (val.length >= 3) {
                this.filterIngredients(val);
            }
        });
    }

    calculateMacros() {
        let proteinDiff = 4 * (this.macroCalculator.protein_goal - this.macroCalculator.protein_in);
        let carbsDiff = 4 * (this.macroCalculator.carbs_goal - this.macroCalculator.carbs_in);
        let fatDiff = 9 * (this.macroCalculator.fat_goal - this.macroCalculator.fat_in);

        let totalCalories = proteinDiff + carbsDiff + fatDiff;

        this.filters.protein_relative = proteinDiff / totalCalories;
        this.filters.carbs_relative = carbsDiff / totalCalories;
        this.filters.fat_relative = fatDiff / totalCalories;

        this.fetchRecipes();
    }

    filterIngredients(val: string) {
        this.http.get('//api.sjefapp.com/api/ingredients/?search=' + val)
        .map(res => res.json())
        .subscribe(res => {
            this.filteredIngredients = res.results;
        });
    }

    selectIngredient(ingredient) {
        this.selectedIngredients.push(ingredient);
        this.toggleIngredient(ingredient.id);
        this.ingredientCtrl.setValue('');
    }

    removeIngredient(ingredient) {
        this.selectedIngredients.splice(this.selectedIngredients.indexOf(ingredient), 1);
        this.toggleIngredient(ingredient.id);
    }

    ngOnInit() {
        this.fetchRecipes();

        this.http.get('//api.sjefapp.com/api/tags/')
        .map(res => res.json())
        .subscribe(
            res => {
                this.tags = res.results;
            },
            err => {
                console.error(err);
            }
        );
    }

    getImageUrl(file) {
        return this.sanitizer.bypassSecurityTrustStyle(`url(${file})`);
    }

    toggleTag(tag_id) {
        let index = this.filters.tags.indexOf(tag_id);
        if (index > -1) {
            this.filters.tags.splice(index, 1);
        } else {
            this.filters.tags.push(tag_id);
        }
        this.fetchRecipes();
    }

    toggleIngredient(ingredient_id) {
        let index = this.filters.contains_ingredients.indexOf(ingredient_id);
        if (index > -1) {
            this.filters.contains_ingredients.splice(index, 1);
        } else {
            this.filters.contains_ingredients.push(ingredient_id);
        }
        this.fetchRecipes();
    }

    getPercentageColor(score) {
        let style = 'rgb(' + Math.round((1 - score) * 255) + ',' + Math.round(score * 255) + ', 64)';
        return this.sanitizer.bypassSecurityTrustStyle(style);
    }

    getPercentageWidth(score) {
        let style = Math.round(score * 100) + '%';
        return this.sanitizer.bypassSecurityTrustStyle(style);
    }

    fetchRecipes() {
        this.loading = true;
        let url = '//api.sjefapp.com/api/recipes/?';
        for (let key in this.filters) {
            let value = this.filters[key];
            if (_(value).isArray()) {
                if (value.length > 0) {
                    for (let v of value) {
                        url += key + '=' + v + '&';
                    }
                }
            } else {
                url += key + '=' + value + '&';
            }
        }
        this.http.get(url)
        .map(res => res.json())
        .subscribe(
            res => {
                this.resultSet = res;
                this.recipes = res.results;
                this.loading = false;
            },
            err => {
                this.loading = false;
                console.error('Error', err);
            }
        )
    }

    loadMoreRecipes() {
        this.loading = true;
        if (this.resultSet.next) {
            this.http.get(this.resultSet.next)
            .map(res => res.json())
            .subscribe(res => {
                this.loading = false;
                this.resultSet = res;
                for (let recipe of res.results) {
                    this.recipes.push(recipe);
                }
            });
        }
    }
}

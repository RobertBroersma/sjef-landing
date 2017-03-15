import {Component} from '@angular/core';
import {Http} from '@angular/http';
import * as _ from 'underscore';

@Component({
    selector: 'mealplanner',
    templateUrl: 'mealplanner.html'
})
export class Mealplanner {
    loading: boolean = false;
    mealPlan: any = null;
    form = {
        energy: 2500,
        no_meals: 3
    };

    public pieChartLabels:string[] = ['Koolhydraten', 'Eiwitten', 'Vetten'];
    public pieChartData:number[] = [0,0,0];
    public pieChartType:string = 'doughnut';

    constructor(public http: Http) {
        this.mealPlan = JSON.parse(localStorage.getItem('mealPlan'));
        if (this.mealPlan) {
            this.calculatePieChartData();
            this.setFormData();
        }
    }

    getMealPlan() {
        this.loading = true;

        let url = '/api/meals/preview_mealplan/';
        url += '?energy=' + this.form.energy;
        url += '&no_meals=' + this.form.no_meals;
        url += '&carbs=0.5&protein=0.25&fat=0.25';
        this.http.get(
            url
        )
        .map(res => res.json())
        .subscribe(res => {
            this.loading = false;
            this.mealPlan = res.sort((a, b) => a.day_planning.order - b.day_planning.order);
            this.calculatePieChartData();

            localStorage.setItem('mealPlan', JSON.stringify(this.mealPlan));
        },
        err => {
            this.loading = false;
        });
    }

    setFormData() {
        this.form.no_meals = this.mealPlan.length;
        this.form.energy = Math.round(_(this.mealPlan).reduce((memo, meal) => memo + meal.servings * meal.recipe.energy, 0));
    }

    calculatePieChartData() {
        let carbs = _(this.mealPlan).reduce((memo, meal) => memo + meal.servings * meal.recipe.energy * meal.recipe.carbs_relative, 0);
        let protein = _(this.mealPlan).reduce((memo, meal) => memo + meal.servings * meal.recipe.energy * meal.recipe.protein_relative, 0);
        let fat = _(this.mealPlan).reduce((memo, meal) => memo + meal.servings * meal.recipe.energy * meal.recipe.fat_relative, 0);
        let total = carbs + protein + fat;
        this.pieChartData = [Math.round(100 * carbs/total), Math.round(100 * protein/total), Math.round(100 * fat/total)];
    }

    void() {}
}

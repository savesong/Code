import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/account/account.html'
})
export class AccountPage {
    private items: any;

    constructor(private navCtrl: NavController) {
        this.items = [{
            title: 'item1'
        }, {
            title: 'item2'
        }, {
            title: 'item3'
        }];
    }

    itemSelected(item) {
        console.log(item);
    }
}

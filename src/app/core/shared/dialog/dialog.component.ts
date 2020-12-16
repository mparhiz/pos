import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="dialog">
      <h1 mat-dialog-title>{{data.name}}</h1>
      <div mat-dialog-content>
        <ul>
          <li>
            Qty: {{data.qty}}
          </li>
          <li>
            Price: $ {{data.price}}
          </li>
        </ul>
      </div>
      <div mat-dialog-actions>
        <button
          mat-raised-button
          color="primary"
          [mat-dialog-close]="true"
          (click)="data.callback(data.id,1,data._this)"
        >Payment By Cash</button>
        <button
          mat-raised-button
          color="primary"
          [mat-dialog-close]="true"
          (click)="data.callback(data.id,2,data._this)"
        >Payment By Credit Card</button>
        <button mat-raised-button mat-dialog-close>Cancel</button>
      </div>
    </div>
  `,
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

}

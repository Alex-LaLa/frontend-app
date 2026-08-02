import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-categoria-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  templateUrl: './categoria-dialog.html',
  styleUrl: './categoria-dialog.css',
})
export class CategoriaDialog {
  categoria: any = {
    nombre: '',
    activo: true,
  };

  constructor(
    public dialogRef: MatDialogRef<CategoriaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.categoria = { ...data };
    }
  }

  guardar(): void {
    this.dialogRef.close(this.categoria);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}

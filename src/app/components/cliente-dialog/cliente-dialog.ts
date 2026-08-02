import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-cliente-dialog',
  imports: [
    MatDialogActions,
    MatFormField,
    FormsModule,
    MatLabel,
    MatDialogContent,
    MatInput,
    MatDialogTitle,
    MatButton,
  ],
  templateUrl: './cliente-dialog.html',
  styleUrl: './cliente-dialog.css',
})
export class ClienteDialog {
  cliente: any = {
    nombreCompleto: '',
    email: '',
    ciudad: '',
  };

  constructor(
    public dialogRef: MatDialogRef<ClienteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.cliente = { ...data };
    }
  }

  guardar() {
    this.dialogRef.close(this.cliente);
  }

  cancelar() {
    this.dialogRef.close();
  }
}

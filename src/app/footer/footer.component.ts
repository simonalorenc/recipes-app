import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule, AlertModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly ALERT_TIME = 3000;

  email = new FormControl('', [Validators.required, Validators.email]);
  showSuccessAlert: boolean = false;
  showFailAlert: boolean = false;
  arrowIcon: IconDefinition = faArrowRight;

  onSubmit() {
    if (this.email.valid) {
      this.showSuccessAlert = true;
      setTimeout(() => {
        this.showSuccessAlert = false;
      }, this.ALERT_TIME);
      this.email.setValue('');
      this.email.markAsUntouched();
    } else {
      this.showFailAlert = true
      setTimeout(() => {
        this.showFailAlert = false
      }, this.ALERT_TIME)
    }
  }
}

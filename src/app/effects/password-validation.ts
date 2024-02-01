import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  static passwordStrength(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c.pristine) {
        return null;
      } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?)(/=|])/.test(
          c.value
        )
      ) {
        return { strength: true };
      }
      return null;
    };
  }
}

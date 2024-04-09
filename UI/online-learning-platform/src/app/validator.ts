// validators.ts

import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';
import { InstructorService } from './instructor.service';

export function uniqueTitleValidator(instructorService:InstructorService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const title = control.value;

    return of(title).pipe(
      debounceTime(300),
      switchMap((value) =>
        instructorService.checkTitleAvailability(value).pipe(
          map(isAvailable => (isAvailable ? null : { uniqueTitle: true })),
          catchError(() => of(null))
        )
      )
    );
  };
}

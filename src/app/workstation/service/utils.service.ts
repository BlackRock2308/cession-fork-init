
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, finalize, delay } from 'rxjs/operators';

export const genericRetryPolicy =
  ({
    maxRetryAttempts = 1,
    scalingDuration = 1000,
    excludedStatusCodes = [400, 401, 403, 404, 500],
  }) =>
    (attempts: Observable<any>) => {
      return attempts.pipe(
        delay(scalingDuration), // Start retries after 2s from the initial req fail.
        mergeMap((error, i) => {
          const retryAttempt = i + 1;
          // if maximum number of retries have been met
          // or response is a status code we don't wish to retry, throw error
          if (
            retryAttempt > maxRetryAttempts ||
            excludedStatusCodes.find((e) => e === error.status)
          ) {
            return throwError(() => error);
          }

          // retry after 2s, 4s, 6s
          return timer(retryAttempt * scalingDuration);
        }),
        finalize(() => 'Retry end, We are done!')
      );
    };

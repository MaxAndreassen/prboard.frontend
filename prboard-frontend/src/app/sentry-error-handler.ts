import { Injectable, ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { environment } from '../environments/environment';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {

    constructor() {
        Sentry.init({
            dsn: 'https://f64209d99ee04aef85823361dd426058@o537353.ingest.sentry.io/5656453',
            environment: environment.name,
            beforeSend(event, hint): any {
                /* tslint:disable:no-string-literal only-arrow-functions */
                const isNonErrorException =
                    event.exception.values[0].value.startsWith('Non-Error exception captured') ||
                    hint.originalException['message'].startsWith('Non-Error exception captured');
                /* tslint:enable:no-string-literal only-arrow-functions */

                if (isNonErrorException) {
                    // We want to ignore those kind of errors
                    return null;
                }
                return event;
            }
        });
    }

    handleError(error): any {
        Sentry.captureException(error.originalError || error);
    }
}

export function getErrorHandler(): ErrorHandler {
    if (environment.production) {
        return new SentryErrorHandler();
    }
    return new ErrorHandler();
}

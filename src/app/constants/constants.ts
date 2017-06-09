/* for any variable constants (see what I did there?!), see the DefinePlugins plugin
 * in the 'webpack.common.js' or 'webpack.<env>.js' files; these values are identified
 * by the double underscore (__****__) naming style, and the values are provided by webpack
 * during a webpack build and therefore may not be recognized as valid values by the compiler here
 */

export const
    AppName = 'SampleAngularApp',
    AppVersion = 'v0.0.0',
    BuildType = 'noBuildType',
    DATE_FORMAT_ddmmyyyy = 'dd-mmm-yyyy',
    DATE_FORMAT_dMMMy = 'dd-MMM-y',
    DATE_TIME_FORMAT = 'dd-MMM-y HH:mm Z',
    DATE_TIME_LOCAL_FORMAT = 'dd-MMM-y h:mm a',
    DEBOUNCE_INTERVAL = 400,
    DEBOUNCE_INTERVAL_LONG = 700,
    MAXIMUM_FILE_UPLOAD_SIZE_IN_MEGABYTES = 10,
    ApiBaseUrl = 'http://rpc11304.corp.ncr.com:8200/quby/api',
    AppBaseUrl = '/',
    USE_MOCKING = false,
    RESPONSE_MESSAGE_TYPE = {
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR',
        WARNING: 'WARNING',
        INFO: 'INFO',
        REQUIRED: 'REQUIRED',
        INVALID: 'INVALID'
    };

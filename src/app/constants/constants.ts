/* for any variable constants (see what I did there?!), see the DefinePlugins plugin
 * in the 'webpack.common.js' or 'webpack.<env>.js' files; these values are identified
 * by the double underscore (__****__) naming style, and the values are provided by webpack
 * during a webpack build and therefore may not be recognized as valid values by the compiler here
 */

export const
    AppName = 'SampleAngularApp',
    AppVersion = 'v0.0.0',
    BuildType: string = 'noBuildType',
    CUSTOMER_STATUS = {
        ANY: -1,
        ACTIVE: 1,
        DISABLED: 0,
    },
    DATE_FORMAT_ddmmyyyy = 'dd-mmm-yyyy',
    DATE_FORMAT_dMMMy = 'dd-MMM-y',
    DATE_TIME_FORMAT = 'dd-MMM-y HH:mm Z',
    DATE_TIME_LOCAL_FORMAT = 'dd-MMM-y h:mm a',
    DEBOUNCE_INTERVAL = 400,
    DEBOUNCE_INTERVAL_LONG = 700,
    ENVIRONMENTS = {
        PROD: "quotebuilder.ncr.com",
        UAT: "uat.quotebuilder.ncr.com",
        SAT: "cert.quotebuilder.ncr.com",
        DEV: "rpc11304.corp.ncr.com",
        PARTNER: "myncr.ncr.com",
        LOCAL: "localhost", //used by front-end developers
        LOCAL_liveServer: "127.0.0.1", //used by front-end developers
    },
    FILTER_OPERATIONS = {
        EQUALS: 1,
        CONTAINS: 64,
        STARTS_WITH: 128,
        ENDS_WITH: 256,
        EQUAL_SIGN: '=',
        GREATER_THAN_AND_EQUALS: '>=',
        LESSER_THAN_AND_EQUALS: '<=',
        IN: 2048
    },
    MAX_NUMBER_REPORT_GENERATION = 250,
    MAXIMUM_FILE_UPLOAD_SIZE_IN_MEGABYTES = 10,
    MAXIMUM_PRODUCT_QTY = 999999999,
    MAXIMUM_SERVICE_QTY = 99999,
    NO_IMPLEMENTATION_COORD_GID = "AAAAAAAAAAAAAAA",
    PROSPECT_NATURE = {
        ANY: -1,
        PROSPECT: 1,
        NON_PROSPECT: 0,
    },
    ApiBaseUrl = 'http://rpc11304.corp.ncr.com:8200/quby/api',
    AppBaseUrl = '/',
    QUOTE_SECTIONS = {
        QUOTE_SUMMARY: 'quoteSummary',
        PRODUCTS_AND_SERVICES: 'productsAndServices',
        APPROVALS: 'approvals',
        PROFIT_AND_LOSS: 'profitAndLoss',
        PRICING_WORKSHEET: 'pricingWorksheet',
        ORDER_SUMMARY: 'orderSummary',
        DELIVERY_INFO: 'deliveryInfo',
        INVOICING: 'invoicing',
        CONTACTS: 'contacts',
        DOC_MGMT: 'documentManagement',
    },
    USE_MOCKING = false,
    USER_ROLE_TYPES = {
        ACA_USER: "ACA_USER",
        ADMINISTRATOR: "ADMINISTRATOR",
        DIRECT_USER: "DIRECT_USER",
        HELP_DESK_USER: "HELP_DESK_DIRECT",
        INDIRECT_NCR_ASSOCIATE: "INDIRECT_NCR_ASSOCIATE",
        INDIRECT_SALES_USER: "INDIRECT_SALES_USER",
        INDIRECT_USER: "INDIRECT_USER",
        ORC_USER: "ORC_USER",
        SUPPORT_USER: "SUPPORT_USER",
    },
    SOR_REPORT_COLUMN_NUM = 98,
    RESPONSE_MESSAGE_TYPE = {
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR',
        WARNING: 'WARNING',
        INFO: 'INFO',
        REQUIRED: 'REQUIRED',
        INVALID: 'INVALID'
    };

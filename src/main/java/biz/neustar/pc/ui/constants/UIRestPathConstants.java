/**
 * Copyright 2014 NeuStar, Inc. All rights reserved.
 * NeuStar, the Neustar logo and related names and logos are registered
 * trademarks, service marks or tradenames of NeuStar, Inc. All other
 * product names, company names, marks, logos and symbols may be trademarks
 * of their respective owners.
 */
package biz.neustar.pc.ui.constants;

/**
 * Author: kvats Date: Apr 7, 2015 Time: 7:26:41 PM
 */
public class UIRestPathConstants {

    /**
     * Constant for current API version
     * 
     */
    public static final String CURRENT_API_VERSION = "v1";

    /**
     * Use this constant to prefix the version in the URL.
     */
    public static final String PATH_WITH_CURRENT_API_VERSION = "/" + CURRENT_API_VERSION;

    public static final String CSP_CLOUD_NAME = "cspCloudName";
    public static final String CLOUD_NAME = "cloudName";
    public static final String PRODUCT_NAME = "productName";

    public static final String BASE_URI_NAME_AVAILABILITY_API = PATH_WITH_CURRENT_API_VERSION
            + "/clouds/personalClouds/{cloudName}/available";
    // Personal cloud registrar/csp's URI
    public static final String BASE_URI_CSP_API = PATH_WITH_CURRENT_API_VERSION + "/csps";
    public static final String CSP_URI = "/{cspCloudName}";
    // Personal cloud registration URI's
    public static final String REGISTER_PERSONAL_CLOUD_URI = PATH_WITH_CURRENT_API_VERSION
            + "/csp/{cspCloudName}/clouds/personalClouds";
    /**
     * Use this context for code generation and validation.
     */
    public static final String GENERATE_SECURITY_CODES = PATH_WITH_CURRENT_API_VERSION + "/codes/generate";
    public static final String VALIDATE_SECURITY_CODES = PATH_WITH_CURRENT_API_VERSION + "/codes/validate";
    /**
     * Use this context for code generation and validation.
     */
    public static final String BASE_URI_PAYMENT_API = PATH_WITH_CURRENT_API_VERSION
            + "/products/{productName}/payments";
    public static final String GET_PAYMENT = BASE_URI_PAYMENT_API + "/{paymentId}";

    // Personal cloud synonym registration URI's
    public static final String BASE_URI_SYNONYMS_API = REGISTER_PERSONAL_CLOUD_URI + "/{cloudName}/synonyms";

    public static final String PERSONAL_CLOUD_AUTH_URI = REGISTER_PERSONAL_CLOUD_URI+"/{cloudName}/authenticate";

    public static final String PERSONAL_CLOUD_FORGOT_PASSWORD_URI = REGISTER_PERSONAL_CLOUD_URI
            + "/{cloudName}/forgotPassword";

    public static final String PERSONAL_CLOUD_RESET_PASSWORD_URI = REGISTER_PERSONAL_CLOUD_URI
            + "/{cloudName}/resetPassword";

    public static final String PERSONAL_CLOUD_CHANGE_PASSWORD_URI = REGISTER_PERSONAL_CLOUD_URI+"/{cloudName}/changePassword";

    public static final String GET_DEPENDENTS_URI = REGISTER_PERSONAL_CLOUD_URI + "/{cloudName}/dependents";

    public static final String NAME_AVAILABILITY_API = PATH_WITH_CURRENT_API_VERSION
            + "/clouds/personalClouds/{0}/available";
    public static final String PAYMENT_API_URI = PATH_WITH_CURRENT_API_VERSION + "/products/{0}/payments";
    public static final String REGISTER_PERSONAL_CLOUD_API = PATH_WITH_CURRENT_API_VERSION
            + "/csp/{0}/clouds/personalClouds";
    public static final String SYNONYMS_CLOUD_NAME_API = PATH_WITH_CURRENT_API_VERSION + "/csp/{0}/clouds/personalClouds/{1}/synonyms";
    public static final String GET_DEPENDENTS_API = PATH_WITH_CURRENT_API_VERSION + "/csp/{0}/clouds/personalClouds/{1}/dependents";
    public static final String PERSONAL_CLOUD_FORGOT_PASSWORD_API = PATH_WITH_CURRENT_API_VERSION + "/csp/{0}/clouds/personalCloud/{1}/forgotPassword";

    public static final String PERSONAL_CLOUD_RESET_PASSWORD_API = PATH_WITH_CURRENT_API_VERSION + "/csp/{0}/clouds/personalCloud/{1}/resetPassword";
    public static final String PERSONAL_CLOUD_AUTH_API = PATH_WITH_CURRENT_API_VERSION + "/csp/{0}/clouds/personalClouds/{1}/authenticate";
    public static final String PAYMENT_API = PATH_WITH_CURRENT_API_VERSION
            + "/products/{0}/payments";
}

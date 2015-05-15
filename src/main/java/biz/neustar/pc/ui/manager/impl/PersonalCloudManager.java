package biz.neustar.pc.ui.manager.impl;

import biz.neustar.pcloud.rest.constants.ProductNames;
import biz.neustar.pcloud.rest.dto.CloudInfo;
import biz.neustar.pcloud.rest.dto.CloudValidation;
import biz.neustar.pcloud.rest.dto.PaymentInfo;
import biz.neustar.pcloud.rest.dto.PaymentResponse;
import biz.neustar.pcloud.rest.dto.SynonymInfo;

public interface PersonalCloudManager {

    public abstract String isCloudNameAvailable(String cloudName);

    public abstract String validateDetailsAndGenerateSecurityCode(CloudValidation cloudValidation);

    public abstract String validateSecurityCodes(CloudValidation cloudValidation);

    public abstract String registerPersonalCloud(String cspCloudName, CloudInfo cloudInfo);

    public abstract String registerSynonyms(String cspCloudName, String cloudName, SynonymInfo synonymInfo);

    public abstract String getAllSynonyms(String cspCloudName, String cloudName);

    public abstract String getAllDependents(String cspCloudName, String cloudName);

    public abstract String authenticatePersonalCloud(String cspCloudName, String cloudName, String password);

    public abstract String forgotPassword(String cspCloudName, String cloudName, CloudValidation cloudValidation);

    public abstract String resetPassword(String cspCloudName, String cloudName, CloudValidation cloudValidation);

    public abstract PaymentResponse processPayment(ProductNames productName, PaymentInfo paymentInfo);

    public abstract String changePassword(String cspCloudName, String cloudName, CloudValidation cloudValidation);
}
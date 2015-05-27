/*
The MIT License (MIT)
	
Copyright (c) 2015 Neustar Inc.
	
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
package biz.neustar.pc.ui.manager.impl;

import biz.neustar.pcloud.ResponseData;
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

    public abstract ResponseData authenticatePersonalCloud(String cspCloudName, String cloudName, String password);

    public abstract String forgotPassword(String cspCloudName, String cloudName, CloudValidation cloudValidation);

    public abstract String resetPassword(String cspCloudName, String cloudName, CloudValidation cloudValidation);

    public abstract PaymentResponse processPayment(ProductNames productName, PaymentInfo paymentInfo);

    public abstract String changePassword(String cspCloudName, String cloudName, CloudValidation cloudValidation);
}
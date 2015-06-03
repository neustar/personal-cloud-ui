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
package biz.neustar.pc.ui.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import biz.neustar.pc.ui.constants.UIRestPathConstants;
import biz.neustar.pc.ui.manager.impl.PCloudResponse;
import biz.neustar.pc.ui.manager.impl.PersonalCloudManager;
import biz.neustar.pcloud.rest.constants.ProductNames;
import biz.neustar.pcloud.rest.dto.CloudInfo;
import biz.neustar.pcloud.rest.dto.CloudValidation;
import biz.neustar.pcloud.rest.dto.DependentList;
import biz.neustar.pcloud.rest.dto.PaymentInfo;
import biz.neustar.pcloud.rest.dto.PaymentResponse;
import biz.neustar.pcloud.rest.dto.Synonym;
import biz.neustar.pcloud.rest.dto.SynonymInfo;

/**
 * Author: kvats Date: Apr 7, 2015 Time: 7:18:07 PM
 */
@Controller
// @RequestMapping(UIRestPathConstants.BASE_URI_PERSONAL_CLOUD_API)
public class PersonalCloudRegistrationController {

    private final static Logger LOGGER = LoggerFactory.getLogger(PersonalCloudRegistrationController.class);
    @Autowired
    PersonalCloudManager personalCloudManagerImpl;

    @RequestMapping(value = UIRestPathConstants.BASE_URI_NAME_AVAILABILITY_API, method = RequestMethod.GET)
    public @ResponseBody
    PCloudResponse isCloudNameAvalable(@PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName,
            HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.isCloudNameAvailable(cloudName);
    }

    @RequestMapping(value = UIRestPathConstants.GENERATE_SECURITY_CODES, method = RequestMethod.POST)
    public @ResponseBody
    PCloudResponse validateDetailsAndGenerateSecurityCode(@RequestBody final CloudValidation cloudValidation,
            HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.validateDetailsAndGenerateSecurityCode(cloudValidation);
    }

    @RequestMapping(value = UIRestPathConstants.VALIDATE_SECURITY_CODES, method = RequestMethod.POST)
    public @ResponseBody
    PCloudResponse validateSecurityCodes(@RequestBody final CloudValidation cloudValidation,
            HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.validateSecurityCodes(cloudValidation);
    }

    @RequestMapping(value = UIRestPathConstants.REGISTER_PERSONAL_CLOUD_URI, method = RequestMethod.POST)
    public @ResponseBody
    PCloudResponse registerPersonalCloud(
            @PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @RequestBody final CloudInfo cloudInfo, HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.registerPersonalCloud(cspCloudName, cloudInfo);
    }

    @RequestMapping(value = UIRestPathConstants.BASE_URI_SYNONYMS_API, method = RequestMethod.POST)
    public @ResponseBody
    PCloudResponse registerSynonyms(
            @PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName,
            @RequestBody final SynonymInfo synonymInfo) {
        return personalCloudManagerImpl.registerSynonyms(cspCloudName, cloudName, synonymInfo);
    }

    @RequestMapping(value = UIRestPathConstants.BASE_URI_SYNONYMS_API, method = RequestMethod.GET)
    public @ResponseBody
    Synonym getAllSynonyms(@PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName) {
        return personalCloudManagerImpl.getAllSynonyms(cspCloudName, cloudName);
    }

    @RequestMapping(value = UIRestPathConstants.GET_DEPENDENTS_URI, method = RequestMethod.GET)
    public @ResponseBody
    DependentList getAllDependents(@PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName) {
        return personalCloudManagerImpl.getAllDependents(cspCloudName, cloudName);
    }

    @RequestMapping(value = UIRestPathConstants.PERSONAL_CLOUD_AUTH_URI, method = RequestMethod.POST)
    public @ResponseBody
    PCloudResponse loginPersonalCloud(
            @PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName,
            @FormParam("password") String password, HttpServletRequest request) {
        return personalCloudManagerImpl.authenticatePersonalCloud(cspCloudName, cloudName, password);

    }

    @RequestMapping(value = UIRestPathConstants.PERSONAL_CLOUD_FORGOT_PASSWORD_URI, method = RequestMethod.POST)
    public @ResponseBody
    PCloudResponse processForgotPassword(
            @PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(value = UIRestPathConstants.CLOUD_NAME) final String cloudName,
            @RequestBody final CloudValidation cloudValidation) {
        return personalCloudManagerImpl.forgotPassword(cspCloudName, cloudName, cloudValidation);

    }

    @RequestMapping(value = UIRestPathConstants.PERSONAL_CLOUD_RESET_PASSWORD_URI, method = RequestMethod.POST)
    public @ResponseBody
    PCloudResponse processResetPassword(
            @PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(value = UIRestPathConstants.CLOUD_NAME) final String cloudName,
            @RequestBody final CloudValidation cloudValidation) {
        return personalCloudManagerImpl.resetPassword(cspCloudName, cloudName, cloudValidation);

    }

    @RequestMapping(value = UIRestPathConstants.BASE_URI_PAYMENT_API, method = RequestMethod.POST)
    public @ResponseBody
    PaymentResponse processPayment(@PathVariable(UIRestPathConstants.PRODUCT_NAME) final ProductNames productName,
            @RequestBody final PaymentInfo paymentInfo, HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.processPayment(productName, paymentInfo);
    }

    @RequestMapping(value = UIRestPathConstants.PERSONAL_CLOUD_CHANGE_PASSWORD_URI, method = RequestMethod.POST)
    public @ResponseBody
    PCloudResponse processChangePassword(
            @PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(value = UIRestPathConstants.CLOUD_NAME) final String cloudName,
            @RequestBody final CloudValidation cloudValidation) {
        return personalCloudManagerImpl.changePassword(cspCloudName, cloudName, cloudValidation);

    }
}

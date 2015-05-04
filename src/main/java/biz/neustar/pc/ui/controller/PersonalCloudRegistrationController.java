/**
 * Copyright 2014 NeuStar, Inc. All rights reserved.
 * NeuStar, the Neustar logo and related names and logos are registered
 * trademarks, service marks or tradenames of NeuStar, Inc. All other
 * product names, company names, marks, logos and symbols may be trademarks
 * of their respective owners.
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
import biz.neustar.pc.ui.manager.impl.PersonalCloudManager;
import biz.neustar.pcloud.rest.constants.ProductNames;
import biz.neustar.pcloud.rest.dto.CloudInfo;
import biz.neustar.pcloud.rest.dto.CloudValidation;
import biz.neustar.pcloud.rest.dto.PaymentInfo;
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
    String isCloudNameAvalable(@PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName,
            HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.isCloudNameAvailable(cloudName);
    }

    @RequestMapping(value = UIRestPathConstants.GENERATE_SECURITY_CODES, method = RequestMethod.POST)
    public @ResponseBody
    String validateDetailsAndGenerateSecurityCode(@RequestBody final CloudValidation cloudValidation,
            HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.validateDetailsAndGenerateSecurityCode(cloudValidation);
    }

    @RequestMapping(value = UIRestPathConstants.VALIDATE_SECURITY_CODES, method = RequestMethod.POST)
    public @ResponseBody
    String validateSecurityCodes(@RequestBody final CloudValidation cloudValidation, HttpServletRequest request,
            HttpServletResponse response) {
        return personalCloudManagerImpl.validateSecurityCodes(cloudValidation);
    }

    @RequestMapping(value = UIRestPathConstants.REGISTER_PERSONAL_CLOUD_URI, method = RequestMethod.POST)
    public @ResponseBody
    String registerPersonalCloud(@PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @RequestBody final CloudInfo cloudInfo, HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.registerPersonalCloud(cspCloudName, cloudInfo);
    }

    @RequestMapping(value = UIRestPathConstants.BASE_URI_SYNONYMS_API, method = RequestMethod.POST)
    public @ResponseBody
    String registerSynonyms(@PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName, final SynonymInfo synonymInfo) {
        return personalCloudManagerImpl.registerSynonyms(cspCloudName, cloudName, synonymInfo);
    }

    @RequestMapping(value = UIRestPathConstants.BASE_URI_SYNONYMS_API, method = RequestMethod.GET)
    public @ResponseBody
    String getAllSynonyms(@PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName) {
        return personalCloudManagerImpl.getAllSynonyms(cspCloudName, cloudName);
    }

    @RequestMapping(value = UIRestPathConstants.GET_DEPENDENTS_URI, method = RequestMethod.GET)
    public @ResponseBody
    String getAllDependents(@PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName) {
        return personalCloudManagerImpl.getAllDependents(cspCloudName, cloudName);
    }

    @RequestMapping(value = UIRestPathConstants.PERSONAL_CLOUD_AUTH_URI, method = RequestMethod.POST)
    public @ResponseBody
    String loginPersonalCloud(@PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName,
            @FormParam("password") String password, HttpServletRequest request) {
        return personalCloudManagerImpl.authenticatePersonalCloud(cspCloudName, cloudName, password);

    }

    @RequestMapping(value = UIRestPathConstants.PERSONAL_CLOUD_FORGOT_PASSWORD_URI, method = RequestMethod.POST)
    public @ResponseBody
    String processForgotPassword(@PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(value = UIRestPathConstants.CLOUD_NAME) final String cloudName,
            final CloudValidation cloudValidation) {
        return personalCloudManagerImpl.forgotPassword(cspCloudName, cloudName, cloudValidation);

    }

    @RequestMapping(value = UIRestPathConstants.PERSONAL_CLOUD_RESET_PASSWORD_URI, method = RequestMethod.POST)
    public @ResponseBody
    String processResetPassword(@PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @PathVariable(value = UIRestPathConstants.CLOUD_NAME) final String cloudName,
            final CloudValidation cloudValidation) {
        return personalCloudManagerImpl.resetPassword(cspCloudName, cloudName, cloudValidation);

    }

    @RequestMapping(value = UIRestPathConstants.BASE_URI_PAYMENT_API, method = RequestMethod.POST)
    public @ResponseBody
    String processPayment(@PathVariable(UIRestPathConstants.PRODUCT_NAME) final ProductNames productName,
            final PaymentInfo paymentInfo, HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.processPayment(productName, paymentInfo);
    }
}

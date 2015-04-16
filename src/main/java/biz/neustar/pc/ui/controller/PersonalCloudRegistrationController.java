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
import biz.neustar.pc.ui.manager.impl.PersonalCloudManagerImpl;
import biz.neustar.pcloud.rest.dto.CloudInfo;
import biz.neustar.pcloud.rest.dto.CloudValidation;

/**
 * Author: kvats Date: Apr 7, 2015 Time: 7:18:07 PM
 */
@Controller
// @RequestMapping(UIRestPathConstants.BASE_URI_PERSONAL_CLOUD_API)
public class PersonalCloudRegistrationController {

    private final static Logger LOGGER = LoggerFactory
            .getLogger(PersonalCloudRegistrationController.class);
    @Autowired
    PersonalCloudManagerImpl personalCloudManagerImpl;

    @RequestMapping(value = UIRestPathConstants.BASE_URI_NAME_AVAILABILITY_API, method = RequestMethod.GET)
    public @ResponseBody
    String isCloudNameAvalable(
            @PathVariable(UIRestPathConstants.CLOUD_NAME) final String cloudName,
            HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.isCloudNameAvailable(cloudName);
    }

    @RequestMapping(value = UIRestPathConstants.GENERATE_SECURITY_CODES, method = RequestMethod.POST)
    public @ResponseBody
    String validateDetailsAndGenerateSecurityCode(
            @RequestBody final CloudValidation cloudValidation,
            HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl
                .validateDetailsAndGenerateSecurityCode(cloudValidation);
    }

    @RequestMapping(value = UIRestPathConstants.VALIDATE_SECURITY_CODES, method = RequestMethod.POST)
    public @ResponseBody
    String validateSecurityCodes(
            @RequestBody final CloudValidation cloudValidation,
            HttpServletRequest request, HttpServletResponse response) {
        return personalCloudManagerImpl.validateSecurityCodes(cloudValidation);
    }

    @RequestMapping(value = UIRestPathConstants.REGISTER_PERSONAL_CLOUD_URI, method = RequestMethod.POST)
    public @ResponseBody
    String registerPersonalCloud(
            @PathVariable(value = UIRestPathConstants.CSP_CLOUD_NAME) final String cspCloudName,
            @RequestBody final CloudInfo cloudInfo, HttpServletRequest request,
            HttpServletResponse response) {
        return personalCloudManagerImpl.registerPersonalCloud(cspCloudName,
                cloudInfo);
    }
}

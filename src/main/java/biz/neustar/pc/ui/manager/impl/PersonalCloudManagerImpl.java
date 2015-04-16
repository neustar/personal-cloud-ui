/**
 * Copyright 2014 NeuStar, Inc. All rights reserved.
 * NeuStar, the Neustar logo and related names and logos are registered
 * trademarks, service marks or tradenames of NeuStar, Inc. All other
 * product names, company names, marks, logos and symbols may be trademarks
 * of their respective owners.
 */
package biz.neustar.pc.ui.manager.impl;

import java.text.MessageFormat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import biz.neustar.pc.ui.constants.UIRestPathConstants;
import biz.neustar.pcloud.PCRestClient;
import biz.neustar.pcloud.ResponseData;
import biz.neustar.pcloud.rest.dto.CloudInfo;
import biz.neustar.pcloud.rest.dto.CloudValidation;

/**
 * Author: kvats Date: Apr 8, 2015 Time: 1:25:28 PM
 */
public class PersonalCloudManagerImpl {
    private final static Logger LOGGER = LoggerFactory
            .getLogger(PersonalCloudManagerImpl.class);
    /**
     * 
     */
    private PCRestClient pcRestClient;

    public PersonalCloudManagerImpl(PCRestClient pcRestClient) {
        this.pcRestClient = pcRestClient;
    }

    public String isCloudNameAvailable(String cloudName) {
        LOGGER.info("Check if cloud name {} is available.", cloudName);
        ResponseData responseData = pcRestClient.get(MessageFormat.format(
                UIRestPathConstants.NAME_AVAILABILITY_API, cloudName));
        return responseData.getBody();

    }

    public String validateDetailsAndGenerateSecurityCode(
            CloudValidation cloudValidation) {
        LOGGER.info(
                "Validate details and generate security codes for identifier {}",
                cloudValidation.getIdentifier());
        ResponseData responseData = pcRestClient.post(
                UIRestPathConstants.GENERATE_SECURITY_CODES, cloudValidation);
        return responseData.getBody();
    }

    public String validateSecurityCodes(CloudValidation cloudValidation) {
        LOGGER.info("Validate security codes for identifier {}",
                cloudValidation.getIdentifier());
        ResponseData responseData = pcRestClient.post(
                UIRestPathConstants.VALIDATE_SECURITY_CODES, cloudValidation);
        return responseData.getBody();
    }

    public String registerPersonalCloud(String cspCloudName, CloudInfo cloudInfo) {
        LOGGER.info("Register cloud name {} for {}", cloudInfo.getProperties()
                .getCloudName(), cspCloudName);
        ResponseData responseData = pcRestClient.post(MessageFormat.format(
                UIRestPathConstants.REGISTER_PERSONAL_CLOUD_API, cspCloudName),
                cloudInfo);
        return responseData.getBody();
    }
}

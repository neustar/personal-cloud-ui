/**
 * Copyright 2014 NeuStar, Inc. All rights reserved.
 * NeuStar, the Neustar logo and related names and logos are registered
 * trademarks, service marks or tradenames of NeuStar, Inc. All other
 * product names, company names, marks, logos and symbols may be trademarks
 * of their respective owners.
 */
package biz.neustar.pc.ui.manager.impl;

import java.io.IOException;
import java.text.MessageFormat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import biz.neustar.pc.ui.constants.UIRestPathConstants;
import biz.neustar.pcloud.PCRestClient;
import biz.neustar.pcloud.ResponseData;
import biz.neustar.pcloud.rest.constants.ProductNames;
import biz.neustar.pcloud.rest.dto.CloudInfo;
import biz.neustar.pcloud.rest.dto.CloudValidation;
import biz.neustar.pcloud.rest.dto.PaymentInfo;
import biz.neustar.pcloud.rest.dto.PaymentResponse;
import biz.neustar.pcloud.rest.dto.SynonymInfo;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.jersey.api.representation.Form;

/**
 * Author: kvats Date: Apr 8, 2015 Time: 1:25:28 PM
 */
public class PersonalCloudManagerImpl implements PersonalCloudManager {
    private final static Logger LOGGER = LoggerFactory.getLogger(PersonalCloudManagerImpl.class);
    /**
     * 
     */
    private PCRestClient pcRestClient;

    public PersonalCloudManagerImpl(PCRestClient pcRestClient) {
        this.pcRestClient = pcRestClient;
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * biz.neustar.pc.ui.manager.impl.PersonalCloudManager#isCloudNameAvailable
     * (java.lang.String)
     */
    @Override
    public String isCloudNameAvailable(String cloudName) {
        LOGGER.info("Check if cloud name {} is available.", cloudName);
        ResponseData responseData = pcRestClient.get(MessageFormat.format(UIRestPathConstants.NAME_AVAILABILITY_API,
                cloudName));
        return responseData.getBody();

    }

    /*
     * (non-Javadoc)
     * 
     * @see biz.neustar.pc.ui.manager.impl.PersonalCloudManager#
     * validateDetailsAndGenerateSecurityCode
     * (biz.neustar.pcloud.rest.dto.CloudValidation)
     */
    @Override
    public String validateDetailsAndGenerateSecurityCode(CloudValidation cloudValidation) {
        LOGGER.info("Validate details and generate security codes for identifier {}", cloudValidation.getIdentifier());
        ResponseData responseData = pcRestClient.post(UIRestPathConstants.GENERATE_SECURITY_CODES, cloudValidation);
        return responseData.getBody();
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * biz.neustar.pc.ui.manager.impl.PersonalCloudManager#validateSecurityCodes
     * (biz.neustar.pcloud.rest.dto.CloudValidation)
     */
    @Override
    public String validateSecurityCodes(CloudValidation cloudValidation) {
        LOGGER.info("Validate security codes for identifier {}", cloudValidation.getIdentifier());
        ResponseData responseData = pcRestClient.post(UIRestPathConstants.VALIDATE_SECURITY_CODES, cloudValidation);
        return responseData.getBody();
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * biz.neustar.pc.ui.manager.impl.PersonalCloudManager#registerPersonalCloud
     * (java.lang.String, biz.neustar.pcloud.rest.dto.CloudInfo)
     */
    @Override
    public String registerPersonalCloud(String cspCloudName, CloudInfo cloudInfo) {
        LOGGER.info("Register cloud name {} for {}", cloudInfo.getProperties().getCloudName(), cspCloudName);
        ResponseData responseData = pcRestClient.post(
                MessageFormat.format(UIRestPathConstants.REGISTER_PERSONAL_CLOUD_API, cspCloudName), cloudInfo);
        return responseData.getBody();
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * biz.neustar.pc.ui.manager.impl.PersonalCloudManager#registerSynonyms(
     * java.lang.String, java.lang.String,
     * biz.neustar.pcloud.rest.dto.SynonymInfo)
     */
    @Override
    public String registerSynonyms(String cspCloudName, String cloudName, SynonymInfo synonymInfo) {
        LOGGER.info("Register synonym cloud name {} for {}", synonymInfo.getSynonymCloudNames().toString(), cloudName);
        ResponseData responseData = pcRestClient
                .post(MessageFormat.format(UIRestPathConstants.SYNONYMS_CLOUD_NAME_API, cspCloudName, cloudName),
                        synonymInfo);
        return responseData.getBody();
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * biz.neustar.pc.ui.manager.impl.PersonalCloudManager#getAllSynonyms(java
     * .lang.String, java.lang.String)
     */
    @Override
    public String getAllSynonyms(String cspCloudName, String cloudName) {
        LOGGER.info("Get all synonym cloud names for {}", cloudName);
        ResponseData responseData = pcRestClient.get(MessageFormat.format(UIRestPathConstants.SYNONYMS_CLOUD_NAME_API,
                cspCloudName, cloudName));
        return responseData.getBody();
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * biz.neustar.pc.ui.manager.impl.PersonalCloudManager#getAllDependents(
     * java.lang.String, java.lang.String)
     */
    @Override
    public String getAllDependents(String cspCloudName, String cloudName) {
        LOGGER.info("Get all dependent cloud names for {}", cloudName);
        ResponseData responseData = pcRestClient.get(MessageFormat.format(UIRestPathConstants.GET_DEPENDENTS_API,
                cspCloudName, cloudName));
        return responseData.getBody();
    }

    public String authenticatePersonalCloud(String cspCloudName, String cloudName, String password) {
        LOGGER.info("In authenticate cloud name {} and csp {}", cloudName, cspCloudName);
        Form form = new Form();
        form.add("password", password);
        ResponseData responseData = pcRestClient.post(
                MessageFormat.format(UIRestPathConstants.PERSONAL_CLOUD_AUTH_API, cspCloudName, cloudName), form);
        return responseData.getBody();
    }

    public String resetPassword(String cspCloudName, String cloudName, CloudValidation cloudValidation) {
        LOGGER.info("In reset password for cloud name {} and csp {}", cloudName, cspCloudName);
        ResponseData responseData = pcRestClient.post(
                MessageFormat.format(UIRestPathConstants.PERSONAL_CLOUD_RESET_PASSWORD_API, cspCloudName, cloudName),
                cloudValidation);
        return responseData.getBody();
    }

    public String forgotPassword(String cspCloudName, String cloudName, CloudValidation cloudValidation) {
        LOGGER.info("In forgot password for cloud name {} and csp {}", cloudName, cspCloudName);
        ResponseData responseData = pcRestClient.post(
                MessageFormat.format(UIRestPathConstants.PERSONAL_CLOUD_FORGOT_PASSWORD_API, cspCloudName, cloudName),
                cloudValidation);
        return responseData.getBody();
    }

    public PaymentResponse processPayment(ProductNames productName, PaymentInfo paymentInfo) {
        ResponseData responseData = pcRestClient.post(
                MessageFormat.format(UIRestPathConstants.PAYMENT_API, productName), paymentInfo);
        PaymentResponse paymentResponse = null;
        try {
            paymentResponse = new ObjectMapper().readValue(responseData.getBody(), PaymentResponse.class);
        } catch (IOException e) {
            LOGGER.debug("Error while reading payment response.");
            e.printStackTrace();
        }
        return paymentResponse;
    }
}

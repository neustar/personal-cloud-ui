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

import java.text.MessageFormat;

import org.apache.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import biz.neustar.pc.ui.constants.UIRestPathConstants;
import biz.neustar.pc.ui.exception.PCloudUIException;
import biz.neustar.pcloud.PCRestClient;
import biz.neustar.pcloud.ResponseData;
import biz.neustar.pcloud.rest.constants.ProductNames;
import biz.neustar.pcloud.rest.dto.CloudInfo;
import biz.neustar.pcloud.rest.dto.CloudValidation;
import biz.neustar.pcloud.rest.dto.DependentList;
import biz.neustar.pcloud.rest.dto.PaymentInfo;
import biz.neustar.pcloud.rest.dto.PaymentResponse;
import biz.neustar.pcloud.rest.dto.Synonym;
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
    public PCloudResponse isCloudNameAvailable(String cloudName) {
        LOGGER.info("Check if cloud name {} is available.", cloudName);
        return handleException(
                pcRestClient.get(MessageFormat.format(UIRestPathConstants.NAME_AVAILABILITY_API, cloudName)),
                PCloudResponse.class);

    }

    /*
     * (non-Javadoc)
     * 
     * @see biz.neustar.pc.ui.manager.impl.PersonalCloudManager#
     * validateDetailsAndGenerateSecurityCode
     * (biz.neustar.pcloud.rest.dto.CloudValidation)
     */
    @Override
    public PCloudResponse validateDetailsAndGenerateSecurityCode(CloudValidation cloudValidation) {
        LOGGER.info("Validate details and generate security codes for identifier {}", cloudValidation.getIdentifier());
        return handleException(pcRestClient.post(UIRestPathConstants.GENERATE_SECURITY_CODES, cloudValidation),
                PCloudResponse.class);
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * biz.neustar.pc.ui.manager.impl.PersonalCloudManager#validateSecurityCodes
     * (biz.neustar.pcloud.rest.dto.CloudValidation)
     */
    @Override
    public PCloudResponse validateSecurityCodes(CloudValidation cloudValidation) {
        LOGGER.info("Validate security codes for identifier {}", cloudValidation.getIdentifier());
        return handleException(pcRestClient.post(UIRestPathConstants.VALIDATE_SECURITY_CODES, cloudValidation),
                PCloudResponse.class);
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * biz.neustar.pc.ui.manager.impl.PersonalCloudManager#registerPersonalCloud
     * (java.lang.String, biz.neustar.pcloud.rest.dto.CloudInfo)
     */
    @Override
    public PCloudResponse registerPersonalCloud(String cspCloudName, CloudInfo cloudInfo) {
        LOGGER.info("Register cloud name {} for {}", cloudInfo.getProperties().getCloudName(), cspCloudName);
        return handleException(pcRestClient.post(
                MessageFormat.format(UIRestPathConstants.REGISTER_PERSONAL_CLOUD_API, cspCloudName), cloudInfo),
                PCloudResponse.class);
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
    public PCloudResponse registerSynonyms(String cspCloudName, String cloudName, SynonymInfo synonymInfo) {
        LOGGER.info("Register synonym cloud name {} for {}", synonymInfo.getSynonymCloudNames().toString(), cloudName);
        return handleException(
                pcRestClient.post(
                        MessageFormat.format(UIRestPathConstants.SYNONYMS_CLOUD_NAME_API, cspCloudName, cloudName),
                        synonymInfo), PCloudResponse.class);
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * biz.neustar.pc.ui.manager.impl.PersonalCloudManager#getAllSynonyms(java
     * .lang.String, java.lang.String)
     */
    @Override
    public Synonym getAllSynonyms(String cspCloudName, String cloudName) {
        LOGGER.info("Get all synonym cloud names for {}", cloudName);
        return handleException(pcRestClient.get(MessageFormat.format(UIRestPathConstants.SYNONYMS_CLOUD_NAME_API,
                cspCloudName, cloudName)), Synonym.class);
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * biz.neustar.pc.ui.manager.impl.PersonalCloudManager#getAllDependents(
     * java.lang.String, java.lang.String)
     */
    @Override
    public DependentList getAllDependents(String cspCloudName, String cloudName) {
        LOGGER.info("Get all dependent cloud names for {}", cloudName);
        return handleException(
                pcRestClient.get(MessageFormat.format(UIRestPathConstants.GET_DEPENDENTS_API, cspCloudName, cloudName)),
                DependentList.class);
    }

    public ResponseData authenticatePersonalCloud(String cspCloudName, String cloudName, String password) {
        LOGGER.info("In authenticate cloud name {} and csp {}", cloudName, cspCloudName);
        Form form = new Form();
        form.add("password", password);
        return handleException(pcRestClient.post(
                MessageFormat.format(UIRestPathConstants.PERSONAL_CLOUD_AUTH_API, cspCloudName, cloudName), form),
                ResponseData.class);
    }

    public PCloudResponse resetPassword(String cspCloudName, String cloudName, CloudValidation cloudValidation) {
        LOGGER.info("In reset password for cloud name {} and csp {}", cloudName, cspCloudName);
        return handleException(pcRestClient.post(
                MessageFormat.format(UIRestPathConstants.PERSONAL_CLOUD_RESET_PASSWORD_API, cspCloudName, cloudName),
                cloudValidation), PCloudResponse.class);
    }

    public PCloudResponse forgotPassword(String cspCloudName, String cloudName, CloudValidation cloudValidation) {
        LOGGER.info("In forgot password for cloud name {} and csp {}", cloudName, cspCloudName);
        return handleException(pcRestClient.post(
                MessageFormat.format(UIRestPathConstants.PERSONAL_CLOUD_FORGOT_PASSWORD_API, cspCloudName, cloudName),
                cloudValidation), PCloudResponse.class);
    }

    public PaymentResponse processPayment(ProductNames productName, PaymentInfo paymentInfo) {
        return handleException(
                pcRestClient.post(MessageFormat.format(UIRestPathConstants.PAYMENT_API, productName), paymentInfo),
                PaymentResponse.class);
    }

    @Override
    public PCloudResponse changePassword(String cspCloudName, String cloudName, CloudValidation cloudValidation) {
        LOGGER.info("In changePassword for cloud name {} and csp {}", cloudName, cspCloudName);
        return handleException(pcRestClient.post(
                MessageFormat.format(UIRestPathConstants.PERSONAL_CLOUD_CHANGE_PASSWORD_API, cspCloudName, cloudName),
                cloudValidation), PCloudResponse.class);
    }

    @SuppressWarnings("unchecked")
    public <Entity> Entity handleException(ResponseData responsedata, Class<Entity> entityType) {
        int status = responsedata.getStatus();
        Entity entity = null;
        if (!(status == HttpStatus.SC_OK || status == HttpStatus.SC_CREATED || status == HttpStatus.SC_NO_CONTENT)) {
            throw new PCloudUIException(responsedata.getBody(), responsedata.getStatus());
        } else {

            try {

                entity = entityType.cast(new ObjectMapper().readValue(responsedata.getBody(), entityType));

            } catch (Exception e) {
                LOGGER.info("inside exception");
                e.printStackTrace();
            }

        }
        return entity;

    }
}

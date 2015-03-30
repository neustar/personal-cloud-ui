/**
 * Copyright 2014 NeuStar, Inc. All rights reserved.
 * NeuStar, the Neustar logo and related names and logos are registered
 * trademarks, service marks or tradenames of NeuStar, Inc. All other
 * product names, company names, marks, logos and symbols may be trademarks
 * of their respective owners.
 */
package biz.neustar.pc.ui.manager.impl;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import biz.neustar.pc.ui.manager.PaymentManager;
import biz.neustar.pcloud.PCRestClient;
import biz.neustar.pcloud.ResponseData;
import biz.neustar.pcloud.rest.dto.PaymentInfo;
import biz.neustar.pcloud.rest.dto.PaymentResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Author: kvats Date: Mar 26, 2015 Time: 4:01:34 PM
 */
public class PaymentManagerImpl implements PaymentManager {
    private Logger LOGGER = LoggerFactory.getLogger(PaymentManagerImpl.class);
    private final String paymentApiUri = "/products/{}/payments";
    private final PCRestClient pcRestClient;

    public PaymentManagerImpl(PCRestClient pcRestClient) {
        this.pcRestClient = pcRestClient;
    }

    @Override
    public PaymentResponse savePayment(PaymentInfo paymentInfo) {
        LOGGER.info("Saving payment info to db with reference id {}",
                paymentInfo.getPaymentReferenceId());
        PaymentResponse paymentResponse = null;
        ResponseData responseData = pcRestClient.post(paymentApiUri.replace(
                "{}", paymentInfo.getProductName().toString()), paymentInfo);
        try {
            paymentResponse = new ObjectMapper().readValue(
                    responseData.getBody(), PaymentResponse.class);
        } catch (IOException e) {
            LOGGER.warn("Error while parsing the response data. {}",
                    responseData.getBody());
            e.printStackTrace();
        }
        return paymentResponse;
    }

}

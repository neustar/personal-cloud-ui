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
import java.util.Collections;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import biz.neustar.pc.ui.constants.UIRestPathConstants;
import biz.neustar.pc.ui.manager.PaymentManager;
import biz.neustar.pcloud.PCRestClient;
import biz.neustar.pcloud.ResponseData;
import biz.neustar.pcloud.rest.dto.PaymentInfo;
import biz.neustar.pcloud.rest.dto.PaymentResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.ClientResponse.Status;

/**
 * Author: kvats Date: Mar 26, 2015 Time: 4:01:34 PM
 */
public class PaymentManagerImpl implements PaymentManager {
    private Logger LOGGER = LoggerFactory.getLogger(PaymentManagerImpl.class);
    private final PCRestClient pcRestClient;

    public PaymentManagerImpl(PCRestClient pcRestClient) {
        this.pcRestClient = pcRestClient;
    }

    @Override
    public PaymentResponse savePayment(PaymentInfo paymentInfo) {
        LOGGER.info("Saving payment info to db with reference id {}",
                paymentInfo.getPaymentReferenceId());
        PaymentResponse paymentResponse = null;
        ResponseData responseData = pcRestClient.post(MessageFormat.format(
                UIRestPathConstants.PAYMENT_API_URI, paymentInfo
                        .getProductName().toString()), paymentInfo);
        LOGGER.debug("Response data for payment: " + responseData.toString());
        if (isError(responseData)) {
            throw new RuntimeException("Error.............................");

        }
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

    /**
     * @param responseData
     * @return
     */
    private boolean isError(ResponseData responseData) {
        if (!Status.getFamilyByStatusCode(responseData.getStatus()).toString()
                .equals("SUCCESSFUL")) {
            return true;
        }
        return false;
    }

    private Map<String, Object> getErrorResponse(ClientResponse clientResponse) {
        try {
            clientResponse.bufferEntity();
            // copy buffer to a string and put back a copy
            final ClientResponse finalClientResponse = clientResponse;
            String buffer = IOUtils.toString(
                    finalClientResponse.getEntityInputStream(), "UTF-8");
            LOGGER.info(buffer);
            LOGGER.info(buffer.toString());
            return new ObjectMapper().readValue(buffer, Map.class);
        } catch (Exception e) {
            // just eat the exception -- something else went wrong, it'll be
            // found when the content is re-read
            // by higher-level code
            LOGGER.warn(
                    "Had a bad request that wasn't related to an auth issue.  ",
                    e);
            return Collections.emptyMap();
        }
    }
}

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

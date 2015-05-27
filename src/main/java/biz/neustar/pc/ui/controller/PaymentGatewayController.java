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

import java.io.IOException;
import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import biz.neustar.pc.ui.manager.PaymentManager;
import biz.neustar.pc.ui.payment.processor.StripePaymentProcessor;
import biz.neustar.pc.ui.utils.UIUtil;
import biz.neustar.pcloud.PCRestClient;
import biz.neustar.pcloud.ResponseData;
import biz.neustar.pcloud.rest.constants.PaymentType;
import biz.neustar.pcloud.rest.constants.ProductNames;
import biz.neustar.pcloud.rest.dto.CSPInfo;
import biz.neustar.pcloud.rest.dto.PaymentInfo;
import biz.neustar.pcloud.rest.dto.PaymentResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

/**
 * Author: kvats Date: Mar 19, 2015 Time: 12:51:06 PM
 */
@Controller
// @RequestMapping(value = "/controller")
public class PaymentGatewayController {

    static {
        System.out.println("Servlet loaded");
    }
    private Logger LOGGER = LoggerFactory
            .getLogger(PaymentGatewayController.class);
    private final String getCspUri = "/v1/csps/";
    @Autowired
    private PCRestClient pcRestClient;
    private Gson gson = new Gson();
    private ObjectMapper mapper = new ObjectMapper();
    @Autowired
    private PaymentManager paymentManager;

    @RequestMapping(value = "/payment", method = RequestMethod.GET)
    public ModelAndView payment(Model model, HttpServletRequest request,
            HttpServletResponse response) {
        System.out.println("In payment method :");
        ModelAndView mv = new ModelAndView("payment");
        mv.addObject("paymentGateway", "STRIPE");
        mv.addObject("postURL", request.getContextPath() + "/processPayment");
        return mv;

    }

    @RequestMapping(value = "/processPayment", method = RequestMethod.POST)
    public @ResponseBody
    PaymentResponse processPayment(@RequestBody final PaymentInfo paymentInfo,
            HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "cspCloudName") final String cspCloudName) {
        System.out.println("In processPayment method :");
        CSPInfo cspInfo = getCSPDetails(UIUtil
                .fixBusinessCloudName(cspCloudName));
        // String token = StripePaymentProcessor.getToken(request);
        PaymentInfo payment = StripePaymentProcessor.makePayment(cspInfo,
                new BigDecimal(paymentInfo.getAmount()),
                paymentInfo.getCurrency(), "Personal cloud payment.",
                paymentInfo.getPaymentReferenceId());
        payment.setProductName(ProductNames.PCN);
        payment.setPaymentType(PaymentType.CREDIT_CARD.name());
        return paymentManager.savePayment(payment);

    }

    /**
     * This method make a Res api GET request to fetch CSP details.
     * 
     * @param cspCloudName
     *            Name of the csp.
     * @return CSPInfo Csp details object.
     */
    private CSPInfo getCSPDetails(String cspCloudName) {
        CSPInfo cspInfo = null;
        ResponseData responseData = pcRestClient.get(getCspUri + cspCloudName);
        if (responseData != null) {
            try {
                cspInfo = mapper.readValue(responseData.getBody(),
                        CSPInfo.class);
            } catch (IOException e) {
                LOGGER.warn("Error while parsing the response data. {}",
                        responseData.getBody());
                e.printStackTrace();
            }
            LOGGER.debug("CSPInfo :  {}", cspInfo);
        }
        return cspInfo;
    }
}

/**
 * Copyright 2014 NeuStar, Inc. All rights reserved.
 * NeuStar, the Neustar logo and related names and logos are registered
 * trademarks, service marks or tradenames of NeuStar, Inc. All other
 * product names, company names, marks, logos and symbols may be trademarks
 * of their respective owners.
 */
package biz.neustar.pc.ui.manager;

import biz.neustar.pcloud.rest.dto.PaymentInfo;
import biz.neustar.pcloud.rest.dto.PaymentResponse;

/**
 * Author: kvats Date: Mar 26, 2015 Time: 3:56:34 PM
 */
public interface PaymentManager {

    PaymentResponse savePayment(PaymentInfo paymentInfo);
}

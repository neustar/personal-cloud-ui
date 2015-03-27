package biz.neustar.pc.ui.payment.processor;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import biz.neustar.pcloud.rest.dto.CSPInfo;
import biz.neustar.pcloud.rest.dto.PaymentInfo;

import com.stripe.exception.APIConnectionException;
import com.stripe.exception.APIException;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

public class StripePaymentProcessor {
    private static final Logger logger = LoggerFactory
            .getLogger(StripePaymentProcessor.class);

    private static long getAmount(BigDecimal amount) {
        long rtn = amount.multiply(BigDecimal.valueOf(100.0))
                .setScale(0, BigDecimal.ROUND_HALF_UP).longValue();

        logger.info("getAmount(" + amount + ") = " + rtn);

        return rtn;
    }

    public static String getToken(HttpServletRequest request) {
        String rtn = null;

        String code = request.getParameter("code");
        String token = request.getParameter("stripeToken");

        logger.info("code = " + code + " token = " + token);
        if ((code != null) && (code.isEmpty() == false)) {
            // this is an oAuth connect request
            logger.error("oAuth connect request - code - " + code);
            return rtn;
        }

        if ((token == null) || (token.isEmpty() == true)) {
            logger.error("token is null or empty = " + token);
            return rtn;
        }

        rtn = token;
        return rtn;
    }

    public static PaymentInfo makePayment(CSPInfo csp, BigDecimal amount,
            String currency, String dsc, String token) {
        PaymentInfo paymentInfo = null;
        String desc = "";
        if (dsc == null || dsc.isEmpty()) {
            desc = "Purchase personal clouds";
        } else {
            desc = dsc;
        }

        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", "" + getAmount(amount));
        chargeParams.put("currency", currency);
        chargeParams.put("source", token);
        chargeParams.put("description", desc);

        try {
            logger.info("try make payment - " + chargeParams);
            Charge rsp = Charge.create(chargeParams,
                    csp.getPaymentGatewayPassword());
            logger.info(rsp.toString());
            logger.info("make payment is successful - id = " + rsp.getId()
                    + " invoice = " + rsp.getInvoice());

            paymentInfo = new PaymentInfo();
            paymentInfo.setPaymentReferenceId(token);
            paymentInfo.setPaymentResponseCode(rsp.getId());
            paymentInfo.setAmount(amount.doubleValue());
            paymentInfo.setCurrency(currency);

            logger.info("payment = " + paymentInfo);
        } catch (CardException e) {
            // Since it's a decline, CardException will be caught
            logger.info("status is - " + e.getCode());
            logger.info("message is - " + e.getParam());
            logger.error("Payment failure", e);
        } catch (InvalidRequestException e) {
            // Invalid parameters were supplied to Stripe's API
            logger.error("Payment failure", e);
        } catch (AuthenticationException e) {
            // Authentication with Stripe's API failed (maybe the API key is
            // wrong)
            logger.error("Payment failure", e);
        } catch (APIConnectionException e) {
            // Network communication with Stripe failed
            // FIXME - retry?
            logger.error("Payment failure", e);
        } catch (APIException e) {
            // FIXME - ???
            logger.error("Payment failure", e);
        } catch (StripeException e) {
            // Display a very generic error to the user, and maybe send a
            // warning email
            logger.error("Payment failure", e);
        } catch (Exception e) {
            // Something else happened, completely unrelated to Stripe
            logger.error("Payment failure", e);
        }

        return paymentInfo;
    }
}

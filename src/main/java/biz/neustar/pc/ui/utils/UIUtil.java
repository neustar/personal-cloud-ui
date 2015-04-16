/**
 * Copyright 2014 NeuStar, Inc. All rights reserved.
 * NeuStar, the Neustar logo and related names and logos are registered
 * trademarks, service marks or tradenames of NeuStar, Inc. All other
 * product names, company names, marks, logos and symbols may be trademarks
 * of their respective owners.
 */
package biz.neustar.pc.ui.utils;

/**
 * Author: kvats Date: Apr 8, 2015 Time: 6:43:21 PM
 */
public class UIUtil {

    public static String fixBusinessCloudName(String cloudName) {
        if (cloudName != null && !cloudName.startsWith("+")) {
            StringBuilder stringBuilder = new StringBuilder("+");
            stringBuilder.append(cloudName.trim());
            return stringBuilder.toString();
        }
        return cloudName;
    }

    public static String fixPersonalCloudName(String cloudName) {
        if (cloudName != null && !cloudName.startsWith("=")) {
            StringBuilder stringBuilder = new StringBuilder("=");
            stringBuilder.append(cloudName.trim());
            return stringBuilder.toString();
        }
        return cloudName;
    }
}

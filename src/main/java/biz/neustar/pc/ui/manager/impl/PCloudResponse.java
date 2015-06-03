package biz.neustar.pc.ui.manager.impl;

import biz.neustar.pcloud.rest.dto.TokenResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties
public class PCloudResponse {

    String message;
    TokenResponse tokenResponse;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public PCloudResponse(String message) {
        super();
        this.message = message;
    }

    public PCloudResponse() {
        super();
        // TODO Auto-generated constructor stub
    }

}

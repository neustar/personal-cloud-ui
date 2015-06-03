package biz.neustar.pc.ui.exception;

public class PCloudUIException extends RuntimeException{

	/**
     * 
     */
    private static final long serialVersionUID = 1L;
    int errorCode;
    String errorMessage;
	int statusCode;
	
	/**
     * @return the errorCode
     */
    public int getErrorCode() {
        return errorCode;
    }
    /**
     * @param errorCode the errorCode to set
     */
    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }
    public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public PCloudUIException(int errorCode, String errorMessage, int statusCode) {
		super();
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
		this.statusCode = statusCode;
	}
	public PCloudUIException(String errorMessage) {
		super();
		this.errorMessage = errorMessage;
	}
	@Override
	public String toString() {
		return "PCloudUIException [errorCode="+errorCode+",errorMessage=" + errorMessage
				+ ", statusCode=" + statusCode + "]";
	}
	
}

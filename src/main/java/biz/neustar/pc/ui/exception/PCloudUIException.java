package biz.neustar.pc.ui.exception;

public class PCloudUIException extends RuntimeException{

	String errorMessage;
	int statusCode;
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
	public PCloudUIException(String errorMessage, int statusCode) {
		super();
		this.errorMessage = errorMessage;
		this.statusCode = statusCode;
	}
	public PCloudUIException(String errorMessage) {
		super();
		this.errorMessage = errorMessage;
	}
	@Override
	public String toString() {
		return "PCloudUIException [errorMessage=" + errorMessage
				+ ", statusCode=" + statusCode + "]";
	}
	
}

package com.songwy.javatutorial;

import javax.jws.WebService;

@WebService
public class WebServiceSample {
	public void construct() {
		
	}
	
	public String hello(String s) {
		return "Hello " + s;
	}

}

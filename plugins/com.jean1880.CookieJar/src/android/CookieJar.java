/*
 * Copyright 2015 Jean-Luc Desroches
 * https://github.com/jean1880
 * http://www.jeanlucdesroches.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


package com.jean1880.CookieJar;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;
import android.webkit.CookieManager;

import java.lang.String;

import java.io.IOException;
import java.util.Map;

/**
 * Handles interaction with cookies for Cordova
 * @class Cookies
 * @uses CordovaPlugin
 */
public class CookieJar extends CordovaPlugin {

    // Plugin Tag
	private final String TAG = "CookieJar";
    private CallbackContext callback;
    private enum ACTION {
        CLEAR,
        GET,
        SET
    }

    /**
     * Handles the class execution call
     * @param action  Action to perform in the plugin
     * @param args JSONArray object passed innto the function
     * @param callbackContext
     * @return
     * @throws JSONException
     */
	@Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        // set callback
        this.callback = callbackContext;
        boolean success = false;

        // Check action call
        if(action.equalsIgnoreCase("clear")) {
            this.clear();
            this.callback.success();
            success = true;
        }else if(action.equalsIgnoreCase("get")) {
            JSONObject Options = args.getJSONObject(0);
            String URL = null;
            String target = null;
            try {
                URL = Options.get("URL").toString();
                try {
                    target = Options.get("target").toString();
                } catch (JSONException er) {
                }

                // return string
                String result = null;
                if (target != null) {
                    result = get(URL, target);
                } else {
                    result = get(URL);
                }

                // check return
                if (result != "ERROR") {
                    success = true;
                    this.callback.success(result);
                } else {
                    success = false;
                }
            } catch (JSONException er) {
                this.callback.error("Expected 'URL' object in options");
                success = false;
            }
        }else {
                this.callback.error("Unknown action");
                success = false;
        }

        return success;
    }

    /**
     * Clears all local cookies
     */
	public void clear() {
		Log.v(TAG, "Clearing cookies...");
        try{
            CookieManager.getInstance().removeAllCookie();
        }catch (Exception er){
            this.callback.error(er.getMessage());
        }
    }

    /**
     * Get all cookies for specified URL
     * @param URL
     */
    public String get(String URL){
		Log.v(TAG, "Fetching cookies for " + URL +"...");
        try{
            String cookies[] = CookieManager.getInstance().getCookie(URL).replace(";", "").split(" ");

            JSONObject objectSet = new JSONObject();
            // build return json
            for (int i = 0; i < cookies.length; i++) {
                String[] set = cookies[i].split("=");
                objectSet.put(set[0],set[1]);
            }

            return objectSet.toString();
        }catch (Exception er){
            this.callback.error(er.getMessage());
            return "ERROR";
        }
    }

    /**
     * Get target cookie for specified URL
     * @param URL
     * @param target
     */
    public String get(String URL, String target){
        Log.v(TAG, "Fetching cookies for " + URL +" by key " + target + "...");
        try{
            return CookieManager.getInstance().getCookie(URL);
        }catch (Exception er){
            this.callback.error(er.getMessage());
            return "ERROR";
        }
    }
	

}

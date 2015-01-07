package com.teksyndicate.views;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.teksyndicate.R;

import android.content.Context;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.Space;

public class CommentListView extends LinearLayout
{
	String topicKey;
	Context context;
	
	public CommentListView(Context context) 
	{
		super(context);
	}
	
	public CommentListView(Context context, String topicKey)
	{
		super(context);
		
		this.setOrientation(LinearLayout.VERTICAL);
		this.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 1f));
		
		try
		{
			String requestAddress = getResources().getString(R.string.api_root); //API address
			requestAddress += "forum-topic-comments/"; //should be the last part of api address, the 'tag'
			requestAddress += topicKey;
			StringBuilder url = new StringBuilder(requestAddress);
			HttpClient client = new DefaultHttpClient();
			HttpGet get = new HttpGet(url.toString());
			HttpResponse r = client.execute(get);
			int status = r.getStatusLine().getStatusCode();
			if(status >= 200 && status < 300) //if code is success code
			{
				HttpEntity e = r.getEntity();
				
				InputStream content = e.getContent(); //prepare to read
				BufferedReader br = new BufferedReader(new InputStreamReader(content)); //buffer the read
				StringBuilder builder = new StringBuilder();
				String line;
				
				while((line = br.readLine()) != null) //READ the lines
				{
					builder.append(line);
				}
				
				//this was a pain
				JSONObject json = new JSONObject(builder.toString()); //create new object
				JSONArray comments = json.getJSONArray("nodes"); //get the nodes
				
				Space s = new Space(context);
				s.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, 15));
				addView(s);
				s = new Space(context);
				s.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, 15));
				addView(s);
				
				for(int i=0;i<comments.length();i++)
				{
					addView(new CommentView(context, new JSONObject(comments.getJSONObject(i).getString("node")))); //get one node
				}
			}
		}
		//ERROR handling
		catch (UnsupportedEncodingException e) 
		{
			Log.e("BAD_ENCODE", e.getMessage());
			e.printStackTrace();
		} 
		catch (ClientProtocolException e) 
		{
			Log.e("CLIENT_PROTOCOL_ERROR", e.getMessage());
			e.printStackTrace();
		} 
		catch (IOException e) 
		{
			Log.e("IO_ERROR", e.getMessage());
			e.printStackTrace();
		} 
		catch(JSONException e)
		{
			Log.e("JSON_ERROR", e.getMessage());
			e.printStackTrace();
		}
	}

}

package com.teksyndicate;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;
import android.webkit.WebView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.jsoup.*;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.util.ArrayList;

/**
 * Created by speedfox on 2/25/14.
 */
public class StoriesList
{

    public class Story
    {
        private String name;
        private String imgUrl;
        private String path;
        private Bitmap img;

        public String GetPath()
        {
            return path;
        }

        public String GetName()
        {
            return name;
        }

        public String GetImgUrl()
        {
            return imgUrl;
        }

        public Bitmap GetImg()
        {
            return img;
        }

    }

    public interface StoryUpdateObserver
    {
        public void DoUpdate();
    }

    private String storiesUrl ;
    private String storiesType;

    private ArrayList<Story> list;

    private StoryUpdateObserver observer;

    private Context context;

    public StoriesList(String type, String url, Context context)
    {
        storiesType = type;
        storiesUrl = url;
        this.context = context;
        Log.i("****INFO", "Will get stories from " + url);
        list = new ArrayList<Story>();
    }

    public void UpdateList()
    {
        RequestQueue requestQueue = Volley.newRequestQueue(this.context);

        Response.Listener<String> success = new Response.Listener<String>() {
			@Override
			public void onResponse(String str)
			{
				try
				{
					StoriesList.this.onPostRequest(str);
				}
				catch(Exception e)
				{
					Log.e("ERROR", "NOT SURE WHY");
				}
			}
        };

        Response.ErrorListener error = new Response.ErrorListener(){

            @Override
            public void onErrorResponse(VolleyError volleyError) {

            }
        };

        StringRequest req = new StringRequest(Request.Method.GET, storiesUrl, success, error);
        requestQueue.add(req);


    }

    protected void onPostRequest(String rawHtml) {
        Document document = Jsoup.parse(rawHtml);
        Element top = document.select(".view--content-by-tags-termid").get(0);
        Elements storyElements = top.select(".feed");
        list.clear();
        for(int i =0 ; i < storyElements.size(); i++)
            try {
                Element thisElem = storyElements.get(i);
                Element heading = thisElem.select("h3.feed-cn").get(0);
                String img = thisElem.select("img").get(0).attr("src");
                heading = heading.child(0);
                String path = heading.attr("href");
                String name = heading.text();
                Log.e("INFO", "Got story with " + name + "," + path + ", " + img);
                Story newStory = new Story();
                newStory.name = name;
                newStory.path = path;
                newStory.imgUrl = img;
                URL imgUri = new URL(img);
                //newStory.img = BitmapFactory.decodeStream(imgUri.openConnection().getInputStream());
                list.add(newStory);
            } catch (Exception e) {
                continue;
            }

        Log.i("INFO", "Got " + storyElements.size() + " stories for " + storiesType);
        if(null != observer)
        {
            observer.DoUpdate();
        }
    }

    public int GetCount()
    {
        return list.size();
    }

    public Story GetItemById(int i)
    {
        Story thisStory =  list.get(i);
        if(null == thisStory)
        {
            Log.e("ERROR:", "missing story number " + i);
        }

        return thisStory;
    }

    public void SetObserver(StoryUpdateObserver newObserver)
    {
        observer = newObserver;
    }


}

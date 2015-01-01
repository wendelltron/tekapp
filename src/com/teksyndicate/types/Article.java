package com.teksyndicate.types;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.Jsoup;

import android.annotation.SuppressLint;
import android.graphics.drawable.Drawable;
import android.util.Log;

public class Article
{
	private String termNodeTid;
	private String title;
	private String commentCount;
	private String createdByUserName;
	private String dateCreated;
	private String articleAddress;
	private String thumbNailAddress;
	private String topicKey;
	private String description;
	private String videoId;
	private Drawable thumbNail;
	private JSONObject json;
	
	/**
	 * Default Article
	 * Please NEVER use this
	 */
	public Article()
	{
		//not sure
	}
	
	/**
	 * Creates new Article
	 * @param toParse JSONObject containing ALL key values for an Article
	 */
	public Article(JSONObject toParse)
	{
		try
		{
			json = toParse;
			termNodeTid = toParse.getString("term_node_tid");
			title = Jsoup.parse(toParse.getString("title")).text();
			commentCount = Jsoup.parse(toParse.getString("comment_count")).text();
			createdByUserName = Jsoup.parse(toParse.getString("name")).text();
			dateCreated = toParse.getString("created");
			articleAddress = toParse.getString("view_node");
			thumbNailAddress = toParse.getString("field__news_thumb");
			topicKey = toParse.getString("Topic Key");
			description = Jsoup.parse(toParse.getString("Body")).text();
			if(!toParse.getString("video").toString().equals("null"))
			{
				String videoSource = Jsoup.parse(toParse.getString("video")).getElementsByAttribute("src").attr("src").toString();
				String[] splitSource = videoSource.split("/");
				videoId = splitSource[4].substring(0, splitSource[4].indexOf('?'));
			}
			else
			{
				videoId = toParse.getString("video");
			}
			URL url = new URL(thumbNailAddress);
			InputStream content = (InputStream)url.getContent();
			Drawable d = Drawable.createFromStream(content , "src");
			thumbNail = d;
		}
		catch(JSONException e)
		{
			Log.e("JSON_ERROR", e.getMessage());
			e.printStackTrace();
		}
		catch(IOException e)
		{
			Log.e("IO_ERROR", e.getMessage());
			e.printStackTrace();
		}
	}
	
	public String getTermNodeTid()
	{
		return termNodeTid;
	}
	
	/**
	 * Gets Title of Article
	 * @return title of article
	 */
	public String getTitle()
	{
		return title;
	}
	
	/**
	 * Gets number of comments on article
	 * @return comment count of article
	 */
	public String getCommentCount()
	{
		return commentCount;
	}
	
	/**
	 * Gets user name of whoever created the article
	 * @return user name of the creator
	 */
	public String getCreatedByUserName()
	{
		return createdByUserName;
	}
	
	@SuppressLint("SimpleDateFormat")
	public String getDateCreated()
	{
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");		
		String toReturn = dateCreated;
		
		try
		{
			toReturn = format.format(format.parse(dateCreated));
		}
		catch (ParseException e)
		{
			Log.e("DATE_PARSE_ERROR", e.getMessage());
			e.printStackTrace();
		}
		
		return toReturn;
	}
	
	public String getArticleAddress()
	{
		return articleAddress;
	}
	
	public String getThumbNailAddress()
	{
		return thumbNailAddress;
	}
	
	public String getTopicKey()
	{
		return topicKey;
	}
	
	public String getDescription()
	{
		return description;
	}
	
	public String getVideoId()
	{
		return videoId;
	}
	
	public Drawable getThumbNail()
	{
		return thumbNail;
	}
	
	public JSONObject getJSON()
	{
		return json;
	}
	
	@Override
	public String toString()
	{
		return getTitle() + " CREATED: " + getDateCreated() + " BY:" + getCreatedByUserName();
	}
}

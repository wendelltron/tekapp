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
	private String summary;
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
	 * @param jsonSummary JSONObject containing ALL key values for an Article
	 */
	public Article(JSONObject jsonSummary)
	{
		try
		{
			json = jsonSummary;
			termNodeTid = jsonSummary.getString("term_node_tid");
			title = Jsoup.parse(jsonSummary.getString("title")).text();
			commentCount = Jsoup.parse(jsonSummary.getString("comment_count")).text();
			createdByUserName = Jsoup.parse(jsonSummary.getString("name")).text();
			dateCreated = jsonSummary.getString("created");
			articleAddress = jsonSummary.getString("view_node");
			thumbNailAddress = jsonSummary.getString("field__news_thumb");
			topicKey = jsonSummary.getString("Topic Key");
			summary = Jsoup.parse(jsonSummary.getString("Body")).text();
			if(!jsonSummary.getString("video").toString().equals("null"))
			{
				String videoSource = Jsoup.parse(jsonSummary.getString("video")).getElementsByAttribute("src").attr("src").toString();
				String[] splitSource = videoSource.split("/");
				videoId = splitSource[4].substring(0, splitSource[4].indexOf('?'));
			}
			else
			{
				videoId = jsonSummary.getString("video");
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
	
	public Article(JSONObject jsonSummary, JSONObject story)
	{
		try
		{
			json = jsonSummary;
			termNodeTid = jsonSummary.getString("term_node_tid");
			title = Jsoup.parse(jsonSummary.getString("title")).text();
			commentCount = Jsoup.parse(jsonSummary.getString("comment_count")).text();
			createdByUserName = Jsoup.parse(jsonSummary.getString("name")).text();
			dateCreated = jsonSummary.getString("created");
			articleAddress = jsonSummary.getString("view_node");
			thumbNailAddress = jsonSummary.getString("field__news_thumb");
			topicKey = jsonSummary.getString("Topic Key");
			summary = Jsoup.parse(story.getString("Body")).text();
			if(!jsonSummary.getString("video").toString().equals("null"))
			{
				String videoSource = Jsoup.parse(jsonSummary.getString("video")).getElementsByAttribute("src").attr("src").toString();
				String[] splitSource = videoSource.split("/");
				videoId = splitSource[4].substring(0, splitSource[4].indexOf('?'));
			}
			else
			{
				videoId = jsonSummary.getString("video");
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
	
	public String getSummary()
	{
		return summary;
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

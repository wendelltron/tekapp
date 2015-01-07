package com.teksyndicate.views;

import com.teksyndicate.types.Article;

import android.content.Context;
import android.graphics.Color;
import android.util.Log;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

public class ArticleSummaryView extends GridLayout 
{
	RelativeLayout imgLayout;
	LinearLayout textLayout;
	Article article;
	
	/**
	 * Default Constructor
	 * @param context viewing context
	 */
	public ArticleSummaryView(Context context) 
	{
		super(context);
	}
	
	/**
	 * Custom Constructor
	 * @param context viewing context
	 * @param article viewing article
	 */
	public ArticleSummaryView(Context context, Article article, int screenWidth)
	{
		super(context); //because we are extending
		
		this.article = article; //set the article, can be used later for retrieval
		
		imgLayout = new RelativeLayout(context); //create new layout for thumbnail image
		imgLayout.setLayoutParams(new RelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT));
		
		ImageView imgView = new ImageView(context); //thumnail viewer
		imgView.setImageDrawable(article.getThumbNail()); //set drawable image
		imgLayout.addView(imgView); //add to image layout
		
		this.addView(imgLayout); //add image layout for viewing
		
		textLayout = new LinearLayout(context); //create new layout for all the text
		textLayout.setOrientation(LinearLayout.VERTICAL);
		
		LinearLayout.LayoutParams textLayoutParams = new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, 1.0f);
		textLayoutParams.setMargins(5, 2, 5, 2);		
		this.addView(textLayout); //add text layout for viewing
		
		int width = screenWidth;
		try
		{
			width = screenWidth - article.getThumbNail().getIntrinsicWidth();
		}
		catch(NullPointerException e)
		{
			Log.e("NULL_ERROR", "NULL Pointer Exception Occured");
			e.printStackTrace();
			
			textLayoutParams = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 1.0f);
			textLayoutParams.setMargins(5, 2, 5, 2);
		}
		
		TextView titleView = new TextView(context); //textview for title
		titleView.setText(article.getTitle()); //set title
		titleView.setLayoutParams(textLayoutParams); //set layout params
		titleView.setTextSize(18.0f); //set text size, big text, its a title
		titleView.setMaxLines(2); //set max number of lines, for text wrapping purposes
		titleView.setTextColor(Color.BLACK); //set text color, black in this case
		titleView.setWidth(width);
		textLayout.addView(titleView); //add to text layout
		
		TextView authorView = new TextView(context); //textview for author name
		String authorViewTxt = "Created By: " + article.getCreatedByUserName() + " on " + article.getDateCreated(); //text to be displayed author name and date created
		authorView.setText(authorViewTxt); //set text
		authorView.setLayoutParams(textLayoutParams); //set layout params
		authorView.setTextSize(15.0f); //set text size, mid size its still important info
		authorView.setTextColor(Color.BLACK); //set text color, black again
		authorView.setWidth(width);
		textLayout.addView(authorView); //add to text layout
		
		TextView descriptionView = new TextView(context); //textview for video description (waiting for JSON data)
		descriptionView.setText(article.getSummary()); //set summary
		descriptionView.setLayoutParams(textLayoutParams); //set layout params
		descriptionView.setWidth(width);
		textLayout.addView(descriptionView); //add to text layout
		
//		this.addView(imgLayout); //add image layout for viewing
//		this.addView(textLayout); //add text layout for viewing
	}
	
	/**
	 * Gets currently displayed Article
	 * @return currently displayed article
	 */
	public Article getArticle()
	{
		return article;
	}
	
	public void showSize()
	{
		Toast.makeText(textLayout.getContext(), "WIDTH: " + String.valueOf(textLayout.getWidth()), Toast.LENGTH_LONG).show();
	}
}

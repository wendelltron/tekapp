package com.teksyndicate.views;

import java.util.Date;

import org.json.JSONException;
import org.json.JSONObject;

import com.teksyndicate.R;
import com.teksyndicate.types.Article;

import android.app.Activity;
import android.app.FragmentTransaction;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayer.Provider;
import com.google.android.youtube.player.YouTubePlayerFragment;

public class ArticleView extends Activity
{
	Article toShow;
	
	LinearLayout storyLayout;
	TextView storyText;
	Button commentToggleButton;
	YouTubePlayerFragment youtube;
	Date pauseDate;

	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_story_view);
		
		storyLayout = (LinearLayout) findViewById(R.id.linearLayoutStory); //get linear layout
		
		youtube = (YouTubePlayerFragment) this.getFragmentManager().findFragmentById(R.id.youtubeFragment); //get the youtube player fragment
		
		youtube.initialize(getString(R.string.youtube_api_key), new initializationListener()); //initialize youtube player
		
		try
		{
			//try to grab the json string
			Bundle extras = getIntent().getExtras();
			new ArticleDownloader().execute(new JSONObject(extras.getString("JSON")));
		}
		catch(JSONException e)
		{
			//something went wrong
			Log.e("JSON_ERROR", e.getMessage());
			e.printStackTrace();
		}
		catch(NullPointerException e)
		{
			//uhhhhh
		}
		
		storyText = new TextView(ArticleView.this.getApplicationContext()); //create textview for all that wonderful text			
		storyLayout.addView(storyText); //add to linear layout
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu)
	{
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main_menu, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item)
	{
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings)
		{
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
	
	@Override
	public void onPause()
	{
		super.onPause();
		//we pause, no show this article again
		//could probably work on something to set like a time of pause
		//then on resume if been over so long, finish
		pauseDate = new Date();
	}
	
	@Override
	public void onResume()
	{
		super.onResume();
//		Date resumeDate = new Date();
//		Date diffDate = new Date(resumeDate.getTime() - pauseDate.getTime());
	}
	
	private class initializationListener implements YouTubePlayer.OnInitializedListener
	{

		@Override
		public void onInitializationFailure(Provider provider, YouTubeInitializationResult result) 
		{
			//initialization of youtube player failed
			Toast.makeText(ArticleView.this.getApplicationContext(), "YouTube Initialization Error", Toast.LENGTH_LONG).show();
		}

		@Override
		public void onInitializationSuccess(Provider provider, YouTubePlayer player, boolean restored) 
		{
			if(!restored) //restored from previous view
			{
				if(!toShow.getVideoId().equals("null")) //if article has a video
				{
					player.cueVideo(toShow.getVideoId()); //cue that baby up
					
					//will add setting option for autoplaying videos
				}
				else //well it dont have a video (must be a Dealzon)
				{
					//so we just hide that youtube fragment
					FragmentTransaction ft = ArticleView.this.getFragmentManager().beginTransaction();
					ft.hide(youtube);
					ft.commit();
				}
			}
		}		
	}
	
	private class ArticleDownloader extends AsyncTask<JSONObject, Void, Void>
	{

		@Override
		protected Void doInBackground(JSONObject... params)
		{
			toShow = new Article(params[0]); //setup article that needs to be shown
			
			return null;
		}
		
		@Override
		protected void onPostExecute(Void v)
		{
			storyText.setText(toShow.getDescription()); //set the story text to the article text
			
			ArticleView.this.setTitle(toShow.getTitle()); //change the title
		}
	}
}

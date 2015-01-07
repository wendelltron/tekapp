package com.teksyndicate.views;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.Date;

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
import com.teksyndicate.types.Article;

import android.app.Activity;
import android.app.FragmentTransaction;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup.LayoutParams;
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
	CommentListView commentListView;
	YouTubePlayerFragment youtube;
	Date pauseDate;

	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_story_view);
		
		storyLayout = (LinearLayout) findViewById(R.id.linearLayoutStory); //get linear layout
		
		youtube = (YouTubePlayerFragment) this.getFragmentManager().findFragmentById(R.id.youtubeFragment); //get the youtube player fragment
		
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
		commentToggleButton = new Button(ArticleView.this.getApplicationContext());
		commentToggleButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT));
		commentToggleButton.setText("Show Comments");
		commentToggleButton.setOnClickListener(new OnClickListener() 
		{
			@Override
			public void onClick(View v) 
			{
				if(commentListView.getVisibility() == View.VISIBLE)
				{
					commentListView.setVisibility(View.INVISIBLE);
					commentToggleButton.setText("Show Comments");
					return;
				}
				else
				{
					commentListView.setVisibility(View.VISIBLE);
					commentToggleButton.setText("Hide Comments");
					return;
				}
			}
		});
		storyLayout.addView(commentToggleButton);
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
			try
			{
				String requestAddress = getString(R.string.api_root); //API address
				requestAddress += "page-or-topic/"; //should be the last part of api address, the 'tag'
				requestAddress += params[0].getString("Topic Key");
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
					JSONArray stories = json.getJSONArray("nodes"); //get the nodes
					
					if(stories.length() == 0)
					{
						toShow = new Article(params[0]);
					}
					else
					{
						JSONObject story = new JSONObject(stories.getJSONObject(0).getString("node"));
					
						toShow = new Article(params[0], story); //setup article that needs to be shown
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
			
//			toShow = new Article(params[0]); //setup article that needs to be shown
						
			return null;
		}
		
		@Override
		protected void onPostExecute(Void v)
		{
			storyText.setText(toShow.getSummary()); //set the story text to the article text
			
			new CommentListViewCreator().execute(toShow.getTopicKey());
			
			youtube.initialize(getString(R.string.youtube_api_key), new initializationListener()); //initialize youtube player
			
			ArticleView.this.setTitle(toShow.getTitle()); //change the title
		}
	}
	
	private class CommentListViewCreator extends AsyncTask<String, Void, Void>
	{
		@Override
		protected Void doInBackground(String... params)
		{
			commentListView = new CommentListView(ArticleView.this.getApplicationContext(), params[0]);
			commentListView.setVisibility(View.INVISIBLE);
			
			return null;
		}
		
		@Override
		protected void onPostExecute(Void v)
		{
			storyLayout.addView(commentListView);
		}
	}
}

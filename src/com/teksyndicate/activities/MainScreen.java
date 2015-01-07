package com.teksyndicate.activities;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

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
import com.teksyndicate.views.ArticleSummaryView;
import com.teksyndicate.views.ArticleView;

import android.app.Activity;
import android.content.Intent;
import android.content.res.Resources;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup.LayoutParams;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.ScrollView;
import android.widget.Space;
import android.widget.Spinner;
import android.widget.Toast;


public class MainScreen extends Activity
{
	Spinner tagSpinner;
	ProgressBar progressBarActivity;
	LinearLayout storyLayout;
	ScrollView scrollViewStories;
	
	ArrayList<Article> articles;
	
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main_screen);
		
		articles = new ArrayList<Article>();
		
		tagSpinner = (Spinner) findViewById(R.id.tagSpinner);
		progressBarActivity = (ProgressBar) findViewById(R.id.progressBarActivity);
		storyLayout = (LinearLayout) findViewById(R.id.storyLinearLayout);
		scrollViewStories = (ScrollView) findViewById(R.id.scrollViewStories);
		
		// Create an ArrayAdapter using the string array and a default spinner layout
		ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
		        R.array.viewable_tags, android.R.layout.simple_spinner_item);
		// Specify the layout to use when the list of choices appears
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		// Apply the adapter to the spinner
		tagSpinner.setAdapter(adapter);
		tagSpinner.setOnItemSelectedListener(new SpinnerActivity());
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
	
	private class SpinnerActivity extends Activity implements OnItemSelectedListener
	{

		@Override
		public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
		{
			String selectedTag = parent.getItemAtPosition(position).toString(); //tag that was selected
			articles.clear();
			storyLayout.removeAllViews();
			MainScreen.this.setTitle(selectedTag); //change the title of the MainScreen
			Resources res = parent.getResources();
			
			if(selectedTag.equals(res.getString(R.string.the_tek))) //The Tek
			{
				selectedTag = "tag/the-tek";
			}
			if(selectedTag.equals(res.getString(R.string.inbox))) //INBOX.EXE
			{
				selectedTag = "tag/inbox";
			}
			if(selectedTag.equals(res.getString(R.string.diy))) //DIY & How To
			{
				selectedTag = "tag/diy";
			}
			if(selectedTag.equals(res.getString(R.string.build_a_pc))) //Build A PC
			{
				selectedTag = "tag/buildapc";
			}
			if(selectedTag.equals(res.getString(R.string.wasd))) //WASD
			{
				selectedTag = "tag/wasd";
			}
			if(selectedTag.equals(res.getString(R.string.all_videos))) //All Videos
			{
				selectedTag = "tag/all";
			}			
			
			progressBarActivity.setVisibility(View.VISIBLE);
			new SummaryDownloader().execute(selectedTag); //create JSON request
		}

		@Override
		public void onNothingSelected(AdapterView<?> parent)
		{
			Toast.makeText(MainScreen.this, "Nothing Selected", Toast.LENGTH_SHORT).show(); //well shit
		}	
	}
	
	private class SummaryDownloader extends AsyncTask<String, Void, Boolean>
	{
		@Override
		protected Boolean doInBackground(String... params)
		{
			Boolean success = true;
			try
			{
				String requestAddress = getString(R.string.api_root); //API address
				requestAddress += params[0]; //should be the last part of api address, the 'tag'
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
					for(int i=0;i<stories.length();i++)
					{
						articles.add(new Article(new JSONObject(stories.getJSONObject(i).getString("node")))); //get one node
					}
				}
			}
			//ERROR handling
			catch (UnsupportedEncodingException e) 
			{
				Log.e("BAD_ENCODE", e.getMessage());
				e.printStackTrace();
				success = false;
			} 
			catch (ClientProtocolException e) 
			{
				Log.e("CLIENT_PROTOCOL_ERROR", e.getMessage());
				e.printStackTrace();
				success = false;
			} 
			catch (IOException e) 
			{
				Log.e("IO_ERROR", e.getMessage());
				e.printStackTrace();
				success = false;
			} 
			catch(JSONException e)
			{
				Log.e("JSON_ERROR", e.getMessage());
				e.printStackTrace();
				success = false;
			}
			
			//return success
			return success;
		}
		
		@Override
		protected void onPostExecute(Boolean success)
		{
			if(success) //if we were successful in getting articles
			{				
				for(Article a : articles) //Iterate all the articles
				{
					ArticleSummaryView summary = new ArticleSummaryView(MainScreen.this.getApplicationContext(), a, tagSpinner.getWidth());
					summary.setOnClickListener(new onClickListener());
					summary.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 1f));
					storyLayout.addView(summary); //add a new article summary view
				
					Space blankSpace = new Space(MainScreen.this.getApplicationContext());
					blankSpace.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, 15));
					
					storyLayout.addView(blankSpace); //add to story layout
				}
			}
			else
			{
				Toast.makeText(MainScreen.this, "Error Occured", Toast.LENGTH_LONG).show(); //show a little message (something went wrong)
			}
			progressBarActivity.setVisibility(View.INVISIBLE);
		}
	}
	
	private class onClickListener implements OnClickListener
	{
		@Override
		public void onClick(View v) 
		{
			ArticleSummaryView summary = (ArticleSummaryView) v;
			Intent i = new Intent(v.getContext(), ArticleView.class);
			i.putExtra("JSON", summary.getArticle().getJSON().toString());
			startActivity(i);
		}		
	}
}

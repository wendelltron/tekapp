package com.teksyndicate;

import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebView;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
//import com.android.volley.toolbox.JsonObjectRequest; //will probably convert to this later.
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerFragment;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class VideoStoryActivity extends Activity implements
		YouTubePlayer.OnInitializedListener
{

	public static final String STORYPATH = "videostory_path";

	private String url;

	private RequestQueue requestQueue;

	private String youtubeId;

	private YouTubePlayer youTubePlayer = null;

	private YouTubePlayerFragment youTubePlayerFragment = null;

	private View textContentView = null;

	private String descriptionHTML = null;

	@SuppressWarnings("static-access")
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		requestQueue = Volley.newRequestQueue(this);

		Intent intent = getIntent();
		url = getString(R.string.rootTekUrl)
				+ intent.getStringExtra(this.STORYPATH);
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_video_story);
		textContentView = findViewById(R.id.webView);
		onConfigurationChanged(getResources().getConfiguration());

		Log.e("NotReallyAnError", "Startup-url " + url);

		if (null == youTubePlayerFragment)
		{
			youTubePlayerFragment = (YouTubePlayerFragment) getFragmentManager()
					.findFragmentById(R.id.youtube_fragment);
			assert youTubePlayerFragment != null;
			youTubePlayerFragment.setRetainInstance(true);
			// if(!youTubePlayerFragment.g)
			youTubePlayerFragment.initialize(getString(R.string.youtubeDevKey),
					this);
		}

		Response.Listener<String> success = new Response.Listener<String>()
		{
			@Override
			public void onResponse(String o)
			{
				try
				{
					String youtubeId = "FAILED";
					if (String.class.getName() == o.getClass().getName())
					{
						// Hopefully will not need to do this bullshit when I
						// have the json/xml interface
						Document document = Jsoup.parse(o);
						Elements iframes = document.getElementsByTag("iframe");
						for (int i = 0; i < iframes.size(); i++)
						{
							Element elem = iframes.get(i);
							if (elem.hasAttr("src"))
							{
								String src = "http:" + elem.attr("src");
								// Urls in the form
								// http://www.youtube.com/embed/9Y9s-RvSPBs?wmode=transparent&&autohide=1rel=0&border=0
								// se we know how to split them
								String[] parts = src.split("/");
								if (5 <= parts.length
										&& parts[2].equals("www.youtube.com")
										&& parts[3].equals("embed"))
								{
									parts = parts[4].split("\\?");
									youtubeId = parts[0];
									break;
								}
								else
								{
									Log.e("BAD SRC", "Got these parts "
											+ parts[2] + " " + parts[3] + " "
											+ parts.length);
								}
							}

						}

						try
						{
							descriptionHTML = document
									.select(".field-name-body").get(0)
									.outerHtml();
						}
						catch (Exception e)
						{
							descriptionHTML = "no descrption";
						}

						WebView wv = (WebView) textContentView;
						wv.loadData("<html><head/><body>" + descriptionHTML
								+ "</body></html>", "text/html", "UTF-8");

						Log.i("GOT ID", "Got youtube Id " + youtubeId);

					}
					else
					{
						Log.e("BADCLASS",
								"Don't know how to deal with this. we were expecting a string. Got a "
										+ o.getClass().getName());
					}

					VideoStoryActivity.this.youtubeId = youtubeId;

					if (null != youTubePlayer)
					{
						youTubePlayer.cueVideo(youtubeId);
					}
				}
				catch (Exception e)
				{
					// log this shit here
				}

			}
		};

		Response.ErrorListener error = new Response.ErrorListener()
		{

			@Override
			public void onErrorResponse(VolleyError volleyError)
			{
				Toast.makeText(SplashScreen.getAppContext(), "Server Returned ERROR", Toast.LENGTH_LONG).show();
				Log.e("VOLLEY ERROR", volleyError.getMessage());
			}
		};

		StringRequest req = new StringRequest(Request.Method.GET, url, success,
				error);
		requestQueue.add(req);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu)
	{

		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.video_story, menu);
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
	public void onInitializationSuccess(YouTubePlayer.Provider provider,
			YouTubePlayer youTubePlayer, boolean b)
	{
		this.youTubePlayer = youTubePlayer;
		if (null != youtubeId)
		{
			youTubePlayer.cueVideo(youtubeId);
		}

	}

	@Override
	public void onInitializationFailure(YouTubePlayer.Provider provider,
			YouTubeInitializationResult youTubeInitializationResult)
	{
		Log.e("YOUTUBE", "Failed initalising youtube.");
	}

	@Override
	public void onConfigurationChanged(Configuration newConfig)
	{
		super.onConfigurationChanged(newConfig);

		// Checks the orientation of the screen
		LinearLayout.LayoutParams params = (LinearLayout.LayoutParams) textContentView
				.getLayoutParams();
		if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE)
		{
			params.weight = 0;
			params.height = 0;
		}
		else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT)
		{
			params.weight = 60;
			params.height = 60;
		}
		textContentView.setLayoutParams((params));
	}
}

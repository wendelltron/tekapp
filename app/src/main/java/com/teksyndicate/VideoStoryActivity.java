package com.teksyndicate;

import android.app.Activity;
import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
//import com.android.volley.toolbox.JsonObjectRequest; //will probably convert to this later.
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


public class VideoStoryActivity extends Activity {

    public static final String STORYPATH = "videostory_path";

    private String url;

    private RequestQueue requestQueue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestQueue = Volley.newRequestQueue(this);

        Intent intent = getIntent();
        url =  getString(R.string.rootTekUrl) + intent.getStringExtra(this.STORYPATH);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_story);
        Log.e("NotReallyAnError", "Startup-url " + url);

        if (savedInstanceState == null) {
            getFragmentManager().beginTransaction()
                    .add(R.id.container, new PlaceholderFragment())
                    .commit();
        }

        Response.Listener success = new Response.Listener() {
            @Override
            public void onResponse(Object o) {
                String youtubeId = "FAILED";
                if(String.class.getName() == o.getClass().getName())
                {
                    //Hopefully will not need to do this bullshit when I have the json/xml interface
                    Document document = Jsoup.parse((String)o);
                    Elements iframes = document.getElementsByTag("iframe");
                    for(int i=0; i<iframes.size();i++)
                    {
                        Element elem = iframes.get(i);
                        if(elem.hasAttr("src"))
                        {
                            String src = "http:" + elem.attr("src");
                            //Urls in the form http://www.youtube.com/embed/9Y9s-RvSPBs?wmode=transparent&&autohide=1rel=0&border=0 se we know how to split them
                            String[] parts = src.split("/");
                            if(5 <= parts.length && parts[2].equals("www.youtube.com") && parts[3].equals("embed"))
                            {
                                parts = parts[4].split("\\?");
                                youtubeId = parts[0];
                                break;
                            }
                            else
                            {
                                Log.e("BAD SRC", "Got these parts " + parts[2] + " " +parts[3] + " " + parts.length);
                            }
                        }


                    }

                    Log.e("GOT ID", "Got youtube Id " + youtubeId);

                }
                else
                {
                    Log.e("BADCLASS", "Don't know how to deal with this. we were expecting a string. Got a " + o.getClass().getName());
                }
            }
        };

        Response.ErrorListener error = new Response.ErrorListener(){

            @Override
            public void onErrorResponse(VolleyError volleyError) {

            }
        };

        StringRequest req = new StringRequest(Request.Method.GET, url, success, error);
        requestQueue.add(req);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.video_story, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {

        public PlaceholderFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_video_story, container, false);
            return rootView;
        }
    }

}

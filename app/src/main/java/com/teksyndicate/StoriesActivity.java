package com.teksyndicate;

import android.app.Activity;
import android.app.ActionBar;
import android.app.Fragment;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.os.Build;
import android.widget.ListView;

public class StoriesActivity extends Activity {

    private StoriesList inboxStories;
    private StoriesList tekStories;

    private ListView storeiesList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //Get the data needed
        tekStories = new StoriesList(getString(R.string.tekStoriesName), getString(R.string.tekStoriesUrl));
        inboxStories = new StoriesList(getString(R.string.inboxStoriesName), getString(R.string.inboxStoriesUrl));
        tekStories.UpdateList();
        inboxStories.UpdateList();


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stories);

        if (savedInstanceState == null) {
            getFragmentManager().beginTransaction()
                    .add(R.id.container, new PlaceholderFragment())
                    .commit();
        }

        //Get the ListView
        storeiesList = (ListView) findViewById(R.id.articleList);
        //Connect the list view to the Article List via the adapter
        StoriesListAdapter adapter = new StoriesListAdapter(tekStories, this);
        storeiesList.setAdapter(adapter);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.stories, menu);
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
            View rootView = inflater.inflate(R.layout.fragment_stories, container, false);
            return rootView;
        }
    }

}

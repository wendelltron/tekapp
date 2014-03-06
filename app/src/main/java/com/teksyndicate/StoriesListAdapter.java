package com.teksyndicate;

import android.content.Context;
import android.database.DataSetObserver;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListAdapter;
import android.widget.TextView;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

/**
 * Created by speedfox on 3/5/14.
 */
public class StoriesListAdapter implements ListAdapter
{
    StoriesList currentList;

    Context viewContext;

    ArrayList<DataSetObserver> observers;

    public StoriesListAdapter(StoriesList list, Context context)
    {
        currentList = list;
        viewContext = context;
        observers = new ArrayList<DataSetObserver>();
        list.SetObserver(new StoriesList.StoryUpdateObserver() {
            @Override
            public void DoUpdate() {
                dispatchUpdateEvent();
            }
        });

    }

    @Override
    public boolean areAllItemsEnabled() {
        return true;
    }

    @Override
    public boolean isEnabled(int i) {
        return true;
    }

    @Override
    public void registerDataSetObserver(DataSetObserver dataSetObserver) {
        observers.add(dataSetObserver);

    }

    @Override
    public void unregisterDataSetObserver(DataSetObserver dataSetObserver) {
        for(int i =0 ; i< observers.size(); i++)
        {
            if(dataSetObserver == observers.get(i))
            {
                observers.remove(i);
                break;
            }

        }

    }

    public void dispatchUpdateEvent()
    {
        for(int i =0 ; i< observers.size(); i++)
        {
            observers.get(i).onChanged();
        }

    }

    @Override
    public int getCount() {
        return currentList.GetCount();
    }

    @Override
    public StoriesList.Story getItem(int i) {

        return currentList.GetItemById(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public boolean hasStableIds() {
        return true;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {

        StoriesList.Story story = currentList.GetItemById(i);
        TextView name = new TextView(viewContext);
        name.setText(story.GetName());
        ImageView img = new ImageView(viewContext);
        img.setImageBitmap(story.GetImg());
        LinearLayout layout = new LinearLayout(viewContext);
        //layout.addView(img);
        layout.addView(name);
        return layout;
    }

    @Override
    public int getItemViewType(int i) {
        return i;
    }

    @Override
    public int getViewTypeCount() {
        return 1;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }
}

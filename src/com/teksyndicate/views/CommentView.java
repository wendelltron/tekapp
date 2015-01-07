package com.teksyndicate.views;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.Jsoup;

import com.teksyndicate.R;
import com.teksyndicate.types.Author;
import com.teksyndicate.types.Comment;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class CommentView extends GridLayout 
{
	private Comment comment;
	private LinearLayout imgLayout;
	private LinearLayout textLayout;
	private ImageView imgView;
	private TextView usernameView;
	private TextView commentView;
	
	public CommentView(Context context) 
	{
		super(context);
	}
	
	/**
	 * View of a comment
	 * @param context viewing context
	 * @param comment JSON representation of the comment to be viewed
	 */
	public CommentView(Context context, JSONObject comment)
	{
		super(context);
				
		imgLayout = new LinearLayout(context);
		imgLayout.setLayoutParams(new GridLayout.LayoutParams(GridLayout.spec(1), GridLayout.spec(1)));
		imgLayout.setOrientation(LinearLayout.VERTICAL);
		
		textLayout = new LinearLayout(context);
		textLayout.setLayoutParams(new GridLayout.LayoutParams(GridLayout.spec(1), GridLayout.spec(2)));
		textLayout.setOrientation(LinearLayout.VERTICAL);
		
		imgView = new ImageView(context);
		imgLayout.addView(imgView);
		
		usernameView = new TextView(context);
		imgLayout.addView(usernameView);
		
		commentView = new TextView(context);
		textLayout.addView(commentView);
		
		this.addView(imgLayout);
		this.addView(textLayout);
		
		new CommentDownloader().execute(comment);
	}
	
	private class CommentDownloader extends AsyncTask<JSONObject, Void, Void>
	{
		@Override
		protected Void doInBackground(JSONObject... params)
		{
			try
			{
				Resources res = getResources();
				//get user info
				String userApiLoc = res.getString(R.string.api_root) + "user-info/";
				
				userApiLoc += params[0].getString("Author uid");
				StringBuilder url = new StringBuilder(userApiLoc);
				HttpClient client = new DefaultHttpClient();
				HttpGet get = new HttpGet(url.toString());
				HttpResponse r = client.execute(get);
				int status = r.getStatusLine().getStatusCode();
				if(status >= 200 && status < 300)
				{
					HttpEntity e = r.getEntity();
					
					InputStream content = e.getContent();
					BufferedReader br = new BufferedReader(new InputStreamReader(content));
					StringBuilder builder = new StringBuilder();
					String line;
					
					while((line = br.readLine()) != null)
					{
						builder.append(line);
					}
					
					JSONObject json = new JSONObject(builder.toString());
					JSONArray users = json.getJSONArray("nodes");
					JSONObject user = new JSONObject(users.getJSONObject(0).getString("node"));
					InputStream avatarContent;
					Author a;
					
					if(user.getString("user_picture").equals(""))
					{
						URL avatarUrl = new URL(res.getString(R.string.default_avatar));
						avatarContent = (InputStream)avatarUrl.getContent();
						Drawable d = Drawable.createFromStream(avatarContent, "src");
						
						a = new Author(d, user.getString("name"));
					}
					else
					{
						URL avatarUrl = new URL(user.getString("user_picture"));
						avatarContent = (InputStream)avatarUrl.getContent();
						Drawable d = Drawable.createFromStream(avatarContent, "src");
						
						a = new Author(d, user.getString("name"));
					}
					
					comment = new Comment(a, Jsoup.parse(params[0].getString("Comment")).text());
					
					avatarContent.close();
					br.close();
					content.close();
				}
			}
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
			
			return null;
		}
		
		@Override
		protected void onPostExecute(Void v)
		{
			imgView.setImageDrawable(comment.getAuthor().getAvatar());
			usernameView.setText(comment.getAuthor().getUserName());
			commentView.setText(comment.getCommentBody());
		}
	}
}

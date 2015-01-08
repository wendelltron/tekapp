package com.teksyndicate.types;

import android.graphics.drawable.Drawable;

public class Author 
{
	private Drawable avatar;
	private String username;
	
	/**
	 * Author of topic or comment
	 * @param avatar Author Avatar
	 * @param username Author username on forum
	 */
	public Author(Drawable avatar, String username)
	{
		this.avatar = avatar;
		this.username = username;
	}
	
	/**
	 * Gets Avatar
	 * @return author avatar
	 */
	public Drawable getAvatar()
	{
		return avatar;
	}
	
	/**
	 * Gets username
	 * @return author username
	 */
	public String getUserName()
	{
		return username;
	}
}

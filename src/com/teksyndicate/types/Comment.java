package com.teksyndicate.types;

public class Comment 
{
	private Author author;
	private String commentBody;
	
	/**
	 * Comment on either article or forum topic
	 * @param author Author of comment
	 * @param commentBody body of the comment, should be Jsoup parsed and cleaned
	 */
	public Comment(Author author, String commentBody)
	{
		this.author = author;
		this.commentBody = commentBody;
	}
	
	/**
	 * Gets author of comment
	 * @return comment author
	 */
	public Author getAuthor()
	{
		return author;
	}
	
	/**
	 * Gets body of the comment
	 * @return comment body
	 */
	public String getCommentBody()
	{
		return commentBody;
	}
}

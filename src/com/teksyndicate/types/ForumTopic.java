package com.teksyndicate.types;

public class ForumTopic 
{
	private Author author;
	private String topicBody;
	private String topicKey;
	
	/**
	 * User posted forum topic
	 * @param author Author of forum topic
	 * @param topicBody body of forum topic, should be Jsoup parsed and cleaned
	 * @param topicKey topic key of forum topic, used in api for getting comments etc
	 */
	public ForumTopic(Author author, String topicBody, String topicKey)
	{
		this.author = author;
		this.topicBody = topicBody;
		this.topicKey = topicKey;
	}
	
	/**
	 * Gets author of forum topic
	 * @return forum topic author
	 */
	public Author getAuthor()
	{
		return author;
	}
	
	/**
	 * Gets body of forum topic
	 * @return forum topic body
	 */
	public String getTopicBody()
	{
		return topicBody;
	}
	
	/**
	 * Gets topic key of forum topic
	 * @return forum topic key
	 */
	public String getTopicKey()
	{
		return topicKey;
	}
}

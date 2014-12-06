package com.teksyndicate;

import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;
import android.app.Notification;
import android.app.NotificationManager;


/**
 * Created by speedfox on 3/22/14.
 */
public class NewStoryService extends Service
{

    private class StoryChecker implements Runnable
    {
        private final long RECHECK_DELAY = 300;

        @Override
        public void run() {

            NewStoryService.this.checkHandler.postDelayed(this, RECHECK_DELAY);
        }
    }


    private Handler checkHandler;

    private static boolean isRunning = false;

    private static String TAG = "NewStoryService";

    public static boolean isRunning()
    {
        return isRunning;
    }

    public NewStoryService() {
        super();
        Log.e(TAG, "New stroy service constructed");

    }


    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        Log.e(TAG, "onCreate");
        checkHandler = new Handler();
        isRunning = true;
        Log.e(TAG, "onCreate Done");
        //Just to show how to create a notification..
        int mNotificationId = 001;
        Notification.Builder mBuilder = new Notification.Builder(this)
                        .setContentTitle("TekSyndicate")
                        .setContentText("Welcome to the world of tek syndicate")
                        .setSmallIcon(R.drawable.rtwwhite);
        NotificationManager mNotifyMgr =
                (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        mNotifyMgr.notify(mNotificationId, mBuilder.build());


    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId)
    {
        Log.d(TAG, "on start command");
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        isRunning = false;
        Log.d(TAG, "onDestroy");
    }


}

# Welcome to DFloCloud!

Hello and welcome to **DFloCloud**! This a clone of the popular web application, *SoundCloud*! On DFloCloud  you can upload mp3 music files with customer song artwork to share with friends and family! You can create and share playlists with those who need to hear what you have going on! To checkout the live demo go [here](https://dflocloud.onrender.com)! You can also run the application locally following the steps below.


# Running Application Locally

This application uses AWS S3 Buckets to store music and image files. You will need to setup your own AWS S3 Bucket with the correct API Keys in order to run the app as intended.

## 1. Backend

To get the backend setup, you will need to set up the correct environment variables. You can find an example of the variables you will need in the `.envexample` file. *Change your directory to the **backend** folder.*  Create a file named `.env` and copy the variables from the `.envexample`. Once that is complete, you can run the command `npm install` and `npm install -D` to download the necessary dependencies. To create the database tables and seeders run the command `npm run db:setup`. Once that is done you can start the backend server by running the command `npm start`/

## 2. Frontend

Now that the backend is setup locally we can get our React frontend setup. *Change your directory to the **frontend** folder.* Now we can run the command `npm install` and `npm install -D`. This will install the necessary dependencies for the frontend. 

## 3. Play with App!

You are ready to use **DFloCloud**! Navigate to `https://localhost:3000`. If you are getting a proxy error, make sure that the proxy key in the frontend folder's `package.json` matches your backend port that you set in your `.env` file in the backend folder.

# Demo

## Landing Page

![](https://github.com/dnlflores/dflocloud/blob/main/assets/LandingPage.gif)

When a user is not logged in, they are greeted with this Landing Page. From here, you can search songs and playlists as well as listen to those songs and playlists.

## Discover Page

![](https://github.com/dnlflores/dflocloud/blob/main/assets/DiscoverPage.gif)

Visitors of the site can view the newest and hottest playlist and songs from this page. If the visitor wants to go to the playlist or song page, they can and listen and enjoy the music.

## Library Page

![](https://github.com/dnlflores/dflocloud/blob/main/assets/LibraryPart1.gif)
![](https://github.com/dnlflores/dflocloud/blob/main/assets/LibraryPart2.gif)

The Library has multiple pages to explore. User must be logged in to view the library page. Once logged in, user can see their created playlists and songs.

## Single Song Page

![](https://github.com/dnlflores/dflocloud/blob/main/assets/SingleSong.gif)

Here you can play the song or comment and add to your own playlist (if you are logged in)!

## Single Playlist Page

![](https://github.com/dnlflores/dflocloud/blob/main/assets/SinglePlaylist.gif)

Here you can play the playist and choose which songs to play.

## Uploading

![](https://github.com/dnlflores/dflocloud/blob/main/assets/UploadSong.gif)

When uploading a single song, you get brought to a single song creation form.

![](https://github.com/dnlflores/dflocloud/blob/main/assets/UploadSongs.gif)

When uploading multiple songs, you are presented with creating a playlist for both songs to be added to.
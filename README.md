# Welcome to [**DFloCloud**](https://dflocloud.onrender.com)!

Hello and welcome to [**DFloCloud**](https://dflocloud.onrender.com)! This a clone of the popular web application, *SoundCloud*! On DFloCloud  you can upload mp3 music files with customer song artwork to share with friends and family! You can create and share playlists with those who need to hear what you have going on! To checkout the live demo go [here](https://dflocloud.onrender.com)! You can also run the application locally following the steps below.

## Features

### 1. Songs  

You can upload (if you have an account) and listen to songs on DFloCloud. You can choose any custom mp3 to upload as well as any png or jpg/jpeg image as the artwork cover. From the song page you can also edit your song as well as delete the song if you choose to do so.

### 2. Playlists  

If you have an account on DFloCloud you can create custom playlists to share with everyone! Anyone that visits DFloCloud will be able to see a playlist that has been uploaded and enjoy listening to that playlist. From the playlist page you can click the play button at the top to start with the first song in the list. Or you can click on any song you want to start the playlist from there. Once the playlist reaches the end it will stop playing.

### 3. Adding Songs to Playlists  

If you want to add songs to a playlist, you have to be logged in and the playlist must be yours to add songs to the playlist. You can also remove any song from the playlist that you want. 

### 4. Search

You can search for any song or playlist on DFloCloud via the search bar at the top of the page or on the search bar of the landing page. The search bar will give you the most popular items first in a dropdown list. You can choose to click one of the items from the list or press the Enter key/ click on the search icon to be brought to a results page. From the results page you can see all of the results from the query you typed in one place. From there you can play the song or playlist to see if you found what you were looking for!

### 5. Comments

If you are logged in you can create a comment on any song! Any visitor to DFloCloud will be able to see everyone's comment on the song, so be nice! You cannot edit your comment so if you want to change what you said you will have to delete and start again!

### 6. Universal Music Player

Any user can experience the music the choose to listen to anywhere on DFloCloud. You are not limited to being on one page to enjoy the music. If you start a playlist you can freely explore around and the playlist will continue in the order you left off. From the controls at the bottom of the page you can skip to the next song or go back to a previous song. The scrubber allows you to click and drag to any point you want in the song. The player also shows the song you are listening to and who the song is by.

## *Technologies Used*

1. React
2. Express
3. AWS
4. Javascript
5. Node.js
6. Redux
7. PostgreSQL
8. HTML
9. CSS

## Demo

### Landing Page

![](https://github.com/dnlflores/dflocloud/blob/main/assets/LandingPage.gif)

When a user is not logged in, they are greeted with this Landing Page. From here, you can search songs and playlists as well as listen to those songs and playlists.

### Discover Page

![](https://github.com/dnlflores/dflocloud/blob/main/assets/DiscoverPage.gif)

Visitors of the site can view the newest and hottest playlist and songs from this page. If the visitor wants to go to the playlist or song page, they can and listen and enjoy the music.

### Library Page

![](https://github.com/dnlflores/dflocloud/blob/main/assets/LibraryPart1.gif)
![](https://github.com/dnlflores/dflocloud/blob/main/assets/LibraryPart2.gif)

The Library has multiple pages to explore. User must be logged in to view the library page. Once logged in, user can see their created playlists and songs.

### Single Song Page

![](https://github.com/dnlflores/dflocloud/blob/main/assets/SingleSong.gif)

Here you can play the song or comment and add to your own playlist (if you are logged in)!

### Single Playlist Page

![](https://github.com/dnlflores/dflocloud/blob/main/assets/SinglePlaylist.gif)

Here you can play the playist and choose which songs to play.

### Uploading

![](https://github.com/dnlflores/dflocloud/blob/main/assets/UploadSong.gif)

When uploading a single song, you get brought to a single song creation form.

![](https://github.com/dnlflores/dflocloud/blob/main/assets/UploadSongs.gif)

When uploading multiple songs, you are presented with creating a playlist for both songs to be added to.

## Running Application Locally

This application uses AWS S3 Buckets to store music and image files. You will need to setup your own AWS S3 Bucket with the correct API Keys in order to run the app as intended.

### 1. Backend

To get the backend setup, you will need to set up the correct environment variables. You can find an example of the variables you will need in the `.envexample` file. *Change your directory to the **backend** folder.*  Create a file named `.env` and copy the variables from the `.envexample`. Once that is complete, you can run the command `npm install` and `npm install -D` to download the necessary dependencies. To create the database tables and seeders run the command `npm run db:setup`. Once that is done you can start the backend server by running the command `npm start`.

### 2. Frontend

Now that the backend is setup locally we can get our React frontend setup. *Change your directory to the **frontend** folder.* Now we can run the command `npm install` and `npm install -D`. This will install the necessary dependencies for the frontend. 

### 3. Play with App!

You are ready to use **DFloCloud**! Navigate to `https://localhost:3000`. If you are getting a proxy error, make sure that the proxy key in the frontend folder's `package.json` matches your backend port that you set in your `.env` file in the backend folder.

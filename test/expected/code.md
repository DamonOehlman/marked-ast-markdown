# Screenshot from Youtube

I find this really useful when wanting to upload the current image frame of a youtube clip to imgur :)

```js
var clientId = ''; // insert your imgur application client id here
var videos = document.getElementsByTagName('video'), canvas = document.createElement('canvas'), context = canvas.getContext('2d'), http = new XMLHttpRequest();
canvas.width = videos[0].videoWidth; canvas.height = videos[0].videoHeight;
context.drawImage(videos[0], 0, 0);

var data = JSON.stringify({
  image: canvas.toDataURL('image/jpeg', 0.9).split(',')[1]
});

//Send the proper header information along with the request
http.open('POST', 'https://api.imgur.com/3/image', true);
http.setRequestHeader('Content-type','application/json; charset=utf-8');
// http.setRequestHeader('Content-length', data.length);
http.setRequestHeader('Authorization', 'Client-ID ' + clientId);
// http.setRequestHeader('Connection', "close");

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
       try {
          console.log(JSON.parse(http.responseText).data.link);
       }
       catch (e) {
       }
    }
}

http.send(data);
```

I hope it was helpful.
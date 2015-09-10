window.onload = function () {
  var button = document.getElementById("addButton");
  button.onclick = handleButtonClick;
  loadPlayList();
};

function handleButtonClick() {
  var textInput = document.getElementById("songTextInput");
  var songName = textInput.value;
  
  if (songName !== "") {
    var playlist = document.getElementById("playlist");
    var li = document.createElement("li");
    li.innerHTML = songName;
    playlist.appendChild(li);
    
    save("playlist", songName);
  }
}

function loadPlayList() {
  var storeArray = getStoreArray("playlist");
  var playlist = document.getElementById("playlist");
  if (playlist !== null) {
    for (var i = 0; i < storeArray.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = storeArray[i];
      playlist.appendChild(li);
    }
  }
}

function save(key, item) {
  var storeArray = getStoreArray(key);
  storeArray.push(item);
  localStorage.setItem(key, JSON.stringify(storeArray));
}

function getStoreArray(key) {
  var storeArray = localStorage.getItem(key);
  if (storeArray === null || storeArray === "") {
    storeArray = [];
  } else {
    storeArray = JSON.parse(storeArray);
  }
  return storeArray;
}


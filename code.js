document.querySelector('p').addEventListener("click", function() {
  alert("Use keyboard buttons or web buttons to play the set.\n\n 'w' , 'a' , 's' , 'd' play snares,\n while 'i' , 'j' , 'k' , 'l' play cymbals and\n 'space' plays hi-hat.\n\n Try switching off capslock if keyboard doesn't work.");
});

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    play(this);
  }
};
xhttp.open("GET", "file.xml");
xhttp.send();

function play(xml) {
  var btn = document.querySelectorAll(".button");
  btn.forEach(function(item) {
    item.addEventListener("click", function () {
      var key = this.innerHTML
      playSo(key);
    });
  });

  document.addEventListener("keypress", function(event) {
    playSo(event.key);
  });

  function playSo(key) {
    if (key==" ") {
      key = "space";
    }
    pres(key);
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName('key-sound');
    for (var i = 0; i < x.length; i++) {
      if (x[i].getElementsByTagName('key')[0].childNodes[0].nodeValue == key) {
        var aud = new Audio(x[i].getElementsByTagName('sound')[0].childNodes[0].nodeValue);
        aud.play();
      }
    }
  }

  function pres(key) {
    var y = "button" + key;
    var x = document.getElementsByName(y)[0];
    x.classList.add("press");
    x.classList.remove("button");
    setTimeout(function () {
      x.classList.add("button");
      x.classList.remove("press");
    }, 200);
  }
}

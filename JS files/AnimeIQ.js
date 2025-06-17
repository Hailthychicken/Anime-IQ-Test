var A_wallpapers=['anime_wallpapers\\Shonen_wallpaper-1.jpg', 
  'anime_wallpapers\\Naruto_wallpaper.jpg','anime_wallpapers\\Naruto_wallpapper_1.jpg'];

 function changebg() {
  const img = document.getElementById('bg-wallpaper');
img.src = A_wallpapers[Math.floor(Math.random() * A_wallpapers.length)];
}
 let changetimer= setInterval(changebg, 8000); 


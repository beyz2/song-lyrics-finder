// Şarkı sözlerini getiren fonksiyon
function getLyrics() {
    const artist = document.getElementById("artist").value;  // Kullanıcıdan sanatçı adını alıyoruz
    const song = document.getElementById("song").value;      // Kullanıcıdan şarkı adını alıyoruz

    // Sanatçı veya şarkı adı boşsa kullanıcıya hata mesajı gösterelim
    if (!artist || !song) {
        alert("Lütfen sanatçı adı ve şarkı adı girin!");
        return;
    }

    // API'den şarkı sözlerini alalım
    fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
        .then(response => response.json())  // Gelen cevabı JSON formatında parse ediyoruz
        .then(data => {
            if (data.lyrics) {  // Şarkı sözleri varsa, ekrana yazdıralım
                document.getElementById("lyrics").innerText = data.lyrics;  // Şarkı sözlerini ekrana basıyoruz
                // Şarkı sözleri geldikten sonra Spotify ve YouTube butonlarını görünür yapalım
                document.getElementById("musicButtons").style.display = "block";

                // Spotify ve YouTube linklerini oluşturuyoruz
                const spotifyLink = `https://open.spotify.com/search/${artist}%20${song}`;
                const youtubeLink = `https://www.youtube.com/results?search_query=${artist}+${song}`;

                // Spotify ve YouTube linklerine yönlendirecek butonları güncelliyoruz
                document.getElementById("spotifyLink").href = spotifyLink;
                document.getElementById("youtubeLink").href = youtubeLink;
            } else {
                document.getElementById("lyrics").innerText = "Şarkı sözleri bulunamadı. Lütfen doğru bir şarkı adı ve sanatçı girin.";
            }
        })
        .catch(err => {
            document.getElementById("lyrics").innerText = "Hata oluştu: " + err;  // Hata durumu
        });
}



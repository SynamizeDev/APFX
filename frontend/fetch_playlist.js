const ytpl = require('ytpl');
const fs = require('fs');

async function fetchPlaylist() {
  try {
    const playlist = await ytpl('https://www.youtube.com/playlist?list=PLlioKedKLbjY', { limit: 100 });
    const videos = playlist.items.map((item, index) => ({
      id: item.id,
      title: item.title,
      thumbnail: item.bestThumbnail.url,
      duration: item.duration,
      episode: index + 1,
      youtubeUrl: item.shortUrl,
    }));
    
    fs.writeFileSync('playlist_data.json', JSON.stringify(videos, null, 2));
    console.log('Successfully fetched playlist');
  } catch (error) {
    console.error('Error fetching playlist:', error);
  }
}

fetchPlaylist();

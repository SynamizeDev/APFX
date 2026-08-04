export interface CourseVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  episode: number;
  youtubeUrl: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  playlistId: string;
  videos: CourseVideo[];
}

export const FOREX_COURSE: Course = {
  id: 'forex-ctrader-beginner',
  title: 'Learn to Trade Forex with APFX × cTrader',
  subtitle: 'Complete beginner video course designed to help traders understand Forex markets and the cTrader platform.',
  playlistId: 'PLlioKedKLbjY',
  videos: [
    {
      id: "vid_01",
      title: "Introduction to Forex Trading",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1280&auto=format&fit=crop",
      duration: "15:20",
      episode: 1,
      youtubeUrl: "https://youtube.com/watch?v=vid_01"
    },
    {
      id: "vid_02",
      title: "Understanding Currency Pairs & Pips",
      thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1280&auto=format&fit=crop",
      duration: "12:45",
      episode: 2,
      youtubeUrl: "https://youtube.com/watch?v=vid_02"
    },
    {
      id: "vid_03",
      title: "How Leverage Works in Forex",
      thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1280&auto=format&fit=crop",
      duration: "18:10",
      episode: 3,
      youtubeUrl: "https://youtube.com/watch?v=vid_03"
    },
    {
      id: "vid_04",
      title: "Introduction to cTrader Platform",
      thumbnail: "https://images.unsplash.com/photo-1606189934399-5ea912ab7dae?q=80&w=1280&auto=format&fit=crop",
      duration: "20:05",
      episode: 4,
      youtubeUrl: "https://youtube.com/watch?v=vid_04"
    },
    {
      id: "vid_05",
      title: "Placing Your First Trade on cTrader",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop",
      duration: "14:30",
      episode: 5,
      youtubeUrl: "https://youtube.com/watch?v=vid_05"
    },
    {
      id: "vid_06",
      title: "Using Stop Loss and Take Profit",
      thumbnail: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=1280&auto=format&fit=crop",
      duration: "16:40",
      episode: 6,
      youtubeUrl: "https://youtube.com/watch?v=vid_06"
    },
    {
      id: "vid_07",
      title: "Basic Technical Analysis",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1280&auto=format&fit=crop",
      duration: "25:15",
      episode: 7,
      youtubeUrl: "https://youtube.com/watch?v=vid_07"
    },
    {
      id: "vid_08",
      title: "Risk Management Strategies",
      thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1280&auto=format&fit=crop",
      duration: "19:50",
      episode: 8,
      youtubeUrl: "https://youtube.com/watch?v=vid_08"
    },
    {
      id: "vid_09",
      title: "Trading Psychology & Discipline",
      thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1280&auto=format&fit=crop",
      duration: "22:10",
      episode: 9,
      youtubeUrl: "https://youtube.com/watch?v=vid_09"
    }
  ]
};

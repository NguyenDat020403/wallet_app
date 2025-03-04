export const StoryResponse = [
  {
    userId: 'user_1001',
    isLivestreaming: true,
    totalView: 1200,
    resource: [
      {
        url: 'https://i.pinimg.com/736x/13/be/95/13be95147b920e7c4ee958ff30db7a11.jpg',
        backgroundSoundUrl: 'https://example.com/sound1.mp3',
      },
      {
        url: 'https://wallpaperaccess.com/full/2713202.jpg',
        backgroundSoundUrl: 'https://example.com/sound2.mp3',
      },
      {
        url: 'https://i.pinimg.com/736x/df/7c/6c/df7c6c6452e5948b61f03e64cd76bd4f.jpg',
        backgroundSoundUrl: 'https://example.com/sound2.mp3',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXYxnJFrKIPVk_0ytbA79oPgdVJIekfdI9w&s',
        backgroundSoundUrl: 'https://example.com/sound2.mp3',
      },
    ],
  },
  {
    userId: 'user_1001',
    isLivestreaming: true,
    totalView: 1200,
    resource: [
      {
        url: 'https://i.pinimg.com/736x/13/be/95/13be95147b920e7c4ee958ff30db7a11.jpg',
        backgroundSoundUrl: 'https://example.com/sound1.mp3',
      },
      {
        url: 'https://wallpaperaccess.com/full/2713202.jpg',
        backgroundSoundUrl: 'https://example.com/sound2.mp3',
      },
      {
        url: 'https://i.pinimg.com/736x/df/7c/6c/df7c6c6452e5948b61f03e64cd76bd4f.jpg',
        backgroundSoundUrl: 'https://example.com/sound2.mp3',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXYxnJFrKIPVk_0ytbA79oPgdVJIekfdI9w&s',
        backgroundSoundUrl: 'https://example.com/sound2.mp3',
      },
    ],
  },
];
export type StoryResource = {
  url: string;
  backgroundSoundUrl: string;
};

export type StoryResponse = {
  userId: string;
  isLivestreaming: boolean;
  totalView: number;
  resource: StoryResource[];
};

export const tracks = [
  {
    id: '1',
    title: 'Song 1',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Song 2',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Song 3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

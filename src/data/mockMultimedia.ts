import { VideoItem, PodcastEpisode } from '../types';

export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: 'vid-01',
    title: 'Phóng sự đặc biệt: 24 giờ bên trong trạm điều hành điện gió ngoài khơi lớn nhất Đông Nam Á',
    slug: '24-gio-ben-trong-tram-dieu-hanh-dien-gio',
    duration: '14:28',
    coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'Thời sự',
    publishedAt: '2026-09-03T18:00:00Z',
    views: 48900,
    author: 'Ê-kíp Thời Báo Tri Thức',
    description: 'Theo chân các kỹ sư và chuyên gia hàng hải đối mặt với sóng to gió lớn để đảm bảo nguồn điện sạch vận hành liên tục 24/7.'
  },
  {
    id: 'vid-02',
    title: 'Bàn tròn Kinh tế: Làn sóng đầu tư bán dẫn và bài toán đào tạo 50.000 kỹ sư vi mạch chất lượng cao',
    slug: 'ban-tron-kinh-te-dao-tao-ky-su-ban-dan',
    duration: '26:15',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Kinh tế',
    publishedAt: '2026-09-02T14:30:00Z',
    views: 32100,
    author: 'TS. Nguyễn Hoàng Nam',
    description: 'Đối thoại chuyên sâu cùng các hiệu trưởng trường đại học kỹ thuật và lãnh đạo tập đoàn công nghệ hàng đầu.'
  },
  {
    id: 'vid-03',
    title: 'Hành trình di sản: Nghệ thuật trùng tu kiến trúc Pháp cổ bằng kỹ thuật nung gạch thủ công Bát Tràng',
    slug: 'nghe-thuat-trung-tu-kien-truc-phap-co-bat-trang',
    duration: '09:45',
    coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Văn hóa',
    publishedAt: '2026-09-01T10:00:00Z',
    views: 19800,
    author: 'Vũ Minh Châu',
    description: 'Chiêm ngưỡng sự tỉ mỉ của các nghệ nhân gìn giữ từng đường nét hoa văn thế kỷ.'
  },
  {
    id: 'vid-04',
    title: 'Khám phá thế giới AI: Thử thách giải toán hình học không gian phức tạp cùng mô hình lý luận mới',
    slug: 'kham-pha-the-gioi-ai-giai-toan-hinh-hoc',
    duration: '11:20',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Công nghệ',
    publishedAt: '2026-08-30T16:00:00Z',
    views: 45300,
    author: 'Lê Quang Vinh',
    description: 'Trực tiếp chứng kiến màn so tài tư duy giữa trí tuệ nhân tạo và các thủ khoa toán học Olympic.'
  }
];

export const MOCK_PODCASTS: PodcastEpisode[] = [
  {
    id: 'pod-01',
    title: 'Tập 42: "Sống chậm trong thế giới gấp gáp" - Chữa lành cảm xúc đô thị cùng Nhà văn Trang Bùi',
    slug: 'song-cham-trong-the-gioi-gap-gap',
    duration: '32:40',
    durationSeconds: 1960,
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    host: 'Bùi Thu Trang & Khách mời',
    category: 'Đời sống',
    publishedAt: '2026-09-03T07:00:00Z',
    description: 'Một tách trà ấm, một trang sách hay và cách tạm gác lại những thông báo đỏ rực trên màn hình điện thoại.',
    episodeNumber: 42
  },
  {
    id: 'pod-02',
    title: 'Tập 41: "Dòng tiền thông minh 2026" - Dự báo chu kỳ lãi suất và chiến lược tích sản an toàn',
    slug: 'dong-tien-thong-minh-2026-chu-ky-lai-suat',
    duration: '45:12',
    durationSeconds: 2712,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    host: 'TS. Nguyễn Hoàng Nam',
    category: 'Kinh tế',
    publishedAt: '2026-08-28T07:00:00Z',
    description: 'Phân tích các chuyển động tài chính vĩ mô, vàng, trái phiếu doanh nghiệp và bất động sản dòng tiền.',
    episodeNumber: 41
  },
  {
    id: 'pod-03',
    title: 'Tập 40: "AI và người làm sáng tạo" - Khi máy móc biết viết nhạc, giá trị con người nằm ở đâu?',
    slug: 'ai-va-nguoi-lam-sang-tao',
    duration: '38:05',
    durationSeconds: 2285,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    host: 'Lê Quang Vinh & Nhạc sĩ Khách mời',
    category: 'Công nghệ',
    publishedAt: '2026-08-21T07:00:00Z',
    description: 'Cuộc trò chuyện cởi mở về bản quyền số, xúc cảm nguyên bản và ranh giới nghệ thuật của kỷ nguyên thuật toán.',
    episodeNumber: 40
  },
  {
    id: 'pod-04',
    title: 'Tập 39: "Khí hậu và Đồng bằng" - Giải pháp bảo vệ sinh kế cho người nông dân ven biển',
    slug: 'khi-hau-va-dong-bang-sinh-ke-nong-dan',
    duration: '29:50',
    durationSeconds: 1790,
    coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    host: 'TS. Đặng Anh Khoa',
    category: 'Khoa học',
    publishedAt: '2026-08-14T07:00:00Z',
    description: 'Từ câu chuyện xâm nhập mặn tới các mô hình canh tác tôm - lúa thích ứng sinh thái bền vững.',
    episodeNumber: 39
  }
];

import { Article, Author } from '../types';

export const AUTHORS: Record<string, Author> = {
  nguyen_hoang_nam: {
    id: 'auth_1',
    name: 'TS. Nguyễn Hoàng Nam',
    role: 'Chuyên gia Kinh tế trưởng',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Nguyên Viện phó Viện Nghiên cứu Kinh tế Phát triển, hơn 20 năm phân tích chính sách tiền tệ và kinh tế khu vực Đông Nam Á.',
  },
  tran_thu_ha: {
    id: 'auth_2',
    name: 'Trần Thu Hà',
    role: 'Biên tập viên Quốc tế',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'Cựu thường trú viên tại Geneva và Tokyo, chuyên sâu về quan hệ ngoại giao đa phương và an ninh năng lượng toàn cầu.',
  },
  le_quang_vinh: {
    id: 'auth_3',
    name: 'Lê Quang Vinh',
    role: 'Phóng viên Công nghệ cao cấp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Theo dõi sự phát triển của trí tuệ nhân tạo thế hệ mới, chuỗi cung ứng chất bán dẫn và làn sóng khởi nghiệp deep-tech.',
  },
  vu_minh_chau: {
    id: 'auth_4',
    name: 'Vũ Minh Châu',
    role: 'Cây bút Văn hóa & Di sản',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    bio: 'Nhà nghiên cứu văn hóa đô thị, tác giả của nhiều khảo cứu về kiến trúc Đông Dương và mỹ thuật truyền thống Việt Nam.',
  },
  dang_anh_khoa: {
    id: 'auth_5',
    name: 'Đặng Anh Khoa',
    role: 'Chủ bút Khoa học & Môi trường',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Tiến sĩ Khí hậu học tại Đại học Sorbonne, gắn bó với các dự án chuyển dịch năng lượng xanh và bảo tồn sinh thái đồng bằng.',
  },
  pham_thanh_huyen: {
    id: 'auth_6',
    name: 'Phạm Thanh Huyền',
    role: 'Bình luận viên Giáo dục',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    bio: 'Nhiều năm làm việc trong lĩnh vực liên kết đào tạo quốc tế và tư vấn phát triển kỹ năng tư duy phản biện cho học sinh.',
  },
  hoang_duc_kien: {
    id: 'auth_7',
    name: 'Hoàng Đức Kiên',
    role: 'Phóng viên Thể thao chuyên sâu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    bio: 'Chuyên gia phân tích chiến thuật bóng đá châu Âu và sự phát triển của thể thao chuyên nghiệp Đông Nam Á.',
  },
  bui_thu_trang: {
    id: 'auth_8',
    name: 'Bùi Thu Trang',
    role: 'Chuyên mục Đời sống & Phong cách',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    bio: 'Người theo đuổi lối sống tối giản, ẩm thực theo mùa và những góc nhìn chánh niệm về nhịp sống đô thị hiện đại.',
  },
};

export const INITIAL_ARTICLES: Article[] = [
  // 1. HERO MAIN ARTICLE
  {
    id: 'art-01',
    title: 'Bước ngoặt hạ tầng năng lượng sạch: Việt Nam chính thức vận hành tổ hợp điện gió ngoài khơi thế hệ mới',
    slug: 'buoc-ngoat-ha-tang-nang-luong-sach-viet-nam-van-hanh-dien-gio-ngoai-khoi',
    excerpt: 'Dự án quy mô 1,2 GW tại vùng biển Duyên hải Nam Trung Bộ vừa hòa lưới thành công, đánh dấu bước tiến công nghệ chiến lược trong cam kết phát thải ròng bằng 0 vào năm 2050.',
    category: 'Thời sự',
    categorySlug: 'thoi-su',
    author: AUTHORS.dang_anh_khoa,
    publishedAt: '2026-09-04T05:30:00Z',
    readingTime: 6,
    tags: ['Năng lượng sạch', 'Điện gió', 'Chính sách', 'NetZero 2050'],
    views: 45200,
    featured: true,
    trending: true,
    isBreaking: true,
    isEditorPick: true,
    location: 'Bình Thuận - Hà Nội',
    coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=85',
    imageCaption: 'Cánh quạt tuabin gió khổng lồ vươn lên giữa bình minh trên thềm lục địa Nam Trung Bộ, biểu tượng của kỷ nguyên năng lượng tự chủ.',
    content: [
      {
        type: 'paragraph',
        content: 'Rạng sáng ngày hôm nay, tại Trung tâm Điều độ Hệ thống Điện Quốc gia, công tắc đóng mạch phát điện chính của Tổ hợp Điện gió ngoài khơi Mũi Dinh - Kê Gà đã chính thức được kích hoạt. Hơn 80 tuabin với công suất đơn vị 15 MW – thế hệ tuabin tiên tiến nhất khu vực – đã bắt đầu truyền tải dòng điện xanh đầu tiên vào lưới điện siêu cao áp 500 kV Bắc - Nam.'
      },
      {
        type: 'blockquote',
        content: 'Đây không chỉ là thành tựu kỹ thuật hàng hải thuần túy, mà là minh chứng rõ nét cho năng lực làm chủ công nghệ chuỗi cung ứng năng lượng cao cấp của các kỹ sư Việt Nam.',
        authorQuote: 'TS. Đặng Anh Khoa, Chủ bút Khoa học & Môi trường'
      },
      {
        type: 'paragraph',
        content: 'Dự án có tổng mức đầu tư hơn 2,8 tỷ USD, huy động nguồn vốn kết hợp giữa các định chế tài chính phát triển quốc tế và nguồn vốn đối ứng trong nước. Đặc biệt, tỷ lệ nội địa hóa các cấu kiện giàn chân đế thép và trạm biến áp ngoài khơi đạt trên 68%, mở ra ngành công nghiệp phụ trợ hoàn toàn mới cho các cụm cảng cơ khí tại Vũng Tàu và Dung Quất.'
      },
      {
        type: 'infographic',
        data: [
          { label: 'Công suất thiết kế', value: '1.200 MW', detail: 'Cung cấp điện cho hơn 1,8 triệu hộ dân' },
          { label: 'Giảm phát thải CO2', value: '3,2 triệu tấn/năm', detail: 'Tương đương trồng mới 150.000 ha rừng' },
          { label: 'Tỷ lệ nội địa hóa', value: '68%', detail: 'Gia công hoàn toàn tại các ụ đóng tàu Việt Nam' },
          { label: 'Vốn giải ngân', value: '2,8 tỷ USD', detail: 'Hợp tác công - tư theo chuẩn xanh quốc tế' }
        ]
      },
      {
        type: 'heading',
        content: 'Bài toán lưu trữ và điều độ thông minh'
      },
      {
        type: 'paragraph',
        content: 'Một trong những thách thức lớn nhất của nguồn năng lượng biến đổi là tính ổn định của hệ thống. Để khắc phục hiện tượng nghẽn mạch, tổ hợp đã tích hợp hệ thống pin lưu trữ năng lượng (BESS) quy mô 300 MWh sử dụng công nghệ pin natri-ion an toàn với môi trường biển.'
      },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Khu vực điều hành trạm biến áp trung tâm ứng dụng mô hình số Digital Twin theo thời gian thực.'
      },
      {
        type: 'paragraph',
        content: 'Theo quy hoạch điều chỉnh, việc đưa cụm công trình vào vận hành sớm hơn dự kiến 4 tháng sẽ tạo dư địa điều tiết quan trọng cho mùa khô sắp tới, đồng thời giảm bớt phụ thuộc vào các tổ hợp nhiệt điện than truyền thống.'
      }
    ]
  },

  // 2. KINH TẾ (Leading Story)
  {
    id: 'art-02',
    title: 'Tái định hình dòng vốn đầu tư toàn cầu: Cuộc đua công nghệ và sự trỗi dậy của các trung tâm tài chính Đông Nam Á',
    slug: 'tai-dinh-hinh-dong-von-dau-tu-toan-cau-trung-tam-tai-chinh',
    excerpt: 'Khi lãi suất tại các ngân hàng trung ương phương Tây bước vào chu kỳ hạ nhiệt, dòng vốn mạo hiểm và FDI đang tìm kiếm những điểm tựa sản xuất giá trị gia tăng cao tại châu Á.',
    category: 'Kinh tế',
    categorySlug: 'kinh-te',
    author: AUTHORS.nguyen_hoang_nam,
    publishedAt: '2026-09-03T23:15:00Z',
    readingTime: 7,
    tags: ['Tài chính', 'FDI', 'Bán dẫn', 'Kinh tế vĩ mô'],
    views: 38400,
    featured: true,
    trending: true,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Khu trung tâm tài chính hiện đại phản chiếu nhịp chuyển động mạnh mẽ của dòng tiền đầu tư quốc tế.',
    content: [
      {
        type: 'paragraph',
        content: 'Thị trường tài chính những tháng qua chứng kiến sự xoay trục ấn tượng của các quỹ quản lý tài sản sovereign wealth fund. Không còn chỉ đơn thuần rót vốn vào các trái phiếu định giá cao hay bất động sản cốt lõi, đích đến mới là các cơ sở hạ tầng bán dẫn, trung tâm dữ liệu AI và mạng lưới logistics cảng biển thông minh.'
      },
      {
        type: 'blockquote',
        content: 'Châu Á không còn là công xưởng gia công chi phí rẻ. Những quốc gia nhanh nhạy thiết lập khung khổ pháp lý minh bạch và năng lượng xanh đang trở thành thỏi nam châm hút nguồn vốn công nghệ thế hệ thứ tư.',
        authorQuote: 'TS. Nguyễn Hoàng Nam'
      },
      {
        type: 'paragraph',
        content: 'Báo cáo mới nhất từ Viện Tài chính Quốc tế chỉ ra rằng tổng vốn đầu tư trực tiếp nước ngoài (FDI) cam kết vào khu vực ASEAN trong 8 tháng qua đã vượt ngưỡng 120 tỷ USD, tăng 14,5% so với cùng kỳ năm trước. Trong đó, Việt Nam và Malaysia chia sẻ tỷ trọng lớn nhất ở mảng đóng gói vi mạch cấp cao.'
      }
    ]
  },

  // 3. CÔNG NGHỆ (Deep Tech)
  {
    id: 'art-03',
    title: 'Kỷ nguyên mô hình ngôn ngữ thế hệ mới: Khi AI học cách tư duy phản biện và tự sửa lỗi trong thời gian thực',
    slug: 'ky-nguyen-mo-hinh-ngon-ngu-ai-tu-duy-phan-bien',
    excerpt: 'Những thuật toán suy luận chuỗi ý nghĩ (Chain-of-Thought) kết hợp cùng hệ thống xác minh logic hình thức đang giúp trí tuệ nhân tạo vượt qua giới hạn ảo giác thường thấy.',
    category: 'Công nghệ',
    categorySlug: 'cong-nghe',
    author: AUTHORS.le_quang_vinh,
    publishedAt: '2026-09-04T02:00:00Z',
    readingTime: 5,
    tags: ['AI', 'Trí tuệ nhân tạo', 'Machine Learning', 'Tương lai công nghệ'],
    views: 52100,
    featured: true,
    trending: true,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Mô phỏng đồ thị mạng nơ-ron đa tầng với các nút xử lý ngữ nghĩa phức hợp.',
    content: [
      {
        type: 'paragraph',
        content: 'Trong nhiều năm, bài toán lớn nhất cản trở việc áp dụng AI vào y tế chính xác, tư vấn pháp lý và kiến trúc cầu đường chính là hiện tượng "ảo giác" (hallucination) – nơi mô hình tự tin đưa ra những câu trả lời sai lệch hoàn toàn so với thực tế khoa học.'
      },
      {
        type: 'paragraph',
        content: 'Tuy nhiên, làn sóng mô hình suy luận mới ra mắt đầu năm nay đã giải quyết bài toán này từ gốc rễ. Thay vì chỉ dự đoán từ tiếp theo dựa trên xác suất thống kê đơn thuần, hệ thống được trang bị bộ kiểm định đa bước: tự đặt câu hỏi nghi vấn, giả lập các trường hợp phản biện và chỉ xuất kết quả khi đạt ngưỡng tin cậy xác suất toán học.'
      }
    ]
  },

  // 4. THẾ GIỚI
  {
    id: 'art-04',
    title: 'Thỏa ước Geneva về hành lang vận tải Bắc Cực: Thách thức pháp lý và cán cân địa chiến lược mới',
    slug: 'thoa-uoc-geneva-hanh-lang-bac-cuc-dia-chien-luoc',
    excerpt: 'Khi băng tan mở ra những tuyến hàng hải rút ngắn một nửa thời gian từ châu Âu sang châu Á, 12 quốc gia ven bờ đã bước vào vòng đàm phán cam go nhất thập kỷ.',
    category: 'Thế giới',
    categorySlug: 'the-gioi',
    author: AUTHORS.tran_thu_ha,
    publishedAt: '2026-09-03T18:45:00Z',
    readingTime: 8,
    tags: ['Địa chính trị', 'Bắc Cực', 'Hàng hải', 'Ngoại giao'],
    views: 29800,
    featured: false,
    trending: true,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Tàu nghiên cứu khoa học phá băng di chuyển qua eo biển băng giá trong phiên khảo sát đáy biển đa quốc gia.',
    content: [
      {
        type: 'paragraph',
        content: 'Tuyến đường Biển Phương Bắc không còn là viễn cảnh của các tiểu thuyết khoa học viễn tưởng. Với thời gian vận chuyển hàng hóa giữa Rotterdam và Thượng Hải được rút ngắn từ 33 ngày xuống chỉ còn 18 ngày, giá trị kinh tế khổng lồ đang thôi thúc các cường quốc thiết lập quy chế quản trị vùng nước quốc tế.'
      }
    ]
  },

  // 5. VĂN HÓA
  {
    id: 'art-05',
    title: 'Hồi sinh di sản kiến trúc phố cổ: Cuộc đối thoại giữa gạch nung truyền thống và vật liệu sinh thái hiện đại',
    slug: 'hoi-sinh-di-san-kien-truc-pho-co-ha-noi-hoi-an',
    excerpt: 'Dự án phục dựng các biệt thự Pháp cổ và nhà rường cổ kính đang chứng minh rằng bảo tồn không phải là đóng băng quá khứ, mà là trao cho di sản hơi thở đương đại.',
    category: 'Văn hóa',
    categorySlug: 'van-hoa',
    author: AUTHORS.vu_minh_chau,
    publishedAt: '2026-09-03T14:20:00Z',
    readingTime: 6,
    tags: ['Kiến trúc', 'Di sản', 'Hà Nội', 'Nghệ thuật'],
    views: 31200,
    featured: false,
    trending: false,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Mái ngói âm dương rêu phong giao hòa cùng ánh sáng tự nhiên qua lớp giếng trời kính thông minh.',
    content: [
      {
        type: 'paragraph',
        content: 'Bước chân vào con ngõ nhỏ trên phố Châu Long, người ta ngỡ ngàng khi thấy một căn biệt thự hai tầng được xây dựng từ năm 1928 vừa hoàn tất đợt trùng tu 18 tháng. Không có những bức tường trát xi măng vô hồn; từng viên gạch thẻ Bát Tràng cũ được bóc tách tỉ mỉ bằng tay, làm sạch tạp chất và tái sử dụng cùng vữa vôi tôi truyền thống kết hợp phụ gia nano chống ẩm.'
      }
    ]
  },

  // 6. GIÁO DỤC
  {
    id: 'art-06',
    title: 'Đại học thời kỳ hậu bằng cấp: Khi kỹ năng giải quyết vấn đề thực tế thay thế các bảng điểm lý thuyết',
    slug: 'dai-hoc-thoi-ky-hau-bang-cap-ky-nang-thuc-te',
    excerpt: 'Các tập đoàn công nghệ lớn và viện nghiên cứu hàng đầu đang chuyển dịch tiêu chuẩn tuyển dụng sang hình thức portfolio dự án mở và kiểm tra năng lực cộng tác liên ngành.',
    category: 'Giáo dục',
    categorySlug: 'giao-duc',
    author: AUTHORS.pham_thanh_huyen,
    publishedAt: '2026-09-03T10:10:00Z',
    readingTime: 5,
    tags: ['Đại học', 'Kỹ năng số', 'Tuyển dụng', 'Học tập suốt đời'],
    views: 24500,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Sinh viên thảo luận mô hình dự án liên môn tại không gian sáng tạo mở của trường đại học.',
    content: [
      {
        type: 'paragraph',
        content: 'Một khảo sát vừa công bố với hơn 500 giám đốc nhân sự tại các doanh nghiệp trong Top VNR500 cho thấy: 72% nhà tuyển dụng sẵn sàng bỏ qua xếp loại bằng đại học nếu ứng viên chứng minh được năng lực xử lý tình huống thực tế và khả năng thích ứng với công cụ số mới.'
      }
    ]
  },

  // 7. KHOA HỌC
  {
    id: 'art-07',
    title: 'Kính thiên văn không gian thế hệ kế tiếp phát hiện dấu vết hơi nước trong khí quyển hành tinh ngoại K2-18b',
    slug: 'kinh-thien-van-phat-hien-hoi-nuoc-k2-18b',
    excerpt: 'Dữ liệu quang phổ kế phân giải siêu cao khẳng định sự hiện diện của hợp chất carbon và chu trình bốc hơi nước trên thiên thể cách Trái Đất 120 năm ánh sáng.',
    category: 'Khoa học',
    categorySlug: 'khoa-hoc',
    author: AUTHORS.dang_anh_khoa,
    publishedAt: '2026-09-02T22:30:00Z',
    readingTime: 6,
    tags: ['Thiên văn', 'Vũ trụ', 'Vật lý', 'Khám phá'],
    views: 41800,
    featured: false,
    trending: true,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Ảnh dựng đồ họa mô phỏng bầu khí quyển xanh thẫm của ngoại hành tinh K2-18b dưới ánh sao chủ.',
    content: [
      {
        type: 'paragraph',
        content: 'Các nhà vật lý thiên văn quốc tế vừa công bố kết quả quan trắc 48 giờ liên tục trên tạp chí Nature Astronomy. Điểm đặc biệt là vạch hấp thụ quang phổ của phân tử dimethyl sulfide (DMS) – chất trên Trái Đất hầu như chỉ sinh ra từ vi sinh vật biển – đã được ghi nhận ở mức ý nghĩa thống kê 3-sigma.'
      }
    ]
  },

  // 8. ĐỜI SỐNG
  {
    id: 'art-08',
    title: 'Triết lý "Sống chậm theo mùa": Người trẻ thị thành tìm lại sự cân bằng giữa nhịp quay của các thông báo số',
    slug: 'triet-ly-song-cham-theo-mua-do-thi-hien-dai',
    excerpt: 'Từ những bữa cơm tự nấu bằng rau quả địa phương đến những buổi tối tắt hoàn toàn màn hình, xu hướng "Digital Detox" đang trở thành lối sống có ý thức của thế hệ sáng tạo.',
    category: 'Đời sống',
    categorySlug: 'doi-song',
    author: AUTHORS.bui_thu_trang,
    publishedAt: '2026-09-02T16:00:00Z',
    readingTime: 5,
    tags: ['Chánh niệm', 'Sống chậm', 'Sức khỏe tinh thần', 'Xu hướng'],
    views: 35600,
    featured: false,
    trending: false,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Góc trà chiều ấm áp với sách giấy và ánh hoàng hôn lan tỏa trong căn hộ nhỏ.',
    content: [
      {
        type: 'paragraph',
        content: 'Không còn là sự phản kháng mang tính trào lưu nhất thời, lối sống chậm đang được định hình bằng những thực hành rất cụ thể: dành 60 phút mỗi sáng trước khi mở hộp thư điện tử, học cách phân biệt các loại trà cổ thụ Tây Bắc, và tổ chức những buổi đọc sách chung nơi điện thoại được gửi lại ở cửa.'
      }
    ]
  },

  // 9. THỂ THAO
  {
    id: 'art-09',
    title: 'Cách mạng dữ liệu trong bóng đá hiện đại: Khi chỉ số xG và bản đồ nhiệt thay đổi hoàn toàn sơ đồ chiến thuật',
    slug: 'cach-mang-du-lieu-trong-bong-da-hien-dai',
    excerpt: 'Không chỉ là những đường chuyền hoa mỹ, bóng đá thế giới đang được định hình bởi những thuật toán theo dõi chuyển động không bóng và mô hình xác suất bàn thắng kỳ vọng.',
    category: 'Thể thao',
    categorySlug: 'the-thao',
    author: AUTHORS.hoang_duc_kien,
    publishedAt: '2026-09-02T12:00:00Z',
    readingTime: 6,
    tags: ['Bóng đá', 'Chiến thuật', 'Phân tích dữ liệu', 'Thể thao'],
    views: 28900,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Sân vận động rực rỡ ánh đèn trong một trận cầu đỉnh cao tại đấu trường cúp châu lục.',
    content: [
      {
        type: 'paragraph',
        content: 'Khoảng cách giữa các đội bóng hàng đầu châu Âu hiện nay đôi khi chỉ được đo bằng những góc độ mở cơ thể 15 độ của hậu vệ biên hoặc tốc độ đưa bóng vào 1/3 sân đối phương trong vòng 3,5 giây sau khi giành lại quyền kiểm soát.'
      }
    ]
  },

  // 10. THỜI SỰ (Hạ tầng giao thông cao tốc)
  {
    id: 'art-10',
    title: 'Khánh thành cầu dây văng lớn nhất miền Tây: Kết nối thông suốt trục kinh tế duyên hải đồng bằng',
    slug: 'khanh-thanh-cau-day-vang-lon-nhat-mien-tay',
    excerpt: 'Công trình biểu tượng dài 3,8 km bắc qua dòng sông Tiền chính thức thông xe sáng nay, rút ngắn thời gian di chuyển từ TP.HCM về bán đảo Cà Mau xuống còn dưới 4 giờ.',
    category: 'Thời sự',
    categorySlug: 'thoi-su',
    author: AUTHORS.nguyen_hoang_nam,
    publishedAt: '2026-09-02T08:15:00Z',
    readingTime: 5,
    tags: ['Hạ tầng', 'Giao thông', 'Đồng bằng sông Cửu Long', 'Cầu đường'],
    views: 33400,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Trụ tháp cầu dây văng sừng sững vươn cao đón những tia nắng đầu tiên của ngày mới.',
    content: [
      {
        type: 'paragraph',
        content: 'Đúng 7 giờ sáng, đoàn xe đầu tiên chở bà con nhân dân và đại diện các hiệp hội nông thủy sản địa phương đã lăn bánh qua cây cầu mới trong tiếng reo vui náo nức. Đây là công trình mơ ước suốt nhiều thế hệ của người dân đôi bờ, thay thế hoàn toàn những chuyến phà qua sông trắc trở mùa mưa lũ.'
      }
    ]
  },

  // 11. KINH TẾ (Khởi nghiệp & Công nghiệp bán dẫn)
  {
    id: 'art-11',
    title: 'Thung lũng bán dẫn Bắc Ninh - Hải Phòng: Hạt nhân mới trong chuỗi cung ứng vi mạch Đông Á',
    slug: 'thung-lung-ban-dan-bac-ninh-hai-phong-chuoi-cung-ung',
    excerpt: 'Với hơn 15 nhà máy thử nghiệm và đóng gói vi mạch đi vào hoạt động đồng bộ, tam giác kinh tế phía Bắc đang khẳng định vị thế trung tâm công nghệ cao của khu vực.',
    category: 'Kinh tế',
    categorySlug: 'kinh-te',
    author: AUTHORS.le_quang_vinh,
    publishedAt: '2026-09-01T21:00:00Z',
    readingTime: 7,
    tags: ['Bán dẫn', 'Đầu tư', 'Sản xuất', 'Kinh tế số'],
    views: 47900,
    featured: false,
    trending: true,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Bảng vi mạch silicon được gia công với độ chính xác nanomet trong phòng sạch tiêu chuẩn quốc tế.',
    content: [
      {
        type: 'paragraph',
        content: 'Không dừng lại ở gia công cấp thấp, các kỹ sư Việt Nam tại các phòng lab thiết kế vi mạch chuyên dụng (ASIC) đang trực tiếp tham gia chế tạo dòng chip tiết kiệm năng lượng cho thiết bị Internet vạn vật (IoT) và camera an ninh thông minh.'
      }
    ]
  },

  // 12. THẾ GIỚI (Chuyển dịch địa kinh tế)
  {
    id: 'art-12',
    title: 'Hội nghị thượng đỉnh G20 tại Tokyo: Thông qua hiệp định khung về tiêu chuẩn kiểm soát carbon biên giới',
    slug: 'hoi-nghi-thuong-dinh-g20-tokyo-tieu-chuan-carbon',
    excerpt: 'Các nền kinh tế lớn nhất hành tinh đã tìm được tiếng nói chung về cơ chế tính thuế carbon đối với các sản phẩm thép, nhôm và phân bón thương mại xuyên biên giới.',
    category: 'Thế giới',
    categorySlug: 'the-gioi',
    author: AUTHORS.tran_thu_ha,
    publishedAt: '2026-09-01T15:30:00Z',
    readingTime: 6,
    tags: ['G20', 'Biến đổi khí hậu', 'CBAM', 'Thương mại quốc tế'],
    views: 22100,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Các phái đoàn ngoại giao trao đổi trong phiên họp bế mạc hội nghị thượng đỉnh đa phương.',
    content: [
      {
        type: 'paragraph',
        content: 'Bản thông cáo chung gồm 48 trang được thông qua sau 72 giờ thương thảo không ngừng nghỉ. Thỏa thuận mới thiết lập lộ trình 3 năm chuyển tiếp giúp các nước đang phát triển tiếp cận nguồn vốn công nghệ giảm thải với lãi suất ưu đãi.'
      }
    ]
  },

  // 13. CÔNG NGHỆ (Điện toán lượng tử)
  {
    id: 'art-13',
    title: 'Điện toán lượng tử đạt bước nhảy vọt: Máy tính 1.000 qubit giải mã thành công cấu trúc protein phức hợp',
    slug: 'dien-toan-luong-tu-giai-ma-cau-truc-protein',
    excerpt: 'Một thử nghiệm mang tính lịch sử mở ra triển vọng rút ngắn thời gian phát triển thuốc điều trị ung thư từ 10 năm xuống chỉ còn vài tuần mô phỏng trên máy tính.',
    category: 'Công nghệ',
    categorySlug: 'cong-nghe',
    author: AUTHORS.le_quang_vinh,
    publishedAt: '2026-09-01T09:00:00Z',
    readingTime: 5,
    tags: ['Lượng tử', 'Y sinh', 'AI', 'Điện toán'],
    views: 39100,
    featured: false,
    trending: true,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Hệ thống buồng làm lạnh siêu hàn chứa chip lượng tử vận hành tại nhiệt độ gần độ 0 tuyệt đối.',
    content: [
      {
        type: 'paragraph',
        content: 'Bài toán mô phỏng sự tương tác giữa các phân tử thuốc và protein tế bào từng là bức tường kiên cố trước sức mạnh của các siêu máy tính cổ điển. Với cơ chế chồng chập lượng tử, cỗ máy mới đã đồng thời tính toán hàng tỷ tổ hợp hóa học trong chưa đầy 4 phút.'
      }
    ]
  },

  // 14. VĂN HÓA (Văn học đương đại)
  {
    id: 'art-14',
    title: 'Giải thưởng Văn học Sách Vàng 2026: Tôn vinh tiếng nói của những người viết trẻ về bản sắc nông thôn đổi mới',
    slug: 'giai-thuong-van-hoc-sach-vang-2026-nguoi-viet-tre',
    excerpt: 'Tác phẩm đoạt giải cao nhất là tập truyện ngắn ghi lại những xao xuyến và chuyển động thầm lặng của một làng chài duyên hải trước làn sóng công nghiệp hóa.',
    category: 'Văn hóa',
    categorySlug: 'van-hoa',
    author: AUTHORS.vu_minh_chau,
    publishedAt: '2026-08-31T20:10:00Z',
    readingTime: 4,
    tags: ['Văn học', 'Giải thưởng', 'Sách', 'Nghệ thuật'],
    views: 18700,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Những trang sách mở ra thế giới tinh thần sâu lắng của người cầm bút đương đại.',
    content: [
      {
        type: 'paragraph',
        content: 'Chủ tịch Hội đồng Giám khảo nhận định: Văn chương hôm nay không còn đóng khung trong những hoài niệm xa xôi, mà trực diện đối thoại với những băn khoăn rất đỗi con người về nguồn cội, đất đai và tình thân giữa thời đại số.'
      }
    ]
  },

  // 15. GIÁO DỤC (Đổi mới STEM)
  {
    id: 'art-15',
    title: 'Mô hình trường học xanh giữa lòng rừng Cúc Phương: Nơi thiên nhiên trở thành giáo trình sinh động',
    slug: 'truong-hoc-xanh-rung-cuc-phuong-giao-duc-thien-nhien',
    excerpt: 'Học sinh tiểu học và trung học được trực tiếp tham gia ươm mầm giống cây bản địa, quan sát hành vi động vật và học toán học từ cấu trúc tổ ong và đường xoắn ốc của vỏ ốc.',
    category: 'Giáo dục',
    categorySlug: 'giao-duc',
    author: AUTHORS.pham_thanh_huyen,
    publishedAt: '2026-08-31T14:40:00Z',
    readingTime: 5,
    tags: ['Giáo dục xanh', 'Sinh thái', 'Trường học', 'Trải nghiệm'],
    views: 26300,
    featured: false,
    trending: false,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Tia nắng rọi qua tán cây cổ thụ trong khuôn viên học tập trải nghiệm ngoài trời.',
    content: [
      {
        type: 'paragraph',
        content: 'Không gian lớp học được thiết kế mở hoàn toàn với vật liệu gỗ tái chế và mây tre đan. Các em không bị bó hẹp trong bốn bức tường bê tông mà được rèn luyện sức bền thể chất và sự đồng cảm sâu sắc với muôn loài.'
      }
    ]
  },

  // 16. KHOA HỌC (Sinh học biển)
  {
    id: 'art-16',
    title: 'Phục hồi thành công rạn san hô cổ tại Côn Đảo bằng công nghệ vi phân tử canxi kích thích điện sinh học',
    slug: 'phuc-hoi-ran-san-ho-con-dao-cong-nghe-dien-sinh-hoc',
    excerpt: 'Sau 3 năm thử nghiệm, diện tích phủ san hô cứng sống tại vịnh Đầm Tre đã tăng từ 14% lên hơn 42%, mở ra hy vọng tái sinh các hệ sinh thái biển nhiệt đới.',
    category: 'Khoa học',
    categorySlug: 'khoa-hoc',
    author: AUTHORS.dang_anh_khoa,
    publishedAt: '2026-08-31T09:15:00Z',
    readingTime: 6,
    tags: ['Đại dương', 'San hô', 'Môi trường', 'Bảo tồn'],
    views: 29500,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Rạn san hô đầy màu sắc đang phát triển trở lại dưới làn nước biển trong vắt tại khu bảo tồn.',
    content: [
      {
        type: 'paragraph',
        content: 'Các nhà khoa học tại Viện Hải dương học đã sử dụng khung thép mạ kẽm nối với nguồn điện cực yếu chạy bằng pin mặt trời nổi. Dòng điện kích thích kết tủa khoáng chất canxi cacbonat tự nhiên từ nước biển, giúp ấu trùng san hô bám dính và phát triển nhanh gấp 4 lần tốc độ tự nhiên.'
      }
    ]
  },

  // 17. ĐỜI SỐNG (Ẩm thực cội nguồn)
  {
    id: 'art-17',
    title: 'Hành trình tìm lại 100 giống gia vị cổ truyền của các dân tộc vùng cao Tây Bắc',
    slug: 'hanh-trinh-tim-lai-100-giong-gia-vi-co-truyen-tay-bac',
    excerpt: 'Những hạt mắc khén thơm lừng, hạt dổi rừng già hay lá é trắng không chỉ là gia vị cho bữa ăn mà là kho tàng tri thức bản địa vô giá cần được bảo tồn.',
    category: 'Đời sống',
    categorySlug: 'doi-song',
    author: AUTHORS.bui_thu_trang,
    publishedAt: '2026-08-30T17:20:00Z',
    readingTime: 5,
    tags: ['Ẩm thực', 'Gia vị', 'Văn hóa bản địa', 'Tây Bắc'],
    views: 34100,
    featured: false,
    trending: false,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Mâm gia vị thảo mộc khô thơm nồng được phơi trong nắng sớm vùng cao.',
    content: [
      {
        type: 'paragraph',
        content: 'Một nhóm bạn trẻ tốt nghiệp ngành công nghệ thực phẩm đã dành trọn 2 năm rong ruổi khắp các bản làng Hà Giang, Yên Bái và Lai Châu để ghi chép lại cách người bản xứ thu hái, bảo quản và phối trộn các loại thảo mộc rừng.'
      }
    ]
  },

  // 18. THỂ THAO (Olympic & Điền kinh)
  {
    id: 'art-18',
    title: 'Huy chương Vàng lịch sử tại Giải Vô địch Điền kinh Châu Á: Sự bền bỉ của những bước chạy trên đất đỏ',
    slug: 'huy-chuong-vang-dien-kinh-chau-a-chay-cu-ly-dai',
    excerpt: 'Ở cự ly 10.000m nữ, chân chạy 24 tuổi đến từ vùng cao nguyên đất đỏ đã tạo nên cú bứt tốc ngoạn mục trong vòng đua cuối cùng trước sự ngỡ ngàng của giới chuyên môn.',
    category: 'Thể thao',
    categorySlug: 'the-thao',
    author: AUTHORS.hoang_duc_kien,
    publishedAt: '2026-08-30T11:00:00Z',
    readingTime: 4,
    tags: ['Điền kinh', 'Thể thao Việt Nam', 'Huy chương vàng', 'Cảm hứng'],
    views: 37800,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Khoảnh khắc vỡ òa hạnh phúc khi chạm vạch đích của vận động viên vô địch.',
    content: [
      {
        type: 'paragraph',
        content: 'Với thông số 31 phút 42 giây, cô không chỉ phá kỷ lục quốc gia tồn tại suốt 12 năm mà còn chính thức giành chuẩn tham dự Thế vận hội mùa Hè sắp tới.'
      }
    ]
  },

  // 19. THỜI SỰ (Chính sách Đô thị)
  {
    id: 'art-19',
    title: 'Quy hoạch không gian ngầm đô thị TP.HCM: Giải phóng mặt đất cho công viên cây xanh và quảng trường đi bộ',
    slug: 'quy-hoach-khong-gian-ngam-do-thi-tphcm',
    excerpt: 'Hệ thống trung tâm thương mại ngầm liên thông 4 ga metro trung tâm cùng bãi đỗ xe tự động 5 tầng ngầm đang định hình diện mạo đô thị văn minh chuẩn quốc tế.',
    category: 'Thời sự',
    categorySlug: 'thoi-su',
    author: AUTHORS.nguyen_hoang_nam,
    publishedAt: '2026-08-29T22:00:00Z',
    readingTime: 6,
    tags: ['Đô thị', 'Metro', 'TP.HCM', 'Quy hoạch'],
    views: 30400,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Toàn cảnh khu lõi trung tâm thành phố nhìn từ trên cao trong ánh chiều tà.',
    content: [
      {
        type: 'paragraph',
        content: 'Ý tưởng dịch chuyển các chức năng thương mại và bến bãi xuống lòng đất giúp giải phóng hơn 25 hecta không gian mặt tiền cho các công viên cây xanh và đường dạo bộ ven sông Sài Gòn.'
      }
    ]
  },

  // 20. KINH TẾ (Nông nghiệp công nghệ cao)
  {
    id: 'art-20',
    title: 'Xuất khẩu sầu riêng và nông sản chế biến sâu chạm mốc 5 tỷ USD: Khẳng định thương hiệu nông sản sạch',
    slug: 'xuat-khau-nong-san-che-bien-sau-5-ty-usd',
    excerpt: 'Nhờ chuyển đổi đồng loạt sang quy trình canh tác hữu cơ có mã số vùng trồng minh bạch và công nghệ cấp đông nhanh IQF, nông sản Việt Nam đang thâm nhập sâu vào các thị trường cao cấp.',
    category: 'Kinh tế',
    categorySlug: 'kinh-te',
    author: AUTHORS.nguyen_hoang_nam,
    publishedAt: '2026-08-29T16:15:00Z',
    readingTime: 5,
    tags: ['Nông nghiệp', 'Xuất khẩu', 'Thương mại', 'Nông dân'],
    views: 27600,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Nông trang trĩu quả được chăm sóc theo tiêu chuẩn hữu cơ xuất khẩu tại vùng Đông Nam Bộ.',
    content: [
      {
        type: 'paragraph',
        content: 'Không còn tình trạng "được mùa mất giá", các hợp tác xã kiểu mới tại Tây Nguyên đã liên kết trực tiếp với các tập đoàn chế biến sâu để sản xuất bột sầu riêng thăng hoa, mứt sấy dẻo và tinh dầu xuất khẩu sang Nhật Bản và EU.'
      }
    ]
  },

  // 21. THẾ GIỚI (Quan hệ quốc tế)
  {
    id: 'art-21',
    title: 'Hiệp ước Không gian mạng Toàn cầu: Nỗ lực bảo vệ trẻ em và dữ liệu cá nhân trước rủi ro deepfake',
    slug: 'hiep-uoc-khong-gian-mang-toan-cau-chong-deepfake',
    excerpt: 'Hơn 65 quốc gia thành viên Liên Hợp Quốc đã ký tuyên bố chung yêu cầu gắn dấu chìm bắt buộc (watermark kỹ thuật số) trên toàn bộ nội dung do AI tổng hợp tạo ra.',
    category: 'Thế giới',
    categorySlug: 'the-gioi',
    author: AUTHORS.tran_thu_ha,
    publishedAt: '2026-08-29T10:00:00Z',
    readingTime: 6,
    tags: ['An ninh mạng', 'Liên Hợp Quốc', 'Deepfake', 'Chính sách số'],
    views: 24800,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Bảo mật thông tin số và quyền riêng tư trở thành vấn đề sống còn của kỷ nguyên thông tin.',
    content: [
      {
        type: 'paragraph',
        content: 'Hiệp ước mới yêu cầu các nền tảng mạng xã hội và công cụ tìm kiếm phải triển khai thuật toán phát hiện giả mạo tự động, đồng thời xử phạt nghiêm minh các hành vi mạo danh lừa đảo bằng giọng nói hoặc hình ảnh video.'
      }
    ]
  },

  // 22. CÔNG NGHỆ (Robot tự hành)
  {
    id: 'art-22',
    title: 'Hạm đội drone y tế giao máu khẩn cấp tại các đảo tiền tiêu: Rút ngắn thời gian cứu sinh người bệnh',
    slug: 'drone-y-te-giao-mau-khan-cap-dao-tien-tieu',
    excerpt: 'Những chiếc máy bay không người lái cánh bằng có thể bay với tốc độ 120 km/h trong mọi điều kiện gió bão cấp 6, mang theo các túi máu đông lạnh và huyết thanh kháng độc.',
    category: 'Công nghệ',
    categorySlug: 'cong-nghe',
    author: AUTHORS.le_quang_vinh,
    publishedAt: '2026-08-28T21:45:00Z',
    readingTime: 5,
    tags: ['Drone', 'Y tế', 'Công nghệ ứng dụng', 'Cứu hộ'],
    views: 31900,
    featured: false,
    trending: false,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Máy bay không người lái chuyên dụng chuẩn bị cất cánh từ trung tâm y tế đất liền ra hải đảo.',
    content: [
      {
        type: 'paragraph',
        content: 'Trong một ca cấp cứu bệnh nhân sốc mất máu tại đặc khu Cát Bà tuần trước, chiếc drone y tế đã hoàn thành chặng bay 28 hải lý chỉ trong 19 phút, kịp thời cung cấp 4 đơn vị hồng cầu nhóm hiếm O- để ê-kíp bác sĩ tiến hành mổ cấp cứu thành công.'
      }
    ]
  },

  // 23. KHOA HỌC (Y sinh)
  {
    id: 'art-23',
    title: 'Thử nghiệm lâm sàng liệu pháp tế bào CAR-T tại Bệnh viện K: Cơ hội sống cho bệnh nhân ung thư máu tái phát',
    slug: 'thu-nghiem-lam-sang-te-bao-car-t-ung-thu-mau',
    excerpt: 'Công nghệ biến đổi gen tế bào miễn dịch của chính bệnh nhân để nhận diện và tiêu diệt tế bào ác tính đã mang lại tỷ lệ lui bệnh hoàn toàn 84% sau 90 ngày.',
    category: 'Khoa học',
    categorySlug: 'khoa-hoc',
    author: AUTHORS.dang_anh_khoa,
    publishedAt: '2026-08-28T14:30:00Z',
    readingTime: 7,
    tags: ['Y sinh', 'Ung thư', 'Gen', 'Y học tương lai'],
    views: 43200,
    featured: false,
    trending: true,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Nhà nghiên cứu kiểm tra mẫu sinh phẩm tế bào dưới kính hiển vi điện tử quang học.',
    content: [
      {
        type: 'paragraph',
        content: 'Việc tự chủ được quy trình nuôi cấy và chỉnh sửa gen tế bào T ngay trong nước giúp chi phí của liệu pháp này giảm xuống chỉ bằng 1/5 so với chi phí điều trị tại các bệnh viện ở Mỹ hay Singapore.'
      }
    ]
  },

  // 24. GIÁO DỤC (Kỹ năng tương lai)
  {
    id: 'art-24',
    title: 'Phát triển năng lực cảm xúc xã hội (SEL) cho học sinh: Chiếc neo an toàn trong thế giới siêu kết nối',
    slug: 'phat-trien-nang-luc-cam-xuc-xa-hoi-sel-cho-hoc-sinh',
    excerpt: 'Thay vì chỉ tập trung vào điểm số các môn tự nhiên, nhiều trường học đã đưa các giờ học thấu cảm, giải quyết xung đột và tự nhận thức vào chương trình chính khóa.',
    category: 'Giáo dục',
    categorySlug: 'giao-duc',
    author: AUTHORS.pham_thanh_huyen,
    publishedAt: '2026-08-28T08:00:00Z',
    readingTime: 4,
    tags: ['Tâm lý học đường', 'SEL', 'Giáo dục', 'Trẻ em'],
    views: 19400,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Tiết học thảo luận nhóm giúp các em học sinh rèn luyện kỹ năng lắng nghe tích cực.',
    content: [
      {
        type: 'paragraph',
        content: 'Các nghiên cứu dài hạn khẳng định rằng chỉ số trí tuệ cảm xúc và khả năng kiểm soát căng thẳng tuổi dậy thì là yếu tố dự báo thành công và hạnh phúc trọn đời chính xác hơn nhiều so với chỉ số IQ thuần túy.'
      }
    ]
  },

  // 25. VĂN HÓA (Mỹ thuật & Trưng bày)
  {
    id: 'art-25',
    title: 'Triển lãm "Hồn lụa qua ba thế kỷ": Chiêm ngưỡng những kiệt tác tranh lụa vô giá của các danh họa Đông Dương',
    slug: 'trien-lam-hon-lua-qua-ba-the-ky-my-thuat-dong-duong',
    excerpt: 'Hơn 80 tác phẩm quý hiếm của Nguyễn Phan Chánh, Lê Thị Lựu, Mai Trung Thứ lần đầu tiên cùng tụ hội dưới công nghệ chiếu sáng bảo tàng chuyên dụng.',
    category: 'Văn hóa',
    categorySlug: 'van-hoa',
    author: AUTHORS.vu_minh_chau,
    publishedAt: '2026-08-27T19:30:00Z',
    readingTime: 5,
    tags: ['Mỹ thuật', 'Tranh lụa', 'Hội họa', 'Đông Dương'],
    views: 28300,
    featured: false,
    trending: false,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Không gian triển lãm tranh lụa trầm mặc và trang nghiêm thu hút đông đảo khách tham quan.',
    content: [
      {
        type: 'paragraph',
        content: 'Vẻ đẹp mềm mại, huyền ảo và độ thẩm thấu của màu nước trên nền sợi tơ tằm dệt thủ công tạo nên một khí chất phương Đông độc nhất vô nhị mà sơn dầu hay acrylic phương Tây không thể nào tái hiện được.'
      }
    ]
  },

  // 26. ĐỜI SỐNG (Du lịch trách nhiệm)
  {
    id: 'art-26',
    title: 'Du lịch không dấu chân tại Vườn quốc gia Phong Nha - Kẻ Bàng: Trải nghiệm khám phá hang động tôn trọng tự nhiên',
    slug: 'du-lich-khong-dau-chan-hang-dong-phong-nha',
    excerpt: 'Những tour thám hiểm giới hạn nghiêm ngặt số lượng khách, mang toàn bộ chất thải ra ngoài và không dùng đèn công suất lớn đang bảo vệ những nhũ đá hàng triệu năm tuổi.',
    category: 'Đời sống',
    categorySlug: 'doi-song',
    author: AUTHORS.bui_thu_trang,
    publishedAt: '2026-08-27T13:10:00Z',
    readingTime: 6,
    tags: ['Du lịch xanh', 'Phong Nha', 'Hang động', 'Khám phá'],
    views: 32600,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Hố sụt khổng lồ với thảm thực vật nguyên sinh xanh thẳm bên trong lòng hang động.',
    content: [
      {
        type: 'paragraph',
        content: 'Đứng dưới vòm hang kỳ vĩ nơi ánh sáng mặt trời rọi xuống như chốn bồng lai tiên cảnh, du khách được học cách bước đi khẽ khàng để không làm tổn thương những thạch nhũ đang tiếp tục quá trình sinh trưởng nhỏ giọt.'
      }
    ]
  },

  // 27. THỂ THAO (Quần vợt & Cờ vua)
  {
    id: 'art-27',
    title: 'Đại kiện tướng quốc tế 17 tuổi lập kỷ lục Elo 2680: Trí tuệ Việt Nam tỏa sáng trên kỳ đài thế giới',
    slug: 'dai-kien-tuong-quoc-te-17-tuoi-lap-ky-luc-elo',
    excerpt: 'Chiến thắng nghẹt thở trước đương kim á quân thế giới tại Cúp cờ vua FIDE đã đưa kỳ thủ trẻ lọt vào Top 20 tay cờ xuất sắc nhất hành tinh.',
    category: 'Thể thao',
    categorySlug: 'the-thao',
    author: AUTHORS.hoang_duc_kien,
    publishedAt: '2026-08-26T23:00:00Z',
    readingTime: 4,
    tags: ['Cờ vua', 'Đại kiện tướng', 'Thể thao trí tuệ', 'FIDE'],
    views: 35100,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Ván cờ căng thẳng giữa các đại kiện tướng với những nước đi được tính toán sâu hàng chục nước.',
    content: [
      {
        type: 'paragraph',
        content: 'Với phong cách thi đấu điềm tĩnh, khả năng phân tích tàn cuộc sắc bén cùng sự trợ giúp của các phần mềm phân tích cờ thế hệ mới, chàng trai trẻ đang chứng minh bản lĩnh vững vàng trước các đối thủ dạn dày kinh nghiệm.'
      }
    ]
  },

  // 28. THỜI SỰ (An sinh xã hội)
  {
    id: 'art-28',
    title: 'Hiện đại hóa mạng lưới an sinh xã hội: 100% dịch vụ công thiết yếu được tích hợp vào định danh số quốc gia',
    slug: 'hien-dai-hoa-mang-luoi-an-sinh-xa-hoi-dinh-danh-so',
    excerpt: 'Người cao tuổi, người có công và các đối tượng bảo trợ xã hội có thể nhận lương hưu, trợ cấp tự động qua tài khoản an sinh mà không cần phải xếp hàng điểm danh mỗi tháng.',
    category: 'Thời sự',
    categorySlug: 'thoi-su',
    author: AUTHORS.nguyen_hoang_nam,
    publishedAt: '2026-08-26T16:40:00Z',
    readingTime: 5,
    tags: ['Chính phủ số', 'An sinh', 'Chính sách', 'Đời sống số'],
    views: 26800,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Dịch vụ công thuận tiện giúp người dân dễ dàng thực hiện các thủ tục an sinh minh bạch.',
    content: [
      {
        type: 'paragraph',
        content: 'Sự chuyển đổi này không chỉ tiết kiệm hàng trăm tỷ đồng chi phí vận hành hành chính mỗi năm mà quan trọng hơn là nâng cao niềm tin và sự hài lòng của mọi tầng lớp nhân dân vào bộ máy hành chính phục vụ.'
      }
    ]
  },

  // 29. KINH TẾ (Bất động sản công nghiệp)
  {
    id: 'art-29',
    title: 'Khu công nghiệp sinh thái thế hệ mới: Chu trình tuần hoàn nước thải 100% và mái điện mặt trời thông minh',
    slug: 'khu-cong-nghiep-sinh-thai-the-he-moi-kinh-te-tuan-hoan',
    excerpt: 'Thay vì xả thải ra môi trường, toàn bộ lượng nước thải công nghiệp được xử lý bằng công nghệ màng lọc sinh học MBR để tái sử dụng làm mát nhà xưởng và tưới cây cảnh quan.',
    category: 'Kinh tế',
    categorySlug: 'kinh-te',
    author: AUTHORS.dang_anh_khoa,
    publishedAt: '2026-08-26T10:10:00Z',
    readingTime: 6,
    tags: ['Bất động sản', 'Khu công nghiệp', 'Kinh tế tuần hoàn', 'Môi trường'],
    views: 21900,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Nhà máy hiện đại tích hợp hệ thống điện mặt trời trên mái và khuôn viên cây xanh mát.',
    content: [
      {
        type: 'paragraph',
        content: 'Đây là tiêu chuẩn bắt buộc mà các tập đoàn đa quốc gia yêu cầu khi lựa chọn địa điểm đặt nhà xưởng sản xuất thiết bị điện tử tinh xảo và xe điện thông minh.'
      }
    ]
  },

  // 30. THẾ GIỚI (Văn minh đô thị)
  {
    id: 'art-30',
    title: 'Mô hình thành phố 15 phút tại Copenhagen và Paris: Tái chiếm đường phố cho người đi bộ và xe đạp',
    slug: 'mo-hinh-thanh-pho-15-phut-copenhagen-paris-xe-dap',
    excerpt: 'Khi mọi nhu cầu sinh hoạt từ trường học, bệnh viện, chợ dân sinh đến rạp chiếu phim đều nằm trong bán kính 15 phút đi bộ hoặc xe đạp, chất lượng sống của cư dân đã tăng vọt.',
    category: 'Thế giới',
    categorySlug: 'the-gioi',
    author: AUTHORS.tran_thu_ha,
    publishedAt: '2026-08-25T20:20:00Z',
    readingTime: 6,
    tags: ['Đô thị', 'Giao thông xanh', 'Xe đạp', 'Phong cách sống'],
    views: 31000,
    featured: false,
    trending: false,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Đường phố rợp bóng cây với làn đường riêng cho người đi xe đạp tại đô thị châu Âu.',
    content: [
      {
        type: 'paragraph',
        content: 'Nồng độ bụi mịn PM2.5 giảm hơn 35%, tiếng ồn giao thông giảm đáng kể và các cửa hàng cà phê vỉa hè, hiệu sách độc lập mọc lên tấp nập, trả lại linh hồn sống động cho những khu phố cổ.'
      }
    ]
  },

  // 31. CÔNG NGHỆ (Năng lượng nhiệt hạch)
  {
    id: 'art-31',
    title: 'Lò phản ứng nhiệt hạch ITER đạt cột mốc đánh lửa plasma ổn định trong 1.000 giây: Nguồn năng lượng vô tận',
    slug: 'lo-phan-ung-nhiet-hach-iter-plasma-1000-giay',
    excerpt: 'Thành tựu lịch sử tại miền nam nước Pháp đưa nhân loại tiến gần hơn bao giờ hết tới giấc mơ khai thác nguồn năng lượng sạch như mặt trời nhân tạo.',
    category: 'Khoa học',
    categorySlug: 'khoa-hoc',
    author: AUTHORS.dang_anh_khoa,
    publishedAt: '2026-08-25T15:00:00Z',
    readingTime: 7,
    tags: ['Nhiệt hạch', 'Vật lý hạt nhân', 'Năng lượng tương lai', 'Khoa học'],
    views: 48900,
    featured: false,
    trending: true,
    isEditorPick: true,
    coverImage: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Khoang buồng từ trường Tokamak nơi giam giữ dòng plasma nhiệt độ hàng trăm triệu độ C.',
    content: [
      {
        type: 'paragraph',
        content: 'Khác với phản ứng phân hạch hạt nhân truyền thống, phản ứng nhiệt hạch không tạo ra chất thải phóng xạ chu kỳ dài và sử dụng nhiên liệu hydro trù phú trong nước biển.'
      }
    ]
  },

  // 32. VĂN HÓA (Bảo tồn ngôn ngữ)
  {
    id: 'art-32',
    title: 'Số hóa kho tàng văn học dân gian bằng công nghệ nhận dạng giọng nói đa ngữ điệu',
    slug: 'so-hoa-kho-tang-van-hoc-dan-gian-giong-noi',
    excerpt: 'Hơn 10.000 câu ca dao, truyện cổ tích và các bài then, điệu xòe của đồng bào các dân tộc thiểu số đang được lưu trữ vĩnh viễn trên nền tảng đám mây mở.',
    category: 'Văn hóa',
    categorySlug: 'van-hoa',
    author: AUTHORS.vu_minh_chau,
    publishedAt: '2026-08-25T09:30:00Z',
    readingTime: 5,
    tags: ['Di sản số', 'Dân gian', 'Bảo tồn', 'Ngôn ngữ'],
    views: 19800,
    featured: false,
    trending: false,
    isEditorPick: false,
    coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Các nghệ nhân lớn tuổi truyền dạy những giai điệu cổ truyền cho thế hệ con cháu.',
    content: [
      {
        type: 'paragraph',
        content: 'Dự án có sự chung tay của các nhà ngôn ngữ học và các lập trình viên trẻ, nhằm biến những di sản phi vật thể thành kho tư liệu sống động cho học sinh, sinh viên nghiên cứu mọi lúc mọi nơi.'
      }
    ]
  }
];

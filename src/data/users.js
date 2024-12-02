// User 더미 데이터 생성
export let users = [
  {
    id: "root123",
    pw: "password123",
    name: "홍길동",
    gender: "남",
    address: "서울특별시 성북구 삼선교로 16길 116",
    phone_number: "010-1234-5678",
    emergency_phone_number: "010-1111-2222",
    height: 180,
    weight: 75,
    disability_grade: {
      시각장애: "1",
      청각장애: "2",
    },
    before_programs: [
      {
        id : 100,
        title: "시각장애인을 위한 감각 요리 교실",
        content : "이 프로그램은 시각장애인이 요리 과정을 체험하고, 요리를 통해 자립심과 즐거움을 느낄 수 있도록 설계된 감각 중심의 요리 교실입니다. 냄새, 촉감, 소리, 맛 등 오감을 활용하여 시각에 의존하지 않고도 요리의 즐거움을 느낄 수 있는 특별한 경험을 제공합니다.",
        location: "서울특별시 강남구 삼성동",
        image_url: "assets/images/program/4.jpg",
        date: "2024-11-12",
        deadline: "2024-11-07",
        start_time: "14:00",
        end_time: "16:00",
        now_capacity: 19,
        max_capacity: 20,
        phone_number: "02-1234-5678",
        interval: "매주 화요일 14:00~16:00",
        //풀캘린더 반복
        rrule: {
          freq: "weekly", // 반복 주기: 매주
          byweekday: "tu", // 반복 요일: 화요일
          dtstart: "2024-11-12T14:00:00", // 시작 날짜 및 시간
          until: "2024-11-26T16:00:00", // 반복 종료 날짜
        },
      },
      {
        id:101,
        title: "발달장애인을 위한 힐링 음악 교실",
        content : "발달장애인을 대상으로 음악을 통해 감정을 표현하고, 사회적 소통 능력을 향상하며, 창의력을 키울 수 있도록 돕는 프로그램입니다. 리듬, 멜로디, 악기 등을 활용한 체험형 음악 활동으로 구성되어 있으며, 각 참가자의 발달 수준과 흥미를 고려하여 진행됩니다.",
        location: "서울특별시 송파구 잠실동",
        image_url: "assets/images/program/6.jpg",
        date: "2024-11-11",
        deadline: "2024-11-07",
        start_time: "15:00",
        end_time: "16:30",
        now_capacity: 19,
        max_capacity: 20,
        phone_number: "02-1234-5678",
        interval: "매주 월,수 15:00~16:30",
        //풀캘린더 반복
        rrule: {
          freq: "weekly", // 반복 주기: 매주
          byweekday: ["mo", "we"], // 반복 요일: 월/수
          dtstart: "2024-11-11T15:00:00", // 시작 날짜 및 시간
          until: "2024-11-27T16:30:00", // 반복 종료 날짜
        },
      },
    ],
    programs: [
      {
        id: 1,
        title: "발달 장애인 프로그램",
        content: `인천시 거주하는 성인 발달장애인을 위한 프로그램입니다. 이 프로그램에서는 모둠 타악기를 활용하여 참가자들이 서로 협력하고 리듬감을 키울 수 있는 활동을 제공합니다. 또한 미술심리치료를 통해 자신의 감정을 표현하고 내면의 안정감을 찾을 수 있는 시간을 갖습니다. 천연수공예 수업에서는 손재주를 활용한 창작 활동을 통해 성취감을 느낄 수 있으며, 뉴스포츠 시간에는 몸을 움직이며 건강한 생활을 유지하는 데 도움을 줍니다. 문화 및 여가 동아리에서는 영화 감상, 공연 관람 등 다양한 문화 체험을 통해 여유로운 시간을 보낼 수 있습니다. 생활체육 동아리에서는 배드민턴, 요가, 산책 등을 통해 체력을 키우고 활력을 더할 수 있는 활동들이 준비되어 있습니다. 이를 통해 참가자들은 새로운 친구를 사귀고, 자신의 관심사를 발견하며, 더 나아가 행복한 일상을 누릴 수 있는 기회를 얻을 수 있습니다.`,
        location: "남동구 용천로 208 인천 사회 복지관 707호",
        image_url: "assets/images/program/1.jpg",
        date: "2024-12-10",
        deadline: "2024-12-08",
        start_time: "14:00",
        end_time: "16:00",
        now_capacity: 18,
        max_capacity: 20,
        phone_number: "02-1234-5678",
        interval : "매주 화요일 14:00~16:00",
        //풀캘린더 반복
        rrule: {
          freq: 'weekly', // 반복 주기: 매주
          byweekday: 'tu', // 반복 요일: mo, tu, we, th, fr, sa, su
          dtstart: '2024-12-10T14:00:00', // 시작 날짜 및 시간
          until: '2024-12-17T16:00:00', // 반복 종료 날짜
        },
      },
    ],
    l_support: [
      {
        location: "서울시 성북구",
        date: "2024-12-20",
        time: "15:30",
        purpose: "식사지원",
        alleleugi: "복숭아",
        pet: "강아지",
        need_sign_language: true,
        need_bathchair: false,
      },
      {
        location: "서울시 성북구",
        date: "2024-12-09",
        time: "15:30",
        purpose: "청소지원",
        alleleugi: "꽃가루",
        pet: "고양이",
        need_sign_language: true,
        need_bathchair: true,
      },
    ],
    t_support: [
      {
        departure_location: "자택",
        destination: "이마트",
        date: "2024-12-17",
        time: "15:30",
        purpose: "쇼핑",
        vehicle: "버스",
        need_for_return: true,
        need_sign_language: false,
        need_bathchair: false,
      },
      {
        departure_location: "자택",
        destination: "한성대학교",
        date: "2024-12-19",
        time: "12:30",
        purpose: "프로젝트",
        vehicle: "자동차",
        need_for_return: true,
        need_sign_language: true,
        need_bathchair: false,
      },
      {
        departure_location: "자택",
        destination: "목적지",
        date: "2024-11-17",
        time: "15:30",
        purpose: "쇼핑",
        vehicle: "이동수단",
        need_for_return: true,
        need_sign_language: false,
        need_bathchair: false,
      },
    ],
    schedule: [
      {
        date: "2024-11-08",
        time: "15:00",
        content: "자격증 공부",
      },
      {
        date: "2024-12-07",
        time: "14:00",
        content: "홍대 쇼핑",
      },
      {
        date: "2024-12-13",
        time: "14:00",
        content: "본가 가기",
      },
      {
        date: "2024-12-20",
        time: "16:00",
        content: "카페 공부",
      },
    ],
    job: [
      {
        id: 1,
        company: "로봇 소프트웨어기업",
        position: "사무실 환경미화",
        location: "경기도 성남시 분당구(야탑역 인근)",
        working_hours: "월~목 주4일 일4시간",
        pay: "시급 12,000원",
        requirements : ["출퇴근 가능한 등록장애인"],
        etc : ["4대보험 필수가입", "이중취업 불가"],
        deadline: "2024-12-10",
        thumbnail_url: "/assets/images/job/1_thumbnail.jpg",
        image_url: "/assets/images/job/1_image.jpg",
      },
      {
        id: 3,
        company: "대기업계열 금융사",
        position: "윤리경영팀",
        location: "재택",
        working_hours: "월~금 주5일 일4시간",
        pay: "월급 1,230,000원",
        requirements : ["중증장애인",  "전문학사학위 이상 취득자", "엑셀활용(VLOOKUP등) 가능자"],
        etc: ["4대보험 필수가입", "이중취업 불가", "업무 노트북 지원 협의"],
        deadline: "2024-12-13",
        thumbnail_url: "/assets/images/job/3_thumbnail.jpg",
        image_url: "/assets/images/job/3_image.jpg",
      },
    ],
    my_menu: [
      {
        id: "1",
        name: "프로그램",
        img: "/assets/images/sidebar/program-icon.png",
        route: "/program",
        keywords: ["프로그램", "프로그램으로 이동해주세요", "program"],
      },
      {
        id: "2",
        name: "활동보조",
        img: "/assets/images/sidebar/support-icon.png",
        route: "/support",
        keywords: ["활동 보조", "활동보조", "activity"],
      },
      {
        id: "3",
        name: "공지사항",
        img: "/assets/images/sidebar/notice-icon.png",
        route: "/notice",
        keywords: ["공지 사항", "공지", "notice"],
      },
    ],
    rest_menu: [
      {
        id: "4",
        name: "개인일정",
        img: "/assets/images/sidebar/calendar-icon.png",
        route: "/schedule",
        keywords: ["개인일정", "캘린더", "calendar"],
      },
      {
        id: "5",
        name: "일자리",
        img: "/assets/images/sidebar/job-icon.png",
        route: "/jobs",
        keywords: ["일자리", "구인", "jobs"],
      },
      {
        id: "6",
        name: "마이페이지",
        img: "/assets/images/sidebar/mypage-icon.png",
        route: "/mypage",
        keywords: ["마이페이지", "마이 페이지", "mypage"],
      },
    ],
  },
];

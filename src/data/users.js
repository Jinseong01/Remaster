// User 더미 데이터 생성
export let users = [
    {
      id: 'hyechang123',
      pw: 'password123',
      name: '홍혜창',
      gender: '남',
      address: '인천 미추홀구 아파트',
      phone_number: '010-1234-5678',
      emergency_phone_number: '010-1111-2222',
      height: 180,
      weight: 75,
      disability_type: ["시각장애"],
      disability_grade:  {"시각장애" : "1"},
      before_programs :[
        {
          title: "시각장애인을 위한 요리교실",
          location: "서울특별시 강남구 삼성동",
          date: "2024-11-05",
          time : "14:00",
          interval : "매주 화요일 14:00~16:00",
          //풀캘린더 반복
          rrule: {
            freq: 'weekly', // 반복 주기: 매주
            byweekday: 'tu', // 반복 요일: 화요일
            dtstart: '2024-11-05T14:00:00', // 시작 날짜 및 시간
            until: '2024-11-26T16:00:00', // 반복 종료 날짜
          },
        },
        {
          title: "발달장애인 음악교실",
          location: "서울특별시 송파구 잠실동",
          date: "2024-11-04",
          time : "15:00",
          interval : "매주 월,수 15:00~16:30",
          //풀캘린더 반복
          rrule: {
            freq: 'weekly', // 반복 주기: 매주
            byweekday: ['mo', 'we'], // 반복 요일: 월/수
            dtstart: '2024-11-04T15:00:00', // 시작 날짜 및 시간
            until: '2024-11-27T16:30:00', // 반복 종료 날짜
          },
        }
      ],
      programs : [],
      l_support : [
        {
          location : "서울시 성북구",
          date: "2024-10-07",
          time: "15:30",
          purpose: "식사지원",
        },
        {
          location : "서울시 성북구",
          date: "2024-11-08",
          time: "15:30",
          purpose: "식사지원",
        },
      ],
      t_support : [
        {
          departure_location: "자택",
          date: "2024-11-17",
          time: "15:30",
          purpose: "쇼핑",
        },
      ],
      schedule : [
        {
          date : "2024-10-07",
          time : "14:00",
          content : "홍대 쇼핑"
        },
        {
          date : "2024-11-13",
          time : "14:00",
          content : "본가 가기"
        },
        {
          date : "2024-11-12",
          time : "15:00",
          content : "자격증 공부"
        },
        {
          date : "2023-11-20",
          time : "16:00",
          content : "카페 공부"
        },
      ],
      job : [],
      my_menu : [],
      rest_menu : []
    },
    {
        id: 'random1234',
        pw: 'password123',
        name: '김랜덤',
        gender: '여',
        address: '서울특별시 성북구 아파트',
        phone_number: '010-1234-5678',
        emergency_phone_number: '010-2222-3333',
        height: 150,
        weight: 45,
        disability_type: '청각',
        disability_grade: 2,
        before_programs : [],
        programs : [],
        l_support : [],
        t_support : [],
        schedule : [],
        job : [],
        my_menu : [],
        rest_menu : []
      },
      {
        id: 'hansung',
        pw: '1234',
        name: '한성',
        gender: '남',
        address: '서울특별시 성북구 아파트',
        phone_number: '010-1234-5678',
        emergency_phone_number: '010-2222-3333',
        height: 160,
        weight: 50,
        disability_type: '청각',
        disability_grade: 2,
        before_programs : [],
        programs : [],
        l_support : [],
        t_support : [],
        schedule : [],
        job : [],
        my_menu : [
          { id: "1", name: "프로그램", img: "/assets/images/sidebar/program-icon.png", route: "/program", keywords: ["프로그램", "프로그램으로 이동해주세요", "program"]},
          { id: "2", name: "활동지원", img: "/assets/images/sidebar/support-icon.png", route: "/activity", keywords: ["활동 지원", "활동지원", "activity"]},
          { id: "3", name: "공지사항", img: "/assets/images/sidebar/notice-icon.png", route: "/notice", keywords: ["공지 사항", "공지", "notice"]}
        ],
        rest_menu : [
          { id: "4", name: "일정관리", img: "/assets/images/sidebar/calendar-icon.png", route: "/schedule", keywords: ["일정관리", "캘린더", "calendar"]},
          { id: "5", name: "일자리", img: "/assets/images/sidebar/job-icon.png", route: "/jobs", keywords: ["일자리", "구인", "jobs"]},
          { id: "6", name: "마이페이지", img: "/assets/images/sidebar/mypage-icon.png", route: "/mypage", keywords: ["마이페이지", "마이 페이지", "mypage"]}
        ]
      },
      {
        id: 'bugi',
        pw: '1234',
        name: '부기',
        gender: '남',
        address: '서울특별시 성북구 아파트',
        phone_number: '010-1234-5678',
        emergency_phone_number: '010-2222-3333',
        height: 160,
        weight: 50,
        disability_type: '청각',
        disability_grade: 2,
        before_programs : [],
        programs : [],
        l_support : [],
        t_support : [],
        schedule : [],
        job : [],
        my_menu : [
          
        ],
        rest_menu : [
          { id: "1", name: "프로그램", img: "/assets/images/sidebar/program-icon.png", route: "/program", keywords: ["프로그램", "프로그램으로 이동해주세요", "program"]},
          { id: "2", name: "활동지원", img: "/assets/images/sidebar/support-icon.png", route: "/activity", keywords: ["활동 지원", "활동지원", "activity"]},
          { id: "3", name: "공지사항", img: "/assets/images/sidebar/notice-icon.png", route: "/notice", keywords: ["공지 사항", "공지", "notice"]},
          { id: "4", name: "일정관리", img: "/assets/images/sidebar/calendar-icon.png", route: "/schedule", keywords: ["일정관리", "캘린더", "calendar"]},
          { id: "5", name: "일자리", img: "/assets/images/sidebar/job-icon.png", route: "/jobs", keywords: ["일자리", "구인", "jobs"]},
          { id: "6", name: "마이페이지", img: "/assets/images/sidebar/mypage-icon.png", route: "/mypage", keywords: ["마이페이지", "마이 페이지", "mypage"]}
        ]
      },
  ];
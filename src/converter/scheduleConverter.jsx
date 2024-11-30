const scheduleConverter = ({ before_programs, programs, l_support, t_support, schedule }) => {

    let globalIndex = 0; // 전역 인덱스

    // before_programs, programs
    const programEvents = [...before_programs, ...programs].map( program => ({
        //풀캘린더용
        id : globalIndex++,
        title: program.title, //제목
        rrule: program.rrule,

        //출력용
        date : program.date, //날짜
        location : program.location, //장소
        time : program.start_time, //시간
        type : "program", //type 구분
        editable: false, //수정불가

        classNames: ["program"]
    }))

    // l_support
    const lSupportEvents = l_support.map( support => ({
        //풀캘린더용
        id : globalIndex++,
        title: `${support.purpose}(생활지원)`,
        start: `${support.date}T${support.time}`, //풀캘린더를 위한 시간 표현

        //출력용
        date: support.date,
        location : support.location,
        time : support.time,
        type: "support", //type 구분
        editable: false, //수정불가

        classNames: ["support"]
    }));

    // t_support
    const tSupportEvents = t_support.map( support => ({
        //풀캘린더용
        id : globalIndex++,
        title: `${support.purpose}(이동지원)`,
        start: `${support.date}T${support.time}`, //풀캘린더를 위한 시간 표현

        //출력용
        date: support.date,
        time : support.time,
        location : support.departure_location,
        type: "support", //type 구분
        editable: false, //수정 불가

        classNames: ["support"]
    }));

    // schedule
    const scheduleEvents = schedule.map( schedule => ({
        //풀캘린더용
        id : globalIndex++,
        title: schedule.content,
        start: new Date(`${schedule.date}T${schedule.time}`), // 풀캘린더를 위한 시간 표현

        //출력용
        date: schedule.date,
        time : schedule.time,
        type: "schedule", //type 구분

        classNames: ["schedule"]
    }));

    // 다 결합
    return [...programEvents, ...lSupportEvents, ...tSupportEvents, ...scheduleEvents];
};

export default scheduleConverter;

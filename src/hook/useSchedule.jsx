import { useState } from "react";

const useSchedule = (initialEvents, currentUser, setCurrentUser) => {
    const [events , setEvents] = useState(initialEvents); // 달력에 넣는 데이터

    // 달력 드래그로 일정 수정
    const handleEventChange = (info) => {
        // 업데이트된 배열 (풀캘린더용)
        const updatedScheduleEvents = events.map(event => 
            event.id === parseInt(info.event.id)
            ? {
                ...event,
                start: info.event.startStr,
                date: info.event.startStr.split('T')[0],  // 날짜 업데이트
            } 
            : event
        );

        // 업데이트 적용
        setEvents(updatedScheduleEvents);

        // 업데이트된 배열 (user용)
        const updatedUserSchedule = updatedScheduleEvents
            .filter(event => event.type === 'schedule')  // 'schedule' 타입인 항목만 필터링
            .map(event => ({
                date: event.date,
                time: event.time,
                content: event.title,  // title을 content로 변환
            }
        ));

        // 업데이트 적용
        setCurrentUser(prevUser => ({
            ...prevUser,
            schedule: updatedUserSchedule,  // 변환된 데이터를 currentUser에 반영
        }));

    };

    
    // 일정 추가
    const addSchedule = (schedule) => {
        // 업데이트된 배열 (풀캘린더용)
        const updatedEvents = [
            ...events,
            {
                id: new Date().getTime(), // 새로 추가되는 일정에 고유 ID 부여
                title : schedule.content,
                start: new Date(`${schedule.date}T${schedule.time}`),
                date: schedule.date,
                time: schedule.time,
                type: 'schedule', // 일정 타입

                classNames: ["schedule"]
            }
        ];

        // 업데이트 적용
        setEvents(updatedEvents);
        
        // 업데이트된 배열 (user용)
        const updatedSchedule = [
            ...currentUser.schedule,
            {
                date: schedule.date,
                content: schedule.content,
                time: schedule.time,
            }
        ];

        // 업데이트 적용
        setCurrentUser(prevUser => ({
            ...prevUser,
            schedule: updatedSchedule,  // 변환된 schedule 데이터를 currentUser에 반영
            })
        );
    }


    // 일정 수정
    const editSchedule = (schedule) => {
        // 업데이트된 배열 (풀캘린더용)
        const updatedEvents = events.map(event => {
            if (event.id === schedule.id) {
                return {
                    ...event,
                    title: schedule.content,
                    start: new Date(`${schedule.date}T${schedule.time}`),
                    date: schedule.date,
                    time: schedule.time,
                    type: 'schedule', // 일정 타입
                };
            }
            return event;
        });

        // 업데이트 적용
        setEvents(updatedEvents);

        // 업데이트된 배열 (user용)
        const updatedSchedule = updatedEvents
        .filter(event => event.type === 'schedule') // 'schedule' 타입인 항목만 필터링
        .map(event => ({
            date: event.date,
            content: event.title,  // title을 content로 변환하여 저장
            time: event.time,
        }));

        // 업데이트 적용
        setCurrentUser(prevUser => ({
            ...prevUser,
            schedule: updatedSchedule,  // 변환된 schedule 데이터를 currentUser에 반영
        }));
    }


    // 일정 삭제
    const deleteSchedule = (schedule) => {
        // 업데이트된 배열 (풀캘린더용)
        const updatedEvents = events.filter(event => event.id !== schedule.id);

        // 업데이트 적용
        setEvents(updatedEvents);

        // 업데이트된 배열 (user용)
        const updatedSchedule = currentUser.schedule.filter(userSchedule =>
            userSchedule.date !== schedule.date || userSchedule.time !== schedule.time
        );

        // 업데이트 적용
        setCurrentUser(prevUser => ({
            ...prevUser,
            schedule: updatedSchedule,  // 업데이트된 schedule 목록 반영
        }));
    }

    return {
        events,
        handleEventChange,
        addSchedule,
        editSchedule,
        deleteSchedule,
    };
}

export default useSchedule;
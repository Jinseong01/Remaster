import { useSearchParams,useOutletContext } from 'react-router-dom';  // 이 줄을 추가


//현재 페이지는 우선 여러 페이지를 모아놓았다.
//간단하게 파라미터로 받은 내용을 보여주도록 하였는데
//파라미터 내용이 없다면 간단한 값으로 초기화하도록 만들었다.

//또한 const { imageSrc, title } = useOutletContext();
//이것은 각페이지에서 사용할 이미지와 이미지에 표현될 타이틀이다.



export let ProgramPage=()=>{
    const [searchParams] = useSearchParams();
    //const { imageSrc, title } = useOutletContext();
    //특정 파라미터가 없을 때 기본값 설정
    const data1 = searchParams.get('data1') ?? 'default data1';
    const data2 = searchParams.get('data2') ?? 'default data2';
    return <h3>ProgramPage페이지 </h3>
}
export let WorkPage=()=>
{
    const [searchParams] = useSearchParams();
    //const { imageSrc, title } = useOutletContext();
    //특정 파라미터가 없을 때 기본값 설정
    const data1 = searchParams.get('data1') ?? 'default data1';
    const data2 = searchParams.get('data2') ?? 'default data2';
    return <h3>WorkPage </h3>
}
export let ActivityPage=()=>{
    const [searchParams] = useSearchParams();
    //const { imageSrc, title } = useOutletContext();
    //특정 파라미터가 없을 때 기본값 설정
    const data1 = searchParams.get('data1') ?? 'default data1';
    const data2 = searchParams.get('data2') ?? 'default data2';
    return <h3>ActivityPage</h3>
}
export let NoticePage=()=>{
    const [searchParams] = useSearchParams();
    //const { imageSrc, title } = useOutletContext();
    //특정 파라미터가 없을 때 기본값 설정
    const data1 = searchParams.get('data1') ?? 'default data1';
    const data2 = searchParams.get('data2') ?? 'default data2';
    return <h3>NoticePage </h3>
}
export let PersonalPage=()=>{
    const [searchParams] = useSearchParams();
    //const { imageSrc, title } = useOutletContext();
    //특정 파라미터가 없을 때 기본값 설정
    const data1 = searchParams.get('data1') ?? 'default data1';
    const data2 = searchParams.get('data2') ?? 'default data2';
    return <h3>PersonalPage</h3>
}
export let MyPage=()=>{
    const [searchParams] = useSearchParams();
    //const { imageSrc, title } = useOutletContext();
    //특정 파라미터가 없을 때 기본값 설정
    const data1 = searchParams.get('data1') ?? 'default data1';
    const data2 = searchParams.get('data2') ?? 'default data2';
    return <h3>MyPage</h3>
}
import React, { useEffect, useRef } from "react";

const NaverMapComponent = ({ searchQuery, useCurrentLocation }) => {
  const mapElement = useRef(null);
  const NAVER_MAP_CLIENT_ID = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
  const mapRef = useRef(null); // 지도를 참조하기 위한 useRef
  const markerRef = useRef(null); // 마커를 참조하기 위한 useRef

  useEffect(() => {
    const loadNaverMap = () => {
      if (window.naver) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.554722, 126.970833),
          zoom: 16,
        };
        const map = new window.naver.maps.Map(mapElement.current, mapOptions);
        mapRef.current = map; // 지도를 참조하는 객체 설정

        // 사용자의 현재 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = new window.naver.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              );
              map.setCenter(userLocation);
              addMarker(userLocation);
            },
            (error) => {
              console.error("Geolocation error: ", error);
            }
          );
        }
      }
    };

    // 네이버 지도 API 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_CLIENT_ID}&submodules=geocoder`;
    script.async = true;
    script.onload = loadNaverMap;
    document.head.appendChild(script);

    // 정리 함수 (스크립트 정리)
    return () => {
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [NAVER_MAP_CLIENT_ID]);

  // 검색 위치로 이동 (useEffect를 사용하지 않고 함수로 검색 버튼 클릭 시 호출)
  const searchLocation = () => {
    if (!searchQuery || !window.naver || !mapRef.current) return;

    window.naver.maps.Service.geocode(
      {
        query: searchQuery,
      },
      function (status, response) {
        if (status !== window.naver.maps.Service.Status.OK) {
          return;
        }

        var result = response.v2.addresses[0];
        if (result) {
          const location = new window.naver.maps.LatLng(result.y, result.x);
          mapRef.current.setCenter(location);
          addMarker(location);
        }
      }
    );
  };

  // 현재 위치로 이동하는 함수
  const moveToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = new window.naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          mapRef.current.setCenter(userLocation);
          addMarker(userLocation);
        },
        (error) => {
          console.error("Geolocation error: ", error);
        }
      );
    }
  };

  // 마커 추가/업데이트 함수
  const addMarker = (location) => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    const marker = new window.naver.maps.Marker({
      position: location,
      map: mapRef.current,
    });

    markerRef.current = marker;
  };

  useEffect(() => {
    if (useCurrentLocation) {
      moveToCurrentLocation();
    }
  }, [useCurrentLocation]);

  return (
    <div>
      <button onClick={searchLocation}>검색 위치로 이동</button>
      <button onClick={moveToCurrentLocation}>현재 위치로 돌아가기</button>
      <div ref={mapElement} className="naver-map-container" />
    </div>
  );
};

export default NaverMapComponent;

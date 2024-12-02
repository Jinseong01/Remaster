import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./MapModal.css";

const MapModal = ({ isOpen, onClose, onSelectLocation = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [markerPosition, setMarkerPosition] = useState(null); // 클릭한 위치 마커
  const [currentPosition, setCurrentPosition] = useState(null); // 사용자의 현재 위치 마커
  const [selectedAddress, setSelectedAddress] = useState(""); // 선택한 주소
  const mapRef = useRef(null);

  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const userPosition = { lat: latitude, lng: longitude };
        setMapCenter(userPosition); // 지도의 초기 중심을 사용자의 현재 위치로 설정
        setCurrentPosition(userPosition); // 현재 위치 마커 설정
      });
    }
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng }); // 마커 위치 설정

    // Reverse Geocoding으로 주소 가져오기
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setSelectedAddress(results[0].formatted_address); // 주소 저장
      } else {
        setSelectedAddress("주소를 가져올 수 없습니다.");
      }
    });
  };

  const handleSearch = () => {
    if (!mapRef.current) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = {
      query: searchQuery,
      fields: ["name", "geometry"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setMapCenter({ lat: location.lat(), lng: location.lng() });
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        setSelectedAddress(results[0].name); // 검색된 장소 이름 저장
      }
    });
  };

  const handleSelectLocation = () => {
    if (selectedAddress) {
      onSelectLocation(selectedAddress); // 선택된 주소를 부모 컴포넌트로 전달
      onClose();
    } else {
      alert("선택된 주소가 없습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="map-modal-overlay">
      <div className="map-modal-container">
        <div className="map-modal-header">
          <h2>위치 선택</h2>
          <div className="map-search-container">
            <input
              type="text"
              className="map-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="위치를 검색하세요"
            />
            <button className="map-search-button" onClick={handleSearch}>
              검색
            </button>
            <button
              className="select-location-button"
              onClick={handleSelectLocation}
            >
              위치 선택
            </button>
          </div>
          <button className="map-close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="map-modal-content">
          <LoadScript
            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "68vh" }}
              center={mapCenter}
              zoom={17}
              onLoad={(map) => (mapRef.current = map)}
              onClick={handleMapClick} // 지도 클릭 이벤트
            >
              {/* 현재 위치 마커 */}
              {currentPosition && (
                <Marker
                  position={currentPosition}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // 현재 위치 마커는 파란색 아이콘으로 표시
                  }}
                />
              )}
              {/* 클릭한 위치 마커 */}
              {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default MapModal;

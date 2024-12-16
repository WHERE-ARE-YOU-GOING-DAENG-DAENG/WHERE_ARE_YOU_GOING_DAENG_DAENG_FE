import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SelectLabel from "../commons/SelectLabel";
import useGoogleMapsStore from "../../stores/useGoogleMapsStore";

const GoogleAddressSearch = ({ onAddressSelect }) => {
  const inputRef = useRef(null);
  const [address, setAddress] = useState(""); //주소
  const [postalCode, setPostalCode] = useState(""); //우편번호
  const [latitude, setLatitude] = useState(""); //위도
  const [longitude, setLongitude] = useState(""); //경도

  const { isLoaded, loadGoogleMaps } = useGoogleMapsStore(); 

  useEffect(() => {
    loadGoogleMaps(); 
  }, [loadGoogleMaps]);

  useEffect(() => {
    if (isLoaded) {
      initializeAutocomplete(); // Google Maps API가 로드되면 autocomplete 초기화
    }
  }, [isLoaded]);

  const initializeAutocomplete = () => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API가 로드되지 않았습니다.");
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "kr" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (place.formatted_address) {
        setAddress(place.formatted_address);

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLatitude(lat);
        setLongitude(lng);

        const postalCodeComponent = place.address_components.find((component) =>
          component.types.includes("postal_code")
        );
        const postalCode = postalCodeComponent ? postalCodeComponent.long_name : "";
        setPostalCode(postalCode);

        onAddressSelect({
          address: place.formatted_address,
          latitude: lat,
          longitude: lng,
          postalCode,
        });
      }
    });
  };

  return (
    <FormWrapper>
      <FormField>
        <SelectLabel label="도로명 주소" />
        <InputField
          type="text"
          ref={inputRef}
          placeholder="도로명 주소를 입력하세요"
        />
      </FormField>
      <FormField>
        <SelectLabel label="우편번호" />
        <InputField
          type="text"
          value={postalCode}
          readOnly
          placeholder="자동 입력"
        />
      </FormField>
      <FormField>
        <SelectLabel label="위도" />
        <InputField
          type="number"
          step="0.000001"
          value={latitude}
          readOnly
          placeholder="자동 입력"
        />
      </FormField>
      <FormField>
        <SelectLabel label="경도" />
        <InputField
          type="number"
          step="0.000001"
          value={longitude}
          readOnly
          placeholder="자동 입력"
        />
      </FormField>
    </FormWrapper>
  );
};

export default GoogleAddressSearch;

const FormWrapper = styled.div`
  background-color: #fff0f6;
  border-radius: 10px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #ff69a9;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 105, 169, 0.5);
  }
`;

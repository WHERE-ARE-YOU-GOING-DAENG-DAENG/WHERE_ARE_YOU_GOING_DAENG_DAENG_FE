import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import ConfirmBtn from "../commons/ConfirmBtn";
import PreferencePlaceOption from "../commons/PreferencePlaceOption";
import PreferenceFavoriteOption from "../commons/PreferenceFavoriteOption";
import Loading from "../commons/Loading";
import AlertDialog from "../commons/SweetAlert";
import { placeFeatures, placeTypes } from "../../data/CommonCode";
import {
  Wrap,
  Section,
  TitleH2,
  StyledParagraph,
  OptionContainer,
  StyledParagraph2,
  Footer,
} from "./PreferenceForm.styles";

const PreferenceForm = ({
  selectedPlaceOptions,
  setSelectedPlaceOptions,
  selectedFavoriteOptions,
  setSelectedFavoriteOptions,
  isLoading,
  onConfirm,
  confirmButtonLabel = "확인",
  placeIcons,
  featureIcons,
}) => {
  const handleOptionClick = useCallback((selectedOptions, setSelectedOptions, code) => {
    if (selectedOptions.length >= 3 && !selectedOptions.includes(code)) {
      AlertDialog({
        mode: "alert",
        title: "선택 초과",
        text: "최대 3개만 선택 가능합니다.",
        confirmText: "확인",
      });
      return;
    }

    setSelectedOptions((prev) =>
      prev.includes(code) ? prev.filter((option) => option !== code) : [...prev, code]
    );
  }, []);

  return (
    <Wrap>
      {isLoading ? (
        <Loading label="로딩 중입니다..." style={{ minHeight: "100px" }} />
      ) : (
        <>
          <Section>
            <TitleH2>어떤 시설에 관심이 많으신가요?</TitleH2>
            <StyledParagraph>* 최소 1개 ~ 3개 선택가능</StyledParagraph>
            <OptionContainer style={{ minHeight: "150px" }}>
              {placeTypes.map(({ codeId, name }) => (
                <PreferencePlaceOption
                  key={codeId}
                  label={name}
                  icon={placeIcons[codeId]}
                  isSelected={selectedPlaceOptions.includes(codeId)}
                  onClick={() =>
                    handleOptionClick(selectedPlaceOptions, setSelectedPlaceOptions, codeId)
                  }
                />
              ))}
            </OptionContainer>
          </Section>

          <Section>
            <TitleH2>어떤 부분이 중요하신가요?</TitleH2>
            <StyledParagraph>* 최소 1개 ~ 3개 선택가능</StyledParagraph>
            <OptionContainer style={{ minHeight: "150px" }}>
              {placeFeatures.map(({ codeId, name }) => (
                <PreferenceFavoriteOption
                  key={codeId}
                  label={name}
                  icon={featureIcons[codeId]}
                  isSelected={selectedFavoriteOptions.includes(codeId)}
                  onClick={() =>
                    handleOptionClick(selectedFavoriteOptions, setSelectedFavoriteOptions, codeId)
                  }
                />
              ))}
            </OptionContainer>
          </Section>

          <StyledParagraph2>
            보호자님과 우리 댕댕이 맞춤 장소 추천을 위해 필요한 정보입니다.
          </StyledParagraph2>

          <Footer>
            <ConfirmBtn label={confirmButtonLabel} onClick={onConfirm} />
          </Footer>
        </>
      )}
    </Wrap>
  );
};

PreferenceForm.propTypes = {
  selectedPlaceOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedPlaceOptions: PropTypes.func.isRequired,
  selectedFavoriteOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedFavoriteOptions: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  confirmButtonLabel: PropTypes.string,
  placeIcons: PropTypes.object.isRequired,
  featureIcons: PropTypes.object.isRequired,
};

PreferenceForm.defaultProps = {
  isLoading: false,
  confirmButtonLabel: "확인",
};

export default memo(PreferenceForm);

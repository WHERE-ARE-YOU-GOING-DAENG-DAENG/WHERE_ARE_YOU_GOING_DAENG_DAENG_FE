import Header from "../../components/commons/Header";
import TopSection from "../../components/preference/TopSection";
import InterestSection from "../../components/preference/InterestSection";
import PreferenceOptions from "../../components/preference/PreferenceOptions";

function Preference() {
  return (
    <>
      <Header label="보호자 선호도 등록" />
      <TopSection />
      <InterestSection />
      <PreferenceOptions />
    </>
  );
}

export default Preference;

import Header from "../../components/commons/Header";
import TopSection from "../../components/preference/TopSection";
import InterestSection from "../../components/preference/InterestSection";
import EditPreferenceOptions from "../../components/preference/EditPreferenceOptions";

function EditPreference() {
  return (
    <div>
      <Header label="보호자 선호도 수정" />
      <TopSection />
      <InterestSection />
      <EditPreferenceOptions />
    </div>
  );
}

export default EditPreference;

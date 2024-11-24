import Header from "../../components/commons/Header";
import TopSection from "../../components/preference/TopSection";
import PreferenceEdit from "../../components/preference/PreferenceEdit";

function PreferenceEditPage() {
  return (
    <div>
      <Header label="보호자 선호도 수정" />
      <TopSection />
      <PreferenceEdit />
    </div>
  );
}

export default PreferenceEditPage;

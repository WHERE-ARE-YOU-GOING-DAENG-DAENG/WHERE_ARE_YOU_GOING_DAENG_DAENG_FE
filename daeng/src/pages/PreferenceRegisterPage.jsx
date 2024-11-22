import Header from "../components/commons/Header";
import TopSection from "../components/preference/TopSection";
import PreferenceRegister from "../components/preference/PreferenceRegister";

function PreferenceRegisterPage() {
  return (
    <div>
      <Header label="보호자 선호도 등록" />
      <TopSection />
      <PreferenceRegister />
    </div>
  );
}

export default PreferenceRegisterPage;

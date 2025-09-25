import FakePageHeader from "../components/header";
import FakePageBody from "../components/body";
import FakePageFooter from "../components/footer";

export default function FakeLayout() {
  return (
    <div className="min-h-screen bg-background">
      <FakePageHeader />
      <FakePageBody />
      <FakePageFooter />
    </div>
  );
}

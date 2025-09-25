import FakePageHeader from "../components/header"
import FakePageBody from "../components/body"
import FakePageFooter from "../components/footer"

export default function FakeLayout() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <FakePageHeader />
      <FakePageBody />
      <FakePageFooter />
    </div>
  )
}

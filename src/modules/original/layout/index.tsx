import OriginalPageBody from "../components/body"
import OriginalPageFooter from "../components/footer"
import OriginalPageHeader from "../components/header"

export default function OriginalLayout() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <OriginalPageHeader />
      <OriginalPageBody />
      <OriginalPageFooter />
    </div>
  )
}

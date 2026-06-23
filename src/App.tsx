import { Landing } from "@/components/sections/Landing"
import { Story } from "@/components/sections/Story"
import { SaveTheDate } from "@/components/sections/SaveTheDate"
import { Ceremony } from "@/components/sections/Ceremony"
import { Reception } from "@/components/sections/Reception"
import { Gallery } from "@/components/sections/Gallery"
import { RSVP } from "@/components/sections/RSVP"
import { UsefulInfo } from "@/components/sections/UsefulInfo"
import { Gifts } from "@/components/sections/Gifts"
import { Closing } from "@/components/sections/Closing"
import { Footer } from "@/components/Footer"
import { BackgroundMusic } from "@/components/BackgroundMusic"

function App() {
  return (
    <>
    <BackgroundMusic />
    <main>
      <Landing />
      <Story />
      <SaveTheDate />
      <Ceremony />
      <Reception />
      <Gallery />
      <RSVP />
      <Gifts />
      <UsefulInfo />
      <Closing />
      <Footer />
    </main>
    </>
  )
}

export default App

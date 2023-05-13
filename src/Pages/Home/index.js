import WelcomeSection from "Component/WelcomeSection/WelcomeSection"
import ServiceSection from "Pages/ServiceSection/ServiceSection"
import MeetDoctorSection from "Pages/MeetDoctorSection/MeetDoctorSection"
import Banner from "Component/Banner/Banner"
import Promo from "Component/Appoinment-promo/Promo"
import Feature from "Component/Feature/Feature"
import Service from "Component/Service/Service"
import './style.css'
const Home = () => {
  return (
    <div>
      <Banner/>
      <WelcomeSection></WelcomeSection>
      <Feature></Feature>
      <Service></Service>
      <MeetDoctorSection></MeetDoctorSection>
      <Promo/>
    </div>

  )
}
export default Home
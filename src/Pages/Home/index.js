import HeroSection from "Component/HeroSection/HeroSection"
import WelcomeSection from "Component/WelcomeSection/WelcomeSection"
import ServiceSection from "Pages/ServiceSection/ServiceSection"
import MeetDoctorSection from "Pages/MeetDoctorSection/MeetDoctorSection"
import AppointmentSection from "Component/AppointmentSection/AppointmentSection"

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <WelcomeSection></WelcomeSection>
      <ServiceSection></ServiceSection>
      <MeetDoctorSection></MeetDoctorSection>
      <AppointmentSection></AppointmentSection>
    </div>

  )
}
export default Home
//home
import FooterComponent from "@/components/organism/footerComponent";
import HeaderComponent from "@/components/organism/headerComponent";
import AnimatedContainer from "@/components/utilities/animatedContainer";
import FooterComponentLogged from "@/components/organism/footerComponentLogged";

export default function LoggedPage() {
  return (
    <>
        <HeaderComponent />
        <div>Hola</div>
        <FooterComponentLogged />
    </>
  );
}
import Link from "next/link";
import ClickunapResource from "../clickunap-resource";
import useApps from "@/hooks/useApps";

export default function ClickunapResourceSection({ title }) {
 const { openApp, openLink } = useApps();

  return (
    <div className="ClickunapResourceSection w-full h-full flex flex-col p-4 justify-start items-center space-y-4 transition-all hover:scale-105 2xl:scale-75 2xl:origin-top 2xl:hover:scale-[80%]">
      {/* Title */}
      <h2 className="ResourceSectionTitle uppercase font-extrabold opacity-50">
        {title}
      </h2>

      {/* Box */}
      <div className="ResourceSectionBox grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-auto lg:gap-6 w-full h-[512px] p-6 rounded-3xl bg-zinc-100 shadow-md dark:bg-black/50">
        {/* Qualité - Resource 1 */}
        <ClickunapResource
          color="#0A380F"
          icon="new_releases"
          name="Qualité"
          link="/"
       
        />

        {/* RH - Resource 2 */}
        <ClickunapResource
          color="#0A380F"
          icon="diversity_1"
          name="RH"
          link="/"
          onClick={() => openLink("https://forms.office.com/Pages/ResponsePage.aspx?id=iHFfFh3jD0qv70bl_texC078vRd7lU5IlpW7sbTslZdUQk5VMlVaVFBQSlA5Rk9JMVhMU0FZNlEzSC4u")}
        />

        {/* Accompagnement - Resource 3 */}
        <ClickunapResource
          color="#0A380F"
          icon="volunteer_activism"
          name="Accompagnement"
          link="/"
        />

        {/* Informatique - Resource 4 */}
        <ClickunapResource
          color="#0A380F"
          icon="laptop_chromebook"
          name="Informatique"
          link="/"
          onClick={() => openLink("https://forms.office.com/Pages/ResponsePage.aspx?id=iHFfFh3jD0qv70bl_texC078vRd7lU5IlpW7sbTslZdUQk5VMlVaVFBQSlA5Rk9JMVhMU0FZNlEzSC4u")}
         
         // link="https://forms.office.com/Pages/DesignPageV2.aspx?subpage=design&FormId=iHFfFh3jD0qv70bl_texC078vRd7lU5IlpW7sbTslZdUQk5VMlVaVFBQSlA5Rk9JMVhMU0FZNlEzSC4u&Token=27e4e35af7214450a48a84b09cd164ff"
          
        />

        {/* Communication - Resource 5 */}
        <ClickunapResource
          color="#0A380F"
          icon="forum"
          name="Communication"
          link="/"
       
        />

        {/* Technique - Resource 6 */}
        <ClickunapResource
          color="#0A380F"
          icon="build"
          name="Technique"
          link="/"
        />

        {/* Compta - Resource 7 */}
        <ClickunapResource color="#0A380F" icon="euro" name="Compta" link="/" />

        {/* DG - Resource 8 */}
        <ClickunapResource
          color="#0A380F"
          icon="manage_accounts"
          name="DG"
          link="/"
        />
      </div>
    </div>
  );
}

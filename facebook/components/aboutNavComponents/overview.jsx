import ContactAndBasicInfo from "./contactAndBasicInfo"
import Details from "./details"
import FamilyAndRel from "./familyAndRel"
import PlaceLived from "./placeLived"
import WorkAndEducation from "./workAndEducation"

const Overview = () => {
    return ( <div>
<WorkAndEducation/>
<PlaceLived/>
<ContactAndBasicInfo/>
<FamilyAndRel/>
<Details/>


    </div> );
}
 
export default Overview;
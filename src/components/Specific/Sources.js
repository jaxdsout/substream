import { Fragment } from "react";
import "./Sources.css"

import MaxLogo from "../../logos/maxlogo.png"
import NetflixLogo from "../../logos/netflixlogo.png"
import HuluLogo from "../../logos/hululogo.png"
import ParamountLogo from "../../logos/paramountlogo.png"
import DisneyLogo from "../../logos/disneylogo.png"
import StarzLogo from "../../logos/starzlogo.png"
import TubiLogo from "../../logos/tubilogo.png"
import PrimeLogo from "../../logos/primevideologo.png"
import PeacockLogo from "../../logos/peacocklogo.png"
import PlutoLogo from "../../logos/plutologo.png"
import MGMLogo from "../../logos/mgmlogo.png"
import ShudderLogo from "../../logos/shudderlogo.png"
import AMCLogo from "../../logos/amclogo.png"
import CWLogo from "../../logos/thecwlogo.png"
import DiscoveryLogo from "../../logos/discoverylogo.png"
import CrackleLogo from "../../logos/cracklelogo.png"
import FreeveeLogo from "../../logos/freeveelogo.png"
import AppleTVLogo from "../../logos/appletvlogo.png"
import RokuLogo from "../../logos/rokulogo.png"

function Sources ({ resultDetails }) {
    
  function filterUniqueSources(sources) {
    const subSources = [];
    const sourceNames = new Set();

    for (const source of sources) {
      let { name, type, web_url } = source;
      const sourceKey = `${name}-${type}`;

      if (name==="Showtime") {
        name = "Paramount+";
        web_url = `https://www.paramountplus.com/`
      }

      if ((type==="sub" || type==="free") && !sourceNames.has(sourceKey) && 
      (!name.includes("(Via") && !name.includes("(via") && !name.includes("with")
        && !name.includes("fubo") && !name.includes("Hoopla") 
        && !name.includes("On Demand") && !name.includes("Discovery GO"))) {
        subSources.push({...source, name, web_url})
        sourceNames.add(sourceKey);
      }
    }
    return subSources;
  }

  const sources = filterUniqueSources(resultDetails.sources);

  function getLogo(name) {        
    switch (name) {
      case "Max":
          return MaxLogo;
      case "Netflix":
          return NetflixLogo;
      case "Hulu":
          return HuluLogo;
      case "Paramount+":
        return ParamountLogo;
      case "Disney+":
        return DisneyLogo;
      case "STARZ":
        return StarzLogo;
      case "Tubi TV":
        return TubiLogo;
      case "Prime Video":
        return PrimeLogo
      case "Peacock Premium":
        return PeacockLogo
      case "Pluto TV":
        return PlutoLogo
      case "MGM+":
        return MGMLogo
      case "Shudder":
        return ShudderLogo
      case "AMC+":
        return AMCLogo
      case "The CW":
        return CWLogo
      case "Discovery+":
        return DiscoveryLogo
      case "Crackle":
        return CrackleLogo
      case "Amazon Freevee":
        return FreeveeLogo
      case "AppleTV+":
        return AppleTVLogo
      case "The Roku Channel":
        return RokuLogo
      default:
          return ``;
    }
  }

  return (
      <div className="sources">
      {sources.length > 0 ? (
        <Fragment>
          {sources.map((source, index) => (
            <Fragment key={index}>
              <a href={source.web_url} target="_blank" rel="noopener noreferrer">
                <img
                  className="sourceLogo"
                  src={getLogo(source.name)}
                  alt={`${source.name} Logo`}
                />
              </a>
            </Fragment>
          ))}
        </Fragment>
      ) : (
        <div className="no-sources">
          <p>This content is currently not streaming on any platforms.</p>
        </div>
      )}
    </div>
  )
}

export default Sources
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

import { Fragment } from "react";

import "./Sources.css"

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
      (
        !name.includes("(Via") && !name.includes("(via") && !name.includes("with")
        && !name.includes("fubo"))) {
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
        <p className="no-sources">This movie is currently not streaming on any platforms.</p>
      )}
    </div>
  )
}

export default Sources
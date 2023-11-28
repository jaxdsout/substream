import MaxLogo from "../../logos/maxlogo.png"
import NetflixLogo from "../../logos/netflixlogo.png"
import HuluLogo from "../../logos/hululogo.png"
import ParamountLogo from "../../logos/paramountlogo.png"
import DisneyLogo from "../../logos/disneylogo.png"

import { Fragment } from "react";

import "./Sources.css"

function Sources ({ resultDetails }) {

    function filterUniqueSources(sources) {
        const subSources = [];
        const sourceNames = new Set();
    
        for (const source of sources) {
          const { name, type } = source;
          const sourceKey = `${name}-${type}`;
    
          if (type==="sub" && !sourceNames.has(sourceKey)) {
            subSources.push(source)
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
            default:
                return ``;
        }
    }


    return (
        <div className="sources">
        <h3>Sources:</h3>
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
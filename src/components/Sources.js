import logos from "../constants/logos";
import { useEffect, useState } from "react"
import { connect } from "react-redux"

const logoMap = {
  "MAX": logos.MaxLogo,
  "Netflix": logos.NetflixLogo,
  "Hulu": logos.HuluLogo,
  "Paramount+": logos.ParamountLogo,
  "Disney+": logos.DisneyLogo,
  "STARZ": logos.StarzLogo,
  "Tubi TV": logos.TubiLogo,
  "Prime Video": logos.PrimeLogo,
  "Peacock": logos.PeacockLogo,
  "Pluto TV": logos.PlutoLogo,
  "MGM+": logos.MGMLogo,
  "Shudder": logos.ShudderLogo,
  "AMC+": logos.AMCLogo,
  "The CW": logos.CWLogo,
  "Amazon Freevee": logos.FreeveeLogo,
  "Discovery+": logos.DiscoveryLogo,
  "Crackle": logos.CrackleLogo,
  "AppleTV+": logos.AppleTVLogo,
  "The Roku Channel": logos.RokuLogo,
  "fuboTV": logos.FuboLogo,
  "Kanopy": logos.KanopyLogo,
  "truTV": logos.trutvLogo,
  "TNT": logos.tntLogo,
  "TBS": logos.tbsLogo,
};

function Sources ({ choice, region }) {
  const [filteredSources, setFilteredSources] = useState([]);

  function filterUniqueSources(sources) {
    const subSources = new Map();
  
    function normalizeName(name) {
      if (name === "Paramount+ with Showtime" || name === "Paramount Plus") {
        return "Paramount+";
      }
      
      if (name === "Peacock Premium") {
        return "Peacock";
      }

      return name;
    }
  
    for (const source of sources) {
      let { name, type, web_url } = source;
      const normalizedName = normalizeName(name);
      const sourceKey = `${normalizedName}`;
      const logo = logoMap[normalizedName] || null;
      
      if ((type === "sub" || type === "free") && !/(?:\(Via|\(via|On Demand)/.test(name)) {
        if (!subSources.has(normalizedName)) {
          subSources.set(sourceKey, { ...source, name: normalizedName, web_url, logo });
        }
      }
    }
    
    return Array.from(subSources.values());
  }

  
  useEffect(() => {
      if (choice?.sources.length > 0) {
        setFilteredSources(filterUniqueSources(choice.sources));
      }
  }, [choice]);

  if (filteredSources.length > 0) return (
    <div className="flex flex-col items-center justify-center bg-black/5 p-3 rounded-md shadow-inner">
      <h3 className="text-sm uppercase mb-1 text-[#ededed]">SOURCES:</h3>
        <div className="flex flex-row flex-wrap items-center justify-center max-w-[250px]">
          {filteredSources.map((source, index) => {
            return (
              <div key={index}>
                <a href={source.web_url} target="_blank" rel="noopener noreferrer">
                  <img
                    className="h-20 w-20 sourceLogo rounded-lg m-0.5"
                    src={source.logo}
                    alt={`${source.name}`}
                  />
                </a>
              </div>
            )
          })}
        </div>
    </div>
  ) 
  
  if (filteredSources.length === 0) return (
    <div className="text-center">
      <p className="text-xs">This content is currently not streaming on any {region} platforms.</p>
    </div>
  )
  
}

const mapStateToProps = state => ({
  choice: state.choice,
  region: state.region
})

export default connect(mapStateToProps, {  })(Sources);
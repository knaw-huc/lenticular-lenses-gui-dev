import React from 'react';
import './css/huc-connect-sets.css';
import './css/huc-data-entry.css';
import './css/huc-search.css';
import './css/GoldenAgents.css';
import {HcHeaderGoldenAgents} from "./components/page_elements/GoldenAgents";
import {HcLlLayoutHome} from "./components/page_elements/Pages";


function App() {
    const homeData =
        {
            "pageTitle": "Home",
            "projectList": [
                {"prName":"How many couples went to the notary after announcing their marriage? ", "prDescription":"We expect couples to visit a notary to make their prenuptial agreement before getting married. To answer this question we use the Prenuptial agreements from the Notarial Acts of the Amsterdam City Archives and the Intended Marriage Registry. "},
                {"prName":"RIJKSMUSEUM-ECARTICO 20200122", "prDescription":"RIJKSMUSEUM-ECARTICO 20200122"}
            ]
        }

  return (
    <div className="App">
        <HcHeaderGoldenAgents toolName='Lenticular Lenses'
                              projectName='Select project' />
        <HcLlLayoutHome pageData={homeData} />
    </div>
  );
}

export default App;

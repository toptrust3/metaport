import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import './TokenList.scss';

let reqSvgs;

if (process.env.STORYBOOK) {
  try {
    reqSvgs = require.context('../icons', true, /\.svg$/ );
  } catch (e) {
    console.log(e);
  }
  
} else {
  reqSvgs = require.context('./icons', true, /\.svg$/ );
}

const svgs = reqSvgs
  .keys ()
  .reduce ( ( images, path ) => {
    images[path] = reqSvgs ( path )
    return images
  }, {} )

function svgPath(name) {
  const key = './'+ name + '.svg';
  if (svgs[key]) {
    return svgs[key];
  } else {
    return svgs['./eth.svg'];
  }
}


export default function TokenList(props) {

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      props.setExpanded(isExpanded ? panel : false);
    };

  function handle(schainName) {
    props.setExpanded(false);
    props.setToken(schainName);
  }

  return (
    <div>
      <Accordion expanded={props.expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {props.token ? (
            <div className="flex-container chain-name-btn">
              <div className="flex-container fl-centered">
                <img className='token-icon token-icon-accent' src={svgPath(props.token)}/>
              </div>
              <p className="schain-name flex-container marg-ri-10">
                {props.tokens[props.token]['name']}
              </p>
            </div>
          ) : (
            <div className="flex-container chain-name-btn">
              <div className="flex-container fl-centered">
                <img className='token-icon' src={svgPath('eth')}/>
              </div>
              <p className="schain-name flex-container marg-ri-10">
                Select token
              </p>
            </div>
          )
          }          
        </AccordionSummary>
        <AccordionDetails>
          <div className='chains-list'>
            {Object.keys(props.tokens).map((key, i)  => (
              <Typography key={key}>
                <Button color="secondary" size="small" className='chain-name-btn' onClick={() => handle(key)}>
                  <div className="flex-container chain-name-btn">
                    <div className="flex-container fl-centered">
                      <img className='token-icon token-icon-accent' src={svgPath(key)}/>
                    </div>
                    <p className="schain-name flex-container marg-ri-10">
                      {props.tokens[key]['name']}
                    </p>
                  </div>  
                </Button>
            </Typography>
           ))}
          </div>
        </AccordionDetails>
      </Accordion>
     
    </div>
  )
}
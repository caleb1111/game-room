import React from 'react';
import Sky from 'react-sky';
import LogoImg from '../media/logo.png';

class MovingLogo extends React.Component {

  render(){
    return(
    <div>
      <Sky
            images={{
              /* FORMAT AS FOLLOWS */
              0: LogoImg,  /* You can pass as many images as you want */
              1: LogoImg,
              2: LogoImg /* you can pass images in any form: link, imported via webpack... */
            }}
            how={25} /* Pass the number of images Sky will render chosing randomly */
            time={40} /* time of animation */
            size={'150px'} /* size of the rendered images */
          />
      </div>
    );
  }
}

export default MovingLogo;
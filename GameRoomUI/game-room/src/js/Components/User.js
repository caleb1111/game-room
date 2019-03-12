import React from 'react';
import '../../style/home.css';
import UserPhoto from '../../media/user.png';

const User = () => (
        <section className="section-features">
            <div className="row">
                <div className="col span-1-of-3 user_photo">
                    <img src={UserPhoto} alt='user'/>
                    <br />
                    <br />
                    <a className="btn btn-full" href="/" style={{margin: "0 0 0 30px"}}>Edite Your Profile</a>
                </div>
                <div className="col span-1-of-3 box random_box" style={{border: "1px solid white"}}>
                    <h3>Something here</h3>
                </div>
                <div class="col span-1-of-3 box random_box" style={{border: "1px solid white", margin: "150 0 0 0px"}}>
                    <h3>Friends List can be here</h3>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="row">
                <div className="col span-1-of-4 box random_box" style={{border: "1px solid white"}}>
                    <h3>Your Rank here</h3>
                </div>
                <div className="col span-1-of-4 box random_box" style={{border: "1px solid white"}}>
                    <h3>Items You purchased</h3>
                </div>
                <div className="col span-1-of-4 box random_box" style={{border: "1px solid white"}}>
                    <h3>Random thing here</h3>
                </div>
                <div className="col span-1-of-4 box random_box" >
                    <h3>Random thing here</h3>
                </div>
                
            </div>
        </section>

  );

  export default User
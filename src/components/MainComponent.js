import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsiteID) {
        this.setState({selectedCampsite: campsiteID});
    }

    render() {
        return(
            <div>
                <Header />
                <Directory campsites={this.state.campsites} onClick={campsiteID => this.onCampsiteSelect(campsiteID)}/>
                <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}/>
                <Footer />
            </div>
        );
    };

}

export default Main;
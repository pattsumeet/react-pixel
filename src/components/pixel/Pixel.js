import React from 'react'
import './Pixel.css'

class  Pixel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          image: {
              0: 'http://via.placeholder.com/400x400/', 
              1: 'http://via.placeholder.com/500x700/', 
              3: 'http://via.placeholder.com/600x500/'
            },
            params: {
                "interaction": "event",
                "client": "customer", 
                "os_name": "operating_system_name",
                "x1": "utm_source",
                "x2": "utm_medium",
                "x3": "utm_campaign",
                "landing_url": "campaign_url"
            },
            url: "http://localhost:9000/pixel?interaction=UserClick&client=ad_media&os_name=macos&x1=google&x2=email&x3=pdfconvert&landing_url=abcd1",
            apiResponse: "http://via.placeholder.com/600x500/"
        }
        this.getPixel = this.getPixel.bind(this);
      }

    async getPixel() {

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

    // const reqParams = {
    //     interaction: 'event',
    //     client: 'customer',
    //     os_name: 'operating_system_name',
    //     x1: 'utm_source',
    //     x2: 'utm_medium',
    //     x3: 'utm_campaign',
    //     landing_url: 'campaign_url'
    // }

    // const url = new URL(this.state.url);
    // console.log(url);
    // let newURL = url.origin+url.pathname+'?';
    // const urlParams = new URLSearchParams(url.search);
    // let keys = urlParams.keys();
    //     for(let key of keys) { 
    //     newURL = newURL + reqParams[key]+ '=' + urlParams.get(key) + '&'
    //     }
    
    // let lastChar = newURL[newURL.length -1];
    // if (lastChar == '&') {
    //     newURL = newURL.substring(0, newURL.length-1);
    // }
        // console.log("newURL "+newURL)
        fetch(this.state.url)
        .then(handleErrors)
        .then(res => res.text())
        .then(res => this.setState({
            apiResponse: res
        }));
       
        // console.log(this.state.apiResponse);
    }

    render() {
        return(
            <React.Fragment>
                <div className="row"> 
                    {/* <div className="column">
                        <img src={this.state.image[0]} width="100%" alt="click" />                        
                    </div> */}
                    <div className="column">
                        <img src={this.state.apiResponse} width="100%" alt="click" />                        
                    </div>
                </div>
                <button className="button" onClick={this.getPixel}>Button</button>
            </React.Fragment>
        )
    }
}


export default Pixel
import React from 'react';
import ReactDOM from 'react-dom';

class Sites extends React.Component{
  constructor(props) {
    super(props);
    this.state ={currentSite: null, availableSite: null }
  
    this.availableSiteSelected = this.availableSiteSelected.bind(this);
  }
 
  availableSiteSelected(e){
    this.setState({availableSite:e.target.value});
  }
  render() {
    return(
      <div>
        <div>
            <label>Sites</label>
            <select id="Portals" multiple="multiple"  onChange={() => this.setState({currentSite:e.target.value})}>
            {
              this.props.currentSites.map((site)=>
              <option value={site.PortalId} key={site.PortalId.toString()}>{site.PortalName}</option>)
            }
            </select>
            <button disabled={! this.state.currentSite}>Remove</button>
        </div>
        <div>
            <select onChange={this.availableSiteSelected}>
              <option value="">Choose a site</option>
            {
                this.props.availableSites.map((site)=>
                <option value={site.PortalId} key={site.PortalId.toString()} >{site.PortalName}</option>)
            }
            </select>
            <button disabled={! this.state.availableSite}>Add</button>
        </div>
      </div>
    );
  }
}

export default class SiteGroupEditor extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      PortalGroupName: this.props.group.PortalGroupName, 
      AuthenticationDomain: this.props.group.AuthenticationDomain 
    };
    this.groupNameChanged = this.groupNameChanged.bind(this);
    this.domainChanged = this.domainChanged.bind(this); 
  }
  groupNameChanged(e){
    this.setState({PortalGroupName:e.target.value});
  }
  domainChanged(e){
    this.setState({AuthenticationDomain:e.target.value});
  }
  render() {
    return(
   <div  >
        <div >
          <label htmlFor="MasterPortal" >Master Portal</label>
          <input id="MasterPortal" type="text" value={this.props.group.MasterPortal.PortalName} disabled="disabled" readOnly/>
        </div>
        <div>
            <label htmlFor="PortalGroupName">Group Name</label>
            <input id="PortalGroupName" type="text" value={this.state.PortalGroupName} onChange={this.groupNameChanged}/> *
        </div>
        <div>
            <label htmlFor="AuthenticationDomain" >Authentication Domain</label>
            <input id="AuthenticationDomain" type="text" value={this.state.AuthenticationDomain} onChange={this.domainChanged}/> *
        </div>
        <Sites availableSites={this.props.sites} currentSites={this.props.group.Portals}/>
        <div >
            <button >Save</button>
            <button >Cancel</button>
        </div>
    </div>   
    ) 
  }
}
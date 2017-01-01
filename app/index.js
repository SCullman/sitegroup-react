import React from 'react';
import ReactDOM from 'react-dom';

class SiteGroupRow extends React.Component {
  render(){
    return (
    <tr >
      <td>{this.props.group.PortalGroupName}</td>
      <td>{this.props.group.MasterPortal.PortalName}</td>
    </tr>
    );
  }
}

class SiteGroupsTable extends React.Component {
  render(){
    return (
      <table>
        <thead>
          <tr>
            <th>Site Group</th>
            <th>Master Site</th>
          </tr>
        </thead>
      <tbody>
      {
        this.props.groups.map((group)=> 
          <SiteGroupRow key={group.PortalGroupId.toString()} group={group}/>)
      }
      </tbody>
    </table>
    );
  }
}

class NewSiteGroup extends React.Component{
  render(){
    return(
      <div>
        <select name="sites">
        {
          this.props.sites.map((site)=>
          <option key={site.PortalId.toString()} value={site.PortalId}>{site.PortalName}</option>)
        }
        </select>
        <button>New Site Group</button>
      </div>
    );
  }
}

class SiteGroups extends React.Component{
  render() {
    return(
      <div>
        <SiteGroupsTable groups={this.props.groups}/>
        <NewSiteGroup sites={this.props.sites}/>
      </div>
    ) 
  }
}

class Sites extends React.Component{
  constructor(props) {
    super(props);
    this.state ={currentSite: null, availableSite: null }
    this.currentSiteSelected = this.currentSiteSelected.bind(this);
    this.availableSiteSelected = this.availableSiteSelected.bind(this);
  }
  currentSiteSelected(e){
    this.setState({currentSite:e.target.value});
  }
  availableSiteSelected(e){
    this.setState({availableSite:e.target.value});
  }
  render() {
    return(
      <div>
        <div>
            <label>Sites</label>
            <select id="Portals" multiple="multiple"  onChange={this.currentSiteSelected}>
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

class SiteGroupEditor extends React.Component{
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


class SiteGroupApp extends React.Component {
  render(){
    return( 
      <div>
        <SiteGroups groups={this.props.groups} sites={this.props.sites}/>
        <SiteGroupEditor group={this.props.groups[0]} sites={this.props.sites}/>
      </div>
    );
  }
}


var PortalGroups = [
  {
    PortalGroupId: 1, AuthenticationDomain: 'portal1',
    MasterPortal: {
       PortalName:'Portal1', 
       PortalId:1
    }, 
    PortalGroupName: 'Gruppe 1',
    Portals: [{
      PortalName:'Portal2', 
      PortalId:2
    },{
      PortalName:'Portal3', 
      PortalId:3
    }]
  }, {
    PortalGroupId: 2, AuthenticationDomain: 'portal4',
    MasterPortal: {
       PortalName:'Portal4', 
       PortalId:4
    }, 
    PortalGroupName: 'Gruppe 2',
    Portals: [{
      PortalName:'Portal5', 
      PortalId:5
    },{
      PortalName:'Portal6', 
      PortalId:6
    }]
  }
];
var AvailablePortals = [{
      PortalName:'Portal7', 
      PortalId:7
    },{
      PortalName:'Portal8', 
      PortalId:8
    },{
      PortalName:'Portal9', 
      PortalId:9
    }];
 
ReactDOM.render(
  <SiteGroupApp 
    groups={PortalGroups}
    sites={AvailablePortals} />,
  document.getElementById('root')
);



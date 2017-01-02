import React from 'react';
import ReactDOM from 'react-dom';

class Sites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSite: null,
      availableSite: null
    }
  }

  render() {
    return (
      <div>
        <div>
          <label>Sites</label>
          <select
            multiple="multiple"
            onChange={(e) => this.setState({currentSite: e.target.value})}>
            {this.props.currentSites.map((site) => 
              <option
                value={site.PortalId}
                key={site.PortalId.toString()}>{site.PortalName}</option>)
}
          </select>
          <button
            disabled={!this.state.currentSite}
            onClick={() => this.props.onRemoveSite(this.state.currentSite)}>Remove</button>
        </div>
        <div>
          <select onChange={(e) => this.setState({availableSite: e.target.value})}>
            <option value="">Choose a site</option>
            {this.props.availableSites.map((site) => 
              <option
                value={site.PortalId}
                key={site.PortalId.toString()}>{site.PortalName}</option>)
}
          </select>
          <button
            disabled={!this.state.availableSite}
            onClick={() => this.props.onAddSite(this.state.availableSite)}>Add</button>
        </div>
      </div>
    );
  }
}

export default class SiteGroupEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PortalGroupName: this.props.group.PortalGroupName,
      AuthenticationDomain: this.props.group.AuthenticationDomain,
      Portals: this.props.group.Portals,
      AvailableSites: this.props.sites
    };
  }

  addSite(id) {
    const newSite = this.state.AvailableSites.find((site) => site.PortalId == id);
    this.setState({
      AvailableSites : this.state.AvailableSites.filter((site) => site.PortalId!=id),
      Portals: [...this.state.Portals, newSite]
    })
  }

  removeSite(id) {
    const oldSite = this.state.Portals.find((site) => site.PortalId == id);
    this.setState({
      Portals : this.state.Portals.filter((site) => site.PortalId!=id),
      AvailableSites: [...this.state.AvailableSites, oldSite]
    })
  }

  render() {
    return (
      <div >
        <div >
          <label htmlFor="MasterPortal">Master Portal</label>
          <input
            id="MasterPortal"
            type="text"
            value={this.props.group.MasterPortal.PortalName}
            disabled
            readOnly/>
        </div>
        <div>
          <label htmlFor="PortalGroupName">Group Name</label>
          <input
            id="PortalGroupName"
            type="text"
            value={this.state.PortalGroupName}
            onChange={(e) => this.setState({PortalGroupName: e.target.value})}/>
          *
        </div>
        <div>
          <label htmlFor="AuthenticationDomain">Authentication Domain</label>
          <input
            id="AuthenticationDomain"
            type="text"
            value={this.state.AuthenticationDomain}
            onChange={(e) => this.setState({AuthenticationDomain: e.target.value})}/>
          *
        </div>
        <Sites
          availableSites={this.state.AvailableSites}
          currentSites={this.state.Portals}
          onAddSite={(id) => {this.addSite(id)}}
          onRemoveSite={(id) => {this.removeSite(id)}}/>
        <div >
          <button >Save</button>
          <button >Cancel</button>
        </div>
      </div>
    )
  }
}
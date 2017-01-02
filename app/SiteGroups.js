import React from 'react';
import ReactDOM from 'react-dom';


const SiteGroupRow = (props) => ( 
    <tr >
      <td>{props.group.PortalGroupName}</td>
      <td>{props.group.MasterPortal.PortalName}</td>
    </tr>);


const SiteGroupsTable = (props) => (
      <table>
        <thead>
          <tr>
            <th>Site Group</th>
            <th>Master Site</th>
          </tr>
        </thead>
      <tbody>
      {
        props.groups.map((group)=> 
          <SiteGroupRow key={group.PortalGroupId.toString()} group={group}/>)
      }
      </tbody>
    </table>
);

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

export default class SiteGroups extends React.Component{
  render() {
    return(
      <div>
        <SiteGroupsTable groups={this.props.groups}/>
        <NewSiteGroup sites={this.props.sites}/>
      </div>
    ) 
  }
}
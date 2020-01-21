import React from 'react'
import './list.css';
import { get } from 'axios';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataList: []
    }
  }

  componentDidMount() {
   const apiUrl = 'http://localhost:3000/api/v1/all_records';

   get(apiUrl).then(res => {
     this.setState({ dataList: res.data });
     console.log(res.data)
   })
 }


   hey() {
     var dom_content = [];
     for (var i = 0; i < this.state.dataList.length; i++) {
       const data =  this.state.dataList[i];
       const source = `http://localhost:3000/api/v1/download/source/${data.id}`;
       const res = `http://localhost:3000/api/v1/download/response/${data.id}`;
       const rej = `http://localhost:3000/api/v1/download/rejected/${data.id}`;
         dom_content.push(
             (
               <tr>
               <td> {data.name} </td>
               <td> <a target="_blank" href={source}> Source File Download </a> </td>
               <td> <a target="_blank" href={res}> Response File Download </a> </td>
               <td> <a target="_blank" href={rej}> Rejected File Download </a> </td>
               </tr>
             )
         );
     }
     return ( dom_content )
   }



  render() {
    return (
      <table id='table'>
      <thead>
      <tr>
      <th> Name </th>
      <th> Source file Link </th>
      <th> Respose file Link </th>
      <th> Rejected Values </th>
      </tr>
      </thead>
      <tbody>
      { this.hey() }
      </tbody>
      </table>

   )
  }
}

export default List

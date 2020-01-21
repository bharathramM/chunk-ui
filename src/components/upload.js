import React from 'react'
import { post } from 'axios';

class Upload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      source_file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.source_file);
  }

  onChange(e) {
    this.setState({source_file:e.target.files[0]})
  }

  fileUpload(file){
    const url = 'http://localhost:3000/api/v1/file-upload';
    const formData = new FormData();
    formData.append('source_file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    post(url, formData, config).then(res => {
      window.location.reload();
    }, err => {
      alert('Please attach File')
    } )
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" accept=".csv" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}

export default Upload

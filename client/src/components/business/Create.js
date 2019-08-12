import React, { Component } from 'react';
import axios from 'axios'

export default class Create extends Component {
  constructor(props) {
    super(props)
    this.onChangePersonName = this.onChangePersonName.bind(this)
    this.onchangeBusinessName = this.onchangeBusinessName.bind(this)
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  
    this.state = {
      person_name: '',
      business_name: '',
      business_gst_number: ''
    }
  }

  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    })
  }

  onchangeBusinessName(e) {
    this.setState({
      business_name: e.target.value
    })
  }

  onChangeGstNumber(e) {
    this.setState({
      business_gst_number: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(`The value are ${ this.state.person_name }, 
    ${this.state.business_name}, and 
    ${this.state.business_gst_number}`)

    const obj = {
      person_name: this.state.person_name,
      business_name: this.state.business_name,
      business_gst_number: this.state.business_gst_number
    }
    axios.post('/business/add', obj).then(res => console.log(res.data))
    // axios.post(`${ process.env.REACT_APP_DB_URL }/business/add`, obj).then(res => console.log(res.data))


    this.setState({
      person_name: '',
      business_name: '',
      business_gst_number: ''
    })

    this.props.history.push('/index')
    document.location.reload(true)
  }

  render() {
    return (
      <div style={{marginTop: 10}}>
          <h3>Novo Atendimento</h3>
          <form onSubmit={ this.onSubmit }>
          <div className="form-group">
            <label>Cliente:  </label>
            <input
              type="text"
              className="form-control"
              value={ this.state.person_name }
              onChange={ this.onChangePersonName }
              />
          </div>

          <div className="form-group">
            <label>Empresa: </label>
            <input
              type="text"
              className="form-control"
              value={ this.state.business_name }
              onChange={ this.onchangeBusinessName }
              />
          </div>

          <div className="form-group">
            <label>Contato: </label>
            <input
              type="text"
              className="form-control"
              value={ this.state.business_gst_number }
              onChange={ this.onChangeGstNumber }
            />
          </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary">Criar Atendimento</button>
              </div>
          </form>
      </div>
    )
  }
}
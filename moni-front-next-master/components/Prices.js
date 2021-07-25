class Prices extends React.Component {
  state = {
    currency: 'USD'
  }

  render() {

    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item">Bitcoin rate for {this.props.bpi[this.state.currency].description} : 
          <span className="badge badge-danger p-2 m-2">{this.props.bpi[this.state.currency].code} : </span> 
          <strong>{this.props.bpi[this.state.currency].rate}</strong>
        </li>
        </ul>
        <br/>
      </div>
    );
  }
}

export default Prices;

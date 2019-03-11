import styled from "styled-components";
import { format } from "date-fns";
import React from "react";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bank: 0,
      account1: 0,
      account2: 0,
      account3: 0,
      accountFiverr: 0,
      bankPrepaid: 0,
    };
  }

  componentDidMount() {
    if (this.props.data.length < 1) return;
    let total = 0;
    this.props.data.map((item) => total += parseFloat(item.amount));

    const account1 = localStorage.getItem('account1');
    const account2 = localStorage.getItem('account2');
    const account3 = localStorage.getItem('account3');
    const accountFiverr = localStorage.getItem('accountFiverr');
    const bankPrepaid = localStorage.getItem('bankPrepaid');

    const checkValue = (value) => {
      return !isNaN(parseFloat(value)) && isFinite(value) ? value : 0;
    };

    this.setState({
      bank: total.toFixed(2),
      account1: checkValue(account1),
      account2: checkValue(account2),
      account3: checkValue(account3),
      accountFiverr: checkValue(accountFiverr),
      bankPrepaid: checkValue(bankPrepaid),
    });
  }

  getTotal = () => {
    return parseFloat(this.state.bank) +
      parseFloat(this.state.account1) +
      parseFloat(this.state.account2) +
      parseFloat(this.state.account3) +
      parseFloat(this.state.accountFiverr) +
      parseFloat(this.state.bankPrepaid);
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: parseFloat(value)
    });

    localStorage.setItem(name, value);
  };

  render() {
    return (
      <TotalsWrapper>
        <div>
          <InputGroup>
            <span>Bank:</span>
            <input readOnly={ true } value={ this.state.bank } />
          </InputGroup>
          <InputGroup>
            <span>Bank Prepaid:</span>
            <input onChange={ this.handleChange } type="number" name="bankPrepaid" value={ this.state.bankPrepaid } />
          </InputGroup>
          <InputGroup>
            <span>PayPal Susan:</span>
            <input onChange={ this.handleChange } type="number" name="account1" value={ this.state.account1 } />
          </InputGroup>
          <InputGroup>
            <span>PayPal Giu:</span>
            <input onChange={ this.handleChange } type="number" name="account2" value={ this.state.account2 } />
          </InputGroup>
          <InputGroup>
            <span>Hype card:</span>
            <input onChange={ this.handleChange } type="number" name="account3" value={ this.state.account3 } />
          </InputGroup>
          <InputGroup>
            <span>Fiverr account:</span>
            <input onChange={ this.handleChange } type="number" name="accountFiverr" value={ this.state.accountFiverr } />
          </InputGroup>
          <InputGroup>
            <span><strong>TOTAL: </strong></span>
            <input readOnly={ true } value={ this.getTotal() } />
          </InputGroup>
        </div>
      </TotalsWrapper>
    );
  }
};

const TotalsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: #0E41DF;
  color: white;
  padding-bottom: 70px;
  padding-top: 50px;
  margin-bottom: -70px;
  
  input {
    text-align: right;
    width: 100px;
    background: white;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  margin-bottom: 10px;
`;

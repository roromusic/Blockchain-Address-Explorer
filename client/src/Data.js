import React, { Component } from 'react';
import Summary from './Summary';
import Transactions from './Transactions';
import Transaction from './Transaction';
import TransactionItem from './TransactionItem';
import TransactionDetails from './TransactionDetails';
import Pagination from './Pagination';
import Spinner from './Spinner';

//import txs from './sampleData';

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      n_tx: 0,
      final_balance: 0,
      txs: [],
      usd: null,
      displaySatoshi: false,
      expanded: new Set(),
      noUser: false,
      page: 1,
      isLoading: true
    }

    this.timeOut = null;

    this.convertToUSD = this.convertToUSD.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.toggleCurrency = this.toggleCurrency.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      clearTimeout(this.timeOut);

      this.setState(() => {
        return {
          isLoading: true,
          page: 1
        };
      });

      this.fetchData(1);
    }else {
      if(prevState.page !== this.state.page) this.fetchData();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  fetchData(page) {
    this.fetchUSDPrice();
    this.fetchAccount(page);

    this.timeOut = setTimeout(() => {
      this.fetchData();
    }, 10000)
  }

  async fetchAccount(page) {
    try {
      //const url = `https://corsproxy.glitch.me/https://blockchain.info/rawaddr/${this.props.match.params.id}?limit=50&offset=${(this.state.page - 1) * 50}`;
      const url = `http://localhost:8080/https://blockchain.info/rawaddr/${this.props.match.params.id}?limit=50&offset=${page || (this.state.page - 1) * 50}`;
      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        n_tx: data.n_tx,
        final_balance: data.final_balance,
        txs: data.txs,
        noUser: false,
        isLoading: false
      });

    } catch(e) {
      clearTimeout(this.timeOut);
      this.setState({
        noUser: true,
        isLoading: false
      });
    }
  }

  async fetchUSDPrice() {
    const response = await fetch('https://blockchain.info/ticker');
    const data = await response.json();

    this.setState({
      usd: data.USD.last
    })
  }

  convertToUSD(satoshi) {
    let num = satoshi / 100000000 * this.state.usd;
    return `$ ${num.toFixed(2)}`;
  }

  toggleCurrency() {
    this.setState(prevState => ({
      displaySatoshi: !prevState.displaySatoshi
    }));
  }

  toggleDetails(id) {
    const expanded = new Set(this.state.expanded);
    if(expanded.has(id)) expanded.delete(id);
    else expanded.add(id);

    this.setState({
      expanded
    });
  }

  changePage(page) {
    if (page === this.state.page) return;

    clearTimeout(this.timeOut);

    this.setState({
      page,
      isLoading: true
    });
  }

  render() {
    if(this.state.isLoading) return (<Spinner />);
    if(this.state.noUser) return (<p style={{textAlign: 'center'}}>Sorry, no such user</p>);

    const transactions = this.state.txs.map(tx => {
      const inputs = tx.inputs.map(input => {
        let {addr, value} = input.prev_out;
        return {addr, value};
      });

      const outputs = tx.out.map(output => {
        let {spent, addr, value} = output;
        return {spent, addr, value};
      });

      const item = (
        <TransactionItem 
          id={this.props.match.params.id}
          date={tx.time}
          txID={tx.tx_index}
          inputs={inputs}
          outputs={outputs}
          displaySatoshi={this.state.displaySatoshi}
          toUSD={this.convertToUSD}
          toggleDetails={this.toggleDetails}
        />
      );

      const details = (
        <TransactionDetails
          txID={tx.tx_index}
          inputs={inputs}
          outputs={outputs}
          weight={tx.weight}
          size={tx.size}
          displaySatoshi={this.state.displaySatoshi}
          expanded={this.state.expanded}
          toUSD={this.convertToUSD}
        />
      );

      return (
        <Transaction
          key={tx.tx_index}
          item={item}
          details={details}
        />
      );
    });

    const pagination = (
      <Pagination 
        page={this.state.page}
        n_tx={this.state.n_tx}
        changePage={this.changePage}
      />
    );

    return (
      <div className='data layout'>
        <Summary 
          id={this.props.match.params.id} 
          n_tx={this.state.n_tx} 
          finalBalance={
            this.state.displaySatoshi ? 
            this.state.final_balance : 
            this.convertToUSD(this.state.final_balance)
          }
          isSatoshi={this.state.displaySatoshi}
          toggleCurrency={this.toggleCurrency}
        />
        <Transactions 
          transactions={transactions}
          pagination={pagination}
        />
      </div>
    );
  }
}

export default Data;
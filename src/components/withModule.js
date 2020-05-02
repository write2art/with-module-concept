import React from 'react'
import { ReactReduxContext } from 'react-redux'

const withModule = (key, reducer, saga) => WrappedComponent => {

  class WithModule extends React.Component {

    constructor(props) {
      super()
      //props.store.updateReducer(key, reducer)
    }

    componentDidMount() {
      this.props.store.updateReducer(key, reducer)
      this.props.store.injectSaga(key, saga)
      console.log('new store', this.props.store.getState())
    }

    componentWillUnmount() {
      this.props.store.updateReducer(key, null)
      this.props.store.ejectSaga(key)
      console.log('new store', this.props.store.getState())
    }

    render() {
      return <WrappedComponent/>
    }
  }

  const WithStoreContext = () => (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return <WithModule store={store}/>
      }}
    </ReactReduxContext.Consumer>
  )

  return WithStoreContext
}

export default withModule
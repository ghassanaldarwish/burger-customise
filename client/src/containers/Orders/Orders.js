import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'


class Orders extends Component {
   

    componentDidMount(){
      this.props.fetchOrders(this.props.token, this.props.userId)
    }
    render() {
      
        return (
            <div>
             {this.props.loading ?
              <Spinner /> : 
                    this.props.orders.map(order=>(
                   <Order 
                   ingredients={order.ingredients}
                   orderData={order.orderData}
                   price={order.price}
                   time={order.time}
                   date={order.date}
                   deliveryMethod={order.orderData.deliveryMethod}
                   key={order.id} 
                  loading={this.props.loading}
                   />
               ))
            }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.orders.loading,
        orders: state.orders.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return  {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)) 
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

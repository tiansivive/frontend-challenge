import React from 'react';
import { compose } from 'recompose'


import Expense from './Item'
import { Spinner } from '../../components/Spinner'
import withFiniteStateMachine from '../../components/StateMachine/fsm.hoc'


import {
  StyledList,
  StyledFilterInput,
  StyledWrapper,
  StyledSpinnerWrapper
} from './styles';
import { assign } from 'xstate';


//currying in case we want to cache filters at a later point, probably not gonna get enough time to do it
const applyTextFiltering = (text) => (data) => 
  data.filter(item => {

    const pattern = new RegExp(text, 'gi')
    const check = obj => {
      const matches = obj.match(pattern)
      return matches && matches.length > 0
    }

    return check(item.comment) ||
      check(item.merchant) || 
      check(item.user.first) ||
      check(item.user.last) ||
      check(item.user.email)
  })


const Expenses = ({
  machineState,
  data,
  filterText,
  send
}) => {
  switch (machineState) {
    case 'fetching':
      return <StyledSpinnerWrapper data-testid="spinner">
        <Spinner height={60} amount={15} duration={1.25} keyframes={{ max: [50], min: [0, 100] }} />
      </StyledSpinnerWrapper>
    case 'show':
      return <StyledWrapper direction="column" across="stretch" along="start" data-testid="display-list">

        <StyledFilterInput type="text" placeholder="Enter a pattern to search for" onChange={evt => send('FILTERING', { text: evt.target.value })} value={filterText}/>
        <StyledList direction="row" across="stretch" along="start" wrap="wrap">
          {
            applyTextFiltering(filterText)(data.expenses).map(expense => <Expense key={expense.id} {...expense} onUpdate={send} />)
          }
        </StyledList>
      </StyledWrapper>

    default:
      return <span>SOMETHING WENT WRONG</span>
  }
}


const expensesMachine = props => ({
  id: 'expenses',
  initial: 'start',
  context: {
    filterText : ''
  },
  states: {
    start: {
      on: {
        '': [
          { target: 'fetching' }
        ]
      }
    },
    fetching: {
      invoke: {
        id: 'fetchExpenses',
        src: (ctx, evt) => fetch(`http://localhost:3030/expenses`).then(res => res.json()),
        onDone: {
          target: 'show',
          actions: assign({ data: (ctx, evt) => evt.data })
        },
        onError: {
          target: 'error',
          actions: ['logError']
        }
      }
    },
    show: {
      on: {
        REFRESH: 'fetching',
        FILTERING: {
          target: 'show',
          actions: assign({ filterText: (_, evt) => evt.text }) 
        }
      }
    },
    error: {}
  }
})

const expensesActions = props => ({
  logError: console.error
})

export default compose(
  withFiniteStateMachine(expensesMachine, expensesActions)
)(Expenses);


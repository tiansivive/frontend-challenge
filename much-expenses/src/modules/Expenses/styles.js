import styled from 'styled-components'

import FlexContainer from '../../components/Flex/Container'

export const StyledList = styled(FlexContainer)`
   margin-left: 2em;
   margin-top: 2em;
`



export const StyledItem = styled(FlexContainer)`
  min-width: 425px;
  max-width: 720px;
  flex: 1;
  flex-wrap: wrap;
  background-color: #EEEEEE;
  margin: 1em 1em 0 0;
  transition: .2s ease-in;

  &:hover{
   transform: scale(1.025);
  }
`

export const StyledInfo = styled(FlexContainer)`
  padding: 1em;
`

export const KeyValueStyling = styled.div`
  margin: 2px 0;
  
  & span {
    font-weight: bolder;
  }
`

const commentStyling = `
  width: 100%;
  cursor: pointer;
  margin-bottom: .5em;
`


export const StyledQuotation = styled.q`
  ${commentStyling}
  cursor: pointer;
  padding: .5em;
  border: 1px solid #888888;
  box-sizing: border-box;

`
export const StyledMessage = styled.span`
  ${commentStyling}
  cursor: pointer;
  font-size: 12px;
`

export const StyledEditingComment = styled(FlexContainer)`
  width: 100%;

  & > textarea{
    width: 100%;
    box-sizing: border-box;
    padding: .5em 1em;
    min-height: 100px;
  }
`
export const StyledEditingActions = styled(FlexContainer)``
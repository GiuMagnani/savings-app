import styled from "styled-components";
import { format } from "date-fns";

export default ({data}) => {
  return (
    <TableWrapper>
      <TableHeader>
        <span>Date</span>
        <span>Title</span>
        <span>Amount</span>
      </TableHeader>
      {
        data && data.length > 0 && data.map((item, index) => (
          <TableRow key={ index }>
            {/*<span>{ item.accountingDate }</span>*/ }
            <span>{ format(item.date, "dd/MM/yyyy") }</span>
            <span>{ item.subject }</span>
            {/*<span>{ item.description }</span>*/ }
            <Amount className={ ` ${ parseFloat(item.amount) > 0 ? "isPositive" : "" } ${ parseFloat(item.amount) < 0 ? "isNegative" : "" } ` }>
              € { item.amount }
            </Amount>
          </TableRow>
        ))
      }
    </TableWrapper>
  )
};

const TableWrapper = styled.div`
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #E4E4E4;
  max-width: 700px;
  margin: 1rem auto 2rem;
  background-color: white;
  box-shadow: 0 4px 40px rgba(40,40,90,0.2);
`;

const TableRow = styled.div`
  background: white;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: -1px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  
  &:nth-child(even) {
    background: #F5F7FA;
  }
  
  span {
    width: 33.33%;
  }
`;

const Amount = styled.span`
  position: relative;
  padding: 0.25rem 0.75rem;
  text-align: right;
  
  &::before {
    content: "";
    position: absolute;
    top: calc(50% - 5px);
    right: -10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: lightslategrey;
  }
  
  &.isNegative::before {
    background-color: tomato;
  }

  &.isPositive::before {
    background-color: #26da26;
  }
`;

const TableHeader = styled(TableRow)`
  padding: 0 0 1rem;
  
  span {
    font-weight: bold;
    text-transform: uppercase;
  }
`;

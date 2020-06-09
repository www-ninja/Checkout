import React, {useEffect, useState, useRef} from 'react';
import { Container, Box, Wrapper, SuperWrapper, Card, FaqSection } from './basic';
import ProductSummary from './productSummary';
import SelectQuantity from './selectQuantity';
import SelectMethod from './selectMethod';
import CustomerInfo from './customerInfo';
import OrderSummary from './orderSummary';
import ShipInformation from './shipInformation';
import BillingAddress from './billingAddress';
import Nav from './navbar';
import Faq from './faq';

const CheckOutPage = (props) => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const changeMethod = (method) => {
    setSelectedMethod(method);
  }  
  return (
    <Box pb={10} background='whitesmoke'>
      <Nav {...props}/>
      <Container>
        
        <ProductSummary {...props}/>
        
        <SuperWrapper>
          <Wrapper>
            <SelectQuantity {...props}/>
          </Wrapper>            
          <Wrapper>
            <SelectMethod selectMethod={changeMethod} selected={selectedMethod}/>
            { selectedMethod !== '' && <React.Fragment>
              <CustomerInfo />
              {selectedMethod === 'credit' && <React.Fragment>
                <ShipInformation />
                <BillingAddress />
              </React.Fragment>}
              <OrderSummary method={selectedMethod} {...props}/>
              {/* <div ref={v => (paypalRef = v)} /> */}
            </React.Fragment>}
          </Wrapper>
        </SuperWrapper>
        { selectedMethod !== '' && <Faq {...props}/>}
      </Container>
    </Box>
  );
}

export default CheckOutPage;

import React from 'react';
import styled from 'styled-components';
import admin_money from '../../assets/icons/admin_money.svg';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const MoneyImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const Title = styled.h2`
  font-size: 35px;
  color: #000;
  font-weight: bold;
  margin: 0;
`;

const Subtitle = styled.h3`
  font-size: 30px;
  color: #ff5f9f;
  font-weight: bold;
  margin: 10px 0;
`;

function AdminHeader() {
  return (
    <>
    <HeaderWrapper>
      <MoneyImg src={admin_money} alt="money icon" />
      <Title>사장님들!</Title>
    </HeaderWrapper>
    <Subtitle>업장을 등록해주세요</Subtitle>
    </>
  );
}

export default AdminHeader;

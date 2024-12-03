import React from 'react'
import styled from 'styled-components'
import mypageservice from '../../assets/icons/mypageservice.svg'

const PetServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: 4%;
  margin-top: 10px;
`

const PageTitle = styled.div`
  display: flex;
  flex-direction: flex-start;
  font-size: 20px;
  font-weight: 500;
  margin-top:31px;
  justify-content: flex-start;
`

const SubContainer = styled.div`
  display: flex;
  align-items: center;  
  margin-bottom: 31px;
  margin-top:28px;
`

const PetServiceImg = styled.img`
  width: 20px;
  margin-right: 10px; 
`

const Page = styled.div`
  font-size: 15px;
  display: flex;

  &:hover{
    color:  #ff69a9;
    cursor: pointer; 
  }
`

function PetService() {
  return (
    <PetServiceContainer>
      <PageTitle>댕댕어디가 서비스 관리</PageTitle>
      <SubContainer>
        <PetServiceImg src={mypageservice} />
        <Page>How-To Guides</Page>
      </SubContainer>
    </PetServiceContainer>
  )
} //2차 작업 때 들어갈 페이지

export default PetService;

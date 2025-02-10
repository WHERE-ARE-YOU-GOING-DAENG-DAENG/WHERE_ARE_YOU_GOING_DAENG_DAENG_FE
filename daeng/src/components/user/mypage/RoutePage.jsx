import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import mypageFavorite from '../../../assets/icons/mypageFavorite.svg';
import mypageKeyword from '../../../assets/icons/mypageKeyword.svg';
import mypageReview from '../../../assets/icons/mypageReview.svg';
import mypageAlarm from '../../../assets/icons/mypageAlarm.svg';

const RoutePageContainer = styled.div`
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
  justify-content: flex-start;
`

const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  background-color: #FDF2F8;
  border-radius: 10px;
  width: 95%;
  height: 300px;
  margin-right: 50px;
  padding: 8%;
`

const RouteItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Icon = styled.img`
  width: 20px;
  margin-right: 13px;
  margin-bottom: 40px;
`

const RouteText = styled.span`
  font-size: 15px;
  margin-bottom: 40px;
  margin-left:10px;
  display : flex;
  cursor: pointer;

  &:hover {
    color:  #ff69a9;
    cursor: pointer; 
  }
`
const StyledLink = styled(Link)`
  text-decoration: none; 
  color: inherit; 
  display: flex;
  align-items: center;
`;

const SkeletonRouteItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px;
  background-color: #e0e0e0;
  border-radius: 8px;
`;

const SkeletonCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ccc;
  border-radius: 50%;
`;

const SkeletonBar = styled.div`
  margin-left: 10px;
  height: 15px;
  background-color: #ccc;
  width: 100px;
`;

function RoutePage() {
  const [loading, setLoading] = useState(true);
  const list = ['즐겨찾기', '내가 작성한 리뷰', '키워드 수정', '알림 설정'];
  const icons = [mypageFavorite, mypageKeyword, mypageReview, mypageAlarm];
  const routes = ['/bookmark', '/my-review', '/preference-edit', '/alarm'];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <RoutePageContainer>
      <PageTitle>보호자 활동</PageTitle>
      <RouteContainer>
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonRouteItem key={index}>
              <SkeletonCircle />
              <SkeletonBar />
            </SkeletonRouteItem>
          ))
        ) : (
          list.map((item, index) => (
            <RouteItem key={index}>
              <Icon src={icons[index]} alt="아이콘" />
              <StyledLink to={routes[index]}>
                <RouteText>{item}</RouteText>
              </StyledLink>
            </RouteItem>
          ))
        )}
      </RouteContainer>
    </RoutePageContainer>
  );
}

export default RoutePage;
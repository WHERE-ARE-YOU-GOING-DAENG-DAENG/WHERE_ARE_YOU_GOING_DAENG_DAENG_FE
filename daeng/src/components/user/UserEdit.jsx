import React from 'react';
import styled from 'styled-components';
import SelectLabel from '../../components/commons/SelectLabel';
import kakaoBtn from '../../assets/icons/kakaoBtn.svg';
import SelectBtn from '../../components/commons/SelectBtn';
import ConfirmBtn from '../../components/commons/ConfirmBtn';

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: 4%;
`;

const InputEmailContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(228, 228, 228, 0.2);
  width: 95%;
  height: 44px;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;
  color: black;
  padding: 0 10px;
  margin-bottom: 20px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: 44px;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;
  color: black;
  padding: 0 10px;
  margin-bottom:10px;
`

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 12px;
  color: black;

  ::placeholder {
    color: #B3B3B3;
  }

  &:disabled {
    color: #B3B3B3;
    background-color: #f5f5f5;
  }
`;


const Icon = styled.img`
  width: 20px;
  cursor: pointer;
  margin-right:10px;
`;

const DuplicateBtn = styled.button`
  width: 15%;
  height: 23px;
  border-radius:10px;
  border:none;
  font-size: 10px;
  cursor: pointer;
  background-color: #FF69A9;
  color:white;

  &:hover {
    background-color: #F9A9D4;
  }
`
const InputAlert = styled.p`
  color: #FF69A9;
  font-size: 10px;
  display: flex;
  margin-top: -1px;
  flex-direction: flex-start;
  margin-bottom: 4%;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const AlertTitle = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  flex-direction: flex-start;
`;

function UserRegister() {
  return (
    <UserContainer>
      <SelectLabel label="이메일" />
      <InputEmailContainer>
        <Input type="email" placeholder="이메일 받아오기" disabled />
        <Icon src={kakaoBtn} alt="카카오 로그인" />
      </InputEmailContainer>
      <SelectLabel label="닉네임" />
      <InputBox>
        <Input type="text" placeholder="사용하실 닉네임을 입력해 주세요." />
        <DuplicateBtn>중복확인</DuplicateBtn>
      </InputBox>
      <InputAlert>*닉네임은 최소 1자 이상 작성해 주세요. 특수문자는 사용할 수 없습니다.</InputAlert>
      <SelectLabel label="성별" />
      <SelectionContainer>
      <SelectBtn label="남자" />
      <SelectBtn label="여자" />
      </SelectionContainer>
      <SelectLabel label="주소" />
      <SelectionContainer>
      <SelectBtn label="시" selected={false}  isAddress={true} />
      <SelectBtn label="군" selected={false}  isAddress={true} />
      </SelectionContainer>
      <InputAlert>*보호자님과 우리 댕댕이 맞춤 장소 추천을 위해 필요한 정보입니다.</InputAlert>
      <SelectLabel label="알림 동의" />
      <SelectionContainer>
        <SelectBtn label="받을래요" />
        <SelectBtn label="괜찮아요" />
      </SelectionContainer>
      <InputAlert>*장소에 함께하는 댕댕이를 알려드려요 </InputAlert>
      <ConfirmBtn label='수정 완료' />
    </UserContainer>
  );
}

export default UserRegister;

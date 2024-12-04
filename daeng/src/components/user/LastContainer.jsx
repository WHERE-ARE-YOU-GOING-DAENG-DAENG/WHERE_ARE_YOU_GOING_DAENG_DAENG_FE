import styled from 'styled-components';
import axios from 'axios';
import AlertDialog from "../commons/SweetAlert";
import useUserStore from '../../stores/userStore';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3%;
  margin-left: 4%;
  margin-top: 10px;
`;

const DeleteUserBtn = styled.button`
  width: 45%;
  height: 44px;
  border: 0.5px solid #E4E4E4;
  background-color: white;
  font-size: 14px;
  border-radius: 5px;
  color: #B3B3B3;
  cursor: pointer;

  &:hover {
    background-color: #F8F8F8;
  }
`;

const DivisionLine = styled.div`
  width: 1px;
  height: 50px;
  background-color: #E4E4E4;
  margin-left: 4%;
  margin-right: 4%;
`;

const LogoutBtn = styled.button`
  width: 45%;
  height: 44px;
  border: 0.5px solid #E4E4E4;
  background-color: white;
  font-size: 14px;
  border-radius: 5px;
  color: #B3B3B3;
  cursor: pointer;

  &:hover {
    background-color: #F8F8F8;
  }
`;

function LastContainer() {
  const { clearStorage } = useUserStore();

  const handleDeleteUser = async () => {
    AlertDialog({
      mode: 'alert',
      title: '회원탈퇴 확인',
      text: '정말 회원탈퇴 하시겠습니까?',
      confirmText: '확인',
      onConfirm: async () => {
        try {
          await axios.delete('https://www.daengdaeng-where.link/api/v1/user/delete', {
            withCredentials: true,
          });
          clearStorage();
          AlertDialog({
            mode: 'alert',
            title: '회원탈퇴 성공',
            text: '회원탈퇴가 완료되었습니다.',
            confirmText: '확인',
            icon: "success",
            onConfirm: () => {
              console.log('회원탈퇴 성공 확인 클릭됨');
            },
          });
        } catch {
          AlertDialog({
            mode: 'alert',
            title: '회원탈퇴 실패',
            text: '회원탈퇴에 실패했습니다.',
            confirmText: '확인',
            onConfirm: () => console.log('회원탈퇴 실패 확인 클릭됨'),
          });
        }
      },
    });
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://www.daengdaeng-where.link/api/v1/logout', null, {
        withCredentials: true,
      });
      clearStorage();
      AlertDialog({
        mode: 'alert',
        title: '로그아웃 성공',
        text: '로그아웃이 완료되었습니다.',
        confirmText: '확인',
        onConfirm: () => console.log('로그아웃 성공 확인 클릭됨'),
      });
    } catch {
      AlertDialog({
        mode: 'alert',
        title: '로그아웃 실패',
        text: '로그아웃에 실패했습니다.',
        confirmText: '확인',
        onConfirm: () => console.log('로그아웃 실패 확인 클릭됨'),
      });
    }
  };

  return (
    <Container>
      <DeleteUserBtn onClick={handleDeleteUser}>회원탈퇴</DeleteUserBtn>
      <DivisionLine />
      <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
    </Container>
  );
}

export default LastContainer;

import React from 'react';
import Modal from 'react-modal';
import trash from '../assets/images/etc/ico_trash.svg';
import CancelButton from './CancelButton';
import LogoutButton from './LogoutButton';

const customStyles = {
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '236px',
    borderRadius: '24px'
  },
  overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

interface DeleteAccoutModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirmLogout: () => void;
}

const DeleteAccoutModal: React.FC<DeleteAccoutModalProps> = ({ isOpen, onRequestClose, onConfirmLogout }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Logout Confirmation"
      className="flex flex-col items-center bg-[#ffffff] rounded-[24px] shadow-lg" 
    >
      <img src={trash} alt="trash_icon" className="w-[52px] h-[52px] mt-[20px]" />
      <h2>
        김잇픽
      </h2>
      <h2 className="text-[#1d2228] text-lg font-bold mt-[12px]">
        님과 이별인가요..?
      </h2>
      <div className="w-[160px] h-[32px] text-[#464f59] text-center text-[14px] mt-2">
        <p>탈퇴 버튼 선택 시, 계정은</p>
        <p>삭제되며 복구되지 않습니다.</p>
      </div> 
      <div className="flex justify-center mt-4 gap-4">
        <CancelButton onClose={onRequestClose} />
        <LogoutButton onClose={onConfirmLogout} />
      </div>
    </Modal>
  );
};

export default DeleteAccoutModal;
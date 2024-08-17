import React from 'react';
import Modal from 'react-modal';
import ActionButton from '../ActionButton';
import question from '../../assets/images/quesition.png';

const customStyles = {
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '236px',
    borderRadius: '24px',
  },
  overlay: {
    backgroundColor: 'rgba(29, 34, 40, 0.32)',
    backdropFilter: 'blur(4px)',
  },
};

interface LostPasswardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LostPasswardModal: React.FC<LostPasswardModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      className="flex flex-col items-center bg-[#ffffff] rounded-[24px] shadow-lg"
    >
      <img src={question} alt="modal_icon" className="w-[52px] h-[52px] mt-[20px]" />
      <div className="text-[#1d2228] text-[18px] font-bold mt-[12px] leading-[28.80px]">
        아이디/비밀번호를 잊으셨나요?
      </div>
      <div className=" h-[32px] text-[#464f59] text-center text-[14px]">
        잇픽 이메일 itpickhello@gmail.com로<br />연락주세요.
      </div>
      <div className="flex justify-center mt-[20px]">
        <ActionButton
          text="확인"
          onClick={onClose} 
          bgColor="bg-point500"
          textColor="text-white"
        />
      </div>
    </Modal>
  );
};

export default LostPasswardModal;

import React from 'react';
import certifyUnable from '../../../assets/images/ic_btn_certify_unable.svg';
import certifyAble from '../../../assets/images/ic_btn_certify_able.svg';
import hideIcon from '../../../assets/images/ic_icon_hide.svg';
import showIcon from '../../../assets/images/ic_icon_show.svg';

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isValid?: boolean;
  errorMessage?: string;
  showValidationButton?: boolean;
  showToggle?: boolean;
  onToggle?: () => void;
  isToggled?: boolean;
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  placeholder,
  isValid,
  errorMessage,
  showValidationButton,
  showToggle,
  onToggle,
  isToggled,
  maxLength,
}) => {
  return (
    <div className="mb-4">
      <div className="relative mx-5 mt-2">
        <div className="flex items-center bg-gray1 rounded-[8px]">
          <input
            type={isToggled ? 'text' : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            className="flex-grow h-[54px] pt-[12px] pb-[12px] pl-[20px] bg-gray1 rounded-[8px] focus:outline-none text-black placeholder-gray3 text-[18px] font-pretendard font-medium"
            style={{ appearance: 'none', boxShadow: 'none' }}
          />
          {showValidationButton && (
            <button
              type="button"
              className="absolute right-[12px] h-[54px] flex items-center justify-center"
              disabled={!isValid}
            >
              <img src={isValid ? certifyAble : certifyUnable} alt="email validation" />
            </button>
          )}
          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="absolute right-[22px] h-[54px] flex items-center justify-center"
            >
              <img src={isToggled ? showIcon : hideIcon} alt="toggle visibility" />
            </button>
          )}
        </div>
        {isValid === false && value.length > 0 && (
          <p className="text-[12px] text-errorpoint font-pretendard font-medium mt-1 ml-3">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;

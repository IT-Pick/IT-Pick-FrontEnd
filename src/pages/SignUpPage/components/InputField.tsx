import React from 'react';
import certifyUnable from '../../../assets/images/ic_btn_certify_unable.svg';
import certifyAble from '../../../assets/images/ic_btn_certify_able.svg';
import codeUnable from '../../../assets/images/24x24/ico_code_roundcheck_unable.svg';
import codeAble from '../../../assets/images/24x24/ico_code_roundcheck_able.svg';
import hideIcon from '../../../assets/images/ic_icon_hide.svg';
import showIcon from '../../../assets/images/ic_icon_show.svg';

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isValid?: boolean;
  isCodeValid?: boolean;
  errorMessage?: string;
  showValidationButton?: boolean;
  showCodeCheck?: boolean;
  showToggle?: boolean;
  onToggle?: () => void;
  onValidate?: () => void;
  isToggled?: boolean;
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  placeholder,
  isValid,
  isCodeValid,
  errorMessage,
  showValidationButton,
  showCodeCheck,
  showToggle,
  onToggle,
  onValidate,
  isToggled,
  maxLength,
}) => {
  const errorClass = errorMessage === '사용 가능한 이메일 입니다.' ? 'text-black' : 'text-errorpoint';

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
              onClick={onValidate}
              disabled={!isValid}
            >
              <img src={isValid ? certifyAble : certifyUnable} alt="email validation" />
            </button>
          )}
          {showCodeCheck && (
            <img src={isCodeValid ? codeAble : codeUnable} alt="code verification" className="absolute right-[12px]" />
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
          <p className={`text-[12px] font-pretendard font-medium mt-1 ml-3 ${errorClass}`}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;

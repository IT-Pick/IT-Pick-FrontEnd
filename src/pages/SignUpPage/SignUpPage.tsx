import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './components/InputField';
import { validateEmail, validateVerificationCode, validatePassword } from './utils/validation';
import { useSignUpContext } from '../../context/SignUpContext';
import { emailDuplicateCheck } from '../../apis/emailDuplicateCheck';
import { sendEmailVerification } from '../../apis/sendEmailVerification';

const SignUpPage: React.FC = () => {
  const { email, setEmail, password, setPassword } = useSignUpContext();
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState<string | null>(null);
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  
  const navigate = useNavigate();

  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  const isVerificationCodeValid = useMemo(() => validateVerificationCode(verificationCode), [verificationCode]);
  const isPasswordValid = useMemo(() => validatePassword(password), [password]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailValidationMessage(null);
    setIsEmailValidated(false);
  };

  const handleEmailValidation = async () => {
    try {
      const data = await emailDuplicateCheck(email);
      
      if (data.code === 1000) {
          setEmailValidationMessage('사용 가능한 이메일 입니다.');
          console.log('사용 가능 이메일', data);
          setIsEmailValidated(true);
      } else {
          setEmailValidationMessage('사용 불가능한 이메일 입니다.');
          setIsEmailValidated(false);
      }
    } catch (error) {
      console.error('이메일 유효성 검사 중 오류 발생:', error);
      setEmailValidationMessage('사용 불가능한 이메일 입니다.');
      setIsEmailValidated(false);
    }
};

const handleEmailVerification = async () => {
  try {
    const data = await sendEmailVerification(email);

    if(data.code === 1000){
      console.log('인증 요청 성공');
    }
  }
  catch(error){
    console.log('인증 요청 실패', error);

  }
};

  const handleVerificationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 6) {
      setVerificationCode(event.target.value);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleNextStep = () => {
    if (step === 1 && isEmailValid && isEmailValidated) setStep(2);
    if (step === 2 && isVerificationCodeValid) setStep(3);
    if (step === 3 && isPasswordValid) setStep(4);
  };

  const handleFinalStep = () => {
    if (isFormValid) {
      navigate('/agreement');
    }
  };

  const isFormValid =
    (step === 1 && isEmailValid && isEmailValidated) ||
    (step === 2 && isVerificationCodeValid) ||
    (step === 3 && isPasswordValid) ||
    (step === 4 && password === confirmPassword);

  return (
    <div className="w-[390px] min-h-screen bg-background mx-auto pt-[60px]">
      <h1 className="text-2xl font-pretendard font-bold ml-6">
        <span className="text-point500">회원가입</span>을 위한<p>정보를 입력해주세요.</p>
      </h1>
      {step >= 1 && (
        <div className="mt-6 mb-4">
          <label className="block font-pretendard font-bold text-[16px] text-black ml-8">이메일</label>
          <InputField
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해주세요"
            isValid={emailValidationMessage ? false : isEmailValid}
            errorMessage={emailValidationMessage || "이메일 주소를 정확하게 입력해주세요."}
            showValidationButton={true}
            onValidate={handleEmailValidation}
          />
        </div>
      )}

      {step >= 2 && (
        <div className="mb-4">
          <label className="block font-pretendard font-bold text-[16px] text-black ml-8 mt-[20px]">인증번호</label>
          <InputField
            type="verificationCode"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            placeholder="인증번호를 입력해주세요"
            maxLength={6}
            isValid={isVerificationCodeValid}
            showCodeCheck={true}
          />
        </div>
      )}

      {step >= 3 && (
        <div className="mb-4">
          <label className="block font-pretendard font-bold text-[16px] text-black ml-8 mt-[20px]">비밀번호</label>
          <InputField
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            isValid={isPasswordValid}
            errorMessage="영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요."
            showToggle={true}
            onToggle={() => setShowPassword(!showPassword)}
            isToggled={showPassword}
          />
        </div>
      )}

      {step >= 4 && (
        <div className="mb-4">
          <label className="block font-pretendard font-bold text-[16px] text-black ml-8 mt-[20px]">비밀번호 확인</label>
          <InputField
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="비밀번호를 다시 입력해주세요"
            isValid={confirmPassword.length === 0 || password === confirmPassword}
            errorMessage="비밀번호가 일치하지 않습니다."
            showToggle={true}
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            isToggled={showConfirmPassword}
          />
        </div>
      )}
      {step < 4 ? (
        <div className="w-[352px] mx-auto" style={{ position: 'absolute', bottom: '46px', left: '0', right: '0' }}>
          <button
            className={`w-full h-[48px] py-2 rounded flex items-center justify-center font-pretendard font-bold text-[16px] text-white ${isFormValid ? 'bg-point500' : 'bg-gray2'}`}
            onClick={() => {
              if (step === 1) {
                handleEmailVerification(); // step이 1일 때 handleEmailVerification 호출
                handleNextStep();
              } else {
                handleNextStep(); // 그 외의 경우는 기존의 handleNextStep 호출
              }
            }}
            disabled={step === 1 && !isEmailValid || step === 2 && !isVerificationCodeValid || step === 3 && !isPasswordValid}
            style={{ border: 'none', padding: 0, borderRadius: '12px' }}
          >
            {step === 1 && '인증 요청하기'}
            {step === 2 && '인증하기'}
            {step === 3 && '다음'}
          </button>
        </div>
      ) : (
        <div className="w-[352px] mx-auto" style={{ position: 'absolute', bottom: '46px', left: '0', right: '0' }}>
          <button
            className={`w-full h-[48px] py-2 rounded flex items-center justify-center font-pretendard font-bold text-[16px] text-white ${isFormValid ? 'bg-point500' : 'bg-gray2'}`}
            disabled={!isFormValid}
            onClick={handleFinalStep}
            style={{ border: 'none', padding: 0, borderRadius: '12px' }}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;

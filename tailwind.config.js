// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom-purple': '0px 0px 10px 0px rgba(118, 32, 228, 0.40)',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      colors: {
        point100: '#F1E6FF',
        point200: '#D6B8FB',
        point300: '#BA8CF5',
        point400: '#914CE9',
        point500: '#7620E4',
        errorpoint: '#FF4A4A',
        white: '#FFFFFF',
        background: '#F8F9FC',
        gray1: '#EDF0F3',
        gray2: '#CED5DB',
        gray3: '#9EAAB5',
        gray4: '#797F85',
        gray5: '#464F59',
        black: '#1D2228',
      },
      maxWidth: {
        custom: '680px', //반응형 최대 너비
      },
      width: {
        custom: '100%', //항상 화면 꽉 채우기
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
          '&::-webkit-scrollbar': {
            display: 'none' /* Chrome, Safari, Opera */,
          },
        },
      });
    },
  ],
};

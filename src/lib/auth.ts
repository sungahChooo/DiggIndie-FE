import { z } from 'zod';
/*
로그인은 최소 검증만: 1자 이상 입력
회원가입
id: 4~12자, 영문과 숫자만 가능
pw: 6~20자, 영문,숫자, 특수문자 중 2가지 이상 조합
pw 확인: 일치 여부
phoneNumber: 최소 1자
e-mail local: @입력 
email confirm: 숫자만, 최소 1자
*/
export const loginSchema = z.object({
  id: z.string().min(1, '아이디를 입력해 주세요'),
  password: z.string().min(1, '비밀번호를 입력해 주세요'),
});

//회원가입스키마
export const idSchema = z
  .string()
  .min(4, '아이디는 4자 이상이어야 합니다')
  .max(12, '아이디는 12자 이하여야 합니다')
  .regex(/^[a-zA-Z0-9]+$/, '아이디는 영문과 숫자만 사용할 수 있습니다');

const passwordSchema = z
  .string()
  .min(6, '비밀번호는 6자 이상이어야 합니다')
  .max(20, '비밀번호는 20자 이하여야 합니다')
  .refine(
    (pw) => {
      const hasLetter = /[a-zA-Z]/.test(pw);
      const hasNumber = /[0-9]/.test(pw);
      const hasSpecial = /[^a-zA-Z0-9]/.test(pw);

      const count = Number(hasLetter) + Number(hasNumber) + Number(hasSpecial);

      return count >= 2;
    },
    {
      message: '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합해야 합니다',
    }
  );
const phoneNumberSchema = z.string().min(1, '전화번호를 입력해주세요');
export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요')
  .email('올바른 이메일 형식이 아닙니다');
const emailConfirmSchema = z.string().min(1, '인증번호를 입력해주세요');
export const joinSchema = z
  .object({
    id: idSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    phoneNumber1: phoneNumberSchema,
    phoneNumber2: phoneNumberSchema,
    phoneNumber3: phoneNumberSchema,
    email: emailSchema,
    emailConfirm: emailConfirmSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

'use client';
import MyHeader from '@/components/my/MyHeader';
import { ToggleSwitch } from '@/components/my/ToggleSwitch';

export default function MyAgreeSettingPage() {
  return (
    <div className="text-white flex flex-col h-screen bg-black relative py-10">
      <MyHeader title={'마케팅 수신 동의 '} />
      <div className="mt-5">
        <p className="px-5 py-4 flex  justify-between border-b border-gray-850">
          <span className="flex items-center">
            <span>이메일 수신</span>
          </span>
          <ToggleSwitch />
        </p>
        <p className="px-5 py-4 flex  justify-between border-b border-gray-850">
          <span className="flex items-center">
            <span>SMS 수신</span>
          </span>
          <ToggleSwitch />
        </p>
      </div>
    </div>
  );
}

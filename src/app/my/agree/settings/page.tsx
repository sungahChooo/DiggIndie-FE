'use client';
import MyHeader from '@/components/my/MyHeader';
import { ToggleSwitch } from '@/components/my/ToggleSwitch';
import { authService } from '@/services/authService';
import { useEffect, useState } from 'react';

export default function MyAgreeSettingPage() {
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const fetchAgree = async () => {
      const res = await authService.getMarketingAgree();
      setAgree(res.marketingConsent);
    };

    fetchAgree();
  }, []);
  const handleAgreeToggle = async () => {
    const next = !agree;
    // UI 먼저 반영
    setAgree(next);
    try {
      //  api 호출
      await authService.toggleMarketingAgree(next);
    } catch (e) {
      //  실패 시 롤백
      setAgree(!next);
    }
  };
  return (
    <div className="text-white flex flex-col h-screen bg-black relative py-10">
      <MyHeader title={'마케팅 수신 동의 '} />
      <div className="mt-5">
        <p className="px-5 py-4 flex  justify-between border-b border-gray-850">
          <span className="flex items-center">
            <span>이메일 및 SMS 수신</span>
          </span>
          <ToggleSwitch checked={agree} onChange={handleAgreeToggle} />
        </p>
        {/* <p className="px-5 py-4 flex  justify-between border-b border-gray-850">
          <span className="flex items-center">
            <span>SMS 수신</span>
          </span>
          <ToggleSwitch checked={agree} onChange={handleAgreeToggle} />
        </p> */}
      </div>
    </div>
  );
}

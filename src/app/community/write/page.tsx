'use client';
import CommunityHeader from '@/components/community/CommunityWriteHeader';
import ImageUploadSection from '@/components/community/ImageUploadSection';
import TextArea from '@/components/community/TextArea';
import TradingLinkArea from '@/components/community/TradingLinkArea';
import TradingPriceArea from '@/components/community/TradingPriceArea';
import { Checkbox } from '@mui/material';
import { useState } from 'react';

export default function Write() {
  const generalTag = ['없음', '정보', '공연 후기', '추천', '신보', '음악 뉴스', '동행'];
  const tradeTag = ['판매', '구매'];

  const [boardType, setBoardType] = useState<'general' | 'trade'>('general');
  const [selectedTag, setSelectedTag] = useState<string>('없음');
  const tags = boardType === 'general' ? generalTag : tradeTag;

  const [annonymous, setAnonymous] = useState<boolean>(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isFormValid =
    title.trim().length > 0 && content.trim().length > 0 && selectedTag.length > 0;

  const handleBoardTypeChange = (type: 'general' | 'trade') => {
    setBoardType(type);
    setSelectedTag(type === 'general' ? '없음' : '판매');
  };
  return (
    <div className="mb-16 ">
      <CommunityHeader disabled={!isFormValid} />
      <div className="flex justify-between mb-3 px-5">
        <span className="font-medium text-base text-white">게시판 선택</span>
        <p className="flex gap-2 " onClick={() => setAnonymous(!annonymous)}>
          <Checkbox
            sx={{
              width: 20,
              height: 20,
              padding: 0,
              borderRadius: '4px',
              border: '1px solid #374151', // gray-700
              backgroundColor: 'transparent',
              '& .MuiSvgIcon-root': {
                display: 'none',
              },
              '&.Mui-checked': {
                backgroundColor: '#ef4444', // 빨간 배경
                borderColor: '#dc2626',
              },
              '&.Mui-checked::after': {
                content: '"✔"',
                color: '#fff',
                fontSize: 12,
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          />
          <span
            className={`text-sm font-medium  ${annonymous ? 'text-main-red-2' : 'text-gray-500'}`}
          >
            익명
          </span>
        </p>
      </div>

      <div className="flex gap-2 pb-3 px-5">
        <span
          onClick={() => handleBoardTypeChange('general')}
          className={`border font-medium text-sm px-3 py-1 rounded-xs cursor-pointer
      ${
        boardType === 'general'
          ? 'border-main-red-1 bg-main-red-4 text-white'
          : 'border-gray-600 text-gray-600'
      }`}
        >
          일반
        </span>
        <span
          onClick={() => handleBoardTypeChange('trade')}
          className={`border font-medium text-sm px-3 py-1 rounded-xs cursor-pointer
      ${
        boardType === 'trade'
          ? 'border-main-red-1 bg-main-red-4 text-white'
          : 'border-gray-600 text-gray-600'
      }`}
        >
          거래/양도
        </span>
      </div>

      <div className="flex justify-between mb-3 px-5">
        <span className="font-medium text-base text-white">말머리 선택</span>
      </div>
      <div className="flex flex-wrap gap-2 pb-3 px-5">
        {tags.map((tag) => (
          <span
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`border font-medium text-sm px-3 py-1 rounded-xs cursor-pointer
        ${
          selectedTag === tag
            ? 'border-main-red-1 bg-main-red-4 text-white'
            : 'border-gray-600 text-gray-600'
        }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <ImageUploadSection required={boardType === 'trade'} />
      {boardType === 'trade' && <TradingPriceArea />}
      <TextArea
        title={title}
        content={content}
        onChangeTitle={setTitle}
        onChangeContent={setContent}
      />
      {boardType === 'trade' && <TradingLinkArea />}
    </div>
  );
}

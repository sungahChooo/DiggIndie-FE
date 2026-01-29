'use client';

import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md';
}

export default function CustomCheckbox({ checked, onChange, size = 'md' }: CustomCheckboxProps) {
  const dimensions = size === 'sm' ? 16 : 20;
  const borderColor = '#8C8888';
  const checkedBg = '#FF3637';
  const checkedBorder = '#C31C20';

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disableRipple
      sx={{
        padding: 0,
        width: dimensions,
        height: dimensions,
        borderRadius: '4px',
        '&:hover': { backgroundColor: 'transparent' }, // hover 영향 최소화
      }}
      icon={
        <div
          style={{
            width: dimensions,
            height: dimensions,
            borderRadius: 4,
            border: `1px solid ${borderColor}`,
            backgroundColor: 'transparent',
          }}
        />
      }
      checkedIcon={
        <div
          style={{
            width: dimensions,
            height: dimensions,
            borderRadius: 4,
            border: `1px solid ${checkedBorder}`,
            backgroundColor: checkedBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckIcon style={{ color: '#fff', fontSize: dimensions - 3 }} />
        </div>
      }
    />
  );
}

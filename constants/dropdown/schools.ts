import { Language } from '../languages';

export interface SchoolOption {
  label: string;
  subLabel: Record<Language, string>;
  value: 'elementary' | 'middle' | 'high' | '';
}

export const SchoolOptions: SchoolOption[] = [
  {
    label: '초등학교',
    subLabel: {
      en: 'Elementary school',
      vt: 'Trường tiểu học',
      chn: '小学',
      jp: '小学校',
    },
    value: 'elementary',
  },
  {
    label: '중학교',
    subLabel: {
      en: 'Middle school',
      vt: 'Trường trung học cơ sở',
      chn: '中学',
      jp: '中学校',
    },
    value: 'middle',
  },
  {
    label: '고등학교',
    subLabel: {
      en: 'High school',
      vt: 'Trường trung học phổ thông',
      chn: '高中',
      jp: '高等学校',
    },
    value: 'high',
  },
];

// 기본 선택 안내 옵션
export const DefaultSchoolOption: SchoolOption = {
  label: '학교를 선택해주세요',
  subLabel: {
    en: 'Please select a school',
    vt: 'Vui lòng chọn trường',
    chn: '请选择学校',
    jp: '学校を選択してください',
  },
  value: '',
};

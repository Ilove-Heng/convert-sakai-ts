import { LocaleEnum } from '@/constants/enums/localeEnum';
import en from './en.json' with { type: 'json' };
import kh from './kh.json' with { type: 'json' };

export const messages = {
  [LocaleEnum.en]: en,
  [LocaleEnum.kh]: kh
};

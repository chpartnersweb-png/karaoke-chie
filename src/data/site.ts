const address = {
  addressLocality: '北九州市小倉北区',
  addressRegion: '福岡県',
  streetAddress: '京町4-6-18-102',
  addressCountry: 'JP',
};

const hours = {
  weekday: { opens: '13:00', closes: '23:00' },
  weekend: { opens: '13:00', closes: '23:30' },
};

export const site = {
  name: 'カラオケ喫茶チエ',
  phone: '093-531-6116',
  phoneHref: 'tel:0935316116',
  phoneInternational: '+81935316116',
  address: `${address.addressLocality}${address.streetAddress}`,
  postalAddress: address,
  station: 'JR小倉駅から徒歩6分',
  weekdayHours: `${hours.weekday.opens}–${hours.weekday.closes}`,
  weekendHours: `${hours.weekend.opens}–${hours.weekend.closes}`,
  closed: '月曜日',
  capacity: '30〜40人',
  instagram: 'https://www.instagram.com/karaoke_chie',
};

// Regular weekdays only. No unconfirmed holiday dates or holiday Monday overrides.
export const openingHoursSpecification = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    ...hours.weekday,
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday', 'Sunday'],
    ...hours.weekend,
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Monday',
    opens: '00:00',
    closes: '00:00',
  },
];

export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

export const dishes: { name: string; english: string; price: number | null }[] = [
  { name: 'オムライス', english: 'Omelet rice', price: null },
  { name: 'ナポリタン', english: 'Napolitan', price: null },
  { name: 'カレー', english: 'Curry rice', price: null },
  { name: 'エビフライ', english: 'Fried shrimp', price: null },
  { name: 'フライドポテト', english: 'French fries', price: null },
];

// Supplied flyer prices; their provenance is displayed alongside the table.
export const flyerRates = [
  { label: '昼セット', english: 'Afternoon', women: 1300, men: 1500 },
  { label: '夜セット', english: 'Evening', women: 1800, men: 2000 },
];

export const yen = (value: number) => `¥${value.toLocaleString('ja-JP')}`;

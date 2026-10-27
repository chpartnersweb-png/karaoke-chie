import { SITE_URL } from '../data/site-config.mjs';
import { site, mapUrl, openingHoursSpecification } from '../data/site';

export const seo = {
  canonical: SITE_URL,
  title: `${site.name}｜北九州・小倉駅徒歩6分のカラオケ喫茶`,
  description: `${site.postalAddress.addressLocality}京町の${site.name}。${site.station}。歌い放題のセットやお食事メニュー、店内写真、アクセスをご案内。平日${site.weekdayHours}、土日祝${site.weekendHours}、月曜日定休。ご予約・お問い合わせは${site.phone}へ。`,
  imageAlt: '紫色の看板が目印のカラオケ喫茶チエの外観と店舗入口',
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).href;
}

export function createStructuredData(image: { url: string; width: number; height: number }) {
  const businessId = `${SITE_URL}#business`;
  const websiteId = `${SITE_URL}#website`;
  const pageId = `${SITE_URL}#webpage`;
  const imageId = `${SITE_URL}#primaryimage`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CafeOrCoffeeShop',
        '@id': businessId,
        name: site.name,
        url: SITE_URL,
        description: seo.description,
        telephone: site.phoneInternational,
        address: { '@type': 'PostalAddress', ...site.postalAddress },
        image: { '@id': imageId },
        sameAs: [site.instagram],
        hasMap: mapUrl,
        openingHoursSpecification,
        hasMenu: `${SITE_URL}#menu`,
        mainEntityOfPage: { '@id': pageId },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: site.name,
        inLanguage: 'ja-JP',
        publisher: { '@id': businessId },
      },
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: SITE_URL,
        name: seo.title,
        description: seo.description,
        inLanguage: 'ja-JP',
        isPartOf: { '@id': websiteId },
        about: { '@id': businessId },
        mainEntity: { '@id': businessId },
        primaryImageOfPage: { '@id': imageId },
      },
      {
        '@type': 'ImageObject',
        '@id': imageId,
        url: image.url,
        contentUrl: image.url,
        width: image.width,
        height: image.height,
        caption: seo.imageAlt,
        representativeOfPage: true,
      },
    ],
  };
}

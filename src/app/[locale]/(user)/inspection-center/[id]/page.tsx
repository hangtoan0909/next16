import InspectionDetail from '@/components/features/user/find-a-inspection-center/inspection-detail';
import { ROUTER_PATH } from '@/constants';
import type { InspectionCenterDetailResponseType, ResponseData } from '@/types';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type SearchParams = Record<string, string | string[] | undefined>;

const pickString = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

const toNumber = (value?: string) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const buildFullAddress = (detail?: InspectionCenterDetailResponseType) =>
  [detail?.detailAddress, detail?.address].filter(Boolean).join(' ');

const getInspectionDetail = cache(async (inspectionId: number, vehicleLoadTypeId?: number, withLocation?: boolean) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) return null;

    const params = new URLSearchParams();
    params.set('inspectionId', String(inspectionId));
    if (vehicleLoadTypeId !== undefined) params.set('vehicleLoadTypeId', String(vehicleLoadTypeId));
    if (withLocation) {
      params.set('lat', '37.50204139');
      params.set('lng', '127.02685307');
    }

    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value;
    const lang = !locale || locale === 'kr' ? 'ko' : locale;

    const res = await fetch(`${baseUrl}booking/inspection-centers/detail?${params.toString()}`, {
      headers: {
        ...(lang ? { 'Accept-Language': lang } : {}),
      },
      cache: 'no-store',
    });

    const resData = (await res.json()) as ResponseData<InspectionCenterDetailResponseType>;

    return resData?.data ?? null;
  } catch {
    return null;
  }
});

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<SearchParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const inspectionId = toNumber(resolvedParams.id);
  const vehicleLoadTypeId = toNumber(pickString(resolvedSearchParams?.vehicleLoadTypeId));

  const detail = inspectionId ? await getInspectionDetail(inspectionId, vehicleLoadTypeId, false) : null;
  const name = detail?.businessName ?? 'Inspection Center';
  const description =
    detail?.introduction ?? (detail?.address ? `${name} - ${detail.address}` : `${name} inspection center details`);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const canonicalPath = ROUTER_PATH.USER.INSPECTION.DETAIL(resolvedParams.id);
  const canonical = appUrl ? new URL(canonicalPath, appUrl).toString() : undefined;
  const image = detail?.images?.find((item) => item.isThumbnail)?.url
    ? [detail.images.find((item) => item.isThumbnail)?.url as string]
    : detail?.images?.[0]?.url
      ? [detail.images[0].url]
      : undefined;

  return {
    title: name,
    description,
    metadataBase: appUrl ? new URL(appUrl) : undefined,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: name,
      description,
      type: 'website',
      url: canonical,
      images: image,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: name,
      description,
      images: image,
    },
  };
}

const buildJsonLd = (detail: InspectionCenterDetailResponseType | null, url?: string) => {
  if (!detail) return null;

  const fullAddress = buildFullAddress(detail);
  const dayMap: Record<string, string> = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
  };
  const openingHoursSpecification =
    detail.businessHours
      ?.filter((item) => item.isOpen)
      .map((item) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayMap[item.dayOfWeek] ?? item.dayOfWeek,
        opens: item.openTime ?? undefined,
        closes: item.closeTime ?? undefined,
      })) ?? [];

  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: detail.businessName,
    image: detail.images?.length ? detail.images.map((img) => img.url) : undefined,
    url,
    telephone: detail.businessPhone ?? undefined,
    address: fullAddress
      ? {
          '@type': 'PostalAddress',
          streetAddress: fullAddress,
        }
      : undefined,
    openingHoursSpecification: openingHoursSpecification.length ? openingHoursSpecification : undefined,
  };
};

export default async function InspectionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const query = {
    address: pickString(resolvedSearchParams?.address),
    date: pickString(resolvedSearchParams?.date),
    modelName: pickString(resolvedSearchParams?.modelName),
    ownerName: pickString(resolvedSearchParams?.ownerName),
    plate: pickString(resolvedSearchParams?.plate),
    vehicleLoadTypeId: pickString(resolvedSearchParams?.vehicleLoadTypeId),
  };

  const inspectionId = toNumber(resolvedParams.id);
  const vehicleLoadTypeId = toNumber(query.vehicleLoadTypeId);
  const withLocation = Boolean(pickString(resolvedSearchParams?.address));
  const detail = inspectionId ? await getInspectionDetail(inspectionId, vehicleLoadTypeId, withLocation) : null;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const canonicalPath = ROUTER_PATH.USER.INSPECTION.DETAIL(resolvedParams.id);
  const canonical = appUrl ? new URL(canonicalPath, appUrl).toString() : undefined;
  const jsonLd = buildJsonLd(detail, canonical);

  if (!detail) return notFound();

  return (
    <>
      {jsonLd && <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <InspectionDetail query={query} detail={detail} />
    </>
  );
}

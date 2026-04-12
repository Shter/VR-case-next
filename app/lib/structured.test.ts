import {
  homeRentalLd,
  homeBreadcrumbLd,
  pricingBreadcrumbLd,
  pricingRentalLd,
  vrBuenosAiresBreadcrumbLd,
  vrServiceLd
} from './structured';
import { pricingItems } from '@/app/constants';

describe('structured data builders', () => {
  it('generates rental service schema with offers', () => {
    const ld = homeRentalLd();
    expect(ld['@type']).toBe('RentalService');
    expect(Array.isArray(ld.makesOffer)).toBe(true);
    expect(ld.makesOffer).toHaveLength(
      pricingItems.oneHeadset.length + pricingItems.twoHeadsets.length
    );
  });

  it('builds breadcrumb schemas for pages', () => {
    expect(homeBreadcrumbLd().itemListElement).toHaveLength(3);
    expect(pricingBreadcrumbLd().itemListElement[1].name).toBe('Precios de alquiler VR');
    expect(vrBuenosAiresBreadcrumbLd().itemListElement[1].item).toContain('/vr-buenos-aires');
  });

  it('creates pricing and VR service entries referencing offer catalog', () => {
    const pricing = pricingRentalLd();
    expect(pricing['@type']).toBe('OfferCatalog');
    expect(pricing.itemListElement[0].item['@type']).toBe('Offer');

    const vrService = vrServiceLd();
    expect(vrService['@type']).toBe('RentalService');
    expect(vrService.hasOfferCatalog).toEqual({ '@id': expect.stringContaining('#offer-catalog') });
  });
});

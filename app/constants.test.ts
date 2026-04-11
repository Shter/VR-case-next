import { advantages, hourlyRentalNotice, navItems, pricingItems, serviceCards } from './constants';

describe('app constants', () => {
  it('provides navigation labels and hrefs', () => {
    expect(navItems).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'Principal', href: '/' })
    ]));
  });

  it('exposes pricing groups with offers', () => {
    expect(pricingItems.oneHeadset).not.toHaveLength(0);
    expect(pricingItems.twoHeadsets.every((offer) => offer.headsets === 2)).toBe(true);
  });

  it('shares marketing copy collections', () => {
    expect(advantages).toHaveLength(4);
    expect(serviceCards[0].heading).toBeDefined();
    expect(hourlyRentalNotice).toMatch(/20:00/);
  });
});

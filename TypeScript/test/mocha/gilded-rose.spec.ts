import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

// name, sellin, quality
describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
  });

  it('should sellin and quality lose -1 each day', () => {
    const gildedRose = new GildedRose([new Item('foo', 20, 20)])
    const items = gildedRose.updateQuality()
    expect (items[0].sellIn).to.equal(19)
    expect (items[0].quality).to.equal(19)
  })

  it('should degrade two times faster if sellin is passed', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 10)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(8)
  })

  it('should quality never be negative', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(0)
  })

  it('should Aged Brie win quality over time', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 20, 2)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(3)
  })

  it('should Aged Brie quality drop to 0 after concert', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 30)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(0)
  })

  it('should quality never be more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 20, 50)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(50)
  })

  it('should Sulfuras has no sellin and never lose quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(80)
    expect(items[0].sellIn).to.equal(0)
  })

  it('should Backstage passes quality +2 when 10 days left or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(12)
  })

  it('should Backstage passes quality +3 when 5 days left or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(13)
  })

  it('should Backstage passes quality drop to 0 after concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(0)
  })

});

import { render } from '@testing-library/react';

import FuelType, { FuelTypeEnum } from './fuel-type';

describe('FuelType', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FuelType fuelType={FuelTypeEnum.Solar} />);
    expect(baseElement).toBeTruthy();
  });
});

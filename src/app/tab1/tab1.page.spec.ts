import { Tab1Page } from './tab1.page';
import { render, screen } from '@testing-library/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Tab1Page', () => {
  it('should render tab1 component', async () => {
    const component = await render(Tab1Page, {
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    expect(component).toBeTruthy();
    expect(screen.getByTitle('firstpagecontent')).toBeTruthy();
  });

  it('should be able to check camera component', async () => {
    await render(Tab1Page, {
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    expect(screen.getByTitle(/camera/i)).toBeTruthy();
  });
});

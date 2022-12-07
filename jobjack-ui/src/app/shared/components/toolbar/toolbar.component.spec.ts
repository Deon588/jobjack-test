import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  const createComponent = createComponentFactory({
    component: ToolbarComponent,
    shallow: true  
  });
  let spectator: Spectator<ToolbarComponent>;


  beforeEach(() => spectator = createComponent());  

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

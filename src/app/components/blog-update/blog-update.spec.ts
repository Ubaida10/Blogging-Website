import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogUpdate } from './blog-update';

describe('BlogUpdate', () => {
  let component: BlogUpdate;
  let fixture: ComponentFixture<BlogUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

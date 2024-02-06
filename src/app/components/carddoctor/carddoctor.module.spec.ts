import { CarddoctorModule } from './carddoctor.module';

describe('CarddoctorModule', () => {
  const module: CarddoctorModule = new CarddoctorModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
